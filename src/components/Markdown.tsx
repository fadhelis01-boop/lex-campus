import { forwardRef, useMemo } from "react";
import { renderMarkdown } from "../lib/markdown";

const Markdown = forwardRef<HTMLDivElement, { text: string; className?: string }>(({ text, className }, ref) => {
  const html = useMemo(() => renderMarkdown(text), [text]);
  return <div ref={ref} className={"prose " + (className ?? "")} dangerouslySetInnerHTML={{ __html: html }} />;
});

export default Markdown;
