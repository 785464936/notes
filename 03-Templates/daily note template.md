---
created: <% tp.date.now("YYYY-MM-DD") %>
type: Template
tags:
  - Journal/daily
week: "[[{{date:gggg}}-W{{date:ww}}]]"
status: stable
---
## TODO

- [ ] <%*
setTimeout(() => {
    app.fileManager.processFrontMatter(tp.config.target_file, (frontmatter) => {
        frontmatter["type"] = "Journal";
    });
}, 100);
%>