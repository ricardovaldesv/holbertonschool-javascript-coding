// print process.argv
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});
console.log(process.argv);
if (process.getgid) {
  console.log('Current gid: ' + process.getgid());
}
if (process.getuid) {
  console.log('Current uid: ' + process.getuid());
}
if (process.getuid && process.setuid) {
  console.log('Current uid: ' + process.getuid());
  try {
    process.setuid(501);
    console.log('New uid: ' + process.getuid());
  }
  catch (err) {
    console.log('Failed to set uid: ' + err);
  }
}
console.log('Version: ' + process.version);
console.log(process.versions);
console.log('This platform is ' + process.platform);

var util = require('util');

console.log(util.inspect(process.memoryUsage()));

console.log('start');
process.nextTick(function() {
  console.log('nextTick callback');
});
console.log('scheduled');

console.log(process.hrtime());