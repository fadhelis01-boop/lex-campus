import { useState } from "react";
import { useContent } from "../lib/content";
import { useStore, setState, getState, updateProgress, getProgress, toast } from "../lib/store";
import { OBJECTIVES, STATUS_LABEL, currentWeek, generatePlan, isItemDone, itemId, planProgress, planToMarkdown } from "../lib/plan";
import { aiConfigured, runClaude, JURIST_SYSTEM } from "../lib/ai";
import { download } from "./Notes";
import Markdown from "../components/Markdown";
import { ScoreBars } from "./Bilan";
import type { PlanItem } from "../lib/types";

const RYTHMES = [60, 120, 180, 300, 480];

function hrefOf(it: PlanItem) {
  if (it.kind === "revision") return "#/revisions";
  if (it.kind === "exercice") return `#/exercice/${it.packId}/${it.lessonId}/${it.exerciseId}`;
  return `#/lecon/${it.packId}/${it.lessonId}`;
}

export default function PlanPage() {
  const packs = useContent((c) => c.packs);
  const plan = useStore((s) => s.plan);
  useStore((s) => s.progress);
  const assessments = useStore((s) => s.assessments);
  const [showAll, setShowAll] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!plan) {
    return (
      <div className="page">
        <h1>🗓️ Mon plan de formation</h1>
        <div className="card card-cta">
          <h3>Vous n'avez pas encore de plan</h3>
          <p className="small">Faites le bilan de connaissances : il construit votre plan en fonction de vos résultats.</p>
          <a className="btn btn-big" href="#/bilan">
            Faire mon bilan
          </a>
        </div>
      </div>
    );
  }

  const assessment = assessments.find((a) => a.id === plan.assessmentId);
  const cur = currentWeek(plan);
  const prog = planProgress(plan);
  const weeks = showAll ? plan.weeks : plan.weeks.filter((w) => !cur || w.index >= cur.index - 1).slice(0, 6);

  function toggleItem(it: PlanItem) {
    const p = getState().plan!;
    const id = itemId(it);
    if (it.kind === "lecon") {
      const k = `${it.packId}/${it.lessonId}`;
      const st = getProgress(k).status;
      updateProgress(k, { status: st === "termine" || st === "acquis" ? "en-cours" : "termine", completedAt: Date.now() });
      return;
    }
    const done = p.doneItems.includes(id) ? p.doneItems.filter((x) => x !== id) : [...p.doneItems, id];
    setState({ plan: { ...p, doneItems: done } });
  }

  function regenerate(minutes: number) {
    if (!assessment) return toast("Bilan d'origine introuvable : refaites le bilan.");
    const np = generatePlan(packs, { ...plan!.profile, minutesPerWeek: minutes }, assessment, plan!.createdAt);
    setState({ plan: { ...np, doneItems: plan!.doneItems, advice: plan!.advice } });
    toast("Plan recalculé");
  }

  function markSkippedAcquired() {
    let n = 0;
    for (const m of plan!.skippedModules) {
      const p = packs.find((x) => x.id === m.packId);
      const mod = p?.modules.find((x) => x.id === m.moduleId);
      for (const l of mod?.lessons ?? []) {
        const k = `${m.packId}/${l.id}`;
        if (getProgress(k).status === "nouveau") {
          updateProgress(k, { status: "acquis" });
          n++;
        }
      }
    }
    toast(`${n} leçon${n > 1 ? "s" : ""} marquée${n > 1 ? "s" : ""} comme acquise${n > 1 ? "s" : ""}`);
  }

  async function askAdvice() {
    if (!assessment) return;
    setBusy(true);
    try {
      const r = await runClaude({
        system: JURIST_SYSTEM,
        effort: "medium",
        maxTokens: 6000,
        messages: [
          {
            role: "user",
            content: `Voici le résultat de mon bilan de connaissances et mon plan de formation. Objectif : ${OBJECTIVES[plan!.profile.objective].label}. Temps disponible : ${plan!.profile.minutesPerWeek} minutes par semaine${plan!.profile.deadline ? `, échéance le ${plan!.profile.deadline}` : ""}.
Scores par domaine : ${assessment.scores.map((s) => `${s.title} ${s.pct} %`).join(" ; ")}.
Ordre du plan : ${plan!.domainOrder.map((d) => d.title).join(" → ")}.
En professeur expérimenté, donne-moi en 10 à 15 lignes : ton analyse de mon profil, les 3 priorités, les pièges à éviter, une méthode de travail hebdomadaire concrète, et si tu modifierais l'ordre du plan (et pourquoi).`,
          },
        ],
      });
      setState({ plan: { ...getState().plan!, advice: r.text } });
    } catch (e) {
      toast((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page plan-page">
      <h1>🗓️ Mon plan de formation</h1>
      <div className="card">
        <p className="small muted">
          Établi le {new Date(plan.createdAt).toLocaleDateString("fr-FR")} · {OBJECTIVES[plan.profile.objective].label} ·{" "}
          {Math.round((plan.profile.minutesPerWeek / 60) * 10) / 10} h par semaine · {plan.weeks.length} semaines · fin prévue le{" "}
          {new Date(plan.endDate).toLocaleDateString("fr-FR")}
        </p>
        <div className="progress-line">
          <span>
            {prog.done} / {prog.total} étapes réalisées
          </span>
          <span>{prog.pct} %</span>
        </div>
        <div className="mini-bar big">
          <span style={{ width: prog.pct + "%" }} />
        </div>
        {plan.warning && <p className="alert alert-error small">{plan.warning}</p>}
        <div className="actions-row">
          <label className="small">
            Rythme :{" "}
            <select value={plan.profile.minutesPerWeek} onChange={(e) => regenerate(Number(e.target.value))} aria-label="Rythme hebdomadaire">
              {[...new Set([...RYTHMES, plan.profile.minutesPerWeek])]
                .sort((a, b) => a - b)
                .map((m) => (
                  <option key={m} value={m}>
                    {Math.round((m / 60) * 10) / 10} h / semaine
                  </option>
                ))}
            </select>
          </label>
          <button className="btn btn-ghost btn-small" onClick={() => download(`plan-lexcampus-${new Date().toLocaleDateString("sv-SE")}.md`, planToMarkdown(plan), "text/markdown")}>
            ⬇️ Exporter
          </button>
          <button className="btn btn-ghost btn-small" onClick={() => window.print()}>
            🖨️ Imprimer
          </button>
          <a className="btn btn-ghost btn-small" href="#/bilan">
            🎯 Refaire le bilan
          </a>
        </div>
      </div>

      {cur && (
        <section className="section">
          <h2>Cette semaine (semaine {cur.index})</h2>
          <ul className="plan-items card">
            {cur.items.map((it) => (
              <PlanRow key={itemId(it)} it={it} done={isItemDone(plan, it)} onToggle={() => toggleItem(it)} />
            ))}
          </ul>
        </section>
      )}

      <section className="section">
        <h2>Votre diagnostic</h2>
        <div className="card">
          {assessment ? <ScoreBars a={assessment} /> : <p className="small muted">Bilan d'origine non disponible.</p>}
          <details>
            <summary className="small">Pourquoi cet ordre ?</summary>
            <ol className="small">
              {plan.domainOrder.map((d) => (
                <li key={d.packId}>
                  <strong>{d.title}</strong> — {STATUS_LABEL[d.status]} ({d.reason})
                </li>
              ))}
            </ol>
          </details>
        </div>
        {plan.skippedModules.length > 0 && (
          <div className="card">
            <h3>Modules déjà maîtrisés, mis de côté</h3>
            <ul className="small">
              {plan.skippedModules.map((m) => (
                <li key={m.packId + m.moduleId}>
                  {m.title} ({m.pct} %)
                </li>
              ))}
            </ul>
            <button className="btn btn-ghost btn-small" onClick={markSkippedAcquired}>
              Marquer ces leçons comme acquises
            </button>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Programme semaine par semaine</h2>
          <button className="mini-link" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Afficher les semaines proches" : `Afficher les ${plan.weeks.length} semaines`}
          </button>
        </div>
        {weeks.map((w) => {
          const doneW = w.items.filter((it) => isItemDone(plan, it)).length;
          return (
            <details key={w.index} className={"card week-card " + (cur?.index === w.index ? "current" : "")} open={cur?.index === w.index}>
              <summary>
                <strong>Semaine {w.index}</strong> · {new Date(w.start).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} ·{" "}
                {w.minutes} min · {doneW}/{w.items.length}
              </summary>
              <ul className="plan-items">
                {w.items.map((it) => (
                  <PlanRow key={itemId(it)} it={it} done={isItemDone(plan, it)} onToggle={() => toggleItem(it)} />
                ))}
              </ul>
            </details>
          );
        })}
      </section>

      <section className="section card">
        <h2>Conseils du professeur</h2>
        {plan.advice ? (
          <Markdown text={plan.advice} />
        ) : aiConfigured() ? (
          <button className="btn" onClick={askAdvice} disabled={busy}>
            {busy ? "Analyse en cours…" : "Demander une analyse personnalisée de mon plan (≈ 0,05 $)"}
          </button>
        ) : (
          <p className="small muted">Avec une clé d'API (Réglages), l'assistant peut commenter votre diagnostic et votre plan.</p>
        )}
      </section>

      <p className="small muted">
        <button
          className="mini-link danger"
          onClick={() => {
            if (confirm("Supprimer ce plan ? Votre progression dans les leçons est conservée.")) setState({ plan: null });
          }}
        >
          Supprimer le plan
        </button>
      </p>
    </div>
  );
}

function PlanRow({ it, done, onToggle }: { it: PlanItem; done: boolean; onToggle: () => void }) {
  return (
    <li className={"plan-row " + (done ? "done" : "")}>
      <input type="checkbox" checked={done} onChange={onToggle} aria-label={`Fait : ${it.title}`} />
      <a href={hrefOf(it)}>
        <span className="plan-kind">{it.kind === "exercice" ? "✍️" : it.kind === "revision" ? "🧠" : "📘"}</span>
        <span className="plan-title">
          {it.title}
          <small className="muted"> · {it.packTitle}</small>
        </span>
        <span className="muted small nowrap">{it.minutes} min</span>
      </a>
    </li>
  );
}
