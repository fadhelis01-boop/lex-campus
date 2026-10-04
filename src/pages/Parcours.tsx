import { useContent, flatLessons, hasContent } from "../lib/content";
import { getProgress, useStore } from "../lib/store";
import type { Pack } from "../lib/types";

export function packStats(p: Pack) {
  const ls = flatLessons(p);
  const done = ls.filter(({ lesson }) => ["termine", "acquis"].includes(getProgress(`${p.id}/${lesson.id}`).status)).length;
  const written = ls.filter(({ lesson }) => hasContent(lesson)).length;
  return { total: ls.length, done, written, pct: ls.length ? Math.round((done / ls.length) * 100) : 0 };
}

export function PackCard({ p }: { p: Pack }) {
  useStore((s) => s.progress);
  const st = packStats(p);
  return (
    <a href={p.id === "methodologie" ? "#/methodo" : `#/domaine/${p.id}`} className="card pack-card" style={{ ["--accent" as string]: p.color }}>
      <div className="pack-icon">{p.icon}</div>
      <div className="pack-body">
        <h3>{p.title}</h3>
        <p className="muted small">{p.description}</p>
        <div className="pack-meta">
          <span>
            {st.done}/{st.total} leçons
          </span>
          {p.origin !== "officiel" && <span className="pill pill-soft">{p.origin}</span>}
          {st.written < st.total && <span className="pill pill-soft" title="Les autres leçons se génèrent avec l'assistant IA">✍️ {st.written} rédigées</span>}
        </div>
        <div className="mini-bar">
          <span style={{ width: st.pct + "%" }} />
        </div>
      </div>
    </a>
  );
}

export default function Parcours() {
  const packs = useContent((c) => c.packs);
  const branches = [...new Set(packs.map((p) => p.branch))];
  const orderB = ["Méthodologie", "Droit privé", "Droit des affaires", "Droit public"];
  branches.sort((a, b) => (orderB.indexOf(a) + 1 || 99) - (orderB.indexOf(b) + 1 || 99));

  return (
    <div className="page">
      <h1>Parcours</h1>
      <div className="card notice">
        <strong>Parcours conseillé pour une remise à niveau</strong>
        <ol className="small path">
          <li>Méthodologie : la fiche d'arrêt (pour relire la jurisprudence efficacement).</li>
          <li>Droit des contrats (réforme de 2016) puis responsabilité civile : le socle de tout le droit des affaires.</li>
          <li>Droit commercial général, puis droit des sociétés.</li>
          <li>Sûretés (réforme de 2021) puis entreprises en difficulté (réforme de 2021) : elles se répondent.</li>
          <li>Concurrence et distribution, consommation, puis les droits « spéciaux » selon vos besoins.</li>
        </ol>
        <p className="small muted">
          Dans chaque domaine, le <strong>test de positionnement</strong> repère ce que vous savez déjà, pour ne pas
          refaire les fondamentaux maîtrisés.
        </p>
      </div>
      {branches.map((b) => (
        <section key={b} className="section">
          <h2>{b}</h2>
          <div className="pack-grid">
            {packs
              .filter((p) => p.branch === b)
              .map((p) => (
                <PackCard key={p.id} p={p} />
              ))}
          </div>
        </section>
      ))}
      <section className="section">
        <a className="card add-domain" href="#/contenus">
          ➕ <strong>Ajouter un domaine</strong> (droit public, droit de la santé, droit rural…) — import d'un fichier ou
          création assistée par l'IA, sans programmation.
        </a>
      </section>
    </div>
  );
}
