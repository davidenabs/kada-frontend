const fs = require('fs');
const path = require('path');

// 1. Fix export-engine-drawer.tsx
const drawerFile = path.join(__dirname, 'src/components/drawers/admin/export-engine-drawer.tsx');
let drawerContent = fs.readFileSync(drawerFile, 'utf8');

// Fix job extraction
drawerContent = drawerContent.replace(
  /const job = \(jobData as any\)\?\.data\?\.data;/,
  "const job = (jobData as any)?.data;"
);

// Fix setJobId on success
drawerContent = drawerContent.replace(
  /setJobId\(res\?\.data\?\.data\?\.id\);/,
  "setJobId(res?.data?.id);"
);

fs.writeFileSync(drawerFile, drawerContent);
console.log('Fixed export-engine-drawer.tsx payload extraction');

// 2. Fix user.ts
const apiFile = path.join(__dirname, 'src/app/_api/user.ts');
let apiContent = fs.readFileSync(apiFile, 'utf8');

// Revert polling logic back to single data
apiContent = apiContent.replace(
  /const status = query\?\.state\?\.data\?\.data\?\.data\?\.status;/g,
  "const status = query?.state?.data?.data?.status;"
);

fs.writeFileSync(apiFile, apiContent);
console.log('Fixed user.ts polling extraction');

