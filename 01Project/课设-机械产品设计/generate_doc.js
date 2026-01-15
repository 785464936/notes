const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak } = require("docx");
const fs = require("fs");

// 创建文档内容数组
const children = [];

// 添加封面页
children.push(
    new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "[校徽]", size: 24 })],
    }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [new TextRun({ text: "产品制造综合实践", font: "黑体", size: 44, bold: true })],
    }),
    ...Array(3).fill(new Paragraph({ text: "" })),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 200 },
        children: [new TextRun({ text: "设计题目：CA6140车床后托架工艺规程及夹具设计", font: "黑体", size: 44, bold: true })],
    }),
    ...Array(5).fill(new Paragraph({ text: "" })),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: "姓　　名：时宝鑫", font: "仿宋", size: 32 })],
    }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: "学　　号：", font: "Times New Roman", size: 32 })],
    }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: "学　　院：机械工程学院", font: "仿宋", size: 32 })],
    }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: "专　　业：增材制造工程", font: "仿宋", size: 32 })],
    }),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: "指导教师：齐习娟", font: "仿宋", size: 32 })],
    }),
    ...Array(3).fill(new Paragraph({ text: "" })),
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: "二〇二六年一月", font: "宋体", size: 32 })],
    }),
    new Paragraph({ children: [new PageBreak()] })
);

// 添加目录页
children.push(
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 540, after: 270 },
        children: [new TextRun({ text: "目　　录", font: "黑体", size: 30, bold: true })],
    }),
    new Paragraph({
        indent: { firstLine: 0 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "1　引言", font: "黑体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　1.1　设计背景与意义", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 0 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "2　零件的工艺性分析", font: "黑体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　2.1　零件的作用及技术要求分析", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　2.2　审查零件结构工艺性分析", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　2.3　确定毛坯类型和形状", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 0 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "3　零件的加工工艺设计", font: "黑体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　3.1　定位基面的选择", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　3.2　工序合理组成", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　3.3　加工工艺路线", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　3.4　工艺方案的比较与分析", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　3.5　刀具的选择", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　3.6　切削用量的计算", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 0 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "4　粗镗孔夹具设计", font: "黑体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　4.1　设计要求", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　4.2　夹具的基准选择与计算", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "　　4.3　定位误差的分析", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 0 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "结论", font: "黑体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 0 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "参考文献", font: "黑体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 0 },
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "致谢", font: "黑体", size: 24 })],
    }),
    new Paragraph({ children: [new PageBreak()] })
);

// 添加一级标题
children.push(
    new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { before: 540, after: 270 },
        children: [new TextRun({ text: "1　引言", font: "黑体", size: 30, bold: true })],
    })
);

// 添加正文段落
children.push(
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "机械制造工艺学课程设计是我们在学完大学的大部分课程后进行的，是我们对大学三年的学习的一次深入的综合性的总考核，也是一次理论联系实际的训练，这次设计使我们能综合运用机械制造工艺学中的基本理论，并结合实习中学到的实践知识，独立地分析和解决工艺问题，初步具备了设计一个中等复杂程度零件（CA6140车床后托架）的工艺规程的能力和运用夹具设计的基本原理和方法，拟订夹具设计方案，完成夹具结构设计的能力，也是熟悉和运用有关手册、图表等技术资料及编写技术文件等基本技能的一次实践机会。", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "因此，它在我们大学生活中占有重要地位。就我个人而言，我也希望通过这次设计对自己未来将从事的工作进行一次适应性心理，从中锻炼自己分析问题，解决问题的能力，对未来的工作发展打下一个良好的基础。", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "本次课程设计，主要围绕小组任务——CA6140车床后托架设计进行任务的分配，涉及到毛坯件成型，毛坯件铸造方法及基本雏形的拟定，加工余量的确定，工序分配，夹具设计，数据计算等一系列系统的设计思路。全组共7人，分工明确，合作配合默契。", font: "宋体", size: 24 })],
    }),
    new Paragraph({
        indent: { firstLine: 560 },
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "在设计过程中，对于一些元件的选取，工艺方案的拟定，工序流程的安排，小组讨论中都存在一些显著的问题，基础知识不扎实，讨论效果不理想，思路不清晰，等一些因素导致设计进展不理想，但在指导老师的指导，纠错和引领下，相对满意的完成了本次课程设计的训练任务。由于能力所限，设计尚有许多不足之处，恳请老师们给予指教。望在细节处多批评，万分感谢。", font: "宋体", size: 24 })],
    })
);

// 创建文档
const doc = new Document({
    sections: [{
        properties: {
            page: {
                margin: { top: 720, bottom: 720, left: 900, right: 900 },
            },
        },
        children: children,
    }],
});

// 保存文档
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("D:\\NOTES\\01Project\\课设-机械产品设计\\课程设计说明书_格式化.docx", buffer);
    console.log("文档已保存至: D:\\NOTES\\01Project\\课设-机械产品设计\\课程设计说明书_格式化.docx");
});