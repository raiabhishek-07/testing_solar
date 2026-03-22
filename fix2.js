const fs = require('fs');

const langs = ['c', 'cpp', 'java', 'python'];
const levels = [0, 1, 2, 3, 4, 5, 6];

for (const lang of langs) {
  for (const level of levels) {
    const f = `c:/Users/Abhi/Desktop/final_s/src/components/${lang}/data/level${level}.js`;
    if (fs.existsSync(f)) {
      let s = fs.readFileSync(f, 'utf8');
      
      const match = s.match(/import \{(.+?)\} from ["']lucide-react["'];/);
      if (match) {
         let imports = match[1].split(',').map(x => x.trim()).filter(Boolean);
         let uniqueImports = [...new Set(imports)];
         if (!uniqueImports.includes('Hash')) {
            uniqueImports.push('Hash');
         }
         let newImportStr = `import { ${uniqueImports.join(', ')} } from 'lucide-react';`;
         s = s.replace(match[0], newImportStr);
         fs.writeFileSync(f, s);
         console.log('Fixed imports for ' + f);
      }
    }
  }
}
