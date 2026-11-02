// Escribe en README.md los últimos artículos del blog de graduadosocialred.es.
// Sin dependencias: solo Node 20 (fetch nativo).
import { readFileSync, writeFileSync } from "node:fs";

const FEED = "https://graduadosocialred.es/blog/feed.xml";
const MAX = 5;
const START = "<!-- BLOG-POST-LIST:START -->";
const END = "<!-- BLOG-POST-LIST:END -->";

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

const res = await fetch(FEED);
if (!res.ok) throw new Error(`Feed ${res.status}`);
const xml = await res.text();

const items = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/g)]
  .slice(0, MAX)
  .map(([item]) => ({ title: tag(item, "title"), url: tag(item, "link") }))
  .filter((i) => i.title && /^https:\/\/graduadosocialred\.es\//.test(i.url));

if (items.length === 0) throw new Error("El feed no tiene artículos válidos");

// Evitar que un título rompa el enlace de Markdown
const md = (s) => s.replace(/([\[\]])/g, "\\$1");
const list = items.map((i) => `- [${md(i.title)}](${i.url})`).join("\n");

const readme = readFileSync("README.md", "utf8");
const a = readme.indexOf(START);
const b = readme.indexOf(END);
if (a < 0 || b < a) throw new Error("No encuentro los marcadores en README.md");

const next = readme.slice(0, a + START.length) + "\n" + list + "\n" + readme.slice(b);
if (next !== readme) {
  writeFileSync("README.md", next);
  console.log(`README actualizado con ${items.length} artículos`);
} else {
  console.log("Sin cambios");
}
