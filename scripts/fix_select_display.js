const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/components/drawers/admin/export-engine-drawer.tsx');

let content = fs.readFileSync(file, 'utf8');

const exportTypeRegex = /<Select\s+options=\{EXPORT_TYPES\}\s+value=\{EXPORT_TYPES\.find\(o => o\.value === exportType\)\}\s+onChange=\{\(v: any\) => \{\s+setExportType\(v\.value\);\s+setJobId\(null\);\s+\}\}\s+\/>/;

const newExportTypeSelect = `<Select
                options={EXPORT_TYPES}
                value={EXPORT_TYPES.find(o => o.value === exportType) || null}
                onChange={(v: any) => {
                  setExportType(v?.value);
                  setJobId(null);
                }}
                getOptionValue={(option) => option.value}
                displayValue={(selected) => selected?.label || ''}
                getOptionDisplayValue={(option) => option.label}
              />`;

content = content.replace(exportTypeRegex, newExportTypeSelect);

const hasCoopRegex = /<Select\s+options=\{\[\s+\{\s*label:\s*'All Farmers',\s*value:\s*'ALL'\s*\},\s+\{\s*label:\s*'Yes, in a Cooperative',\s*value:\s*'YES'\s*\},\s+\{\s*label:\s*'No, Independent',\s*value:\s*'NO'\s*\},\s+\]\}\s+value=\{\[\s+\{\s*label:\s*'All Farmers',\s*value:\s*'ALL'\s*\},\s+\{\s*label:\s*'Yes, in a Cooperative',\s*value:\s*'YES'\s*\},\s+\{\s*label:\s*'No, Independent',\s*value:\s*'NO'\s*\},\s+\]\.find\(o => o\.value === filters\.hasCooperative\) \|\| null\}\s+onChange=\{\(v: any\) => setFilters\(\{ \.\.\.filters, hasCooperative: v\.value \}\)\}\s+\/>/;

const newHasCoopSelect = `<Select
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
                    onChange={(v: any) => setFilters({ ...filters, hasCooperative: v?.value })}
                    getOptionValue={(option) => option.value}
                    displayValue={(selected) => selected?.label || ''}
                    getOptionDisplayValue={(option) => option.label}
                  />`;

content = content.replace(hasCoopRegex, newHasCoopSelect);

fs.writeFileSync(file, content);
console.log('Fixed display value for Select');
