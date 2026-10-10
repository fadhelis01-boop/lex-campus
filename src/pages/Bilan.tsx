import { useMemo, useState } from "react";
import { useContent } from "../lib/content";
import { useStore, setState, addXp, toast } from "../lib/store";
import { go } from "../lib/router";
import Quiz, { type QuizResult } from "../components/Quiz";
import { OBJECTIVES, buildAssessmentQuestions, scoreAssessment, generatePlan, statusOf, STATUS_LABEL } from "../lib/plan";
import type { Assessment, LearnerProfile, Objective } from "../lib/types";

const RYTHMES = [
  { m: 60, label: "1 h / semaine" },
  { m: 120, label: "2 h / semaine" },
  { m: 180, label: "3 h / semaine" },
  { m: 300, label: "5 h / semaine" },
  { m: 480, label: "8 h / semaine" },
];

export function ScoreBars({ a }: { a: Assessment }) {
  return (
    <ul className="module-scores bilan-bars">
      {[...a.scores]
        .sort((x, y) => x.pct - y.pct)
        .map((s) => {
          const st = statusOf(s.pct);
          return (
            <li key={s.packId}>
              <span>{s.title}</span>
              <span className={"mini-bar st-" + st}>
                <span style={{ width: Math.max(3, s.pct) + "%" }} />
              </span>
              <span>
                {s.pct} % <small className="muted">{STATUS_LABEL[st]}</small>
              </span>
            </li>
          );
        })}
    </ul>
  );
}

