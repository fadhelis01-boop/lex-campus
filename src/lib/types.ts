// Format des « packs » de contenu. Un pack = un domaine du droit.
// Ajouter un domaine (droit public, droit de la santé…) = écrire un pack
// JSON conforme à ce format : aucune ligne de code à modifier.
// Documentation complète : docs/GUIDE-CONTENU.md

export type Level = 1 | 2 | 3;

export interface Pack {
  id: string;
  version: string; // ex. "2026.10.1" — sert aux mises à jour
  title: string;
  branch: string; // regroupement : "Droit des affaires", "Droit privé", "Méthodologie", "Droit public"…
  icon: string; // emoji
  color: string; // couleur d'accent du domaine
  description: string;
  updatedAt: string; // « à jour au » (AAAA-MM-JJ)
  order?: number;
  modules: Module[];
  decisions?: Decision[];
  glossary?: GlossaryEntry[];
  reforms?: Reform[];
  changelog?: { date: string; text: string }[];
  accounts?: Record<string, string>; // plan comptable (n° de compte -> intitulé)
  origin?: "officiel" | "importé" | "généré"; // renseigné par l'application
}

export interface Module {
  id: string;
  title: string;
  level: Level;
  summary: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  level?: Level;
  duration?: number; // minutes
  objectives?: string[];
  body?: string; // Markdown (blocs ::: possibles)
  src?: string; // ou chemin d'un fichier .md relatif au pack
  outline?: string[]; // plan : sert à la génération IA si pas de body
  keyRefs?: string[]; // textes essentiels
  quiz?: Question[];
  flashcards?: Flashcard[];
  exercises?: Exercise[];
  updatedAt?: string;
}

export interface Question {
  type: "qcm" | "vf";
  q: string;
  choices?: string[]; // qcm
  answer: number | boolean; // index (qcm) ou vrai/faux
  explain: string;
  level?: Level;
}

export interface Flashcard {
  q: string;
  a: string;
}

export interface ExerciseDoc {
  title: string;
  text: string; // Markdown
}

export interface Exercise {
  id: string;
  type: "cas-pratique" | "commentaire" | "note-synthese" | "fiche-arret" | "dissertation" | "redaction" | "ecritures" | "calcul";
  title: string;
  statement: string; // Markdown : énoncé
  documents?: ExerciseDoc[];
  timerMin?: number;
  rubric?: string[]; // grille de correction
  model: string; // Markdown : corrigé / éléments de réponse
  hints?: string[];
  steps?: FicheStep[]; // fiche d'arrêt guidée
  entries?: JournalEntry[]; // atelier d'écritures comptables
  questions?: CalcQuestion[]; // exercice chiffré corrigé automatiquement
}

export interface EntryLine {
  account: string; // n° de compte attendu (préfixe accepté : 6071 vaut 607)
  debit?: number;
  credit?: number;
}

export interface JournalEntry {
  label: string; // l'opération à enregistrer
  lines: EntryLine[];
  explain?: string;
}

export interface CalcQuestion {
  q: string;
  answer: number;
  tolerance?: number; // écart admis (défaut : 1)
  unit?: string;
  explain: string;
}

export interface FicheStep {
  label: string; // « Faits », « Procédure »…
  help: string;
  model: string;
}

export interface Decision {
  id: string;
  name: string; // « Chronopost »
  court: string; // « Cass. com. »
  date: string; // « 22 octobre 1996 »
  number?: string; // n° de pourvoi / requête
  topic: string;
  solution: string;
  scope: string; // portée
  status: "en vigueur" | "codifié" | "infléchi" | "abandonné";
  statusNote?: string;
}

export interface GlossaryEntry {
  term: string;
  def: string;
  latin?: boolean;
}

export interface Reform {
  date: string; // AAAA-MM-JJ
  title: string;
  summary: string;
  domain?: string;
}

export interface ManifestEntry {
  id: string;
  file: string;
  version: string;
  title: string;
}

export interface Manifest {
  version: string;
  updatedAt: string;
  packs: ManifestEntry[];
  changelog?: { date: string; text: string }[];
}

// ---------- État utilisateur ----------

export interface LessonProgress {
  status: "nouveau" | "en-cours" | "termine" | "acquis";
  block: number; // dernier bloc lu/écouté
  audioBlock?: number;
  quizBest?: number; // %
  lastOpened?: number;
  completedAt?: number;
}

export interface SrsCard {
  id: string;
  q: string;
  a: string;
  source: string; // « contrats » / « arrêts » / « perso »
  ease: number;
  interval: number; // jours
  due: number; // timestamp
  reps: number;
  lapses: number;
}

export interface Settings {
  apiKey: string;
  model: string;
  doctrine: boolean;
  ttsVoice: string;
  ttsRate: number;
  theme: "auto" | "clair" | "sombre";
  fontScale: number;
  dailyGoal: number; // minutes
  name: string;
}

export interface Profile {
  xp: number;
  streak: number;
  bestStreak: number;
  lastActiveDay: string; // AAAA-MM-JJ
  days: Record<string, number>; // jour -> minutes
  badges: string[];
  exercisesDone: number;
  cardsReviewed: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  sources?: { url: string; title: string }[];
  cost?: number;
  at: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  context?: string; // leçon d'origine
  updatedAt: number;
}

export interface SavedReport {
  id: string;
  kind: "veille" | "actualite" | "correction";
  title: string;
  text: string;
  sources?: { url: string; title: string }[];
  at: number;
}

// ---------- Bilan de connaissances et plan de formation ----------

export type Objective = "remise-a-niveau" | "pratique-affaires" | "examen" | "fiscal-comptable";

export interface LearnerProfile {
  objective: Objective;
  minutesPerWeek: number;
  priorities: string[]; // identifiants des domaines prioritaires
  domains: string[]; // domaines inclus dans le bilan
  deadline?: string; // AAAA-MM-JJ (examen, prise de poste…)
}

export interface DomainScore {
  packId: string;
  title: string;
  asked: number;
  correct: number;
  skipped: number;
  pct: number;
  modules: { moduleId: string; title: string; level: number; asked: number; correct: number; pct: number }[];
}

export interface Assessment {
  id: string;
  at: number;
  length: "express" | "complet";
  globalPct: number;
  scores: DomainScore[];
}

export interface PlanItem {
  packId: string;
  lessonId: string;
  title: string;
  packTitle: string;
  minutes: number;
  kind: "lecon" | "exercice" | "revision";
  exerciseId?: string;
}

export interface PlanWeek {
  index: number;
  start: string; // AAAA-MM-JJ (lundi)
  items: PlanItem[];
  minutes: number;
}

export interface TrainingPlan {
  createdAt: number;
  assessmentId: string;
  profile: LearnerProfile;
  domainOrder: { packId: string; title: string; pct: number; status: "maitrise" | "a-consolider" | "a-apprendre"; reason: string }[];
  skippedModules: { packId: string; moduleId: string; title: string; pct: number }[];
  weeks: PlanWeek[];
  endDate: string;
  warning?: string; // ex. échéance impossible à tenir au rythme choisi
  doneItems: string[]; // exercices et révisions cochés manuellement
  advice?: string; // commentaire de l'assistant IA (facultatif)
}
