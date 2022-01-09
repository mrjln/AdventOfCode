const fs = require("fs");
const input = fs
  .readFileSync("./advent_of_code/2021/input.txt", "utf-8")
  .trim()
  .split(",")
  .map((string) => parseInt(string));

// Part one
// let lanternFish = input;
// const amountOfDays = 80;
// let i = 0;

// while (i < amountOfDays) {
//   let fishToBeAdded = [];
//   lanternFish = lanternFish.map((fish) => {
//     if (fish == 0) {
//       fishToBeAdded.push(8);
//       return 6;
//     }
//     return fish - 1;
//   });
//   lanternFish = lanternFish.concat(fishToBeAdded);
//   i++;
// }
// console.log(lanternFish.length);

let lanternFish = input;
const amountOfDays = 256;
let i = 0;

let amountOfFish = [
  lanternFish.filter((fish) => fish == 0).length,
  lanternFish.filter((fish) => fish == 1).length,
  lanternFish.filter((fish) => fish == 2).length,
  lanternFish.filter((fish) => fish == 3).length,
  lanternFish.filter((fish) => fish == 4).length,
  lanternFish.filter((fish) => fish == 5).length,
  lanternFish.filter((fish) => fish == 6).length,
  0,
  0,
];

while (i < amountOfDays) {
  let hoeveelheidVissen = [...amountOfFish];
  hoeveelheidVissen.forEach((fish, j) => {
    if (j == 8) {
      hoeveelheidVissen[8] = amountOfFish[0];
    } else if (j == 6) {
      hoeveelheidVissen[6] = amountOfFish[0] + amountOfFish[7];
    } else {
      hoeveelheidVissen[j] = amountOfFish[j + 1];
    }
  });
  amountOfFish = [...hoeveelheidVissen];

  i++;
}

console.log(amountOfFish.reduce((a, b) => a + b));
