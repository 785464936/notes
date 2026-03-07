```dataviewjs
// 使用真实笔记创建数据生成贡献图
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

// 从 vault 中获取所有笔记的创建时间
const nofold = '!"misc/templates"';
const allFiles = dv.pages(nofold).file;

// 统计每天的贡献数量
const contributions = {};
for (const file of allFiles) {
    const cday = file.cday;
    if (cday) {
        const date = new Date(cday.ts);
        const dateStr = date.toISOString().split('T')[0];
        contributions[dateStr] = (contributions[dateStr] || 0) + 1;
    }
}

// 获取本月的天数
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

// 获取本月第一天是星期几 (转换为周一为 0)
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

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

// 生成年视图 HTML（不显示月份标题和星期，只显示方块，高亮今天）
function generateYearView() {
    let html = `
    <div class="graph-view view-year">
        <div class="year-grid">
    `;
    
    // 获取今天的日期字符串
    const todayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    // 处理 1-6 月
    html += '<div class="year-half">';
    for (let month = 0; month < 6; month++) {
        const daysInCurrentMonth = new Date(currentYear, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, month, 1).getDay();
        const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        
        html += `<div class="month-block">`;
        
        // 收集所有日期数据
        const days = [];
        // 添加月初空单元格
        for (let i = 0; i < firstDayIndex; i++) {
            days.push({ empty: true });
        }
        // 添加本月的每一天
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const dateStr = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const contributionCount = contributions[dateStr] || 0;
            const level = getContributionLevel(contributionCount);
            const title = `${dateStr}: ${contributionCount} 次`;
            const isToday = dateStr === todayStr;
            days.push({ empty: false, level, title, day, isToday });
        }
        
        // 按周分组
        let weekIndex = 0;
        while (weekIndex < days.length) {
            html += '<div class="week-row">';
            for (let i = 0; i < 7 && weekIndex + i < days.length; i++) {
                const day = days[weekIndex + i];
                if (day.empty) {
                    html += '<div class="day empty"></div>';
                } else {
                    const todayClass = day.isToday ? ' today' : '';
                    html += `<div class="day level-${day.level}${todayClass}" title="${day.title}"></div>`;
                }
            }
            html += '</div>';
            weekIndex += 7;
        }
        
        html += '</div>';
    }
    html += '</div>';
    
    // 处理 7-12 月
    html += '<div class="year-half">';
    for (let month = 6; month < 12; month++) {
        const daysInCurrentMonth = new Date(currentYear, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, month, 1).getDay();
        const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        
        html += `<div class="month-block">`;
        
        // 收集所有日期数据
        const days = [];
        // 添加月初空单元格
        for (let i = 0; i < firstDayIndex; i++) {
            days.push({ empty: true });
        }
        // 添加本月的每一天
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const dateStr = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const contributionCount = contributions[dateStr] || 0;
            const level = getContributionLevel(contributionCount);
            const title = `${dateStr}: ${contributionCount} 次`;
            const isToday = dateStr === todayStr;
            days.push({ empty: false, level, title, day, isToday });
        }
        
        // 按周分组
        let weekIndex = 0;
        while (weekIndex < days.length) {
            html += '<div class="week-row">';
            for (let i = 0; i < 7 && weekIndex + i < days.length; i++) {
                const day = days[weekIndex + i];
                if (day.empty) {
                    html += '<div class="day empty"></div>';
                } else {
                    const todayClass = day.isToday ? ' today' : '';
                    html += `<div class="day level-${day.level}${todayClass}" title="${day.title}"></div>`;
                }
            }
            html += '</div>';
            weekIndex += 7;
        }
        
        html += '</div>';
    }
    html += '</div>';
    
    html += '</div></div>';
    return html;
}

// 生成周视图 HTML（横向显示，从左到右周一到周日，高亮今天）
function generateWeekView() {
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
const container = dv.container;
container.addClass('contribution-container');
const weekView = generateWeekView();
const yearView = generateYearView();
container.innerHTML = weekView + '<div class="divider"></div>' + yearView;

// 显示统计信息
let ftMd = dv.pages("").file.sort(t => t.cday)[0]
let total = parseInt([new Date() - ftMd.ctime] / (60*60*24*1000))
let totalDays = " 您已使用 Obsidian "+total+" 天，"
let totalMd = "共创建 "+allFiles.length+" 篇笔记"
let totalTag = allFiles.etags.distinct().length+" 个标签"

dv.paragraph(`<div style="text-align: center;">${totalDays+totalMd+" "+totalTag+""}</div>`)
```
```dataview
LIST WHERE file.mtime >= date(today) - dur(10 day) sort file.mtime desc limit (5)
```
