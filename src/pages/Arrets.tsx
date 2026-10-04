import { useMemo, useState } from "react";
import { allDecisions, useContent } from "../lib/content";
import { useRoute } from "../lib/router";
import { addXp, addCards, toast } from "../lib/store";
import { shuffle } from "../components/Quiz";
import Markdown from "../components/Markdown";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const STATUS_CLASS: Record<string, string> = { "en vigueur": "pill-ok", codifié: "pill-info", infléchi: "pill-warn", abandonné: "pill-ko" };

function refLink(number?: string) {
  if (!number) return null;
  const n = number.replace(/^n°\s*/, "");
  return `https://www.courdecassation.fr/recherche-judilibre?search_api_fulltext=${encodeURIComponent(n)}`;
}

export default function Arrets() {
  const { query } = useRoute();
  const packs = useContent((c) => c.packs);
  const decisions = useMemo(() => allDecisions(), [packs]);
  const [d, setD] = useState(query.get("d") ?? "");
  const [q, setQ] = useState("");
  const [game, setGame] = useState<{ rounds: { answer: number; options: number[] }[]; pos: number; score: number; picked?: number } | null>(null);

  const list = decisions.filter(
    (x) => (!d || x.packId === d) && (!q || norm(`${x.name} ${x.topic} ${x.solution} ${x.court} ${x.date} ${x.number ?? ""}`).includes(norm(q))),
  );

  function startGame() {
    const pool = list.length >= 4 ? list : decisions;
    const idx = pool.map((x) => decisions.indexOf(x));
    const rounds = shuffle(idx)
      .slice(0, 10)
      .map((answer) => ({ answer, options: shuffle([answer, ...shuffle(idx.filter((i) => i !== answer)).slice(0, 3)]) }));
    setGame({ rounds, pos: 0, score: 0 });
  }

  if (game) {
    const r = game.rounds[game.pos];
    if (!r) {
      return (
        <div className="page">
          <h1>🏛️ Arrêt mystère</h1>
          <div className={"score " + (game.score >= 7 ? "ok" : "ko")}>
            {game.score} / {game.rounds.length}
          </div>
          <div className="actions-row">
            <button className="btn" onClick={startGame}>
              Rejouer
            </button>
            <button className="btn btn-ghost" onClick={() => setGame(null)}>
              Retour à la bibliothèque
            </button>
          </div>
        </div>
      );
    }
    const target = decisions[r.answer];
    return (
      <div className="page">
        <div className="quiz-head">
          <span className="pill">
            {game.pos + 1} / {game.rounds.length}
          </span>
          <span className="pill pill-soft">Score : {game.score}</span>
          <button className="mini-link" onClick={() => setGame(null)}>
            Quitter
          </button>
        </div>
        <h2>Quel arrêt a posé cette solution ?</h2>
        <div className="card">
          <p className="muted small">{target.topic}</p>
          <p>{target.solution}</p>
        </div>
        <div className="choices">
          {r.options.map((o) => {
            const dd = decisions[o];
            let cls = "choice";
            if (game.picked !== undefined) {
              if (o === r.answer) cls += " good";
              else if (o === game.picked) cls += " bad";
            }
            return (
              <button
                key={o}
                className={cls}
                disabled={game.picked !== undefined}
                onClick={() => {
                  const ok = o === r.answer;
                  if (ok) addXp(5);
                  setGame({ ...game, picked: o, score: game.score + (ok ? 1 : 0) });
                }}
              >
                <span>
                  <strong>{dd.name}</strong> — {dd.court}, {dd.date}
                </span>
              </button>
            );
          })}
        </div>
        {game.picked !== undefined && (
          <div className="explain">
            <strong>Portée :</strong> {target.scope}
            <div className="actions-row">
              <button className="btn" onClick={() => setGame({ ...game, pos: game.pos + 1, picked: undefined })}>
                Suivant →
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="page">
      <h1>🏛️ Grands arrêts</h1>
      <p className="muted">
        Les décisions qui structurent la matière, avec leur sort aujourd'hui : toujours en vigueur, codifiées par une
        réforme, infléchies ou abandonnées. Les numéros de pourvoi ouvrent la décision sur Judilibre.
      </p>
      <div className="filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nom, thème, juridiction, n°…" aria-label="Filtrer les arrêts" />
        <select value={d} onChange={(e) => setD(e.target.value)} aria-label="Domaine">
          <option value="">Tous les domaines</option>
          {packs
            .filter((p) => p.decisions?.length)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
        </select>
      </div>
      <div className="actions-row">
        <button className="btn" onClick={startGame} disabled={decisions.length < 4}>
          🎲 Jouer à « l'arrêt mystère »
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => {
            const n = addCards(
              list.map((x) => ({
                id: "arret:" + x.id,
                q: `**${x.name}** — ${x.court}, ${x.date}\n\nQuelle solution ? Quelle portée ?`,
                a: `${x.solution}\n\n*Portée :* ${x.scope}\n\n*Aujourd'hui :* ${x.status}${x.statusNote ? " — " + x.statusNote : ""}`,
                source: "Grands arrêts",
              })),
            );
            toast(n ? `${n} arrêts ajoutés aux révisions` : "Déjà dans vos révisions");
          }}
        >
          🧠 Ajouter ces arrêts aux révisions
        </button>
      </div>
      <p className="small muted">{list.length} arrêt{list.length > 1 ? "s" : ""}</p>
      <div className="decision-list">
        {list.map((x) => (
          <details key={x.packId + x.id} className="card decision">
            <summary>
              <span className="decision-name">{x.name}</span>
              <span className="muted small">
                {x.court}, {x.date}
              </span>
              <span className={"pill " + (STATUS_CLASS[x.status] ?? "")}>{x.status}</span>
            </summary>
            <p className="small muted">
              {x.packTitle} · {x.topic}
              {x.number && (
                <>
                  {" "}
                  ·{" "}
                  <a href={refLink(x.number)!} target="_blank" rel="noopener">
                    {x.number}
                  </a>
                </>
              )}
            </p>
            <Markdown text={`**Solution.** ${x.solution}\n\n**Portée.** ${x.scope}${x.statusNote ? `\n\n**Aujourd'hui.** ${x.statusNote}` : ""}`} />
          </details>
        ))}
      </div>
    </div>
  );
}
