const fs = require("fs");
const { get } = require("https");
const input = fs
  .readFileSync("./advent_of_code/2021/input_7.txt", "utf-8")
  .trim()
  .split(",");

const crabPositions = input.map((string) => parseInt(string));

const getFuelForPosition = (position) => {
  return crabPositions
    .map((crabPosition) => Math.abs(crabPosition - position))
    .reduce((a, b) => a + b);
};

const amountOfFuelPerPosition = crabPositions.map((crabPosition) => {
  return getFuelForPosition(crabPosition);
});
const answerOne = amountOfFuelPerPosition.reduce((a, b) => Math.min(a, b));

// part 2

// Driehoeksgetalberekenen
const getGrowingFuelForPosition = (position) => {
  return crabPositions
    .map((crabPosition) => {
      let steps = Math.abs(crabPosition - position);
      let acc = steps;
      while (steps > 0) {
        acc += steps - 1;
        steps--;
      }
      return acc;
    })
    .reduce((a, b) => a + b);
};

const highestPosition = crabPositions.reduce((a, b) => Math.max(a, b));

let position = 0;
const amountOfFuelPerPositionPartTwo = [];
while (position < highestPosition) {
  amountOfFuelPerPositionPartTwo.push(getGrowingFuelForPosition(position));
  position++;
}

const answerTwo = amountOfFuelPerPositionPartTwo.reduce((a, b) =>
  Math.min(a, b)
);

console.log(answerTwo);
