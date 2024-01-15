const parseArgs = () => {
  const argv = Array.from(process.argv).slice(2);
  const argUsername = argv.find(item => item.split('=')[0] === '--username');
  if (argUsername) {
    console.log(`Welcome to the File Manager, ${argUsername.split('=')[1]}!`);
  }
};

parseArgs();