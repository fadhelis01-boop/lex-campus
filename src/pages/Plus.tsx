const ITEMS = [
  { path: "/bilan", icon: "🎯", label: "Bilan de connaissances", sub: "Mesurer son niveau et obtenir un plan personnalisé" },
  { path: "/plan", icon: "🗓️", label: "Mon plan de formation", sub: "Programme semaine par semaine, avancement" },
  { path: "/methodo", icon: "✒️", label: "Méthodologie", sub: "Fiche d'arrêt, commentaire, note de synthèse, cas pratique" },
  { path: "/compta", icon: "🧮", label: "Comptabilité", sub: "Comptabilité, analyse financière, fiscalité appliquée" },
  { path: "/plan-comptable", icon: "📒", label: "Plan comptable", sub: "Tous les comptes utilisés, avec recherche" },
  { path: "/arrets", icon: "🏛️", label: "Grands arrêts", sub: "Bibliothèque et jeu de l'arrêt mystère" },
  { path: "/veille", icon: "📡", label: "Veille", sub: "Nouveautés législatives et jurisprudentielles" },
  { path: "/reformes", icon: "🔄", label: "Réformes depuis 2006", sub: "Ce qui a changé depuis votre master" },
  { path: "/glossaire", icon: "📖", label: "Lexique & adages", sub: "Définitions et maximes latines" },
  { path: "/recherche", icon: "🔎", label: "Recherche", sub: "Dans les cours, arrêts, lexique et notes" },
  { path: "/notes", icon: "🗒️", label: "Mes notes", sub: "Toutes vos annotations" },
  { path: "/profil", icon: "🏅", label: "Progrès & badges", sub: "Statistiques, grades, séries" },
  { path: "/contenus", icon: "📦", label: "Contenus & mises à jour", sub: "Ajouter un domaine, hors connexion" },
  { path: "/reglages", icon: "⚙️", label: "Réglages", sub: "Clé IA, voix, thème, sauvegarde" },
  { path: "/aide", icon: "❔", label: "Aide", sub: "Mode d'emploi, installation sur iPhone" },
];

export default function Plus() {
  return (
    <div className="page">
      <h1>Plus</h1>
      <ul className="menu-list">
        {ITEMS.map((i) => (
          <li key={i.path}>
            <a href={"#" + i.path}>
              <span className="menu-icon">{i.icon}</span>
              <span>
                <strong>{i.label}</strong>
                <small className="muted">{i.sub}</small>
              </span>
              <span className="chev">›</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
