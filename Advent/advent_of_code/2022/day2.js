const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((item) => item.split(" ").join(""));

const drawGames = ["AX", "BY", "CZ"];
const winForMe = ["AY", "BZ", "CX"];
const loseForMe = ["AZ", "BX", "CY"];

const lost = 0;
const draw = 3;
const win = 6;

const gameScores = (games) => {
  return games.map((game) => {
    let score = 0;
    if (drawGames.indexOf(game) !== -1) score = +draw;

    if (winForMe.indexOf(game) !== -1) score = +win;

    if (loseForMe.indexOf(game) !== -1) score = +lost;

    if (game[1] == "X") score = score + 1;
    if (game[1] == "Y") score = score + 2;
    if (game[1] == "Z") score = score + 3;

    return score;
  });
};

// console.log(gameScores.reduce((a, b) => a + b));

// Part 2

const strategicMoves = input.map((game) => {
  if (game[1] == "Y") {
    // draw
    return drawGames.find((drawGame) => game[0] == drawGame[0]);
  }
  if (game[1] == "X") {
    // lose
    return loseForMe.find((lostgame) => game[0] == lostgame[0]);
  }
  if (game[1] == "Z") {
    // win
    return winForMe.find((wonGame) => game[0] == wonGame[0]);
  }
});
console.log(gameScores(strategicMoves).reduce((a, b) => a + b));
