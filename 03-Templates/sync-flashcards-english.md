---
author: T!gger.
created: 2026-08-19
project: "[[考研]]"
type: Template
tags:
  - 学习
  - 英语
  - flashcards
status: stable
---
<%*
setTimeout(() => {
    app.fileManager.processFrontMatter(tp.config.target_file, (frontmatter) => {
        frontmatter["type"] = "Flashcard";
    });
}, 200);

const NL = "\n";

async function readText(path) {
  try {
    return await app.vault.adapter.read(path);
  } catch (e) {
    return "";
  }
}

async function writeText(path, content) {
  const f = app.vault.getAbstractFileByPath(path);
  if (f) {
    await app.vault.modify(f, content);
  } else {
    await app.vault.create(path, content);
  }
}

function extractSR(oldText) {
  const map = new Map();
  const lines = oldText.split(NL);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*<!--SR:.*?-->\s*$/);
    if (!m) continue;
    for (let j = i - 1; j >= 0; j--) {
      const e = lines[j].match(/^!\[\[(.+?)#(.+?)\]\]$/);
      if (e) {
        const title = e[2];
        if (!map.has(title)) map.set(title, []);
        map.get(title).push(lines[i]);
        break;
      }
    }
  }
  return map;
}

async function build(src, out, note, fm) {
  const oldText = await readText(out);
  const srMap = extractSR(oldText);
  const lines = (await readText(src)).split(NL);
  const outLines = [];
  let pending = null;
  let hasContent = false;
  let count = 0;

  const flush = () => {
    if (pending !== null && hasContent) {
      outLines.push(pending);
      outLines.push("?");
      outLines.push("![[" + note + "#" + pending + "]]");
      const markers = srMap.get(pending);
      if (markers && markers.length) outLines.push(markers.shift());
      outLines.push("");
      count++;
    }
    pending = null;
    hasContent = false;
  };

  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (m) {
      flush();
      pending = m[2].trim();
      outLines.push(m[1] + " " + pending);
      outLines.push("");
    } else if (line.trim() !== "" && pending !== null) {
      hasContent = true;
    }
  }
  flush();

  const content = fm + NL + outLines.join(NL).replace(/\s+$/, "") + NL;
  if (content === oldText) return count;
  await writeText(out, content);
  return count;
}

const wfm = [
  "---",
  "author: T!gger.",
  "created: 2026-08-19",
  'project: "[[考研]]"',
  "type: Flashcard",
  "tags:",
  "  - 学习",
  "  - 考研",
  "  - 英语",
  "  - flashcards/words",
  "status: stable",
  "---",
].join(NL);

const pfm = [
  "---",
  "author: T!gger.",
  "created: 2026-08-19",
  'project: "[[考研]]"',
  "type: Flashcard",
  "tags:",
  "  - 学习",
  "  - 英语",
  "  - flashcards/phrases",
  "status: stable",
  "---",
].join(NL);

try {
  const w = await build("english-words.md", "english-words-flashcards.md", "english-words", wfm);
  const p = await build("english-phrases.md", "english-phrases-flashcards.md", "english-phrases", pfm);
  new Notice("sync done: words " + w + ", phrases " + p + "（SR 标记已合并）");
} catch (err) {
  new Notice("sync failed: " + (err && err.message ? err.message : err));
}
%>