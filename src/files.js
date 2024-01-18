import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'path';

export async function readFile(dirCur, pathFile) {
  if (!path.isAbsolute(pathFile)) {
    pathFile = path.resolve(dirCur, pathFile);
  }
  const readableStream = await fs.createReadStream(pathFile);

  return new Promise((resolve, reject) => {
    readableStream.on('data', async (chunk) => {
      //process.stdout.write(chunk);
      console.log(chunk.toString());
    });

    readableStream.on('end', () => {
      resolve();
    });

    readableStream.on('error', (err) => {
      reject(err);
    });
  })
};

export async function createFile(dirCur, pathFile) {
  if (path.isAbsolute(pathFile)) {
    throw new Error('Incorrect file name');
  }
  pathFile = path.resolve(dirCur, pathFile);
  let fileExist = false;
  try {
    await fsPromises.access(pathFile);
    fileExist = true;
  } catch (err) {
  }
  if (fileExist) {
    throw new Error('File already exists!');
  };
  await fsPromises.writeFile(pathFile, '');
};

export async function renameFile(dirCur, pathSrc, pathDst) {
  if ((pathSrc === undefined) || (pathDst === undefined)) {
    throw new Error('Invalid input');
  }
  if (path.isAbsolute(pathSrc) || path.isAbsolute(pathDst)) {
    throw new Error('Incorrect file name');
  }

  pathSrc = path.resolve(dirCur, pathSrc);
  pathDst = path.resolve(dirCur, pathDst);

  try {
    await fsPromises.access(pathSrc);
  } catch (err) {
    throw new Error('File doesn\'t exist!');
  }
  let pathDstExist = false;
  try {
    await fsPromises.access(pathDst);
    pathDstExist = true;
  } catch (err) {
  }
  if (pathDstExist) {
    throw new Error('File already exists!');
  };
  await fsPromises.rename(pathSrc, pathDst)
};

export async function copyFile(dirCur, pathSrc, dirDst) {
  if (!path.isAbsolute(pathSrc)) {
    pathSrc = path.resolve(dirCur, pathSrc);
  }

  let stat = await fsPromises.stat(pathSrc);
  if (!stat.isFile()) {
    throw new Error('Incorrect file name!');
  }

  stat = await fsPromises.stat(dirDst);
  if (!stat.isDirectory()) {
    throw new Error('Incorrect directory name!');
  }

  const fileName = path.basename(pathSrc);
  const pathDst = path.resolve(dirDst, fileName);
  const readableStream = await fs.createReadStream(pathSrc);
  const writableStream = fs.createWriteStream(pathDst)

  await readableStream.pipe(writableStream);
};

export async function moveFile(dirCur, pathSrc, dirDst) {
  if (!path.isAbsolute(pathSrc)) {
    pathSrc = path.resolve(dirCur, pathSrc);
  }

  let stat = await fsPromises.stat(pathSrc);
  if (!stat.isFile()) {
    throw new Error('Incorrect file name!');
  }

  stat = await fsPromises.stat(dirDst);
  if (!stat.isDirectory()) {
    throw new Error('Incorrect directory name!');
  }

  const fileName = path.basename(pathSrc);
  const pathDst = path.resolve(dirDst, fileName);
  const readableStream = await fs.createReadStream(pathSrc);
  const writableStream = fs.createWriteStream(pathDst)

  await readableStream.pipe(writableStream);

  return new Promise((resolve, reject) => {
    readableStream.on('end', async () => {
      await fsPromises.rm(pathSrc);
      resolve();
    });

    writableStream.on('error', (err) => {
      reject(err);
    });

    readableStream.on('error', (err) => {
      reject(err);
    });
  })
};

export async function removeFile(dirCur, pathSrc) {
  if (!path.isAbsolute(pathSrc)) {
    pathSrc = path.resolve(dirCur, pathSrc);
  }
  await fsPromises.rm(pathSrc);
};