export default function Bilan() {
  const packs = useContent((c) => c.packs);
  const previous = useStore((s) => s.assessments);
  const existingPlan = useStore((s) => s.plan);
  const [step, setStep] = useState<"profil" | "test" | "resultat">("profil");
  const [objective, setObjective] = useState<Objective>(existingPlan?.profile.objective ?? "remise-a-niveau");
  const [minutes, setMinutes] = useState(existingPlan?.profile.minutesPerWeek ?? 180);
  const [deadline, setDeadline] = useState(existingPlan?.profile.deadline ?? "");
  const [length, setLength] = useState<"express" | "complet">("express");
  const eligible = useMemo(() => packs.filter((p) => p.modules.some((m) => m.lessons.some((l) => l.quiz?.length))), [packs]);
  const [domains, setDomains] = useState<string[]>(() => existingPlan?.profile.domains ?? eligible.filter((p) => p.branch !== "Droit public").map((p) => p.id));
  const [priorities, setPriorities] = useState<string[]>(existingPlan?.profile.priorities ?? []);
  const [questions, setQuestions] = useState<ReturnType<typeof buildAssessmentQuestions>>([]);
  const [result, setResult] = useState<Assessment | null>(null);

  const toggle = (list: string[], id: string, set: (v: string[]) => void) => set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const estimate = useMemo(() => {
    const n = buildAssessmentQuestions(packs, domains, length).length;
    return { n, min: Math.ceil(n * 0.5) };
  }, [packs, domains, length]);

  function start() {
    if (!domains.length) return alert("Choisissez au moins un domaine.");
    setQuestions(buildAssessmentQuestions(packs, domains, length));
    setStep("test");
    window.scrollTo(0, 0);
  }

  function done(r: QuizResult) {
    const a = scoreAssessment(packs, domains, length, r);
    setResult(a);
    const profile: LearnerProfile = { objective, minutesPerWeek: minutes, priorities, domains, deadline: deadline || undefined };
    const plan = generatePlan(packs, profile, a);
    setState({ assessments: [a, ...previous].slice(0, 30), plan });
    addXp(40, "Bilan de connaissances");
    setStep("resultat");
    window.scrollTo(0, 0);
  }

  const last = previous[0];

  if (step === "test") {
    return (
      <div className="page">
        <h1>🎯 Bilan de connaissances</h1>
        <p className="muted small">
          Répondez sans chercher. Si vous ne savez pas, dites-le : « Je ne sais pas » rend le diagnostic plus juste qu'une
          réponse au hasard. Les corrections s'affichent à la fin.
        </p>
        <Quiz items={questions} mode="examen" allowSkip onDone={done} />
        <button
          className="mini-link"
          onClick={() => {
            if (confirm("Abandonner le bilan ? Vos réponses ne seront pas enregistrées.")) setStep("profil");
          }}
        >
          Abandonner
        </button>
      </div>
    );
  }

  if (step === "resultat" && result) {
    const before = previous.find((p) => p.id !== result.id);
    return (
      <div className="page">
        <h1>🎯 Votre diagnostic</h1>
        <div className={"score " + (result.globalPct >= 70 ? "ok" : "ko")}>
          {result.globalPct} %
          <small>
            {" "}
            de bonnes réponses sur {result.scores.reduce((n, s) => n + s.asked, 0)} questions
            {before ? ` (précédent bilan : ${before.globalPct} %)` : ""}
          </small>
        </div>
        <div className="card">
          <h2>Par domaine</h2>
          <ScoreBars a={result} />
          <p className="small muted">
            Maîtrisé : 80 % et plus · À consolider : 50 à 79 % · À apprendre : moins de 50 %. En bilan express (3 questions
            par domaine), le diagnostic est indicatif : refaites un bilan complet pour l'affiner.
          </p>
        </div>
        <div className="card card-cta">
          <h3>Votre plan de formation est prêt</h3>
          <p className="small">
            Il tient compte de vos résultats, de votre objectif, de vos priorités et de votre temps disponible. Les modules
            déjà maîtrisés sont mis de côté.
          </p>
          <button className="btn btn-big" onClick={() => go("/plan")}>
            Voir mon plan →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>🎯 Bilan de connaissances et plan de formation</h1>
      <p className="muted">
        En une vingtaine de minutes, ce bilan mesure votre niveau dans chaque domaine et construit un <strong>plan de
        formation personnalisé</strong>, semaine par semaine, adapté à votre objectif et à votre temps disponible. Vous
        pourrez le refaire dans quelques mois pour mesurer vos progrès.
      </p>
      {last && (
        <div className="card notice small">
          Dernier bilan le {new Date(last.at).toLocaleDateString("fr-FR")} : <strong>{last.globalPct} %</strong>.{" "}
          {existingPlan && <a href="#/plan">Voir mon plan actuel</a>}
        </div>
      )}

      <section className="card form">
        <h2>1. Votre objectif</h2>
        <div className="choice-cards">
          {(Object.keys(OBJECTIVES) as Objective[]).map((o) => (
            <button key={o} className={"choice " + (objective === o ? "chosen" : "")} onClick={() => setObjective(o)}>
              <span>
                <strong>{OBJECTIVES[o].label}</strong>
                <br />
                <small className="muted">{OBJECTIVES[o].desc}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="card form">
        <h2>2. Votre temps disponible</h2>
        <div className="chips">
          {RYTHMES.map((r) => (
            <button key={r.m} className={"chip " + (minutes === r.m ? "on" : "")} onClick={() => setMinutes(r.m)}>
              {r.label}
            </button>
          ))}
        </div>
        <label>
          Échéance éventuelle (examen, prise de poste…)
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </label>
      </section>

      <section className="card form">
        <h2>3. Les domaines</h2>
        <p className="small muted">
          Cochez les domaines à évaluer ; marquez d'une étoile ceux qui sont <strong>prioritaires</strong> pour vous (ils
          passeront en tête du plan).
        </p>
        <ul className="domain-pick">
          {eligible.map((p) => (
            <li key={p.id}>
              <label className="check">
                <input type="checkbox" checked={domains.includes(p.id)} onChange={() => toggle(domains, p.id, setDomains)} />
                <span>
                  {p.icon} {p.title}
                </span>
              </label>
              <button
                className={"star " + (priorities.includes(p.id) ? "on" : "")}
                aria-label={`Prioritaire : ${p.title}`}
                aria-pressed={priorities.includes(p.id)}
                onClick={() => toggle(priorities, p.id, setPriorities)}
                disabled={!domains.includes(p.id)}
              >
                ★
              </button>
            </li>
          ))}
        </ul>
        <div className="actions-row">
          <button className="btn btn-ghost btn-small" onClick={() => setDomains(eligible.map((p) => p.id))}>
            Tout cocher
          </button>
          <button className="btn btn-ghost btn-small" onClick={() => setDomains([])}>
            Tout décocher
          </button>
        </div>
      </section>

      <section className="card form">
        <h2>4. La durée du bilan</h2>
        <div className="chips">
          <button className={"chip " + (length === "express" ? "on" : "")} onClick={() => setLength("express")}>
            Express (3 questions par domaine)
          </button>
          <button className={"chip " + (length === "complet" ? "on" : "")} onClick={() => setLength("complet")}>
            Complet (chaque module)
          </button>
        </div>
        <p className="small muted">
          {estimate.n} questions, environ {estimate.min} minutes.
        </p>
        <button className="btn btn-big" onClick={start} disabled={!domains.length}>
          Commencer le bilan
        </button>
      </section>

      {previous.length > 0 && (
        <section className="section">
          <h2>Historique de vos bilans</h2>
          <ul className="small">
            {previous.map((a) => (
              <li key={a.id}>
                {new Date(a.at).toLocaleDateString("fr-FR")} — {a.length === "express" ? "express" : "complet"} —{" "}
                <strong>{a.globalPct} %</strong>
              </li>
            ))}
          </ul>
          <button
            className="mini-link"
            onClick={() => {
              if (confirm("Effacer l'historique des bilans ?")) {
                setState({ assessments: [] });
                toast("Historique effacé");
              }
            }}
          >
            Effacer l'historique
          </button>
        </section>
      )}
    </div>
  );
}
