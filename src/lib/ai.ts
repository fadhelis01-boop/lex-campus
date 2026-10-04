import Anthropic from "@anthropic-ai/sdk";
import type {
  BetaMessageParam,
  BetaMessage,
  BetaToolUnion,
  BetaMessageStreamParams,
  BetaRawMessageStreamEvent,
} from "@anthropic-ai/sdk/resources/beta/messages/messages";
import { getState } from "./store";

// ---------------------------------------------------------------------
// Assistant juridique : appels à l'API Claude directement depuis
// l'appareil, avec la clé personnelle de l'utilisateur (stockée
// localement, jamais envoyée ailleurs qu'à api.anthropic.com).
// La recherche web est restreinte aux sources officielles (+ doctrine
// en accès libre si l'option est activée) pour des réponses sourcées.
// ---------------------------------------------------------------------

export const MODELS = [
  { id: "claude-opus-5-5", label: "Claude Opus 5.5 — rigueur maximale (recommandé)", inPrice: 4, outPrice: 20 },
  { id: "claude-sonnet-5-5", label: "Claude Sonnet 5.5 — plus rapide, environ 2 fois moins cher", inPrice: 2, outPrice: 10 },
  { id: "claude-haiku-4-5", label: "Claude Haiku 4.5 — économique, moins approfondi", inPrice: 1, outPrice: 5 },
];

export const OFFICIAL_DOMAINS = [
  "legifrance.gouv.fr",
  "courdecassation.fr",
  "conseil-etat.fr",
  "conseil-constitutionnel.fr",
  "eur-lex.europa.eu",
  "curia.europa.eu",
  "hudoc.echr.coe.int",
  "autoritedelaconcurrence.fr",
  "amf-france.org",
  "acpr.banque-france.fr",
  "banque-france.fr",
  "economie.gouv.fr",
  "entreprendre.service-public.fr",
  "service-public.fr",
  "bofip.impots.gouv.fr",
  "impots.gouv.fr",
  "justice.gouv.fr",
  "travail-emploi.gouv.fr",
  "cnil.fr",
  "inpi.fr",
  "vie-publique.fr",
  "assemblee-nationale.fr",
  "senat.fr",
  "cour-appel.justice.fr",
  "europa.eu",
  "anc.gouv.fr",
  "cncc.fr",
  "experts-comptables.fr",
];

export const DOCTRINE_DOMAINS = [
  "dalloz-actualite.fr",
  "actu-juridique.fr",
  "leclubdesjuristes.com",
  "lemondedudroit.fr",
  "village-justice.com",
  "lexbase.fr",
  "editions-legislatives.fr",
  "efl.fr",
  "lexisnexis.fr",
];

export class AiError extends Error {}

function client() {
  const key = getState().settings.apiKey.trim();
  if (!key) throw new AiError("Aucune clé d'API n'est configurée. Ouvrez Réglages → Assistant IA.");
  return new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true, maxRetries: 2 });
}

export function aiConfigured() {
  return !!getState().settings.apiKey.trim();
}

const todayLong = () =>
  new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export const JURIST_SYSTEM = `Tu es un professeur de droit privé et de droit des affaires français : plus de vingt ans d'enseignement à l'université (master 2, préparation au CRFPA) et une solide pratique du conseil aux entreprises. Ton interlocuteur est titulaire d'un master 2 de droit privé / droit des affaires obtenu il y a une vingtaine d'années ; il se remet à niveau et veut maîtriser le droit positif actuel.

Tu maîtrises aussi la comptabilité (plan comptable général, normes de l'ANC, IFRS pour les groupes cotés), l'analyse financière et la fiscalité appliquée, avec la rigueur d'un expert-comptable senior : pour ces questions, cite le règlement ANC, l'article du PCG, l'article du CGI ou le BOFiP, montre les écritures (comptes, débit, crédit) et les calculs pas à pas.

Exigences de fond :
- Raisonne en droit français positif, à la date du jour. Utilise la numérotation actuelle des textes (après les réformes : contrats 2016, sûretés 2021, procédures collectives 2021, etc.) et, si c'est utile pour un juriste formé avant 2016, rappelle l'ancienne numérotation (« art. 1240, ex-1382 »).
- Pour la jurisprudence, indique la juridiction, la formation, la date et, si tu l'as vérifié, le numéro de pourvoi ou de requête. N'invente jamais un numéro, une date ou une citation : si tu n'as pas pu vérifier une référence, donne ce dont tu es sûr et écris « (référence à vérifier) ».
- Vérifie par la recherche sur les sources officielles l'état le plus récent du droit dès qu'un point peut avoir évolué (réforme, revirement, nouvel arrêt publié, texte européen). Signale toute évolution récente.
- Distingue ce qui est certain, ce qui est discuté en doctrine et ce qui n'est pas tranché. Mentionne les distinctions et les pièges classiques.

Forme :
- Français clair, précis, sans jargon inutile ; pédagogie du simple au complexe.
- Structure en Markdown, adaptée à la question : **En bref** (3 à 5 lignes) ; **Fondements textuels** ; **Jurisprudence** ; **Analyse et nuances** ; **Ce qui a changé** (si le droit a évolué depuis les années 2000) ; **En pratique** ; éventuellement **Pour aller plus loin**.
- Pour une question simple, une réponse courte et exacte vaut mieux qu'un exposé.
- Si la question porte sur une situation personnelle réelle, rappelle en une phrase que la réponse est pédagogique et ne remplace pas la consultation d'un avocat.`;

