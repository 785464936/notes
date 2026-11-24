---
created: <% tp.date.now("YYYY-MM-DD") %>
type: Template
tags:
  - Journal/yearly
period: "yearly"
status: stable
---
## TODO

```tasks
not done
happens in or before {{date:gggg}}
```

## DONE

```tasks
done
happens in {{date:gggg}}
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