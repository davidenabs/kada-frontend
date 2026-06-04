const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/components/drawers/admin/export-engine-drawer.tsx');

let content = fs.readFileSync(file, 'utf8');

// Fix TypeScript errors for the callbacks
content = content.replace(/getOptionValue=\{\(option\) => option\.value\}/g, "getOptionValue={(option: any) => option.value}");
content = content.replace(/displayValue=\{\(selected\) => selected\?\.label \|\| ''\}/g, "displayValue={(selected: any) => selected?.label || ''}");
content = content.replace(/getOptionDisplayValue=\{\(option\) => option\.label\}/g, "getOptionDisplayValue={(option: any) => option.label}");

fs.writeFileSync(file, content);
console.log('Fixed TypeScript inference issues in Select');