export interface AiResult {
  text: string;
  sources: { url: string; title: string }[];
  cost: number;
  stop: string;
}

export interface RunOptions {
  system: string;
  messages: BetaMessageParam[];
  search?: boolean;
  maxSearches?: number;
  effort?: "low" | "medium" | "high" | "xhigh";
  maxTokens?: number;
  onText?: (fullText: string) => void;
  onStatus?: (s: string) => void;
  signal?: AbortSignal;
  jsonSchema?: Record<string, unknown>;
}

function priceOf(model: string) {
  return MODELS.find((m) => m.id === model) ?? MODELS[0];
}

function costOf(model: string, msg: BetaMessage): number {
  const p = priceOf(model);
  const u = msg.usage;
  const input =
    (u.input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0) * 1.25 + (u.cache_read_input_tokens ?? 0) * 0.1;
  const searches = u.server_tool_use?.web_search_requests ?? 0;
  return (input * p.inPrice + (u.output_tokens ?? 0) * p.outPrice) / 1_000_000 + searches * 0.01;
}

export async function runClaude(o: RunOptions): Promise<AiResult> {
  const c = client();
  const s = getState().settings;
  const model = s.model || MODELS[0].id;
  const isHaiku = model.startsWith("claude-haiku");
  const domains = [...OFFICIAL_DOMAINS, ...(s.doctrine ? DOCTRINE_DOMAINS : [])];

  const tools: BetaToolUnion[] = [];
  if (o.search) {
    tools.push(
      isHaiku
        ? { type: "web_search_20250305", name: "web_search", max_uses: o.maxSearches ?? 6, allowed_domains: domains }
        : {
            type: "web_search_20260209",
            name: "web_search",
            max_uses: o.maxSearches ?? 8,
            allowed_domains: domains,
            user_location: { type: "approximate", country: "FR", timezone: "Europe/Paris" },
          },
    );
  }

  const system = `${o.system}\n\nNous sommes le ${todayLong()}.`;
  const messages = [...o.messages];
  let text = "";
  let cost = 0;
  const sources: { url: string; title: string }[] = [];
  const index = new Map<string, number>();
  const consulted = new Map<string, string>();
  const addSource = (url: string, title: string | null) => {
    if (!url) return 0;
    if (!index.has(url)) {
      sources.push({ url, title: title || url });
      index.set(url, sources.length);
    }
    return index.get(url)!;
  };

  let stop = "";
  for (let turn = 0; turn < 4; turn++) {
    const format = o.jsonSchema ? { type: "json_schema" as const, schema: o.jsonSchema } : undefined;
    const params: BetaMessageStreamParams = {
      model,
      max_tokens: o.maxTokens ?? 16000,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages,
      ...(tools.length ? { tools } : {}),
      // Haiku 4.5 : pas de réflexion adaptative ni de repli serveur.
      ...(isHaiku
        ? format
          ? { output_config: { format } }
          : {}
        : {
            thinking: { type: "adaptive" },
            output_config: { effort: o.effort ?? "medium", ...(format ? { format } : {}) },
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
          }),
    };

    let final: BetaMessage;
    try {
      const stream = c.beta.messages.stream(params, { signal: o.signal });
      const prefix = text;
      let live = "";
      stream.on("text", (delta: string) => {
        live += delta;
        o.onText?.(prefix + live);
      });
      stream.on("streamEvent", (ev: BetaRawMessageStreamEvent) => {
        if (ev.type !== "content_block_start") return;
        if (ev.content_block.type === "server_tool_use") o.onStatus?.("Recherche dans les sources officielles…");
        if (ev.content_block.type === "text") o.onStatus?.("Rédaction…");
      });
      final = await stream.finalMessage();
    } catch (e) {
      throw translateError(e);
    }
    cost += costOf(model, final);
    stop = final.stop_reason ?? "";

    // Texte final annoté avec les renvois aux sources [n]
    let annotated = "";
    for (const b of final.content) {
      if (b.type === "text") {
        annotated += b.text;
        const marks = new Set<number>();
        for (const ci of b.citations ?? []) {
          if (ci.type === "web_search_result_location") marks.add(addSource(ci.url, ci.title));
        }
        if (marks.size) annotated += [...marks].filter(Boolean).map((n) => `[${n}]`).join("");
      } else if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
        // Les résultats consultés sont listés à la fin s'ils ne sont pas cités.
        for (const r of b.content) if (r.type === "web_search_result") consulted.set(r.url, r.title);
      }
    }
    text += annotated;
    o.onText?.(text);

    if (stop === "pause_turn") {
      messages.push({ role: "assistant", content: final.content });
      continue;
    }
    break;
  }
  if (stop === "refusal") {
    throw new AiError("La requête a été déclinée par les filtres de sécurité du modèle. Reformulez la question.");
  }
  if (stop === "max_tokens") text += "\n\n*(Réponse tronquée : longueur maximale atteinte.)*";
  // Aucune citation explicite : on liste au moins les pages consultées.
  if (!sources.length) for (const [url, title] of consulted) sources.push({ url, title });
  return { text: text.trim(), sources, cost, stop };
}

