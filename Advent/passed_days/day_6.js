const fs = require("fs");
const input = fs.readFileSync("./input_6.txt", "utf-8").trim().split("\n\n");
console.log(input);

function getUniqueValues(groupArray) {
  const uniqueValues = groupArray.reduce((accumulator, currentValue) => {
    if (accumulator.indexOf(currentValue) == -1) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
  return uniqueValues;
}

// const amountsPerGroup = input.map((group) => {
//   const groupArray = group.split("\n").join("").split("");
//   console.log(groupArray);
//   return getAmountPerGroup(groupArray);
// });

function checkIfLetterInAllPersons(letter, group) {
  const bla = group
    .map((person) => {
      return person.filter((lttr) => letter === lttr).length > 0;
    })
    .filter((x) => x == true);
  return bla.length === group.length;
}

const amountsPerGroup = input.map((group) => {
  const groupArray = group.split("\n");
  const uniquePersonAnswers = groupArray.map((person) => {
    return getUniqueValues(person.split(""));
  });
  console.log(uniquePersonAnswers);
  let bla;
  uniquePersonAnswers.forEach((person) => {
    let letters = person
      .map((letter) => {
        const letterInGroup = checkIfLetterInAllPersons(
          letter,
          uniquePersonAnswers
        );
        return letterInGroup ? letter : false;
      })
      .filter((x) => x !== false);
    console.log("same answers:", letters);
    bla = letters.length;
    return letters;
  });
  console.log(bla);
  return bla;
});

console.log("Bla", amountsPerGroup);

const answer = amountsPerGroup.reduce((a, b) => a + b);
console.log(answer);
