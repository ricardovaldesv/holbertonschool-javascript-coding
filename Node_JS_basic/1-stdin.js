process.stdin.setEncoding('utf8');
console.log('Welcome to Holberton School, what is your name?');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`Your name is: ${chunk}`);
    console.log('This important software is now closing');
  }
  process.exit();
});
