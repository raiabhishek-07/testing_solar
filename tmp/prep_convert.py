import os
import json
import re

langs = ['python', 'java', 'c', 'cpp']

def convert_one(lang, lvl):
    js_path = f"c:/Users/Abhi/Desktop/final_s/src/components/{lang}/data/level{lvl}.js"
    if not os.path.exists(js_path):
        return
    
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # REMOVE ALL COMMENTS
    content = re.sub(r'//.*', '', content)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Extract Foundation and Tests
    f_match = re.search(f'export const L{lvl}_FOUNDATION = (\[.*?\]);', content, re.DOTALL)
    t_match = re.search(f'export const L{lvl}_TESTS = (\[.*?\]);', content, re.DOTALL)
    
    if not f_match or not t_match:
        return f"Regex mismatch for {lang} L{lvl}"

    def js_to_json(js_str):
        # 1. Icons to strings
        js_str = re.sub(r'icon:\s*([A-Za-z0-9_]+)', r'icon: "\1"', js_str)
        # 2. Add quotes to keys
        js_str = re.sub(r'([{,])\s*([a-zA-Z0-9_]+):', r'\1 "\2":', js_str)
        # 3. Handle double-quote content that might have internal single quotes and vice-versa
        # The safest way is to replace single quotes with double quotes ONLY if they wrap a string
        # and escape internal double quotes.
        # But wait, Python's json.loads is very strict.
        
        # Let's try to just cleanup the quotes
        # Replace backticks first
        js_str = js_str.replace('`', '"')
        # Replace single quotes
        # This is the tricky part: '...'
        # Let's use a non-greedy regex for single quotes
        # But skip single quotes inside double quotes if possible
        # Actually, let's just do a manual check if possible
        return js_str

    f_str = js_to_json(f_match.group(1))
    t_str = js_to_json(t_match.group(1))
    
    # Instead of fixing strings, let's use YAML-like or simple eval if we were in node.
    # Since we are in python, let's try to fix the common JSON issues.
    
    # Try to write as a .json with SOME fixes
    # One major issue: JS strings can span multiple lines. JSON cannot.
    f_str = ' '.join(f_str.splitlines())
    t_str = ' '.join(t_str.splitlines())
    
    # Another issue: trailing commas
    f_str = re.sub(r',\s*([\]}])', r'\1', f_str)
    t_str = re.sub(r',\s*([\]}])', r'\1', t_str)

    # If I can't do it with python, I'll use `node`! I have `run_command`.
    return f_str, t_str

# NEW PLAN: Use node to convert!
node_script = """
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
"""

with open("c:/Users/Abhi/Desktop/final_s/tmp/convert.js", "w") as f:
    f.write(node_script)

print("Created node script")
