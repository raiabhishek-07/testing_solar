const fs = require('fs');

const langs = ['c', 'cpp', 'java', 'python'];
const levels = [1, 2, 3, 4, 5, 6];

for (const lang of langs) {
  for (const level of levels) {
    const f = `c:/Users/Abhi/Desktop/final_s/src/components/${lang}/data/level${level}.js`;
    if (fs.existsSync(f)) {
      let s = fs.readFileSync(f, 'utf8');
      if (!s.includes('Hash }')) {
        s = s.replace(/} from 'lucide-react';/g, ', Hash } from "lucide-react";');
        fs.writeFileSync(f, s);
        console.log('Fixed ' + f);
      } else {
        console.log('Already fixed ' + f);
      }
    }
  }
}
