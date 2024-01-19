import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'path';
import zlib from 'zlib';

export async function compressFile(dirCur, pathSrc, pathDst) {
  if (!path.isAbsolute(pathSrc)) {
    pathSrc = path.resolve(dirCur, pathSrc);
  }

  let stat = await fsPromises.stat(pathSrc);
  if (!stat.isFile()) {
    throw new Error('Incorrect file name!');
  }

  if (!path.isAbsolute(pathDst)) {
    pathDst = path.resolve(dirCur, pathDst);
  }

  let fileExist = false;
  try {
    await fsPromises.access(pathDst);
    fileExist = true;
  } catch (err) {
  }
  if (fileExist) {
    throw new Error('File already exists!');
  };

  const readableStream = fs.createReadStream(pathSrc);
  const writeableStream = fs.createWriteStream(pathDst);
  const compressStream = zlib.createBrotliCompress();

  readableStream.pipe(compressStream).pipe(writeableStream);
};

export async function decompressFile(dirCur, pathSrc, pathDst) {
  if (!path.isAbsolute(pathSrc)) {
    pathSrc = path.resolve(dirCur, pathSrc);
  }

  let stat = await fsPromises.stat(pathSrc);
  if (!stat.isFile()) {
    throw new Error('Incorrect file name!');
  }

  if (!path.isAbsolute(pathDst)) {
    pathDst = path.resolve(dirCur, pathDst);
  }
  
  let fileExist = false;
  try {
    await fsPromises.access(pathDst);
    fileExist = true;
  } catch (err) {
  }
  if (fileExist) {
    throw new Error('File already exists!');
  };

  const readableStream = fs.createReadStream(pathSrc);
  const writeableStream = fs.createWriteStream(pathDst);
  const compressStream = zlib.createBrotliDecompress();

  readableStream.pipe(compressStream).pipe(writeableStream);
};
