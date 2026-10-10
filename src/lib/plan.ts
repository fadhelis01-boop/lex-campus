import type { Assessment, DomainScore, LearnerProfile, Objective, Pack, PlanItem, PlanWeek, TrainingPlan } from "./types";
import type { QuizItem, QuizResult } from "../components/Quiz";
import { shuffle } from "../components/Quiz";
import { getProgress, uid } from "./store";

// ---------------------------------------------------------------------
// Bilan de connaissances → plan de formation personnalisé.
// 1. On tire des questions dans chaque module des domaines choisis.
// 2. On calcule un score par module et par domaine.
// 3. On ordonne les domaines (faiblesses, priorités, objectif, prérequis)
//    et on répartit les leçons non maîtrisées en semaines selon le temps
//    disponible.
// ---------------------------------------------------------------------

export const OBJECTIVES: Record<Objective, { label: string; desc: string; bonus: Record<string, number> }> = {
  "remise-a-niveau": {
    label: "Remise à niveau générale",
    desc: "Retrouver un socle solide et actuel en droit privé et droit des affaires.",
    bonus: { contrats: 15, responsabilite: 10, societes: 10, commercial: 5 },
  },
  "pratique-affaires": {
    label: "Pratique du droit des affaires",
    desc: "Conseiller ou travailler en entreprise : contrats, sociétés, difficultés, concurrence, sûretés.",
    bonus: { contrats: 20, societes: 20, commercial: 15, suretes: 15, difficultes: 15, concurrence: 10, comptabilite: 10 },
  },
  examen: {
    label: "Préparer un examen ou un concours (CRFPA, etc.)",
    desc: "Méthodologie complète, matières fondamentales, entraînement rédigé chronométré.",
    bonus: { methodologie: 50, contrats: 25, responsabilite: 20, societes: 10, "contrats-speciaux": 10 },
  },
  "fiscal-comptable": {
    label: "Fiscalité et comptabilité de l'entreprise",
    desc: "Lire des comptes, maîtriser l'impôt sur les sociétés, la TVA, la transmission et l'optimisation légale.",
    bonus: { comptabilite: 40, fiscal: 40, societes: 10 },
  },
};

// Prérequis pédagogiques : le domaine de gauche doit précéder ceux de droite.
const PREREQS: [string, string[]][] = [
  ["contrats", ["responsabilite", "contrats-speciaux", "suretes", "concurrence", "consommation"]],
  ["commercial", ["societes"]],
  ["societes", ["difficultes"]],
  ["suretes", ["difficultes"]],
  ["comptabilite", ["fiscal"]],
];

const key = (packId: string, moduleId: string) => `${packId}|${moduleId}`;

/** Tire les questions du bilan. */
export function buildAssessmentQuestions(packs: Pack[], domains: string[], length: "express" | "complet"): QuizItem[] {
  const items: QuizItem[] = [];
  for (const p of packs.filter((x) => domains.includes(x.id))) {
    const mods = [...p.modules].sort((a, b) => a.level - b.level).filter((m) => m.lessons.some((l) => l.quiz?.length));
    const perPack: QuizItem[] = [];
    for (const m of mods) {
      const pool = shuffle(m.lessons.flatMap((l) => l.quiz ?? []));
      const n = length === "complet" ? (mods.length <= 2 ? 2 : 1) : 1;
      for (const q of pool.slice(0, n)) perPack.push({ ...q, tag: p.title, key: key(p.id, m.id) });
    }
    // Express : 3 questions au plus par domaine, en privilégiant les premiers niveaux
    items.push(...(length === "express" ? perPack.slice(0, 3) : perPack));
  }
  return shuffle(items);
}

/** Calcule les scores par domaine et par module. */
export function scoreAssessment(packs: Pack[], domains: string[], length: "express" | "complet", r: QuizResult): Assessment {
  const scores: DomainScore[] = [];
  for (const p of packs.filter((x) => domains.includes(x.id))) {
    const answers = r.answers.filter((a) => a.item.key?.startsWith(p.id + "|"));
    const modules = p.modules.map((m) => {
      const a = answers.filter((x) => x.item.key === key(p.id, m.id));
      const correct = a.filter((x) => x.correct).length;
      return { moduleId: m.id, title: m.title, level: m.level, asked: a.length, correct, pct: a.length ? Math.round((correct / a.length) * 100) : -1 };
    });
    const correct = answers.filter((x) => x.correct).length;
    scores.push({
      packId: p.id,
      title: p.title,
      asked: answers.length,
      correct,
      skipped: 0,
      pct: answers.length ? Math.round((correct / answers.length) * 100) : 0,
      modules,
    });
  }
  const asked = scores.reduce((n, s) => n + s.asked, 0);
  const ok = scores.reduce((n, s) => n + s.correct, 0);
  return { id: uid(), at: Date.now(), length, globalPct: asked ? Math.round((ok / asked) * 100) : 0, scores };
}

