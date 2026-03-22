const fs = require('fs');

const langs = ['c', 'cpp', 'java', 'python'];
const levels = [0, 1, 2, 3, 4, 5, 6];

let err = 0;
for (const lang of langs) {
  for (const level of levels) {
    const f = `c:/Users/Abhi/Desktop/final_s/src/components/${lang}/data/level${level}.js`;
    if (fs.existsSync(f)) {
      let s = fs.readFileSync(f, 'utf8');
      let m = s.match(/import \{(.+?)\} from/);
      if (m) {
        let imps = m[1].split(',').map(x=>x.trim());
        let iter = s.matchAll(/icon:\s*([A-Za-z0-9_]+)/g);
        for (let match of iter) {
          let icon = match[1];
          if (!imps.includes(icon)) {
            console.log(`Missing icon ${icon} in ${f}`);
            
            // Auto fix it
            imps.push(icon);
            let uniqueImports = [...new Set(imps)];
            let newImportStr = `import { ${uniqueImports.join(', ')} } from 'lucide-react';`;
            s = s.replace(m[0], newImportStr.replace(" from", " from"));
            fs.writeFileSync(f, s);
            console.log(`Auto fixed ${f}`);
            
            // Update m for next iterations in same file
            m[1] = uniqueImports.join(', ');
            imps = uniqueImports;
          }
        }
      }
    }
  }
}
