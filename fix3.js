const fs = require('fs');

const langs = ['c', 'cpp', 'java', 'python'];
const levels = [0, 1, 2, 3, 4, 5, 6];

for (const lang of langs) {
  for (const level of levels) {
    const f = `c:/Users/Abhi/Desktop/final_s/src/components/${lang}/data/level${level}.js`;
    if (fs.existsSync(f)) {
      let s = fs.readFileSync(f, 'utf8');
      
      const matches = [...s.matchAll(/import \{(.+?)\} from ["']lucide-react["'];/g)];
      if (matches.length > 0) {
         let allImports = [];
         for (const match of matches) {
             const imps = match[1].split(',').map(x => x.trim()).filter(Boolean);
             allImports.push(...imps);
             // Remove this import statement entirely
             s = s.replace(match[0], '');
         }
         
         let uniqueImports = [...new Set(allImports)];
         if (!uniqueImports.includes('Hash')) {
            uniqueImports.push('Hash');
         }
         
         let newImportStr = `import { ${uniqueImports.join(', ')} } from 'lucide-react';\n`;
         // prepend at the top after removing all
         s = newImportStr + s.trimStart();
         fs.writeFileSync(f, s);
         console.log('Consolidated imports for ' + f);
      }
    }
  }
}
