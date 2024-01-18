import os from 'os';

export function getEOL() {
  console.log(`Default EOL: ${os.EOL}`);
}

export function getHomedir() {
  console.log(`Home Dir: ${os.userInfo().homedir}`);
}

export function getUsername() {
  console.log(`Username: ${os.userInfo().username}`);
}

export function getArch() {
  console.log(`CPU architecture: ${os.arch()}`);
}

export function getCpu() {
  const cpus = os.cpus();
  const res = cpus.map(item => {
    return {
      model: item.model,
      rate: `${item.speed / 1000} GHz`
    }
  })
  console.log(`Total amount of CPUS: ${cpus.length}`);
  console.log(res);
}