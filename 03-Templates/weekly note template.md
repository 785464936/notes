---
cssclasses:
  - table-no-header
type: Template
tags:
  - Journal/weekly
created: <% tp.date.now("YYYY-MM-DD") %>
week: "[[{{date:gggg}}-W{{date:ww}}]]"
status: stable
---

## TODO

```tasks
not done
happens in or before {{date:gggg}}-W{{date:ww}}
```

## DONE 

```tasks
done
happens in {{date:gggg}}-W{{date:ww}}
sort by done reverse
hide scheduled date
```