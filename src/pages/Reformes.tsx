import { useState } from "react";
import { useContent } from "../lib/content";

export default function Reformes() {
  const packs = useContent((c) => c.packs);
  const [d, setD] = useState("");
  const all = packs
    .flatMap((p) => (p.reforms ?? []).map((r) => ({ ...r, pack: p.title, packId: p.id, color: p.color })))
    .filter((r) => !d || r.packId === d)
    .sort((a, b) => a.date.localeCompare(b.date));
  const years = [...new Set(all.map((r) => r.date.slice(0, 4)))];

  return (
    <div className="page">
      <h1>🔄 Ce qui a changé depuis 2006</h1>
      <p className="muted">
        Vingt ans de réformes, dans l'ordre chronologique : la carte idéale pour situer ce que vous avez appris et ce
        qui l'a remplacé. Chaque domaine les détaille dans ses leçons (blocs « Ce qui a changé »).
      </p>
      <div className="filters">
        <select value={d} onChange={(e) => setD(e.target.value)} aria-label="Domaine">
          <option value="">Tous les domaines</option>
          {packs.filter((p) => p.reforms?.length).map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>
      <div className="timeline">
        {years.map((y) => (
          <section key={y}>
            <h2 className="tl-year">{y}</h2>
            {all.filter((r) => r.date.startsWith(y)).map((r, i) => (
              <div key={i} className="tl-item" style={{ ["--accent" as string]: r.color }}>
                <div className="tl-date">{new Date(r.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</div>
                <div>
                  <strong>{r.title}</strong>
                  <p className="small">{r.summary}</p>
                  <small className="muted">{r.pack}</small>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
