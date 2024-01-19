export const parseArgs = () => {
  const argv = Array.from(process.argv).slice(2);
  const argUsername = argv.find(item => item.split('=')[0] === '--username');
  let username = 'Anonymous';
  if (argUsername) {
    username = argUsername.split('=')[1];
  }
  console.log(`Welcome to the File Manager, ${username}!`);
  return username;
};

export const parseCommands = (str) => {
  const commands = str.split(' ');
  if (commands.length) {
    let args = commands.slice(1).join(' ');
    if (args[0] === '"') {
      commands[1] = args.split('"')[1];
      args = args.split('"').slice(2).join('"').trim();
      if (args[0] === '"') {
        commands[2] = args.split('"')[1];
      } else {
        commands[2] = args.split(' ')[0];
      }
    } else {
      args = commands.slice(2).join(' ').trim();
      if (args[0] === '"') {
        commands[2] = args.split('"')[1];
      } else {
        commands[2] = args.split(' ')[0];
      }
    }
  }

  return commands;
}
