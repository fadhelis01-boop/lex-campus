import { useStore, rankOf, today, getProgress } from "../lib/store";
import { useContent, findLesson, flatLessons } from "../lib/content";
import { isDue } from "../lib/srs";
import { isIos, isStandalone, usePwa, promptInstall } from "../lib/pwa";
import { useState } from "react";
import { go } from "../lib/router";

function greeting(name: string) {
  const h = new Date().getHours();
  const g = h < 6 ? "Bonsoir" : h < 18 ? "Bonjour" : "Bonsoir";
  return name ? `${g}, ${name}` : g;
}

export default function Home() {
  const s = useStore((x) => x);
  const packs = useContent((c) => c.packs);
  const { canInstall } = usePwa();
  const [q, setQ] = useState("");
  const rank = rankOf(s.profile.xp);
  const minutesToday = s.profile.days[today()] ?? 0;
  const goalPct = Math.min(100, Math.round((minutesToday / s.settings.dailyGoal) * 100));
  const due = Object.values(s.srs).filter((c) => isDue(c)).length;
  const last = s.lastLesson ? findLesson(...(s.lastLesson.split("/") as [string, string])) : null;
  const lastProg = last ? getProgress(s.lastLesson) : null;

  // Suggestion : première leçon non terminée du premier domaine entamé, sinon du parcours conseillé
  const suggestion = (() => {
    const started = packs.filter((p) => flatLessons(p).some(({ lesson }) => getProgress(`${p.id}/${lesson.id}`).status !== "nouveau"));
    const pool = started.length ? started : packs.filter((p) => p.branch !== "Méthodologie");
    for (const p of pool) {
      const n = flatLessons(p).find(({ lesson }) => {
        const st = getProgress(`${p.id}/${lesson.id}`).status;
        return st !== "termine" && st !== "acquis" && `${p.id}/${lesson.id}` !== s.lastLesson;
      });
      if (n) return { pack: p, lesson: n.lesson, module: n.module };
    }
    return null;
  })();

  const total = packs.reduce((n, p) => n + flatLessons(p).length, 0);
  const done = Object.values(s.progress).filter((p) => p.status === "termine" || p.status === "acquis").length;

  // 7 derniers jours
  const week = Array.from({ length: 7 }, (_, k) => {
    const d = new Date(Date.now() - (6 - k) * 86_400_000);
    const key = d.toLocaleDateString("sv-SE");
    return { key, label: d.toLocaleDateString("fr-FR", { weekday: "narrow" }), min: s.profile.days[key] ?? 0 };
  });

  return (
    <div className="page home">
      <header className="hero">
        <div>
          <p className="eyebrow">{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
          <h1>{greeting(s.settings.name)}</h1>
          <p className="muted">
            {rank.title} · {s.profile.xp} XP
            {s.profile.streak > 0 && <> · 🔥 {s.profile.streak} jour{s.profile.streak > 1 ? "s" : ""}</>}
          </p>
          <div className="rank-bar" title={rank.next ? `Prochain grade : ${rank.next.title}` : "Grade maximal"}>
            <div style={{ width: rank.pct + "%" }} />
          </div>
        </div>
        <div className="goal-ring" style={{ ["--p" as string]: goalPct }} aria-label={`Objectif du jour : ${goalPct} %`}>
          <span>
            {minutesToday}
            <small>/{s.settings.dailyGoal} min</small>
          </span>
        </div>
      </header>

      <form
        className="search-box"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) go("/recherche?q=" + encodeURIComponent(q.trim()));
        }}
      >
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une notion, un article, un arrêt…" aria-label="Rechercher" />
        <button className="btn">🔎</button>
      </form>

      {!isStandalone() && (canInstall || isIos()) && (
        <div className="card notice">
          <strong>📲 Installez LexCampus</strong> pour l'utiliser comme une application, hors connexion.
          {canInstall ? (
            <button className="btn btn-small" onClick={promptInstall}>
              Installer
            </button>
          ) : (
            <p className="small">Sur iPhone/iPad : bouton Partager ⬆️ puis « Sur l'écran d'accueil ».</p>
          )}
        </div>
      )}

      <div className="grid-2">
        {last && lastProg && lastProg.status !== "termine" ? (
          <a className="card card-cta" href={`#/lecon/${last.pack.id}/${last.lesson.id}`} style={{ ["--accent" as string]: last.pack.color }}>
            <p className="eyebrow">▶ Reprendre là où vous vous êtes arrêté</p>
            <h3>{last.lesson.title}</h3>
            <p className="muted small">
              {last.pack.icon} {last.pack.title} · {last.module.title}
            </p>
          </a>
        ) : suggestion ? (
          <a className="card card-cta" href={`#/lecon/${suggestion.pack.id}/${suggestion.lesson.id}`} style={{ ["--accent" as string]: suggestion.pack.color }}>
            <p className="eyebrow">✨ Prochaine leçon conseillée</p>
            <h3>{suggestion.lesson.title}</h3>
            <p className="muted small">
              {suggestion.pack.icon} {suggestion.pack.title} · {suggestion.module.title}
            </p>
          </a>
        ) : null}

        <a className="card card-cta" href="#/revisions" style={{ ["--accent" as string]: "#7c5cbf" }}>
          <p className="eyebrow">🧠 Révisions espacées</p>
          <h3>{due ? `${due} carte${due > 1 ? "s" : ""} à revoir` : "Rien à revoir pour l'instant"}</h3>
          <p className="muted small">{Object.keys(s.srs).length} cartes dans votre paquet</p>
        </a>
      </div>

      <section className="section">
        <h2>Accès rapides</h2>
        <div className="quick">
          <a href="#/assistant" className="quick-item">
            <span>⚖️</span>Poser une question
          </a>
          <a href="#/methodo" className="quick-item">
            <span>✒️</span>Méthodologie
          </a>
          <a href="#/compta" className="quick-item">
            <span>🧮</span>Comptabilité
          </a>
          <a href="#/arrets" className="quick-item">
            <span>🏛️</span>Grands arrêts
          </a>
          <a href="#/reformes" className="quick-item">
            <span>🔄</span>Ce qui a changé depuis 2006
          </a>
          <a href="#/veille" className="quick-item">
            <span>📡</span>Veille jurisprudentielle
          </a>
          <a href="#/glossaire" className="quick-item">
            <span>📖</span>Lexique & adages
          </a>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Votre progression</h2>
          <a href="#/profil" className="small">
            Détails →
          </a>
        </div>
        <div className="card stats-row">
          <div>
            <strong>{done}</strong>
            <small>leçons sur {total}</small>
          </div>
          <div>
            <strong>{s.profile.bestStreak}</strong>
            <small>meilleure série</small>
          </div>
          <div className="week">
            {week.map((d) => (
              <div key={d.key} className="week-day" title={`${d.key} : ${d.min} min`}>
                <div className="week-bar" style={{ height: Math.min(100, (d.min / Math.max(1, s.settings.dailyGoal)) * 100) + "%" }} />
                <small>{d.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Domaines</h2>
          <a href="#/parcours" className="small">
            Tout voir →
          </a>
        </div>
        <div className="domain-strip">
          {packs.slice(0, 8).map((p) => {
            const ls = flatLessons(p);
            const d = ls.filter(({ lesson }) => ["termine", "acquis"].includes(getProgress(`${p.id}/${lesson.id}`).status)).length;
            return (
              <a key={p.id} href={`#/domaine/${p.id}`} className="domain-chip" style={{ ["--accent" as string]: p.color }}>
                <span className="domain-icon">{p.icon}</span>
                <span className="domain-name">{p.title}</span>
                <span className="mini-bar">
                  <span style={{ width: `${ls.length ? (d / ls.length) * 100 : 0}%` }} />
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
