const fs = require('fs')
const input = fs.readFileSync('./input_5.txt', 'utf-8')
    .trim().replace(/(\r|\r)/gm, "")
    .split('\n\n')
console.log(input)