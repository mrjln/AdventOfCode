const fs = require("fs");
const input = fs.readFileSync("./input_8.txt", "utf-8").trim().split("\n");

let accumulator = 0;
const data = input.map((commando) => {
  const command = {
    name: commando.split(" ")[0],
    amountOfSteps: Number(commando.split(" ")[1].replace("+", "")),
  };
  return command;
});

const addToAcc = (amount) => {
  accumulator += amount;
};

const getStepsToMake = (command) => {
  if (command.name == "nop") return 1;
  if (command.name == "jmp") return command.amountOfSteps;
  addToAcc(command.amountOfSteps);
  return 1;
};

const loop = (commands) => {
  let index = 0;
  let indexes = [];
  console.log(indexes.indexOf(index) === -1);
  while (indexes.indexOf(index) === -1) {
    indexes.push(index);
    console.log("old index:", index);
    index += getStepsToMake(commands[index]);
    console.log(
      "steps to make:",
      commands[index].amountOfSteps,
      "new index:",
      index
    );
  }
};

loop(data);
console.log("accumulator, answer:", accumulator);
