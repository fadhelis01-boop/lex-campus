// Compile les sources de contenu (content-src/*.mjs, plus pratiques à
// rédiger grâce aux chaînes multilignes) en packs JSON servis par l'app :
//   public/content/packs/<id>/pack.json  +  public/content/manifest.json
// Les leçons longues sont des fichiers Markdown (champ « src »).
// Usage : npm run content
import { readdirSync, writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const SRC = "content-src";
const OUT = "public/content";
const files = readdirSync(SRC).filter((f) => f.endsWith(".mjs") && !f.startsWith("_"));
const manifest = {
  version: "",
  updatedAt: new Date().toISOString().slice(0, 10),
  packs: [],
  changelog: JSON.parse(readFileSync(path.join(SRC, "_changelog.json"), "utf8")),
};
const errors = [];

for (const f of files) {
  const pack = (await import(pathToFileURL(path.resolve(SRC, f)).href)).default;
  const dir = path.join(OUT, "packs", pack.id);
  mkdirSync(dir, { recursive: true });
  // Vérifications
  const ids = new Set();
  for (const m of pack.modules) {
    if (![1, 2, 3].includes(m.level)) errors.push(`${pack.id}/${m.id} : niveau invalide`);
    for (const l of m.lessons) {
      if (ids.has(l.id)) errors.push(`${pack.id} : id de leçon en double ${l.id}`);
      ids.add(l.id);
      if (l.src && !existsSync(path.join(OUT, l.src))) errors.push(`${pack.id}/${l.id} : fichier manquant ${l.src}`);
      for (const [i, q] of (l.quiz ?? []).entries()) {
        if (q.type === "qcm" && (!Array.isArray(q.choices) || typeof q.answer !== "number" || q.answer >= q.choices.length))
          errors.push(`${pack.id}/${l.id} q${i + 1} : réponse QCM invalide`);
        if (q.type === "vf" && typeof q.answer !== "boolean") errors.push(`${pack.id}/${l.id} q${i + 1} : réponse V/F invalide`);
        if (!q.explain) errors.push(`${pack.id}/${l.id} q${i + 1} : explication manquante`);
      }
    }
  }
  writeFileSync(path.join(dir, "pack.json"), JSON.stringify(pack, null, 1));
  manifest.packs.push({ id: pack.id, file: `packs/${pack.id}/pack.json`, version: pack.version, title: pack.title });
}
// Packs JSON déposés directement dans public/content/packs (sans source .mjs) :
// ils sont conservés dans le manifeste.
for (const d of readdirSync(path.join(OUT, "packs"))) {
  const f = path.join(OUT, "packs", d, "pack.json");
  if (!existsSync(f) || manifest.packs.some((p) => p.id === d)) continue;
  try {
    const pack = JSON.parse(readFileSync(f, "utf8"));
    if (!pack.id || !pack.title || !Array.isArray(pack.modules)) throw new Error("champs id/title/modules requis");
    manifest.packs.push({ id: pack.id, file: `packs/${d}/pack.json`, version: pack.version ?? "1.0.0", title: pack.title });
  } catch (e) {
    errors.push(`${f} : ${e.message}`);
  }
}
manifest.packs.sort((a, b) => a.id.localeCompare(b.id));
manifest.version = manifest.packs.map((p) => p.version).sort().at(-1) ?? "1.0.0";
writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 1));

const lessons = manifest.packs.length;
console.log(`${lessons} domaines compilés.`);
if (errors.length) {
  console.error("ERREURS :\n- " + errors.join("\n- "));
  process.exit(1);
}
