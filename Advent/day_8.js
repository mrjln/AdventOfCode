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
  accumulator = 0;
  let index = 0;
  let indexes = [];

  while (indexes.indexOf(index) === -1) {
    indexes.push(index);
    if (index === commands.length) break;

    index += getStepsToMake(commands[index]);
  }
  return index === commands.length;
};

const checkNewLoop = (briljant, i, newValue) => {
  briljant[i].name = newValue;
  return loop(briljant);
};

const checkLoop = (commands) => {
  commands.forEach((command, i) => {
    const copy = JSON.parse(JSON.stringify(commands));
    if (command.name == "nop") {
      if (checkNewLoop(copy, i, "jmp")) {
        console.log("YESS", accumulator);
      }
    }
    if (command.name == "jmp") {
      if (checkNewLoop(copy, i, "nop")) {
        console.log("YESssssS", accumulator);
      }
    }
    return;
  });
};

checkLoop(data);