export const statusOf = (pct: number): "maitrise" | "a-consolider" | "a-apprendre" =>
  pct >= 80 ? "maitrise" : pct >= 50 ? "a-consolider" : "a-apprendre";

export const STATUS_LABEL = { maitrise: "Maîtrisé", "a-consolider": "À consolider", "a-apprendre": "À apprendre" } as const;

function mondayOf(d: Date) {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // lundi = 0
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}
const iso = (d: Date) => d.toLocaleDateString("sv-SE");
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

export function itemId(it: PlanItem) {
  return it.kind === "exercice" ? `ex:${it.packId}/${it.lessonId}/${it.exerciseId}` : it.kind === "revision" ? `rev:${it.lessonId}` : `${it.packId}/${it.lessonId}`;
}

/** Génère le plan de formation. */
export function generatePlan(packs: Pack[], profile: LearnerProfile, a: Assessment, keepDoneSince?: number): TrainingPlan {
  const obj = OBJECTIVES[profile.objective];
  const byId = new Map(packs.map((p) => [p.id, p]));

  // 1. Besoin par domaine
  const ranked = a.scores
    .map((s) => {
      const priority = profile.priorities.includes(s.packId);
      const need = 100 - s.pct + (priority ? 60 : 0) + (obj.bonus[s.packId] ?? 0);
      const st = statusOf(s.pct);
      const reasons = [
        `score ${s.pct} %`,
        priority ? "domaine prioritaire pour vous" : "",
        obj.bonus[s.packId] ? "important pour votre objectif" : "",
      ].filter(Boolean);
      return { packId: s.packId, title: s.title, pct: s.pct, status: st, need, reason: reasons.join(" · ") };
    })
    .sort((x, y) => y.need - x.need);

  // 2. Respect des prérequis (sauf domaine prérequis déjà maîtrisé)
  for (let pass = 0; pass < 3; pass++) {
    for (const [pre, deps] of PREREQS) {
      const ip = ranked.findIndex((r) => r.packId === pre);
      if (ip < 0 || ranked[ip].status === "maitrise") continue;
      const firstDep = ranked.findIndex((r) => deps.includes(r.packId));
      if (firstDep >= 0 && firstDep < ip) {
        const [moved] = ranked.splice(ip, 1);
        ranked.splice(firstDep, 0, { ...moved, reason: moved.reason + " · prérequis" });
      }
    }
  }
  // La méthodologie de base (lire un arrêt) passe toujours en tête si elle est incluse
  const im = ranked.findIndex((r) => r.packId === "methodologie");
  if (im > 0) ranked.unshift(...ranked.splice(im, 1));

  // 3. Leçons à suivre
  const skippedModules: TrainingPlan["skippedModules"] = [];
  const items: PlanItem[] = [];
  for (const r of ranked) {
    const p = byId.get(r.packId);
    const sc = a.scores.find((s) => s.packId === r.packId);
    if (!p || !sc) continue;
    const minDomainForSkip = a.length === "express" ? 67 : 60;
    for (const m of [...p.modules].sort((x, y) => x.level - y.level)) {
      // Hors objectif « examen », on ne garde de la méthodologie que la lecture des arrêts
      if (p.id === "methodologie" && profile.objective !== "examen" && m.level > 1) continue;
      const ms = sc.modules.find((x) => x.moduleId === m.id);
      if (ms && ms.asked > 0 && ms.pct >= 80 && sc.pct >= minDomainForSkip) {
        skippedModules.push({ packId: p.id, moduleId: m.id, title: `${p.title} › ${m.title}`, pct: ms.pct });
        continue;
      }
      for (const l of m.lessons) {
        const pr = getProgress(`${p.id}/${l.id}`);
        // Leçons déjà faites avant le plan : exclues. Faites depuis (recalcul) : conservées et cochées.
        const doneBefore = (pr.status === "termine" || pr.status === "acquis") && !(keepDoneSince && (pr.completedAt ?? 0) >= keepDoneSince);
        if (doneBefore) continue;
        items.push({ packId: p.id, lessonId: l.id, title: l.title, packTitle: p.title, minutes: (l.duration ?? 15) + 5, kind: "lecon" });
        for (const ex of l.exercises ?? []) {
          const quick = ex.type === "ecritures" || ex.type === "calcul" || ex.type === "fiche-arret";
          if (!quick && profile.objective !== "examen" && !(profile.objective === "fiscal-comptable" && p.id === "fiscal")) continue;
          items.push({
            packId: p.id,
            lessonId: l.id,
            exerciseId: ex.id,
            title: ex.title,
            packTitle: p.title,
            minutes: quick ? 20 : Math.min(ex.timerMin ?? 60, 120),
            kind: "exercice",
          });
        }
      }
    }
  }

  // 4. Répartition en semaines
  const cap = Math.max(30, profile.minutesPerWeek);
  const revision = cap >= 60 ? 15 : 0;
  const weeks: PlanWeek[] = [];
  let start = mondayOf(new Date());
  let cur: PlanWeek | null = null;
  const newWeek = () => {
    const w: PlanWeek = { index: weeks.length + 1, start: iso(start), items: [], minutes: 0 };
    start = addDays(start, 7);
    if (revision) {
      w.items.push({ packId: "", lessonId: `w${w.index}`, title: "Révisions espacées (cartes du jour)", packTitle: "Révisions", minutes: revision, kind: "revision" });
      w.minutes += revision;
    }
    weeks.push(w);
    return w;
  };
  for (const it of items) {
    if (!cur || (cur.minutes + it.minutes > cap && cur.items.some((x) => x.kind !== "revision"))) cur = newWeek();
    cur.items.push(it);
    cur.minutes += it.minutes;
  }
  if (!weeks.length) newWeek();
  const endDate = iso(addDays(new Date(weeks[weeks.length - 1].start), 6));

  // 5. Échéance
  let warning: string | undefined;
  if (profile.deadline && endDate > profile.deadline) {
    const total = items.reduce((n, x) => n + x.minutes, 0);
    const days = Math.max(7, (new Date(profile.deadline).getTime() - Date.now()) / 86_400_000);
    const perWeek = Math.ceil(total / (days / 7) / 15) * 15;
    warning = `Au rythme choisi, le plan se termine le ${new Date(endDate).toLocaleDateString("fr-FR")}, après votre échéance du ${new Date(profile.deadline).toLocaleDateString("fr-FR")}. Il faudrait environ ${Math.round(perWeek / 60 * 10) / 10} h par semaine, ou réduire le périmètre (domaines prioritaires seulement).`;
  }

  return {
    createdAt: keepDoneSince ?? Date.now(),
    assessmentId: a.id,
    profile,
    domainOrder: ranked.map(({ packId, title, pct, status, reason }) => ({ packId, title, pct, status, reason })),
    skippedModules,
    weeks,
    endDate,
    warning,
    doneItems: [],
  };
}

