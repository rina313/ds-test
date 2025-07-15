/**
 * src/index.ts에 export되지 않은 컴포넌트가 있을 경우,
 * 외부 사용 불가 문제를 방지하기 위해 커밋 시 에러를 발생시킨다.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, './src/components');
const indexFile = path.resolve(__dirname, './src/index.ts');

const components = fs
  .readdirSync(componentsDir)
  .filter(name => fs.statSync(path.join(componentsDir, name)).isDirectory());

const indexContent = fs.readFileSync(indexFile, 'utf-8');

const missing = components.filter(name => !indexContent.includes(`from './components/${name}`));

if (missing.length > 0) {
  console.warn(`\n❗️ index.ts에서 누락된 컴포넌트가 있습니다:`);
  missing.forEach(name => console.warn(` - ${name}`));
  process.exit(1);
}