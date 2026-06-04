const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/app/_api/user.ts');
let content = fs.readFileSync(file, 'utf8');

// replace api.post with ApiClient.post
content = content.replace(/api\.post/g, 'ApiClient.post');
// replace api.get with ApiClient.get
content = content.replace(/api\.get/g, 'ApiClient.get');

// add import { ApiClient } from './client'; if missing
if (!content.includes('ApiClient } from')) {
  content = content.replace(
    'import userClient from "./client/user";',
    'import userClient from "./client/user";\nimport { ApiClient } from "./client";'
  );
}

fs.writeFileSync(file, content);
console.log('Fixed ApiClient usage');
