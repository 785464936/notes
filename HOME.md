```dataviewjs
// ==========================================
// 1. 配置中心
// ==========================================
const CONFIG = {
    githubUsername: "785464936",
    localContributionFile: "git_contributions.json",
    colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    thresholds: { level1: 2, level2: 5, level3: 10 },
    vaultStartTime: "2026-01-01T08:00:00.000+08:00",
    excludeFolder: '"misc/templates"',
    recentEditDays: 10,
    excludeFiles: ["HOME"]
};

// ==========================================
// 2. 工具函数
// ==========================================
const DateUtils = {
    format: (date) => date.toISOString().split('T')[0],
    getTodayStr: () => DateUtils.format(new Date()),
    getMonday: (date) => {
        const d = new Date(date);
        const day = d.getDay();
        d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
        return d;
    },
    generateRange: (start, end) => {
        const dates = [];
        const curr = new Date(start);
        const endDate = new Date(end);
        while (curr <= endDate) {
            dates.push(DateUtils.format(curr));
            curr.setDate(curr.getDate() + 1);
        }
        return dates;
    }
};

const ContributionUtils = {
    getLevel: (count) => {
        if (count === 0) return 0;
        if (count <= CONFIG.thresholds.level1) return 1;
        if (count <= CONFIG.thresholds.level2) return 2;
        if (count <= CONFIG.thresholds.level3) return 3;
        return 4;
    },
    getMessage: (count) => {
        const messages = ["🐟 今天摸鱼了~", "🌱 种下了一颗种子", "✨ 小试牛刀", "💪 渐入佳境", "🔥 火力全开", "🚀 卷王降临", "⚡ 肝帝附体", "🤯 这不是人", "👑 传说中的代码之神"];
        if (count === 0) return messages[0];
        if (count === 1) return messages[1];
        if (count === 2) return messages[2];
        if (count <= 4) return messages[3];
        if (count <= 6) return messages[4];
        if (count <= 10) return messages[5];
        if (count <= 15) return messages[6];
        if (count <= 20) return messages[7];
        return messages[8];
    }
};

// ==========================================
// 3. 样式注入
// ==========================================
const injectStyles = () => {
    if (document.getElementById("cg-styles")) return;
    const style = document.createElement("style");
    style.id = "cg-styles";
    style.textContent = `
        .contribution-container { font-family: system-ui, -apple-system, sans-serif; }
        .divider { height: 1px; background: var(--background-modifier-border); margin: 16px 0; }
        .vault-stats { text-align: center; }
        .contribution-grid.week-grid { display: flex; gap: 3px; }
        .contribution-grid.week-grid .day { width: 15px; height: 15px; border-radius: 2px; }
        .contribution-grid.week-grid .day.today { border: 2px solid var(--text-accent); box-sizing: border-box; }
        .contribution-graph-container { display: flex; justify-content: center; gap: 3px; align-items: flex-start; }
        .week-column { display: flex; flex-direction: column; gap: 3px; }
        .day-block { width: 15px; height: 15px; border-radius: 2px; cursor: default; }
        .day-block:hover { transform: scale(1.2); border: 1px solid rgba(0,0,0,0.2); z-index: 10; }
    `;
    document.head.appendChild(style);
};

// ==========================================
// 4. 核心渲染模块
// ==========================================
async function renderYearView(container) {
    const todayStr = DateUtils.getTodayStr();
    const startDate = DateUtils.getMonday(new Date(Date.now() - 364 * 86400000));

    let apiData = {};
    try {
        const resp = await (await fetch(`https://github-contributions-api.jogruber.de/v4/${CONFIG.githubUsername}`)).json();
        resp.contributions.forEach(d => { apiData[d.date] = d; });
    } catch (err) {
        container.appendChild(dv.el("div", "⚠️ 获取 GitHub 数据失败", { cls: "mod-warning" }));
        return;
    }

    const graphContainer = dv.el("div", "", { cls: "contribution-graph-container" });
    const allDates = DateUtils.generateRange(startDate, new Date());
    
    // 按周分块处理
    for (let i = 0; i < allDates.length; i += 7) {
        const weekChunk = allDates.slice(i, i + 7);
        const col = dv.el("div", "", { cls: "week-column" });
        
        for (const dateStr of weekChunk) {
            if (dateStr > todayStr) {
                col.appendChild(dv.el("div", "", { cls: "day-block", attr: { style: "background-color: transparent;" } }));
                continue;
            }
            const data = apiData[dateStr] || { count: 0, level: 0 };
            col.appendChild(dv.el("div", "", { 
                cls: "day-block",
                attr: { 
                    title: `${dateStr} - ${ContributionUtils.getMessage(data.count)} (${data.count} commits)`,
                    style: `background-color: ${CONFIG.colors[data.level ?? 0]};` 
                }
            }));
        }
        graphContainer.appendChild(col);
    }
    container.appendChild(graphContainer);
}
function renderVaultStats(container) {
    const allFiles = dv.pages(`!${CONFIG.excludeFolder}`).file;
    const daysUsed = Math.floor((Date.now() - new Date(CONFIG.vaultStartTime).getTime()) / 86400000);
    const statsText = `您已使用 Obsidian ${daysUsed} 天，共创建 ${allFiles.length} 篇笔记，${allFiles.etags.distinct().length} 个标签`;
    dv.paragraph (`<div style="text-align: center;">${statsText}</div>`)
}

function renderRecentEdits() {
    dv.header(2, "最近编辑");
    const nDaysAgo = dv.date("today") - dv.duration(`${CONFIG.recentEditDays} days`);
    const recentFiles = dv.pages()
        .where(p => p.file.mtime >= nDaysAgo && !CONFIG.excludeFiles.includes(p.file.name))
        .sort(p => p.file.mtime, "desc")
        .limit(10);
    
    dv.table([], recentFiles.map(p => [p.file.link, p.file.mtime]));
}

// ==========================================
// 5. 执行入口
// ==========================================
(async () => {
    injectStyles();
    dv.container.addClass('contribution-container');
    
//    await renderWeekView(dv.container);
    await renderYearView(dv.container);
    renderVaultStats(dv.container);
    renderRecentEdits(); // dv.table 会自动追加到 dv.container 末尾
})();
```
