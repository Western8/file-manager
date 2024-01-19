import crypto from 'crypto';
import fsPromises from 'node:fs/promises';
import path from 'path';

export async function hashFile(dirCur, pathFile) {
  if (!path.isAbsolute(pathFile)) {
    pathFile = path.resolve(dirCur, pathFile);
  }

  const stat = await fsPromises.stat(pathFile);
  if (!stat.isFile()) {
    throw new Error('Incorrect file name!');
  }

  const hash = crypto.createHash('sha256');
  const file = await fsPromises.open(pathFile);
  const readableStream = file.createReadStream();

  return new Promise((resolve, reject) => {
    readableStream.on('data', async (chunk) => {
      hash.update(chunk);
    })
    readableStream.on('end', async () => {
      const res = hash.digest('hex');
      console.log('hash: ', res);
      resolve();
    })

    readableStream.on('error', (err) => {
      reject(err);
    });
  });
};
