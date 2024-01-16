import path from 'path';
import fs from 'node:fs/promises';
import { showInvalidInput } from './index.js';

export function goToUpDir(dirCur) {
  let dirCurArr = dirCur.split(path.sep);
  if (dirCurArr.length > 1) {
    dirCur = path.dirname(dirCur);
    // dirCurArr = dirCurArr.slice(0, -1);
    // dirCur = dirCurArr.join(path.sep);
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