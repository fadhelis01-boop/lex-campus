import { useEffect, useRef, useState } from "react";
import { useContent, findLesson } from "../lib/content";
import { useStore, setNote, addXp, setState, getState, saveReport, uid, awardBadge } from "../lib/store";
import { aiConfigured, gradeExercise } from "../lib/ai";
import Markdown from "../components/Markdown";
import AiOutput, { NeedKey } from "../components/AiOutput";

const TYPE_LABEL: Record<string, string> = {
  "cas-pratique": "Cas pratique",
  commentaire: "Commentaire d'arrêt",
  "note-synthese": "Note de synthèse",
  "fiche-arret": "Fiche d'arrêt",
  dissertation: "Dissertation",
  redaction: "Rédaction",
};

function Timer({ minutes }: { minutes: number }) {
  const [left, setLeft] = useState(minutes * 60);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, [on]);
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  return (
    <div className={"timer " + (left < 600 ? "warn" : "")}>
      ⏱ {h ? `${h} h ` : ""}
      {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
      <button className="mini-link" onClick={() => setOn(!on)}>
        {on ? "Pause" : left === minutes * 60 ? "Démarrer" : "Reprendre"}
      </button>
      <button
        className="mini-link"
        onClick={() => {
          setOn(false);
          setLeft(minutes * 60);
        }}
      >
        Réinitialiser
      </button>
    </div>
  );
}

