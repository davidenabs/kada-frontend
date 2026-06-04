const fs = require('fs');
const path = require('path');

// 1. Fix polling in src/app/_api/user.ts
const apiFile = path.join(__dirname, 'src/app/_api/user.ts');
let apiContent = fs.readFileSync(apiFile, 'utf8');

apiContent = apiContent.replace(
  /const status = query\?\.state\?\.data\?\.data\?\.status;/g,
  "const status = query?.state?.data?.data?.data?.status;"
);
fs.writeFileSync(apiFile, apiContent);
console.log('Fixed polling');

// 2. Fix error handling in export-engine-drawer.tsx
const drawerFile = path.join(__dirname, 'src/components/drawers/admin/export-engine-drawer.tsx');
let drawerContent = fs.readFileSync(drawerFile, 'utf8');

const onErrorRegex = /onError: \(err: any\) => \{\s*toast\.error\(err\?\.response\?\.data\?\.message \|\| 'Failed to start export'\);\s*\}/;

const newOnError = `onError: (err: any) => {
          const errMsg = err?.response?.data?.message;
          const activeJobId = err?.response?.data?.error?.activeJobId || err?.response?.data?.data?.activeJobId;
          
          if (activeJobId) {
            toast.error('An export is already running. Reattaching to it...');
            setJobId(activeJobId);
          } else {
            toast.error(errMsg || 'Failed to start export');
          }
        }`;

drawerContent = drawerContent.replace(onErrorRegex, newOnError);
fs.writeFileSync(drawerFile, drawerContent);
console.log('Fixed error handling');

