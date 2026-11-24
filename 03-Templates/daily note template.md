---
created: <% tp.date.now("YYYY-MM-DD") %>
type: Template
tags:
  - Journal/daily
period: "[[{{date:gggg}}-W{{date:ww}}|daily]]"
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