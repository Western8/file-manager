import os from 'os';
import path from 'path';
import { goToUpDir, goToDir, readDir } from './nav.js';
import { readFile, createFile, renameFile, copyFile, moveFile, removeFile } from './files.js';
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
    let args = commands.slice(1).join(' ');
    if (args[0] === '"') {
      commands[1] = args.split('"')[1];
      args = args.split('"').slice(2).join('"').trim();
      if (args[0] === '"') {
        commands[2] = args.split('"')[1];
      } else {
        commands[2] = args.split(' ')[0];
      }
    } else {
      args = commands.slice(2).join(' ').trim();
      if (args[0] === '"') {
        commands[2] = args.split('"')[1];
      } else {
        commands[2] = args.split(' ')[0];
      }
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
        .then(() => { })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally(() => {
          showDirCur();
        })
      break;

    case 'cat':
      readFile(dirCur, commands[1])
        .then(() => { })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally(() => {
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
        .finally(() => {
          showDirCur();
        })
      break;

    case 'rn':
      renameFile(dirCur, commands[1], commands[2])
        .then(() => {
          console.log('File has renamed successfully');
        })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally(() => {
          showDirCur();
        })
      break;

    case 'cp':
      copyFile(dirCur, commands[1], commands[2])
        .then(() => {
          console.log('File copied successfully');
        })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally(() => {
          showDirCur();
        })
      break;

    case 'mv':
      moveFile(dirCur, commands[1], commands[2])
        .then(() => {
          console.log('File moved successfully');
        })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally(() => {
          showDirCur();
        })
      break;

    case 'rm':
      removeFile(dirCur, commands[1])
        .then(() => {
          console.log('File removed successfully');
        })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally(() => {
          showDirCur();
        })
      break;

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
