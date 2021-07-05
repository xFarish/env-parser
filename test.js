const parser = require('./index');

parser(
    './test.env',
    true
);

console.log(process.env.TEST1);
console.log(process.env.TEST2);
console.log(process.env.TEST3);
console.log(process.env.TEST4);
console.log(process.env.TEST5);
console.log(process.env.TEST6);