function translateError(e: unknown): Error {
  if (e instanceof Anthropic.AuthenticationError) return new AiError("Clé d'API refusée. Vérifiez-la dans Réglages.");
  if (e instanceof Anthropic.PermissionDeniedError)
    return new AiError("Accès refusé par l'API (droits du compte ou du modèle choisi).");
  if (e instanceof Anthropic.RateLimitError)
    return new AiError("Trop de requêtes ou crédit épuisé. Patientez une minute ou vérifiez votre solde sur console.anthropic.com.");
  if (e instanceof Anthropic.BadRequestError) return new AiError("Requête refusée par l'API : " + e.message);
  if (e instanceof Anthropic.APIConnectionError)
    return new AiError("Connexion impossible. L'assistant nécessite une connexion Internet.");
  if (e instanceof Anthropic.APIUserAbortError) return new AiError("Arrêté.");
  if (e instanceof Anthropic.APIError) return new AiError("Erreur de l'API : " + e.message);
  return e instanceof Error ? e : new Error(String(e));
}

// ---------------------------------------------------------------------
// Usages spécialisés
// ---------------------------------------------------------------------

export const LESSON_FORMAT = `Format de la leçon (Markdown) :
- Commence directement par une courte introduction (pas de titre de niveau 1).
- Titres de sections en « ## », sous-sections en « ### ».
- Utilise ces blocs pédagogiques (une ligne d'ouverture, le contenu, puis une ligne « ::: ») :
  :::article Art. 1104 C. civ.   (texte de loi : cite fidèlement ou résume clairement en le signalant)
  :::arret Cass. com., 22 oct. 1996, Chronopost, n° 93-18.632   (faits, question, solution, portée)
  :::reforme Ce qui a changé     (évolution depuis les années 2000 : ancien droit → droit actuel)
  :::retenir / :::astuce / :::attention / :::exemple / :::definition / :::debat
- Progression du simple au complexe, exemples concrets tirés de la vie des affaires.
- Termine par « ## Synthèse » (5 à 8 puces).
- Longueur : 1 500 à 2 500 mots.`;

