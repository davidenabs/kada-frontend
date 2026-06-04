const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/components/drawers/admin/export-engine-drawer.tsx');

let content = fs.readFileSync(file, 'utf8');

// Update imports
content = content.replace(
  "import { Button, Checkbox, Text, Select, Progressbar, ActionIcon, Title, Badge, Input } from 'rizzui';",
  "import { Button, Checkbox, Text, Progressbar, ActionIcon, Title, Badge, Input } from 'rizzui';\nimport Select from '@/components/form/select';"
);

// Fix the Export Type Select
const exportTypeRegex = /<Select\s+options=\{EXPORT_TYPES\}\s+value=\{exportType\}\s+onChange=\{\(v: any\) => \{\s+setExportType\(v\.value\);\s+setJobId\(null\);\s+\}\}\s+\/>/g;
const newExportTypeSelect = `<Select
                options={EXPORT_TYPES}
                value={EXPORT_TYPES.find(o => o.value === exportType)}
                onChange={(v: any) => {
                  setExportType(v.value);
                  setJobId(null);
                }}
              />`;
content = content.replace(exportTypeRegex, newExportTypeSelect);

// Fix the hasCooperative Select
const hasCoopRegex = /<Select\s+options=\{\[\s+\{\s*label:\s*'All Farmers',\s*value:\s*'ALL'\s*\},\s+\{\s*label:\s*'Yes, in a Cooperative',\s*value:\s*'YES'\s*\},\s+\{\s*label:\s*'No, Independent',\s*value:\s*'NO'\s*\},\s+\]\}\s+value=\{filters\.hasCooperative\}\s+onChange=\{\(v: any\) => setFilters\(\{ \.\.\.filters, hasCooperative: v\.value \}\)\}\s+\/>/g;

const newHasCoopSelect = `
                  <Select
                    options={[
                      { label: 'All Farmers', value: 'ALL' },
                      { label: 'Yes, in a Cooperative', value: 'YES' },
                      { label: 'No, Independent', value: 'NO' },
                    ]}
                    value={[
                      { label: 'All Farmers', value: 'ALL' },
                      { label: 'Yes, in a Cooperative', value: 'YES' },
                      { label: 'No, Independent', value: 'NO' },
                    ].find(o => o.value === filters.hasCooperative) || null}
                    onChange={(v: any) => setFilters({ ...filters, hasCooperative: v.value })}
                  />`;
content = content.replace(hasCoopRegex, newHasCoopSelect);

fs.writeFileSync(file, content);
console.log('Fixed Select component imports and values');
