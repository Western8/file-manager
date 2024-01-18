import fs from 'node:fs';
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
