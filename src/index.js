import os from 'os';
import path from 'path';
import { goToUpDir, goToDir, readDir } from './nav.js';
import { readFile, createFile } from './files.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let dirCur = os.homedir();
dirCur = 'C:\\Text\\RS\\';
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
  const commands = chunkStringified.split(' ');
  if (commands.length) {
    const args = commands.slice(1).join(' ');
    if (args.includes('"')) {
      commands[1] = args.split('"')[1];
    }
  }
  switch (commands[0]) {
    case 'up':
      dirCur = goToUpDir(dirCur);
      showDirCur();
      break;

    case 'cd':
      goToDir(dirCur, commands[1])
        .then(res => {
          dirCur = res;
          showDirCur();
        });
      break;

    case 'ls':
      readDir(dirCur)
        .then(() => {})
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally( () => {
          showDirCur();
        })
      break;

    case 'cat':
      readFile(dirCur, commands[1])
        .then(() => {})
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally( () => {
          console.log('');
          showDirCur();
        })
      break;

    case 'add':
      createFile(dirCur, commands[1])
        .then(() => {
          console.log('File has created successfully');
        })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally( () => {
          showDirCur();
        })
      break;
/*
      case 'rn':
        renameFile(dirCur, commands[1])
          .then(() => {
            console.log('File has created successfully');
          })
          .catch(err => {
            console.log(err.message);
            console.log('Operation failed');
          })
          .finally( () => {
            showDirCur();
          })
        break;
*/
    case '.exit':
      process.exit();

    default:
      showInvalidInput();
      showDirCur();
  }
};

process.stdin.on('data', dataInput);

function showDirCur() {
  console.log(`You are currently in ${dirCur}`)
}

export function showInvalidInput() {
  console.log('Invalid input');
}

parseArgs();
showDirCur();