export default function ExercisePage({ packId, lessonId, exerciseId }: { packId: string; lessonId: string; exerciseId: string }) {
  useContent((c) => c.packs);
  const found = findLesson(packId, lessonId);
  const ex = found?.lesson.exercises?.find((e) => e.id === exerciseId);
  const key = `ex:${packId}/${lessonId}/${exerciseId}`;
  const draft = useStore((s) => s.notes[key] ?? "");
  const steps = useStore((s) => s.notes[key + ":steps"] ?? "");
  const [docIdx, setDocIdx] = useState(0);
  const [hints, setHints] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [revealStep, setRevealStep] = useState<Record<number, boolean>>({});
  const [grade, setGrade] = useState<{ text: string; busy: boolean; error?: string; cost?: number } | null>(null);
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const abort = useRef<AbortController | null>(null);

  if (!found || !ex) return <div className="page"><h1>Exercice introuvable</h1></div>;
  const { pack, lesson } = found;
  const stepValues: string[] = steps ? JSON.parse(steps) : [];
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  function markDone() {
    const done = getState().profile.exercisesDone;
    setState({ profile: { ...getState().profile, exercisesDone: done + 1 } });
    addXp(100, "Exercice rédigé");
    awardBadge("premier-exercice");
  }

  async function correct() {
    const answer = ex!.steps?.length ? ex!.steps.map((s, i) => `${s.label} : ${stepValues[i] ?? ""}`).join("\n\n") : draft;
    if (answer.trim().length < 40) return alert("Rédigez d'abord votre réponse (au moins quelques lignes).");
    setGrade({ text: "", busy: true });
    abort.current = new AbortController();
    try {
      const r = await gradeExercise({
        type: TYPE_LABEL[ex!.type],
        title: ex!.title,
        statement: ex!.statement,
        documents: ex!.documents?.map((d) => d.title),
        rubric: ex!.rubric,
        model: ex!.model,
        answer,
        onText: (t) => setGrade((g) => ({ ...(g ?? { busy: true }), text: t })),
        signal: abort.current.signal,
      });
      setGrade({ text: r.text, busy: false, cost: r.cost });
      saveReport({ id: uid(), kind: "correction", title: `Correction : ${ex!.title}`, text: r.text, at: Date.now() });
      markDone();
    } catch (e) {
      setGrade({ text: "", busy: false, error: (e as Error).message });
    }
  }

  return (
    <div className="page exercise" style={{ ["--accent" as string]: pack.color }}>
      <a className="back" href={`#/lecon/${pack.id}/${lesson.id}`}>
        ← {lesson.title}
      </a>
      <p className="eyebrow">{TYPE_LABEL[ex.type]}</p>
      <h1>{ex.title}</h1>
      {ex.timerMin ? <Timer minutes={ex.timerMin} /> : null}

      <section className="card">
        <h2>Énoncé</h2>
        <Markdown text={ex.statement} />
      </section>

      {ex.documents?.length ? (
        <section className="card dossier">
          <h2>Dossier documentaire ({ex.documents.length} documents)</h2>
          <div className="doc-tabs" role="tablist">
            {ex.documents.map((_d, i) => (
              <button key={i} role="tab" aria-selected={i === docIdx} className={i === docIdx ? "active" : ""} onClick={() => setDocIdx(i)}>
                Doc. {i + 1}
              </button>
            ))}
          </div>
          <h3>
            Document {docIdx + 1} — {ex.documents[docIdx].title}
          </h3>
          <Markdown text={ex.documents[docIdx].text} className="doc-body" />
        </section>
      ) : null}

      {ex.hints?.length ? (
        <section className="card">
          <h2>💡 Coups de pouce</h2>
          {ex.hints.slice(0, hints).map((h, i) => (
            <p key={i} className="hint">
              {i + 1}. {h}
            </p>
          ))}
          {hints < ex.hints.length && (
            <button className="btn btn-ghost btn-small" onClick={() => setHints(hints + 1)}>
              Afficher un indice ({hints + 1}/{ex.hints.length})
            </button>
          )}
        </section>
      ) : null}

      {ex.steps?.length ? (
        <section className="card">
          <h2>Votre fiche</h2>
          {ex.steps.map((s, i) => (
            <div key={i} className="step">
              <label>
                <strong>{s.label}</strong>
                <small className="muted"> — {s.help}</small>
                <textarea
                  rows={3}
                  value={stepValues[i] ?? ""}
                  onChange={(e) => {
                    const v = [...stepValues];
                    v[i] = e.target.value;
                    setNote(key + ":steps", JSON.stringify(v));
                  }}
                />
              </label>
              {revealStep[i] ? (
                <div className="explain">
                  <Markdown text={s.model} />
                </div>
              ) : (
                <button className="mini-link" onClick={() => setRevealStep({ ...revealStep, [i]: true })}>
                  Comparer avec le corrigé
                </button>
              )}
            </div>
          ))}
        </section>
      ) : (
        <section className="card">
          <h2>Votre copie</h2>
          <textarea
            className="copy"
            rows={16}
            value={draft}
            onChange={(e) => setNote(key, e.target.value)}
            placeholder="Rédigez ici (enregistrement automatique). Vous pouvez aussi rédiger sur papier puis recopier votre plan détaillé."
          />
          <p className="small muted">{words} mots</p>
        </section>
      )}

      <section className="card">
        <h2>Correction</h2>
        <div className="actions-row">
          {aiConfigured() ? (
            <button className="btn" onClick={correct} disabled={grade?.busy}>
              🧑‍🏫 Faire corriger ma copie (≈ 0,10 à 0,30 $)
            </button>
          ) : null}
          <button className="btn btn-ghost" onClick={() => setShowModel(!showModel)}>
            {showModel ? "Masquer le corrigé" : "📗 Voir le corrigé"}
          </button>
        </div>
        {!aiConfigured() && (
          <details>
            <summary className="small">Correction personnalisée par l'IA</summary>
            <NeedKey />
          </details>
        )}
        {grade && <AiOutput text={grade.text} busy={grade.busy} error={grade.error} cost={grade.cost} status="Correction en cours…" />}
        {showModel && (
          <div className="model-answer">
            <Markdown text={ex.model} />
          </div>
        )}
        {ex.rubric?.length ? (
          <div className="rubric">
            <h3>Grille d'auto-évaluation</h3>
            {ex.rubric.map((r, i) => (
              <label key={i} className="check">
                <input type="checkbox" checked={!!checks[i]} onChange={(e) => setChecks({ ...checks, [i]: e.target.checked })} />
                <span>{r}</span>
              </label>
            ))}
            <p className="small">
              {Object.values(checks).filter(Boolean).length} / {ex.rubric.length} critères remplis
            </p>
            {!grade && (
              <button className="btn btn-ghost btn-small" onClick={markDone}>
                J'ai terminé cet exercice
              </button>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