export async function generateLesson(o: {
  packTitle: string;
  moduleTitle: string;
  lessonTitle: string;
  level: number;
  outline?: string[];
  objectives?: string[];
  onText?: (t: string) => void;
  onStatus?: (s: string) => void;
  signal?: AbortSignal;
}) {
  const levelLabel = ["", "fondamentaux", "approfondissement", "expert"][o.level] ?? "approfondissement";
  return runClaude({
    system: JURIST_SYSTEM + "\n\n" + LESSON_FORMAT,
    search: true,
    maxSearches: 10,
    effort: "high",
    maxTokens: 32000,
    onText: o.onText,
    onStatus: o.onStatus,
    signal: o.signal,
    messages: [
      {
        role: "user",
        content: `Rédige la leçon « ${o.lessonTitle} » (domaine : ${o.packTitle} ; module : ${o.moduleTitle} ; niveau : ${levelLabel}).
${o.objectives?.length ? "Objectifs : " + o.objectives.join(" ; ") + "\n" : ""}${o.outline?.length ? "Plan indicatif : " + o.outline.join(" ; ") + "\n" : ""}
Vérifie au préalable sur les sources officielles l'état actuel des textes et de la jurisprudence. Rédige ensuite uniquement la leçon, sans préambule ni commentaire sur tes recherches.`,
      },
    ],
  });
}

const QUIZ_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["quiz", "flashcards"],
  properties: {
    quiz: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "q", "choices", "answer", "explain"],
        properties: {
          type: { type: "string", enum: ["qcm"] },
          q: { type: "string" },
          choices: { type: "array", items: { type: "string" } },
          answer: { type: "integer" },
          explain: { type: "string" },
        },
      },
    },
    flashcards: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["q", "a"],
        properties: { q: { type: "string" }, a: { type: "string" } },
      },
    },
  },
};

export async function generateQuiz(lessonTitle: string, body: string) {
  const r = await runClaude({
    system:
      "Tu es professeur de droit français. Tu rédiges des QCM exigeants et sans ambiguïté (une seule bonne réponse, distracteurs plausibles) et des cartes de révision courtes, strictement fondés sur la leçon fournie.",
    effort: "low",
    maxTokens: 8000,
    jsonSchema: QUIZ_SCHEMA,
    messages: [
      {
        role: "user",
        content: `Leçon « ${lessonTitle} » :\n\n${body}\n\nProduis 8 QCM (4 choix, « answer » = index de la bonne réponse à partir de 0, explication citant le texte ou l'arrêt) et 8 cartes de révision.`,
      },
    ],
  });
  const json = JSON.parse(r.text.replace(/\[\d+\]/g, ""));
  return json as { quiz: { type: "qcm"; q: string; choices: string[]; answer: number; explain: string }[]; flashcards: { q: string; a: string }[] };
}

export async function gradeExercise(o: {
  type: string;
  title: string;
  statement: string;
  documents?: string[];
  rubric?: string[];
  model?: string;
  answer: string;
  onText?: (t: string) => void;
  signal?: AbortSignal;
}) {
  return runClaude({
    system: `Tu es un correcteur expérimenté (master 2, CRFPA, ENM) en droit privé et droit des affaires. Tu corriges avec bienveillance mais sans complaisance, comme un professeur qui veut faire progresser un candidat de bon niveau.
Ta correction comprend, en Markdown :
1. **Note indicative /20** et appréciation générale (2-3 phrases).
2. **Grille** : chaque critère de la grille, avec ce qui est réussi / manquant.
3. **Erreurs de droit** : toute inexactitude juridique, avec la règle exacte (texte, arrêt).
4. **Méthode et forme** : plan, annonce, transitions, syllogisme, gestion du temps, style.
5. **Ce qu'il fallait faire** : plan ou raisonnement attendu, en bref.
6. **Trois conseils prioritaires** pour le prochain exercice.`,
    effort: "high",
    maxTokens: 16000,
    onText: o.onText,
    signal: o.signal,
    messages: [
      {
        role: "user",
        content: `Exercice (${o.type}) : ${o.title}

ÉNONCÉ :
${o.statement}
${o.documents?.length ? "\nDOCUMENTS DU DOSSIER : " + o.documents.join(" ; ") : ""}
${o.rubric?.length ? "\nGRILLE DE CORRECTION :\n- " + o.rubric.join("\n- ") : ""}
${o.model ? "\nÉLÉMENTS DE CORRIGÉ (référence pour le correcteur) :\n" + o.model : ""}

COPIE DU CANDIDAT :
${o.answer}`,
      },
    ],
  });
}

