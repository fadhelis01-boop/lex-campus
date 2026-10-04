import { useState } from "react";
import { useContent, allAccounts } from "../lib/content";

const CLASSES: Record<string, string> = {
  "1": "Classe 1 — Comptes de capitaux",
  "2": "Classe 2 — Comptes d'immobilisations",
  "3": "Classe 3 — Comptes de stocks et en-cours",
  "4": "Classe 4 — Comptes de tiers",
  "5": "Classe 5 — Comptes financiers",
  "6": "Classe 6 — Comptes de charges",
  "7": "Classe 7 — Comptes de produits",
  "8": "Classe 8 — Comptes spéciaux",
};

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function PlanComptable() {
  useContent((c) => c.packs);
  const [q, setQ] = useState("");
  const accounts = Object.entries(allAccounts())
    .filter(([n, l]) => !q || n.startsWith(q.trim()) || norm(l).includes(norm(q)))
    .sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="page">
      <h1>📒 Plan comptable</h1>
      <p className="muted">
        Les comptes du plan comptable général (règlement ANC n° 2014-03 modifié) utilisés dans les cours et les ateliers
        d'écritures. Le premier chiffre donne la classe ; plus le numéro est long, plus le compte est détaillé.
      </p>
      <div className="card notice small">
        <strong>Bilan</strong> : classes 1 à 5 · <strong>Compte de résultat</strong> : classes 6 (charges) et 7
        (produits). Un compte de <strong>charge</strong> ou d'<strong>actif</strong> augmente au débit ; un compte de{" "}
        <strong>produit</strong>, de <strong>passif</strong> ou de <strong>capitaux propres</strong> augmente au crédit.
      </div>
      <div className="filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="N° de compte ou mot (ex. 445, fournisseurs, amortissement…)" aria-label="Chercher un compte" />
      </div>
      {!accounts.length && <p className="muted">Aucun compte. Le module de comptabilité est-il installé ?</p>}
      {Object.keys(CLASSES).map((c) => {
        const list = accounts.filter(([n]) => n.startsWith(c));
        if (!list.length) return null;
        return (
          <section key={c} className="section">
            <h2 className="letter">{CLASSES[c]}</h2>
            <table className="table pcg">
              <tbody>
                {list.map(([n, l]) => (
                  <tr key={n}>
                    <td className="mono" style={{ paddingLeft: `${(n.length - 2) * 10 + 10}px` }}>
                      {n}
                    </td>
                    <td>{l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}
