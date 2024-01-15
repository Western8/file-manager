import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let dirCur = os.homedir();
let username = '';

const parseArgs = () => {
  const argv = Array.from(process.argv).slice(2);
  const argUsername = argv.find(item => item.split('=')[0] === '--username');
  if (argUsername) {
    username = argUsername.split('=')[1];
  }
  console.log(`Welcome to the File Manager, ${username}!`);
};

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', function () {
  process.exit(0);
});

const dataInput = (chunk) => {
  const chunkStringified = chunk.toString().trim();
  switch (chunkStringified) {
    case 'up':
      goToUpDir();
      break;
    case '.exit':
      process.exit();
  }
};

process.stdin.on('data', dataInput);

function showDirCur() {
  console.log(`You are currently in ${dirCur}`)
}

function goToUpDir() {
  let dirCurArr = dirCur.split(path.sep);
  if (dirCurArr.length > 1) {
    dirCurArr = dirCurArr.slice(0, -1);
    dirCur = dirCurArr.join(path.sep);
  }
  showDirCur();
} 

parseArgs();
showDirCur();