/** Avancement d'un élément du plan (leçon terminée, ou case cochée). */
export function isItemDone(plan: TrainingPlan, it: PlanItem) {
  if (it.kind === "lecon") {
    const st = getProgress(`${it.packId}/${it.lessonId}`).status;
    return st === "termine" || st === "acquis";
  }
  return plan.doneItems.includes(itemId(it));
}

/** Semaine en cours (ou première semaine non terminée). */
export function currentWeek(plan: TrainingPlan): PlanWeek | undefined {
  const today = new Date().toLocaleDateString("sv-SE");
  const byDate = plan.weeks.find((w) => w.start <= today && today <= iso(addDays(new Date(w.start), 6)));
  const firstOpen = plan.weeks.find((w) => w.items.some((it) => !isItemDone(plan, it)));
  return firstOpen && byDate && firstOpen.index < byDate.index ? firstOpen : (byDate ?? firstOpen ?? plan.weeks[plan.weeks.length - 1]);
}

export function planProgress(plan: TrainingPlan) {
  const all = plan.weeks.flatMap((w) => w.items).filter((x) => x.kind !== "revision");
  const done = all.filter((x) => isItemDone(plan, x)).length;
  return { done, total: all.length, pct: all.length ? Math.round((done / all.length) * 100) : 100 };
}

/** Export du plan en Markdown (impression, partage, archivage). */
export function planToMarkdown(plan: TrainingPlan) {
  const L: string[] = [];
  L.push(`# Mon plan de formation LexCampus`, "");
  L.push(`Établi le ${new Date(plan.createdAt).toLocaleDateString("fr-FR")} — objectif : ${OBJECTIVES[plan.profile.objective].label} — ${Math.round(plan.profile.minutesPerWeek / 60 * 10) / 10} h par semaine — fin prévue le ${new Date(plan.endDate).toLocaleDateString("fr-FR")}.`, "");
  if (plan.warning) L.push(`> ${plan.warning}`, "");
  L.push("## Diagnostic par domaine", "");
  for (const d of plan.domainOrder) L.push(`- **${d.title}** : ${d.pct} % (${STATUS_LABEL[d.status]}) — ${d.reason}`);
  if (plan.skippedModules.length) {
    L.push("", "## Modules déjà maîtrisés (survol facultatif)", "");
    for (const m of plan.skippedModules) L.push(`- ${m.title} (${m.pct} %)`);
  }
  L.push("", "## Programme semaine par semaine", "");
  for (const w of plan.weeks) {
    L.push(`### Semaine ${w.index} — à partir du ${new Date(w.start).toLocaleDateString("fr-FR")} (${w.minutes} min)`);
    for (const it of w.items) L.push(`- [${isItemDone(plan, it) ? "x" : " "}] ${it.kind === "exercice" ? "✍️ " : it.kind === "revision" ? "🧠 " : ""}${it.title} — *${it.packTitle}*, ${it.minutes} min`);
    L.push("");
  }
  if (plan.advice) L.push("## Conseils du professeur", "", plan.advice, "");
  return L.join("\n");
}
