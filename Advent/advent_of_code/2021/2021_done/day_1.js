const fs = require("fs");
const input = fs
  .readFileSync("./passed_days/2021/input_1.txt", "utf-8")
  .trim()
  .split("\n");

let amountDeptIncrease = 0;

const debts = input.map((string) => {
  return parseInt(string);
});

const windowdebts = debts
  .map((debt, i) => {
    if (debts[i + 2]) {
      return debt + debts[i + 1] + debts[i + 2];
    }
  })
  .filter((debt) => debt);

const answer = windowdebts.reduce((prev, curr) => {
  if (prev < curr) {
    amountDeptIncrease++;
  }
  return curr;
});

console.log(amountDeptIncrease);
