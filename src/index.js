import os from 'os';
import { parseArgs, parseCommands } from './parse.js';
import { goToUpDir, goToDir, readDir } from './nav.js';
import { readFile, createFile, renameFile, copyFile, moveFile, removeFile } from './files.js';
import { getEOL, getCpu, getHomedir, getUsername, getArch } from './os.js';
import { hashFile } from './hash.js';
import { compressFile, decompressFile } from './zip.js';
export let username = 'Anonymous';
let dirCur = os.homedir();

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', function () {
  process.exit(0);
});

const dataInput = (chunk) => {
  const chunkStringified = chunk.toString().trim();
  const commands = parseCommands(chunkStringified);

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

    case 'os':
      switch (commands[1]) {
        case '--EOL':
          getEOL();
          break;
        case '--cpus':
          getCpu();
          break;
        case '--homedir':
          getHomedir();
          break;
        case '--username':
          getUsername();
          break;
        case '--architecture':
          getArch();
          break;
        default:
          showInvalidInput();
      }
      showDirCur();
      break;

    case 'hash':
      hashFile(dirCur, commands[1])
        .then(() => { })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally(() => {
          showDirCur();
        })
      break;

    case 'compress':
      compressFile(dirCur, commands[1], commands[2])
        .then(() => {
          console.log('File compressed successfully');
        })
        .catch(err => {
          console.log(err.message);
          console.log('Operation failed');
        })
        .finally(() => {
          showDirCur();
        })
      break;

    case 'decompress':
      decompressFile(dirCur, commands[1], commands[2])
        .then(() => {
          console.log('File decompressed successfully');
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

username = parseArgs();
showDirCur();
