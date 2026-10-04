import { useState } from "react";
import { useContent } from "../lib/content";
import { useRoute } from "../lib/router";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Glossaire() {
  const { query } = useRoute();
  const packs = useContent((c) => c.packs);
  const [d, setD] = useState(query.get("d") ?? "");
  const [q, setQ] = useState("");
  const [latin, setLatin] = useState(false);

  const entries = packs
    .filter((p) => !d || p.id === d)
    .flatMap((p) => (p.glossary ?? []).map((g) => ({ ...g, pack: p.title })))
    .filter((g) => (!latin || g.latin) && (!q || norm(g.term + " " + g.def).includes(norm(q))))
    .sort((a, b) => a.term.localeCompare(b.term, "fr"));

  // dédoublonnage par terme
  const seen = new Set<string>();
  const unique = entries.filter((e) => (seen.has(norm(e.term)) ? false : (seen.add(norm(e.term)), true)));

  const letters = [...new Set(unique.map((e) => norm(e.term)[0]?.toUpperCase()))];

  return (
    <div className="page">
      <h1>📖 Lexique & adages</h1>
      <div className="filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Chercher un terme…" aria-label="Chercher un terme" />
        <select value={d} onChange={(e) => setD(e.target.value)} aria-label="Domaine">
          <option value="">Tous les domaines</option>
          {packs
            .filter((p) => p.glossary?.length)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
        </select>
        <label className="switch">
          <input type="checkbox" checked={latin} onChange={(e) => setLatin(e.target.checked)} />
          <span>Adages latins</span>
        </label>
      </div>
      <p className="small muted">{unique.length} entrées</p>
      {letters.map((L) => (
        <section key={L} className="section">
          <h2 className="letter">{L}</h2>
          <dl className="glossary">
            {unique
              .filter((e) => norm(e.term)[0]?.toUpperCase() === L)
              .map((e) => (
                <div key={e.term} className="gl-item">
                  <dt>
                    {e.latin ? <em>{e.term}</em> : e.term}
                  </dt>
                  <dd>
                    {e.def} <small className="muted">· {e.pack}</small>
                  </dd>
                </div>
              ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
