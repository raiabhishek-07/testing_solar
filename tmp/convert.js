
const fs = require('fs');
const path = require('path');

const langs = ['python', 'java', 'c', 'cpp'];
const levels = [0, 1, 2, 3, 4, 5, 6, 7];

langs.forEach(lang => {
    levels.forEach(lvl => {
        const jsPath = `c:/Users/Abhi/Desktop/final_s/src/components/${lang}/data/level${lvl}.js`;
        if (!fs.existsSync(jsPath)) return;

        let content = fs.readFileSync(jsPath, 'utf8');
        // Strip ESM keywords
        content = content.replace(/export\s+const/g, 'const');
        content = content.replace(/import.*?from.*?;/g, '');
        // Mock icons to strings
        content = content.replace(/icon:\s*([A-Za-z0-9_]+)/g, 'icon: "$1"');
        
        // Wrap for eval
        const jsCode = `${content}; var resultObj = { foundation: L${lvl}_FOUNDATION, tests: L${lvl}_TESTS }; resultObj;`;
        
        try {
            const data = eval(jsCode);
            const result = {
                label: `${lang.toUpperCase()}_ARCADE`,
                foundation: data.foundation,
                tests: data.tests
            };

            const outDir = `c:/Users/Abhi/Desktop/final_s/public/data/levels/${lang}/${lvl}`;
            if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(result, null, 2));
            console.log(`Success: ${lang} L${lvl}`);
        } catch (e) {
            console.log(`Error: ${lang} L${lvl} - ${e.message}`);
        }
    });
});
