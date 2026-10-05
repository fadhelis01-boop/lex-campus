import { marked } from "marked";
import DOMPurify from "dompurify";

// Blocs pédagogiques utilisables dans les leçons :
//   :::article Art. 1104 C. civ.        → texte de loi
//   :::arret Cass. com., 22 oct. 1996    → arrêt clé
//   :::reforme Ce qui a changé           → évolution depuis 2006
//   :::retenir / :::astuce / :::attention / :::exemple / :::definition / :::methode
//   :::                                  → fin du bloc
export const CALLOUTS: Record<string, { icon: string; label: string }> = {
  article: { icon: "📜", label: "Texte" },
  arret: { icon: "⚖️", label: "Jurisprudence" },
  reforme: { icon: "🔄", label: "Ce qui a changé" },
  retenir: { icon: "📌", label: "À retenir" },
  astuce: { icon: "💡", label: "Astuce" },
  attention: { icon: "⚠️", label: "Attention" },
  exemple: { icon: "🧩", label: "Exemple" },
  definition: { icon: "📖", label: "Définition" },
  methode: { icon: "🧭", label: "Méthode" },
  debat: { icon: "🗣️", label: "Débat doctrinal" },
};

marked.setOptions({ gfm: true, breaks: false });

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

function preprocess(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let open = false;
  for (const line of lines) {
    const m = line.match(/^:::\s*([a-z]+)\s*(.*)$/);
    if (m && CALLOUTS[m[1]]) {
      if (open) out.push("", "</div>", "");
      const c = CALLOUTS[m[1]];
      const title = m[2].trim();
      out.push(
        "",
        `<div class="callout callout-${m[1]}"><div class="callout-title"><span aria-hidden="true">${c.icon}</span> ${escapeHtml(title || c.label)}</div>`,
        "",
      );
      open = true;
    } else if (/^:::\s*$/.test(line) && open) {
      out.push("", "</div>", "");
      open = false;
    } else out.push(line);
  }
  if (open) out.push("", "</div>", "");
  return out.join("\n");
}

// n° de pourvoi (ex. 93-18.632) → recherche Judilibre (open data Cour de cassation)
function linkPourvois(html: string) {
  return html.replace(
    /(n°\s?)(\d{2}-\d{2}\.\d{3})(?![^<]*<\/a>)/g,
    (_m, pre, num) =>
      `${pre}<a href="https://www.courdecassation.fr/recherche-judilibre?search_api_fulltext=${encodeURIComponent(
        num,
      )}" target="_blank" rel="noopener" class="ref-link" title="Ouvrir sur Judilibre">${num}</a>`,
  );
}

export function renderMarkdown(md: string): string {
  const html = marked.parse(preprocess(md), { async: false }) as string;
  const clean = DOMPurify.sanitize(linkPourvois(html), { ADD_ATTR: ["target"] });
  return clean;
}

