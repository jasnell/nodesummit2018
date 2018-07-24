setImmediate(() => console.log('c'));

new Promise((resolve, reject) => {
  for (var n = 0; n < 1e9; n++) {}
  resolve('a');
}).then(console.log);

new Promise((resolve, reject) => {
  for (var n = 0; n < 1e4; n++) {}
  resolve('b');
}).then(console.log);

new Promise((resolve, reject) => {
  process.nextTick(() => resolve('e'));
}).then(console.log);

new Promise((resolve, reject) => {
  setImmediate(() => resolve('f'));
}).then(console.log);

process.nextTick(() => console.log('d'));
