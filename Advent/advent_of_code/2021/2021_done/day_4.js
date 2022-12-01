const fs = require("fs");
const input = fs
  .readFileSync("./passed_days/2021/input_4.txt", "utf-8")
  .trim()
  .split("\n\n");

const drawnNumbers =
  "73,42,95,35,13,40,99,92,33,30,83,1,36,93,59,90,55,25,77,44,37,62,41,47,80,23,51,61,21,20,76,8,71,34,58,5,52,22,39,57,17,2,26,0,10,72,19,3,64,65,82,46,31,63,91,24,18,12,9,79,50,98,69,4,78,54,43,68,87,7,67,48,28,89,94,53,85,81,49,88,6,96,29,56,97,66,38,16,32,70,74,27,84,86,45,75,60,15,14,11"
    .split(",")
    .map((number) => parseInt(number));

// seperate bingo kaarten
const bords = input
  .map((bord) => bord.split("\n"))
  .map((bord) => {
    return bord.map((row) => {
      return row
        .split(" ")
        .filter((i) => i !== "")
        .map((bingoNumber) => {
          return { bingoNumber: parseInt(bingoNumber), marked: false };
        });
    });
  });

const markDrawnNumber = (drawnNumber, bord) => {
  return bord.map((row) => {
    return row.map((number) => {
      if (number.bingoNumber === drawnNumber) {
        number.marked = true;
      }
      return number;
    });
  });
};

const checkIfBordWins = (bord) => {
  let bordwins = false;

  // rows
  bord.forEach((row) => {
    if (row.filter((number) => !number.marked).length == 0) {
      bordwins = true;
    }
  });

  // colums
  let n = 0;
  let j = 0;
  let columns = [];
  while (j < 5) {
    let col = [];
    n = 0;
    while (n < 5) {
      col.push(bord[n][j]);
      n++;
    }
    columns.push(col);
    j++;
  }

  columns.forEach((colum) => {
    if (colum.filter((number) => !number.marked).length == 0) {
      bordwins = true;
    }
  });

  return bordwins;
};

// mark drawn numbers

// check of bord wins horizontal or vertival

const calcWinningBord = (bord) => {
  const unmarkedNumbers = bord
    .map((row) => {
      return row.filter((number) => !number.marked);
    })
    .flat()
    .map((number) => number.bingoNumber);
  return unmarkedNumbers.reduce((a, b) => a + b);
};

// part 1
let winner = false;
let i = 0;
while (!winner) {
  bords.forEach((bord) => {
    markDrawnNumber(drawnNumbers[i], bord);
    if (checkIfBordWins(bord)) {
      winner = true;
      const sum = calcWinningBord(bord);
      const answer = sum * drawnNumbers[i];
      console.log(answer);
    }
  });
  i++;
}

//part 2
let lastWinner = false;
let numbersIndex = 0;
let winnersIndexes = [];
while (!lastWinner) {
  bords.forEach((bord, bordIndex) => {
    markDrawnNumber(drawnNumbers[numbersIndex], bord);

    if (checkIfBordWins(bord)) {
      console.log(bordIndex);
      if (winnersIndexes.indexOf(bordIndex) == -1) {
        winnersIndexes.push(bordIndex);
      }
    }
    if (winnersIndexes.length === bords.length) {
      lastWinner = true;
      const sum = calcWinningBord(bord);
      const answer = sum * drawnNumbers[numbersIndex];
      console.log(answer);
    }
  });
  numbersIndex++;
}
