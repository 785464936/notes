```dataviewjs
// 从 git 历史获取贡献数据
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

// 获取本周的开始日期（周一）
const dayOfWeek = today.getDay();
const monday = new Date(today);
monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

// 生成本周日期数组
const weekDates = [];
for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(new Date(date));
}

// 根据贡献次数确定级别
function getContributionLevel(count) {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
}

// 生成周视图 HTML（横向显示，从左到右周一到周日，高亮今天）
async function generateWeekView() {
    // 从 git_contributions.json 文件加载数据
    const contributionsFile = app.vault.getAbstractFileByPath("git_contributions.json");
    let contributions = {};
    if (contributionsFile) {
        const fileContent = await app.vault.cachedRead(contributionsFile);
        contributions = JSON.parse(fileContent);
    }
    
    let html = `
    <div class="graph-view view-week">
        <div class="contribution-grid week-grid">
    `;
    
    // 获取今天的日期字符串
    const todayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    for (const date of weekDates) {
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const contributionCount = contributions[dateStr] || 0;
        const level = getContributionLevel(contributionCount);
        const title = `${dateStr}: ${contributionCount} 次`;
        const isToday = dateStr === todayStr;
        const todayClass = isToday ? ' today' : '';
        
        html += `<div class="day level-${level}${todayClass}" title="${title}"></div>`;
    }
    
    html += '</div></div>';
    return html;
}

// 渲染贡献图
(async () => {
    const container = dv.container;
    container.addClass('contribution-container');
    const weekView = await generateWeekView();
    container.innerHTML = weekView + '<div class="divider"></div>';
})();
```
```dataviewjs
// =========================
// GitHub 风格贡献热力图（最近365天，本周今天之后不显示）
// =========================
const username = "785464936"; // 替换为你的 GitHub 用户名

// 颜色等级映射（0-4）
const colors = ["#ebedf0","#9be9a8","#40c463","#30a14e","#216e39"];

// 获取日期范围
const today = new Date();
const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD

// 计算365天前的日期，并向前补齐到周一，确保第一列完整
const past365Days = new Date(today);
past365Days.setDate(today.getDate() - 364); // 最近365天，包括今天
const startDayOfWeek = past365Days.getDay(); // 0=周日
const daysToMonday = (startDayOfWeek + 6) % 7; // 距离周一的天数
const startDate = new Date(past365Days);
startDate.setDate(past365Days.getDate() - daysToMonday); // 向前补齐到周一

// 拉取贡献数据并生成完整日期序列
let contributionMap = {};
try {
    const url = `https://github-contributions-api.jogruber.de/v4/${username}`;
    const resp = await (await fetch(url)).json();
    contributionMap = {};
    for (const d of resp.contributions) {
        contributionMap[d.date] = d;
    }
} catch (err) {
    dv.paragraph("⚠️ 获取贡献数据失败，请检查用户名或网络。");
    console.error(err);
}

// 生成从 startDate 到 today 的完整日期序列
let contributions = [];
for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const data = contributionMap[dateStr];
    contributions.push({
        date: new Date(d),
        count: data ? data.count : 0,
        level: data ? data.level : 0
    });
}

// 按周分组，每列 7 天
let weeks = [];
let week = [];
for (let d of contributions) {
    week.push(d);
    if (week.length === 7) {
        weeks.push(week);
        week = [];
    }
}
if (week.length > 0) weeks.push(week);

// 创建图表容器并居中
let container = dv.el("div", "", {cls: "contribution-graph-container"});
container.style.display = "flex";
container.style.justifyContent = "center"; // 居中
container.style.gap = "3px"; // 方块间距
container.style.alignItems = "flex-start";

// 绘制每周列
for (let week of weeks) {
    let col = dv.el("div", "", {cls: "week-column"});
    col.style.display = "flex";
    col.style.flexDirection = "column";
    col.style.gap = "3px";

    for (let day of week) {
        // 本周今天之后不显示方块
        if (day.date !== null && day.date > today) continue;

        let square = dv.el("div", "", {cls:"day-block"});
        square.style.width = "15px";
        square.style.height = "15px";
        square.style.borderRadius = "2px";

        if (day.date === null) {
            square.style.backgroundColor = "transparent";
        } else {
            let lvl = day.level ?? 0;
            square.style.backgroundColor = colors[lvl];
            square.title = `${day.date.toISOString().split('T')[0]}这一天提交了 ${day.count} 次 真是太卷啦`;
        }

        col.appendChild(square);
    }

    container.appendChild(col);
}

// 渲染
dv.container.appendChild(container);

```
```dataviewjs
// 从 vault 中获取所有笔记的创建时间
const nofold = '!"misc/templates"';
const allFiles = dv.pages(nofold).file;
const noteStartTime = "2026-01-05T08:00:00.000+08:00"
// 显示统计信息
let ftMd = dv.pages (""). file.sort (t => t.mday)[0]
//let total = parseInt ([new Date () - ftMd.mtime] / (60*60*24*1000))
let total = parseInt ([new Date () - new Date(noteStartTime).getTime()] / (60*60*24*1000))
let totalDays = " 您已使用 Obsidian "+total+" 天，"
let totalMd = "共创建 "+allFiles. length+" 篇笔记"
let totalTag = allFiles.etags.distinct (). length+" 个标签"

dv.paragraph (`<div style="text-align: center;">${totalDays+totalMd+" "+totalTag+""}</div>`)
```
```dataview
LIST WHERE (file.mtime >= date(today) - dur(10 day) AND file.name != "HOME") sort file.mtime desc limit (5)
```
