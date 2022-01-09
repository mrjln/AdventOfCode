const fs = require("fs");
const input = fs
  .readFileSync("./advent_of_code/2021/input.txt", "utf-8")
  .trim()
  .split("\n");

const computerLines = input.map((line) => line.split(""));

// for all openings, there must be a closing pair
// if closing bracket is missing --> incomplete
// if closing bracket is not what you expected --> corrupted

const getSolutionOne = (lines) => {
  const openingbrackets = ["(", "[", "{", "<"];
  const closingbrackets = [")", "]", "}", ">"];
  let foundCorruptedItems = [];

  lines.forEach((line) => {
    // let foundOpeningbrackets = [];
    // foundOpeningbrackets = line.filter(
    //   (bracket) => openingbrackets.indexOf(bracket) != -1
    // );
    // let foundClosingbrackets = [];
    // foundClosingbrackets = line.filter(
    //   (bracket) => closingbrackets.indexOf(bracket) != -1
    // );

    let foundOpeningbrackets = [];

    for (let i = 0; i < line.length; i++) {
      let char = line[i];
      if (openingbrackets.indexOf(char) != -1) foundOpeningbrackets.push(char);
      if (closingbrackets.indexOf(char) != -1) {
        let matchingOpening = openingbrackets[closingbrackets.indexOf(char)];
        if (
          matchingOpening ==
          foundOpeningbrackets[foundOpeningbrackets.length - 1]
        ) {
          foundOpeningbrackets.pop();
        } else {
          foundCorruptedItems.push(line[i]);
          break;
        }
      }
    }
  });
  return foundCorruptedItems;
};

const corrItems = getSolutionOne(computerLines);

const getScore = (corruptedItems) => {
  let score = 0;
  corruptedItems.forEach((item) => {
    if (item == ")") score += 3;
    if (item == "]") score += 57;
    if (item == "}") score += 1197;
    if (item == ">") score += 25137;
  });
  return score;
};

const getSolutionTwo = (lines) => {
  const openingbrackets = ["(", "[", "{", "<"];
  const closingbrackets = [")", "]", "}", ">"];

  const remainingClosings = [];

  lines.forEach((line) => {
    // let foundOpeningbrackets = [];
    // foundOpeningbrackets = line.filter(
    //   (bracket) => openingbrackets.indexOf(bracket) != -1
    // );
    // let foundClosingbrackets = [];
    // foundClosingbrackets = line.filter(
    //   (bracket) => closingbrackets.indexOf(bracket) != -1
    // );

    let foundOpeningbrackets = [];

    for (let i = 0; i < line.length; i++) {
      let char = line[i];
      if (openingbrackets.indexOf(char) != -1) foundOpeningbrackets.push(char);

      if (closingbrackets.indexOf(char) != -1) {
        let matchingOpening = openingbrackets[closingbrackets.indexOf(char)];
        if (
          matchingOpening ==
          foundOpeningbrackets[foundOpeningbrackets.length - 1]
        ) {
          foundOpeningbrackets.pop();
        } else {
          foundOpeningbrackets = [];
          break;
        }
      }
    }

    const remaining = foundOpeningbrackets
      .map((openingBracket) => {
        return closingbrackets[openingbrackets.indexOf(openingBracket)];
      })
      .reverse();
    remainingClosings.push(remaining);
  });

  return remainingClosings.filter((array) => array.length);
};

const getScores = (remainingClosingLines) => {
  return remainingClosingLines.map((line) => {
    let score = 0;
    line.forEach((item) => {
      score = score * 5;
      if (item == ")") score += 1;
      if (item == "]") score += 2;
      if (item == "}") score += 3;
      if (item == ">") score += 4;
    });
    return score;
  });
};

const answer = getScores(getSolutionTwo(computerLines)).sort((a, b) => a - b);

console.log(answer[Math.round((answer.length - 1) / 2)]);
