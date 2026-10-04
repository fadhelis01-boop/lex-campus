import { useState } from "react";
import type { JournalEntry } from "../lib/types";
import { accountLabel } from "../lib/content";
import Markdown from "./Markdown";

// Atelier d'écritures : l'apprenant passe l'écriture au journal
// (comptes, débit, crédit) ; la correction est automatique.

interface Row {
  account: string;
  debit: string;
  credit: string;
}

const emptyRow = (): Row => ({ account: "", debit: "", credit: "" });

export function parseAmount(s: string): number | null {
  const t = s.replace(/\s|€/g, "").replace(",", ".");
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

const fmt = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface Check {
  ok: boolean;
  matched: boolean[]; // par ligne attendue
  extra: number[]; // lignes saisies en trop
  balanced: boolean;
}

function check(entry: JournalEntry, rows: Row[]): Check {
  const user = rows
    .map((r, i) => ({ i, acc: r.account.trim(), d: parseAmount(r.debit) ?? 0, c: parseAmount(r.credit) ?? 0 }))
    .filter((r) => r.acc || r.d || r.c);
  const used = new Set<number>();
  const matched = entry.lines.map((l) => {
    const want = l.debit ?? 0;
    const wantC = l.credit ?? 0;
    const hit = user.find(
      (u) => !used.has(u.i) && u.acc.startsWith(l.account) && Math.abs(u.d - want) < 0.011 && Math.abs(u.c - wantC) < 0.011,
    );
    if (hit) used.add(hit.i);
    return !!hit;
  });
  const extra = user.filter((u) => !used.has(u.i)).map((u) => u.i);
  const td = user.reduce((s, u) => s + u.d, 0);
  const tc = user.reduce((s, u) => s + u.c, 0);
  const balanced = Math.abs(td - tc) < 0.011 && td > 0;
  return { ok: matched.every(Boolean) && !extra.length, matched, extra, balanced };
}

function EntryEditor(props: { entry: JournalEntry; index: number; accounts?: Record<string, string>; onSolved: () => void }) {
  const { entry, accounts } = props;
  const [rows, setRows] = useState<Row[]>(() => Array.from({ length: Math.max(3, entry.lines.length) }, emptyRow));
  const [result, setResult] = useState<Check | null>(null);
  const [showSol, setShowSol] = useState(false);
  const [solved, setSolved] = useState(false);

  const set = (i: number, k: keyof Row, v: string) => {
    const r = [...rows];
    r[i] = { ...r[i], [k]: v };
    setRows(r);
    setResult(null);
  };
  const td = rows.reduce((s, r) => s + (parseAmount(r.debit) ?? 0), 0);
  const tc = rows.reduce((s, r) => s + (parseAmount(r.credit) ?? 0), 0);

  function verify() {
    const c = check(entry, rows);
    setResult(c);
    if (c.ok && !solved) {
      setSolved(true);
      props.onSolved();
    }
  }

  return (
    <div className={"journal-entry " + (solved ? "solved" : "")}>
      <div className="journal-label">
        <span className="pill">{props.index + 1}</span> <Markdown text={entry.label} />
      </div>
      <div className="journal-table" role="table">
        <div className="jt-head" role="row">
          <span>Compte</span>
          <span>Intitulé</span>
          <span>Débit</span>
          <span>Crédit</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className={"jt-row " + (result?.extra.includes(i) ? "bad" : "")} role="row">
            <input inputMode="numeric" value={r.account} onChange={(e) => set(i, "account", e.target.value)} placeholder="n°" aria-label={`Compte ligne ${i + 1}`} />
            <span className="jt-lib">{r.account ? accountLabel(r.account, accounts) : ""}</span>
            <input inputMode="decimal" value={r.debit} onChange={(e) => set(i, "debit", e.target.value)} aria-label={`Débit ligne ${i + 1}`} />
            <input inputMode="decimal" value={r.credit} onChange={(e) => set(i, "credit", e.target.value)} aria-label={`Crédit ligne ${i + 1}`} />
          </div>
        ))}
        <div className={"jt-total " + (Math.abs(td - tc) < 0.011 ? "ok" : "ko")} role="row">
          <span />
          <span>Totaux {Math.abs(td - tc) < 0.011 ? "✔ équilibrés" : "✘ déséquilibrés"}</span>
          <span>{fmt(td)}</span>
          <span>{fmt(tc)}</span>
        </div>
      </div>
      <div className="actions-row">
        <button className="btn btn-small" onClick={verify}>
          Vérifier
        </button>
        <button className="btn btn-small btn-ghost" onClick={() => setRows([...rows, emptyRow()])}>
          + Ligne
        </button>
        <button className="btn btn-small btn-ghost" onClick={() => setShowSol(!showSol)}>
          {showSol ? "Masquer la solution" : "Voir la solution"}
        </button>
      </div>
      {result && (
        <div className={"explain " + (result.ok ? "ok" : "ko")}>
          {result.ok ? (
            <strong>✔ Écriture exacte.</strong>
          ) : (
            <>
              <strong>✘ Pas encore.</strong>{" "}
              {!result.balanced && "L'écriture doit être équilibrée (total des débits = total des crédits). "}
              {result.matched.filter(Boolean).length} ligne(s) attendue(s) sur {entry.lines.length} trouvée(s)
              {result.extra.length ? `, ${result.extra.length} ligne(s) en trop ou erronée(s) (en rouge)` : ""}.
            </>
          )}
        </div>
      )}
      {showSol && (
        <div className="solution">
          <table className="sol-table">
            <tbody>
              {entry.lines.map((l, i) => (
                <tr key={i}>
                  <td className="mono">{l.account}</td>
                  <td>{accountLabel(l.account, accounts)}</td>
                  <td className="num">{l.debit ? fmt(l.debit) : ""}</td>
                  <td className="num">{l.credit ? fmt(l.credit) : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {entry.explain && <Markdown text={entry.explain} />}
        </div>
      )}
    </div>
  );
}

export default function Journal(props: { entries: JournalEntry[]; accounts?: Record<string, string>; onAllSolved: () => void }) {
  const [solved, setSolved] = useState(0);
  return (
    <div className="journal">
      <p className="small muted">
        Saisissez le numéro de compte (l'intitulé s'affiche), puis le montant au débit ou au crédit. Un compte plus
        détaillé est accepté (6071 pour 607). Progression : {solved} / {props.entries.length}
      </p>
      {props.entries.map((e, i) => (
        <EntryEditor
          key={i}
          entry={e}
          index={i}
          accounts={props.accounts}
          onSolved={() =>
            setSolved((n) => {
              if (n + 1 === props.entries.length) props.onAllSolved();
              return n + 1;
            })
          }
        />
      ))}
    </div>
  );
}
