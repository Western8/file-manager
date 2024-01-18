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
    throw 'Incorrect file name!';
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
