import { useEffect, useRef, useState } from "react";
import { useStore, saveChat, deleteChat, uid, addCards, toast, awardBadge, addXp } from "../lib/store";
import { aiConfigured, runClaude, JURIST_SYSTEM } from "../lib/ai";
import AiOutput, { NeedKey, Sources, formatCost } from "../components/AiOutput";
import Markdown from "../components/Markdown";
import { go } from "../lib/router";
import type { Chat, ChatMessage } from "../lib/types";

const SUGGESTIONS = [
  "Quelles sont les conditions de l'imprévision de l'article 1195 du Code civil, et peut-on l'écarter dans un contrat d'affaires ?",
  "Résumez l'évolution de la jurisprudence Chronopost / Faurecia et sa codification à l'article 1170.",
  "Qu'a changé la réforme des sûretés de 2021 pour le cautionnement donné par un dirigeant ?",
  "Comment fonctionnent les classes de parties affectées en sauvegarde depuis 2021 ?",
  "La responsabilité du dirigeant de SAS envers les tiers : quand y a-t-il faute séparable ?",
  "Rupture brutale des relations commerciales établies : quel préavis, quel préjudice réparable ?",
];

export default function Assistant({ chatId }: { chatId?: string }) {
  const chats = useStore((s) => s.chats);
  const chat = chats.find((c) => c.id === chatId);
  const [input, setInput] = useState(() => {
    const v = sessionStorage.getItem("lc-prefill") ?? "";
    sessionStorage.removeItem("lc-prefill");
    return v;
  });
  const [deep, setDeep] = useState(false);
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const abort = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat?.messages.length, live]);

  if (!aiConfigured())
    return (
      <div className="page">
        <h1>Assistant juridique</h1>
        <NeedKey />
      </div>
    );

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const base: Chat = chat ?? { id: uid(), title: text.slice(0, 70), messages: [], updatedAt: Date.now() };
    const userMsg: ChatMessage = { role: "user", text, at: Date.now() };
    const withUser: Chat = { ...base, messages: [...base.messages, userMsg], updatedAt: Date.now() };
    saveChat(withUser);
    if (!chat) go("/assistant/" + withUser.id);
    setInput("");
    setBusy(true);
    setLive("");
    setError("");
    setStatus("");
    abort.current = new AbortController();
    try {
      const r = await runClaude({
        system: JURIST_SYSTEM + (withUser.context ? `\n\nContexte : ${withUser.context}` : ""),
        messages: withUser.messages.map((m) => ({ role: m.role, content: m.text })),
        search: true,
        maxSearches: deep ? 12 : 5,
        effort: deep ? "high" : "medium",
        maxTokens: deep ? 32000 : 16000,
        onText: setLive,
        onStatus: setStatus,
        signal: abort.current.signal,
      });
      saveChat({
        ...withUser,
        messages: [...withUser.messages, { role: "assistant", text: r.text, sources: r.sources, cost: r.cost, at: Date.now() }],
        updatedAt: Date.now(),
      });
      awardBadge("assistant");
      addXp(5);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      setLive("");
    }
  }

  function makeCard(q: string, a: string) {
    const brief = a.match(/\*\*En bref\*\*[\s:]*([\s\S]*?)(\n#{1,3} |\n\*\*[A-Z])/i)?.[1]?.trim() ?? a.slice(0, 600);
    addCards([{ id: "perso:" + uid(), q, a: brief.replace(/\[\d+\]/g, ""), source: "Assistant" }]);
    toast("Carte ajoutée à vos révisions");
  }

  return (
    <div className="page assistant">
      <div className="section-head">
        <h1>Assistant juridique</h1>
        {chat && (
          <a className="btn btn-small btn-ghost" href="#/assistant">
            + Nouvelle question
          </a>
        )}
      </div>

      {!chat && (
        <>
          <p className="muted">
            Posez une question de droit privé ou de droit des affaires. Les réponses s'appuient sur une recherche dans les
            sources officielles (Légifrance, Cour de cassation, Conseil d'État, EUR-Lex, CJUE, AMF, Autorité de la
            concurrence…) et citent leurs références. Vérifiez toujours les références essentielles avant de vous en
            servir dans un cadre professionnel.
          </p>
          <div className="suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="suggestion" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        </>
      )}

      {chat && (
        <div className="chat">
          {chat.context && <p className="small muted">📘 {chat.context}</p>}
          {chat.messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="msg msg-user">
                {m.text}
              </div>
            ) : (
              <div key={i} className="msg msg-ai">
                <Markdown text={m.text} />
                <Sources sources={m.sources} />
                <div className="msg-tools">
                  <button className="mini-link" onClick={() => makeCard(chat.messages[i - 1]?.text ?? "", m.text)}>
                    🧠 En faire une carte
                  </button>
                  <button
                    className="mini-link"
                    onClick={() => {
                      void navigator.clipboard?.writeText(m.text);
                      toast("Réponse copiée");
                    }}
                  >
                    📋 Copier
                  </button>
                  {m.cost !== undefined && <span className="muted small">{formatCost(m.cost)}</span>}
                </div>
              </div>
            ),
          )}
          {(busy || error) && (
            <div className="msg msg-ai">
              <AiOutput text={live} busy={busy} status={status} error={error} />
              {busy && (
                <button className="mini-link" onClick={() => abort.current?.abort()}>
                  Arrêter
                </button>
              )}
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) void send(input);
          }}
          placeholder={chat ? "Question complémentaire…" : "Votre question…"}
          rows={3}
          disabled={busy}
        />
        <div className="composer-row">
          <label className="switch">
            <input type="checkbox" checked={deep} onChange={(e) => setDeep(e.target.checked)} />
            <span>Analyse approfondie</span>
          </label>
          <span className="muted small">{deep ? "plus de recherches, ≈ 0,15–0,50 $" : "≈ 0,03–0,15 $"}</span>
          <button className="btn" disabled={busy || !input.trim()}>
            Envoyer
          </button>
        </div>
      </form>

      {!chat && chats.some((c) => c.messages.length) && (
        <section className="section">
          <h2>Historique</h2>
          <ul className="chat-list">
            {chats.filter((c) => c.messages.length).map((c) => (
              <li key={c.id}>
                <a href={`#/assistant/${c.id}`}>
                  {c.title}
                  <small className="muted"> · {new Date(c.updatedAt).toLocaleDateString("fr-FR")}</small>
                </a>
                <button className="mini-link" onClick={() => deleteChat(c.id)} aria-label="Supprimer">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
