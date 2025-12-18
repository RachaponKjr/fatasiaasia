const fs = require('fs');
const path = require('path');

// Files to include (in order)
const files = [
    'FANTASIA_ASIA_MANUAL.md',
    'USER_GUIDE.md',
    'ADMIN_USER_GUIDE.md',
    'API_DEVELOPER_GUIDE.md',
    'DATABASE_SCHEMA.md',
    'DEPLOYMENT_RUNBOOK.md',
    'SECURITY_OPERATIONS_GUIDE.md'
];

const basePath = path.join(__dirname, '..');

// Read all markdown files
let allContent = '';
files.forEach((file, index) => {
    const filePath = path.join(basePath, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        allContent += `\n\n<!-- PAGE BREAK - SECTION ${index + 1}: ${file} -->\n<div class="page-break"></div>\n<div class="section-header"><h1>📄 ${file.replace('.md', '').replace(/_/g, ' ')}</h1></div>\n\n`;
        allContent += content;
        console.log(`✅ Added: ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
    }
});

// Create HTML template
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fantasia Asia - Complete Documentation</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        :root { --primary: #BD3E2B; --secondary: #2C3E50; --accent: #E67E22; --success: #27AE60; --warning: #F39C12; --danger: #E74C3C; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #212529; background: white; max-width: 900px; margin: 0 auto; padding: 40px 60px; }
        
        @media print { 
            body { font-size: 10pt; padding: 20px 40px; max-width: 100%; } 
            .no-print { display: none !important; } 
            .page-break { page-break-before: always; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
            table { font-size: 9pt; }
        }
        
        h1 { color: var(--primary); font-size: 1.8rem; margin: 35px 0 18px; border-bottom: 3px solid var(--primary); padding-bottom: 8px; }
        h2 { color: var(--secondary); font-size: 1.4rem; margin: 28px 0 12px; border-left: 4px solid var(--primary); padding-left: 12px; }
        h3 { font-size: 1.15rem; margin: 20px 0 10px; color: #444; }
        h4 { font-size: 1rem; margin: 15px 0 8px; color: #555; }
        p { margin-bottom: 12px; text-align: justify; }
        ul, ol { margin: 12px 0 12px 25px; }
        li { margin-bottom: 5px; }
        
        table { width: 100%; border-collapse: collapse; margin: 18px 0; font-size: 0.9rem; }
        th, td { border: 1px solid #ddd; padding: 9px 12px; text-align: left; }
        th { background: var(--secondary); color: white; font-weight: 600; }
        tr:nth-child(even) { background: #f8f9fa; }
        
        pre { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 16px 0; font-size: 0.82rem; line-height: 1.5; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.88em; color: var(--primary); }
        pre code { background: none; padding: 0; color: inherit; }
        
        .cover { text-align: center; padding: 80px 40px; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: white; margin: -40px -60px 50px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .cover h1 { color: white !important; border: none !important; font-size: 3rem; margin-bottom: 15px; }
        .cover h2 { color: white !important; border: none !important; font-weight: 400; opacity: 0.9; font-size: 1.5rem; }
        
        .section-header { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 25px 30px; margin: 30px -60px; text-align: center; }
        .section-header h1 { color: white !important; border: none !important; margin: 0 !important; font-size: 1.5rem; }
        
        .toc { background: #f8f9fa; padding: 30px; border-radius: 8px; margin: 30px 0; }
        .toc h2 { border: none; margin-top: 0; }
        .toc ul { list-style: none; margin-left: 0; }
        .toc li { padding: 8px 0; border-bottom: 1px solid #eee; }
        .toc a { color: var(--secondary); text-decoration: none; }
        
        .btn { background: var(--primary); color: white; border: none; padding: 14px 28px; font-size: 1rem; border-radius: 6px; cursor: pointer; margin: 8px; display: inline-block; }
        .btn:hover { background: #9a3223; }
        
        blockquote { border-left: 4px solid var(--accent); padding: 12px 20px; margin: 16px 0; background: #fff9e6; }
        
        hr { border: none; border-top: 2px solid #eee; margin: 40px 0; }
        
        .footer { text-align: center; padding: 40px; color: #666; border-top: 2px solid #eee; margin-top: 60px; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="cover">
        <div style="font-size: 5rem; margin-bottom: 25px;">🌏</div>
        <h1>Fantasia Asia</h1>
        <h2>Complete Platform Documentation</h2>
        <p style="max-width: 650px; margin: 35px auto; opacity: 0.88; font-size: 1.1rem; line-height: 1.7;">
            Comprehensive technical and user documentation for the Fantasia Asia Tour Booking Platform, 
            including system architecture, API references, user guides, database schema, 
            deployment procedures, and security operations.
        </p>
        <div style="margin-top: 60px; opacity: 0.75;">
            <p><strong>Version 1.0</strong></p>
            <p>December 2025</p>
            <p>Prepared by Nightwing Development Team</p>
        </div>
    </div>

    <div class="no-print" style="text-align: center; margin-bottom: 40px; padding: 25px; background: #f8f9fa; border-radius: 10px;">
        <h3 style="margin-bottom: 15px;">📄 Export to PDF</h3>
        <p style="margin-bottom: 20px;">This document contains <strong>ALL</strong> documentation from 7 source files.</p>
        <button class="btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">Press <strong>Ctrl+P</strong> → Select "Save as PDF"</p>
    </div>

    <div class="toc page-break">
        <h2>📚 Table of Contents</h2>
        <ul>
            <li><strong>1.</strong> FANTASIA ASIA MANUAL - Main System Documentation</li>
            <li><strong>2.</strong> USER GUIDE - End User Documentation</li>
            <li><strong>3.</strong> ADMIN USER GUIDE - Backoffice Administrator Guide</li>
            <li><strong>4.</strong> API DEVELOPER GUIDE - Complete API Reference</li>
            <li><strong>5.</strong> DATABASE SCHEMA - Database Structure Reference</li>
            <li><strong>6.</strong> DEPLOYMENT RUNBOOK - Deployment Procedures</li>
            <li><strong>7.</strong> SECURITY OPERATIONS GUIDE - Security & Monitoring</li>
        </ul>
    </div>

    <div id="content"></div>

    <div class="footer">
        <p><strong>Fantasia Asia - Complete Platform Documentation</strong></p>
        <p>Version 1.0 | December 2025</p>
        <p>© 2025 Nightwing Development Team. All rights reserved.</p>
        <p style="margin-top: 15px; font-size: 0.85rem;">This document is confidential and for authorized personnel only.</p>
    </div>

    <script>
        const markdownContent = ${JSON.stringify(allContent)};
        document.getElementById('content').innerHTML = marked.parse(markdownContent);
    </script>
</body>
</html>`;

// Write HTML file
const outputPath = path.join(__dirname, 'COMPLETE_DOCUMENTATION.html');
fs.writeFileSync(outputPath, html, 'utf8');

console.log(`\n✅ Generated: ${outputPath}`);
console.log(`📄 Open this file in a browser and print to PDF`);
console.log(`📊 Total content size: ${(allContent.length / 1024).toFixed(1)} KB`);