export async function runVeille(o: {
  domain: string;
  since: string;
  focus?: string;
  onText?: (t: string) => void;
  onStatus?: (s: string) => void;
  signal?: AbortSignal;
}) {
  return runClaude({
    system: JURIST_SYSTEM,
    search: true,
    maxSearches: 14,
    effort: "high",
    maxTokens: 24000,
    onText: o.onText,
    onStatus: o.onStatus,
    signal: o.signal,
    messages: [
      {
        role: "user",
        content: `Fais une veille juridique en « ${o.domain} » depuis le ${o.since}${o.focus ? ` (accent particulier : ${o.focus})` : ""}.
Recense, en vérifiant chaque référence sur les sources officielles : lois, ordonnances et décrets importants ; arrêts publiés de la Cour de cassation (et notamment ceux des formations solennelles), décisions du Conseil d'État et du Conseil constitutionnel ; arrêts de la CJUE ; textes européens ; décisions marquantes des autorités (Autorité de la concurrence, AMF, CNIL…) ; réformes annoncées ou en discussion.
Pour chaque élément : **date et référence complète**, l'apport en 2 à 4 lignes, l'impact pratique, et s'il s'agit d'un revirement ou d'une confirmation.
Classe par ordre d'importance, puis termine par « ## À retenir » (5 puces) et « ## À surveiller » (réformes en cours).
Si une période ne comporte rien de notable sur un sous-domaine, dis-le plutôt que de combler.`,
      },
    ],
  });
}

export async function checkLessonCurrency(o: {
  title: string;
  updatedAt: string;
  body: string;
  onText?: (t: string) => void;
  onStatus?: (s: string) => void;
  signal?: AbortSignal;
}) {
  return runClaude({
    system: JURIST_SYSTEM,
    search: true,
    maxSearches: 10,
    effort: "high",
    maxTokens: 16000,
    onText: o.onText,
    onStatus: o.onStatus,
    signal: o.signal,
    messages: [
      {
        role: "user",
        content: `Voici une leçon intitulée « ${o.title} », à jour au ${o.updatedAt}. Vérifie sur les sources officielles qu'elle reflète toujours le droit positif aujourd'hui.
Rends un rapport bref en Markdown :
## Verdict (à jour / à compléter / à corriger)
## Points à corriger (texte modifié, renuméroté ou abrogé ; revirement ; montant ou seuil changé) — avec la référence exacte
## Nouveautés à ajouter (arrêts publiés, textes récents)
## Points confirmés
Ne signale que ce que tu as vérifié.

LEÇON :
${o.body}`,
      },
    ],
  });
}

const SYLLABUS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "description", "icon", "modules"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    icon: { type: "string" },
    modules: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "level", "summary", "lessons"],
        properties: {
          title: { type: "string" },
          level: { type: "integer", enum: [1, 2, 3] },
          summary: { type: "string" },
          lessons: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: ["title", "objectives", "outline"],
              properties: {
                title: { type: "string" },
                objectives: { type: "array", items: { type: "string" } },
                outline: { type: "array", items: { type: "string" } },
              },
            },
          },
        },
      },
    },
  },
};

export async function generateSyllabus(o: { domain: string; details: string; onStatus?: (s: string) => void }) {
  o.onStatus?.("Conception du programme…");
  const r = await runClaude({
    system:
      "Tu es un professeur de droit français chargé de concevoir un programme de remise à niveau complet, du simple au complexe, pour un juriste titulaire d'un master 2 de droit privé obtenu il y a vingt ans.",
    effort: "high",
    maxTokens: 16000,
    jsonSchema: SYLLABUS_SCHEMA,
    messages: [
      {
        role: "user",
        content: `Conçois le programme du domaine « ${o.domain} ». ${o.details}
Exigences : 3 niveaux (1 = fondamentaux, 2 = approfondissement, 3 = expert), 6 à 10 modules au total, 3 à 6 leçons par module, couverture exhaustive du domaine en droit français positif (y compris les sources européennes pertinentes). « icon » : un seul emoji. Pour chaque leçon : 2 à 4 objectifs, plan en 3 à 6 points.`,
      },
    ],
  });
  return JSON.parse(r.text.replace(/\[\d+\]/g, ""));
}
