const fs = require("fs");
const input = fs.readFileSync("./input_9.txt", "utf-8").trim().split("\n");

const numbers = input.map((x) => Number(x));

const preamble = 25;

function checkPreamble(numberlist) {
  let index = preamble;
  let list = [...numberlist];
  while (true) {
    const preambleList = list.slice(index - preamble, index);
    if (!checkSum(preambleList, numberlist[index])) {
      break;
    }
    list.push(numberlist[index]);
    index++;
  }
  return numberlist[index];
}

function checkSum(range, output) {
  let foundSum = false;
  range.forEach((number, firstIndex) => {
    range.forEach((secondNumber, secondIndex) => {
      if (firstIndex == secondIndex) return;
      if (number + secondNumber === output) {
        foundSum = true;
      }
    });
  });
  return foundSum;
}

// console.log(checkSum([1, 2, 3], 4));

function checkRange(invalidNumber, range) {
  range.forEach((number1, i) => {
    let newRange = range.slice(i, range.length);
    let acc = [newRange[0]];

    newRange.forEach((numb2, index) => {
      let sum = addValuesInArray(acc);
      if (sum === invalidNumber && acc.length > 1) {
        console.log("found!", acc);
        const min = acc.reduce((a, b) => Math.min(a, b));
        const max = acc.reduce((a, b) => Math.max(a, b));
        console.log(min + max);
      }
      if (sum > invalidNumber) {
        // console.log("invalid");
      }
      if (newRange[index + 1]) acc.push(newRange[index + 1]);
      //   console.log(acc, sum);
    });
  });
}

function addValuesInArray(array) {
  return array.reduce((a, b) => a + b);
}

const invalid = checkPreamble(numbers);
checkRange(invalid, numbers);
