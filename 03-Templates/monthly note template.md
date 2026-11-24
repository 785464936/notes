---
created: <% tp.date.now("YYYY-MM-DD") %>
type: Template
tags:
  - Journal/monthly
period: "[[{{date:gggg}}|monthly]]"
status: stable
---
## TODO

```tasks
not done
happens in or before {{date:gggg}}-{{date:MM}}
```

## DONE

```tasks
done
happens in {{date:gggg}}-{{date:MM}}
sort by done reverse
hide scheduled date
```
<%*
setTimeout(() => {
    app.fileManager.processFrontMatter(tp.config.target_file, (frontmatter) => {
        frontmatter["type"] = "Dashboard";
    });
}, 100);
%>