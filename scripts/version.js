import { execSync } from 'node:child_process';
// import { writeFile } from 'node:fs/promises';

const hasCssFlag = process.argv.includes('--css');
// const list_arg = process.argv.filter((arg) => (['--css'].includes(arg))).toString();
// const JS_FILE = import.meta.resolve('../src/lib/version.js');
const GIT_COMMAND = 'git rev-parse --short HEAD';
const version = execSync(GIT_COMMAND).toString().trim('\n');
const date = new Date().toISOString().replace(/:\d\d\..+/, '');
const OBJ = { date, version };

const jsData = `/* Auto-generated */
/* eslint-disable */
const DATA = ${JSON.stringify(OBJ, null, 2)};
export default DATA;
`;

const cssData = `/* Auto-generated */
#app-version,
app-version {
  font-size: small;

  &::after {
    content: '${version} / ${date}';
    display: inline-block;
    margin-left: .2rem;
    user-select: text;
  }
}`;

// console.log('File:', JS_FILE);

// writeFile(JS_FILE, jsData, { flag: 'w' });

console.log(hasCssFlag ? cssData : jsData);

/* exec('git rev-parse --short HEAD', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`Git Sha: ${stdout}`);
  if (stderr) console.error(`stderr: ${stderr}`);
}); */