// Texte « lisible à voix haute » : développe les abréviations juridiques.
const SPOKEN: [RegExp, string][] = [
  [/\bAss\. plén\./g, "assemblée plénière de la Cour de cassation"],
  [/\bch\. mixte\b/g, "chambre mixte"],
  [/\bCass\. com\./g, "Cour de cassation, chambre commerciale"],
  [/\bCass\. soc\./g, "Cour de cassation, chambre sociale"],
  [/\bCass\. crim\./g, "Cour de cassation, chambre criminelle"],
  [/\bCass\. civ\. ?1re\b|\bCiv\. 1re\b/g, "première chambre civile"],
  [/\bCass\. civ\. ?2e\b|\bCiv\. 2e\b/g, "deuxième chambre civile"],
  [/\bCass\. civ\. ?3e\b|\bCiv\. 3e\b/g, "troisième chambre civile"],
  [/\bCom\./g, "chambre commerciale"],
  [/\bSoc\./g, "chambre sociale"],
  [/\bCrim\./g, "chambre criminelle"],
  [/\bCass\./g, "Cour de cassation"],
  [/\bC\. civ\./g, "du Code civil"],
  [/\bC\. com\./g, "du Code de commerce"],
  [/\bC\. trav\./g, "du Code du travail"],
  [/\bC\. consom\./g, "du Code de la consommation"],
  [/\bCMF\b/g, "du Code monétaire et financier"],
  [/\bCGI\b/g, "du Code général des impôts"],
  [/\bCPC\b/g, "du Code de procédure civile"],
  [/\bCPI\b/g, "du Code de la propriété intellectuelle"],
  [/\bC\. pén\./g, "du Code pénal"],
  [/\bCE\b/g, "Conseil d'État"],
  [/\bCJUE\b/g, "Cour de justice de l'Union européenne"],
  [/\bTFUE\b/g, "traité sur le fonctionnement de l'Union européenne"],
  [/\barts?\.\s/gi, "article "],
  [/\bal\.\s/g, "alinéa "],
  [/\bOrd\.\s/g, "ordonnance "],
  [/\bord\.\s/g, "ordonnance "],
  [/\bn°\s?/g, "numéro "],
  [/\bcf\.\s/g, "voir "],
  [/\bjanv\./g, "janvier"],
  [/\bfévr?\./g, "février"],
  [/\bavr\./g, "avril"],
  [/\bjuill\./g, "juillet"],
  [/\bsept\./g, "septembre"],
  [/\boct\./g, "octobre"],
  [/\bnov\./g, "novembre"],
  [/\bdéc\./g, "décembre"],
  [/\bL\.\s?(\d)/g, "L $1"],
  [/\bR\.\s?(\d)/g, "R $1"],
  [/\bs\.$/g, "et suivants"],
  [/§/g, "paragraphe "],
  [/→/g, ", donc "],
  // 1 805 677 → 1805677 (lu correctement) ; deux passes pour les grands nombres
  [/(\d)[   ](\d{3})/g, "$1$2"],
  [/(\d)[   ](\d{3})/g, "$1$2"],
  [/ − /g, " moins "],
  [/ × /g, " fois "],
  [/ = /g, " égale "],
  [/€/g, " euros"],
  [/ %/g, " pour cent"],
  [/✔/g, ""],
  [/[*_`#>|]/g, " "],
];

export function spokenText(s: string) {
  let t = s;
  for (const [re, rep] of SPOKEN) t = t.replace(re, rep);
  return t.replace(/\s+/g, " ").trim();
}

// Découpe le rendu HTML en blocs lisibles (paragraphes, titres, items).
export function collectBlocks(root: HTMLElement): HTMLElement[] {
  // Les tableaux (écritures comptables, bilans, comparatifs) sont lus ligne
  // par ligne, chaque cellule précédée de l'intitulé de sa colonne.
  const sel = "h1,h2,h3,h4,p,li,.callout-title,blockquote,tbody tr";
  const els = Array.from(root.querySelectorAll<HTMLElement>(sel));
  return els.filter((el) => {
    if (el.tagName === "LI" && el.querySelector(":scope > p")) return false; // ses <p> seront lus
    if (el.tagName === "BLOCKQUOTE" && el.querySelector("p")) return false;
    if (el.tagName === "P" && el.closest("td,th")) return false;
    return (el.textContent ?? "").trim().length > 0;
  });
}

export function blockText(el: HTMLElement) {
  if (el.tagName === "TR") {
    const table = el.closest("table");
    const heads = Array.from(table?.querySelectorAll("thead th") ?? []).map((h) => (h.textContent ?? "").trim());
    const cells = Array.from(el.children).map((c) => (c.textContent ?? "").trim());
    const parts = cells
      .map((c, i) => {
        if (!c) return "";
        const h = heads[i];
        // Première colonne : on la lit telle quelle (c'est l'intitulé de la ligne)
        if (i === 0 || !h) return c;
        return `${h} : ${c}`;
      })
      .filter(Boolean);
    return parts.join(" ; ") + ".";
  }
  if (el.tagName === "LI") {
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("ul,ol").forEach((n) => n.remove());
    return clone.textContent ?? "";
  }
  return el.textContent ?? "";
}

export function plainFromMarkdown(md: string) {
  return md
    .replace(/^:::.*$/gm, "")
    .replace(/[#*_>`|]/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
