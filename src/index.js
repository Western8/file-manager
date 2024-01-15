let username = '';

const parseArgs = () => {
  const argv = Array.from(process.argv).slice(2);
  const argUsername = argv.find(item => item.split('=')[0] === '--username');
  if (argUsername) {
    username = argUsername.split('=')[1];
  }
  console.log(`Welcome to the File Manager, ${username}!`);
};

parseArgs();

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', function() {
  process.exit(0);
});

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString().trim();
  if (chunkStringified === '.exit') {
    process.exit();
  }
};

process.stdin.on('data', echoInput);