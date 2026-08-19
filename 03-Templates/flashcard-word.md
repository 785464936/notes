---
author: T!gger.
created: <% tp.date.now("YYYY-MM-DD") %>
project: "[[考研]]"
type: Template
tags:
  - 学习
  - 英语
  - english-word
status: stable
---
## <% tp.file.title %>
<%*
setTimeout(() => {
    app.fileManager.processFrontMatter(tp.config.target_file, (frontmatter) => {
        frontmatter["type"] = "Note";
    });
}, 100);
%>