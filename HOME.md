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
```contributionGraph
title: ""
graphType: default
dateRangeValue: 1
dateRangeType: LATEST_YEAR
startOfWeek: 1
showCellRuleIndicators: true
titleStyle:
  textAlign: center
  fontSize: 16px
  fontWeight: normal
dataSource:
  type: PAGE
  value: ""
  dateField:
    type: FILE_MTIME
  countField:
    type: DEFAULT
    value: cdate
  filters: []
fillTheScreen: false
enableMainContainerShadow: true
cellStyle:
  minWidth: 16px
  minHeight: 16px
cellStyleRules:
  - id: default_b
    color: "#9be9a8"
    min: 1
    max: 2
  - id: default_c
    color: "#40c463"
    min: 2
    max: 5
  - id: default_d
    color: "#30a14e"
    min: 5
    max: 10
  - id: default_e
    color: "#216e39"
    min: 10
    max: 999
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

```dataviewjs
// GitHub 贡献图 - 直接嵌入SVG并应用自定义样式
const githubUsername = "785464936";
const container = dv.container;

fetch(`https://ghchart.rshah.org/${githubUsername}`)
    .then(response => response.text())
    .then(svgText => {
        // 创建容器并设置样式
        const graphContainer = document.createElement('div');
        graphContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px 0;
            max-width: 100%;
        `;
        
        // 添加标题
        const title = document.createElement('div');
        title.style.cssText = `
            font-size: 14px;
            margin-bottom: 16px;
            color: var(--text-normal);
        `;
        title.textContent = 'GitHub Contributions';
        graphContainer.appendChild(title);
        
        // 解析并嵌入SVG
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = svgDoc.querySelector('svg');
        
        if (svg) {
            // 设置SVG样式以匹配GitHub
            svg.style.cssText = `
                max-width: 100%;
                height: auto;
                border-radius: 6px;
            `;
            
            // 修改rect元素的样式以匹配我们的要求
            const rects = svg.querySelectorAll('rect');
            let totalContributions = 0;
            
            rects.forEach(rect => {
                const score = parseInt(rect.getAttribute('data-score'));
                totalContributions += score;
                
                // 应用GitHub颜色方案
                let fill;
                if (score === 0) {
                    fill = document.body.classList.contains('theme-dark') ? '#161b22' : '#ebedf0';
                } else if (score <= 2) {
                    fill = document.body.classList.contains('theme-dark') ? '#0e4429' : '#9be9a8';
                } else if (score <= 5) {
                    fill = document.body.classList.contains('theme-dark') ? '#006d32' : '#40c463';
                } else if (score <= 10) {
                    fill = document.body.classList.contains('theme-dark') ? '#26a641' : '#30a14e';
                } else {
                    fill = document.body.classList.contains('theme-dark') ? '#39d353' : '#216e39';
                }
                
                rect.setAttribute('fill', fill);
                rect.style.borderRadius = '2px';
                // 注意：SVG rect的width/height属性不能直接通过style修改
                // 需要修改属性本身，但ghchart的SVG已经固定了尺寸
            });
            
            graphContainer.appendChild(svg);
            
            // 添加底部信息
            const footer = document.createElement('div');
            footer.style.cssText = `
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-top: 8px;
                font-size: 12px;
                color: var(--text-muted);
            `;
            
            // 左侧：贡献统计
            const stats = document.createElement('div');
            stats.textContent = `${totalContributions} contributions in the last year`;
            footer.appendChild(stats);
            
            // 右侧：颜色图例
            const legend = document.createElement('div');
            legend.style.cssText = 'display: flex; align-items: center; gap: 4px;';
            
            const lessLabel = document.createElement('span');
            lessLabel.textContent = 'Less';
            lessLabel.style.cssText = 'font-size: 12px; color: var(--text-muted);';
            legend.appendChild(lessLabel);
            
            // 5种颜色方块
            const colors = [
                document.body.classList.contains('theme-dark') ? '#161b22' : '#ebedf0',
                document.body.classList.contains('theme-dark') ? '#0e4429' : '#9be9a8',
                document.body.classList.contains('theme-dark') ? '#006d32' : '#40c463',
                document.body.classList.contains('theme-dark') ? '#26a641' : '#30a14e',
                document.body.classList.contains('theme-dark') ? '#39d353' : '#216e39'
            ];
            
            colors.forEach(color => {
                const colorBox = document.createElement('div');
                colorBox.style.cssText = `
                    width: 16px;
                    height: 16px;
                    border-radius: 2px;
                    background-color: ${color};
                    margin: 0 2px;
                `;
                legend.appendChild(colorBox);
            });
            
            const moreLabel = document.createElement('span');
            moreLabel.textContent = 'More';
            moreLabel.style.cssText = 'font-size: 12px; color: var(--text-muted);';
            legend.appendChild(moreLabel);
            
            footer.appendChild(legend);
            graphContainer.appendChild(footer);
        }
        
        container.appendChild(graphContainer);
    })
    .catch(error => {
        console.error('Failed to load GitHub contribution chart:', error);
        container.innerHTML = `<div style="text-align: center; color: var(--text-error);">Failed to load contribution chart</div>`;
    });
```
