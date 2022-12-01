const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n\n")
  .map((item) => item.split("\n"));

// Part 1
const caloriesPerElf = input.map((elf) =>
  elf.map((calorie) => Number(calorie)).reduce((a, b) => a + b)
);

const highestCalories = Math.max(...caloriesPerElf);

console.log("Part1:", highestCalories);

// Part 2
const c = caloriesPerElf.sort((a, b) => a - b);
const sumOfBest3 = [c[c.length - 1], c[c.length - 2], c[c.length - 3]].reduce(
  (a, b) => a + b
);
console.log("Part2", sumOfBest3);
