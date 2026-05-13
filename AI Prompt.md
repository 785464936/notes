---
author: T!gger.
project: AI
tags:
  - "#AI"
  - 工具
  - prompt
---
## 英语单词辨析

```markdown
§task brief:

diff in '{my input word}' and  other words with similar meaning

§input:

{my input word} pattern: 
{word I really want to ask}:{synonyms that I know(one or two, separated by '/'}

":{synonyms that I know(one or two, separated by '/'}" this part is optional.

§output:

your answer should include: 

- all words i send
- other potential synonyms

additional requirements:

- if ther is no optional part, just list all meanings and answer the way i asked to you before
- Amount of given words and potential synonyms should be no more than 5. The 5 words should have closest meaning. (5 as maximum, can also be 4/3/2, depending on the semantic similarity of the words,as close as possible)

§output format: 

**strictly follow my example, no any other words allowed.**

- expressions in official dictionarys like collins or cambridge
- chinese brief(only key difference)

output example:

### fragile a.
- easily broken or damaged
- weak and easy to hram
### vulerable a.
- easily harmed or hurt, either physically or emotionally
### xxx n.
- xxx

---

## key difference 
- **fragile** emphysis *xxx*
- **vulnerable** emphysis *xxx*
- xxx

---

## Chinese brief 
- fragile		“本身易碎易损”;
- vulnerable	“暴露于外界而易受攻击/伤害”;
- xxx.
```

## fig 2 md

```markdown
§task brief

你精通 markdown 语法，对于用户给出的图片，你要识别其中的内容(可能为一整页内容或某个具体章节)，并转化为md语法的文本

§input

input picture

§task detail

对于图片中的内容: 

- 对于章节标题
    - x.x.x 对应二级标题（##），以此类推
    - 代码块中的标题忽略数字序号，例如2.1.2 相关结论 -> ## 相关结论
- 非公式的正文中，应该使用**半角标点**
- 删去定义/定理等字眼，并尽可能不使用加粗的强调语法
- "充分必要条件"应转变为公式环境下的 $\Leftrightarrow$
- 除非另有提及，忽略图片中的例题
    - 如果有例题，全部放在 [!example] 的callout环境中
- 原文有序号的，非强顺序性内容，必须使用无序列表
- 如果有手写笔记，整理并放在引用块内，不需要单独标注是手写内容
- 如果一次发送了一章多节的内容(节数>3)，应该对内容进行精简
- 对于公式
    - 行内公式的公式部分使用行内公式语法，文字不要包括在公式块内
    - 行间公式无论公式或文字均在公式块内，且文字用\text{}包裹
    - 行间公式中，矩阵统一使用\bmatrix{}环境，行内公式与原文相同即可
    - 上文未提及的公式格式，应符合工科会议/论文中更广泛使用的语法规范

§output

- 最终输出的内容完全由 `markdown` 公式块包裹
- 保证给出的内容可以在 `obsidian` 中正确渲染
- 对于特殊环境中的特殊符号，应该注意转义或使用等效语法
    - 例如 表格中某行: | $|E_ij| = 0$ | $|E_{ij}(k)| = k$ | --> | $\|E_ij\| = 0$ (转义) | $\lvert E_{ij}(k) \rvert = k$ (等效)|
```
