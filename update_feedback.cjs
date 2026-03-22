const fs = require('fs');
const path = require('path');

// 1. Update examples.js link
const examplesFile = path.join(__dirname, 'src', 'data', 'examples.js');
let exContent = fs.readFileSync(examplesFile, 'utf-8');
exContent = exContent.replace(
    "'https://www.schueco.com/de/architekten/produkte/brandschutz'",
    "'https://docucenter.schueco.com/'"
);
fs.writeFileSync(examplesFile, exContent);

// 2. Update main.js
const mainFile = path.join(__dirname, 'src', 'main.js');
let mainContent = fs.readFileSync(mainFile, 'utf-8');

// The block to extract
const examplesBlock = `
    \${(() => {
      if (typeof productExamples !== 'undefined' && productExamples[p.id] && productExamples[p.id].length > 0) {
        const exs = productExamples[p.id];
        return \\\`<div class="mvvtb-section examples-section" style="margin-top: 2.5rem; border-color: #3b82f6;">
          <h4 style="color: #60a5fa; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(59, 130, 246, 0.3);">💡 Praxis-Beispiele (Verwendbarkeitsnachweise)</h4>
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1.2rem;">
            \\\${exs.map(ex => \\\`
              <a href="\\\${ex.link}" target="_blank" class="example-card" style="display:block; background:rgba(59,130,246,0.05); border:1px solid rgba(59,130,246,0.2); padding:1.2rem; border-radius:8px; text-decoration:none; color:inherit; transition:all 0.2s;">
                <div style="color:#ffffff; font-weight:600; font-size:1.1rem; margin-bottom:0.25rem;">\\\${ex.manufacturer}</div>
                <div style="color:#e2e8f0; font-size:0.95rem; margin-bottom:1rem;">\\\${ex.productName}</div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; padding-top:0.75rem; border-top:1px solid rgba(59,130,246,0.15);">
                  <span class="badge" style="background:rgba(59,130,246,0.15); color:#93c5fd; border:none; padding:0.3rem 0.6rem; font-size:0.8rem;">\\\${ex.docType}</span>
                  <span style="color:#94a3b8; font-size:0.85rem;" title="Gültig bis">⏳ \\\${ex.validUntil}</span>
                </div>
                <div style="color:#60a5fa; font-size:0.85rem; margin-top:0.75rem; text-align:right;">\\\${ex.docNumber} ↗</div>
              </a>
            \\\`).join('')}
          </div>
        </div>\\\`;
      }
      return '';
    })()}
`;

// First remove the old block
const oldStart = "    ${(() => {\n      if (typeof productExamples !== 'undefined'";
const oldEnd = "      return '';\n    })()}";

let startIndex = mainContent.indexOf(oldStart);
if (startIndex !== -1) {
    let endIndex = mainContent.indexOf(oldEnd, startIndex) + oldEnd.length;
    mainContent = mainContent.substring(0, startIndex) + mainContent.substring(endIndex);
}

// Now insert it right after the docs-section
const docsSectionEnd = "      </ul>\n    </div>";
let insertIndex = mainContent.indexOf(docsSectionEnd);
if (insertIndex !== -1) {
    insertIndex += docsSectionEnd.length;
    // Replace all actual backticks in the examplesBlock template above with the escaped version
    const finalBlockToInsert = examplesBlock.replace(/\\`/g, '`');
    mainContent = mainContent.substring(0, insertIndex) + "\n" + finalBlockToInsert + mainContent.substring(insertIndex);
} else {
    console.error("Could not find docs section end.");
}

// Also replace the emoji in the existing knowledge block if it exists
mainContent = mainContent.replace("📄 Praxis-Beispiele (Verwendbarkeitsnachweise)", "💡 Praxis-Beispiele (Verwendbarkeitsnachweise)");

fs.writeFileSync(mainFile, mainContent);
console.log("Updated main.js with new layout and colors");
