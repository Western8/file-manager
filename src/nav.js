import path from 'path';
import fs from 'node:fs/promises';
import { showInvalidInput } from './index.js';

export function goToUpDir(dirCur) {
  let dirCurArr = dirCur.split(path.sep);
  if (dirCurArr.length > 1) {
    dirCur = path.dirname(dirCur);
  }
  return dirCur;
}

export async function goToDir(dirCur, dirNext) {
  if (dirNext === undefined) {
    showInvalidInput();
    return dirCur;
  }
  if (!path.isAbsolute(dirNext)) {
    dirNext = path.resolve(dirCur, dirNext);
  }
  try {
    const stat = await fs.stat(dirNext);
    if (stat.isDirectory()) {
      dirCur = dirNext;
    } else {
      showInvalidInput();
    }
  } catch (err) {
    console.log(err.message);
    showInvalidInput();
  }
  return dirCur;
}

export async function readDir(dirCur) {
  let files = [];
  try {
    files = await fs.readdir(dirCur, {
      withFileTypes: true
    });
  } catch (err) {
    console.log(err.message);
    console.log(cat);
  }

  files.sort((a, b) => {
    if (a.isFile() && !b.isFile()) {
      return 1;
    } else if (!a.isFile() && b.isFile()) {
      return -1;
    };
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
    return 0;
  })

  const filesTable = files.map((item, index) => {
    return {
      Name: item.name,
      Type: item.isFile() ? 'file' : 'directory',
    }
  });
  console.table(filesTable);
}