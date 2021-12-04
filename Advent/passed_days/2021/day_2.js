const fs = require("fs");
const input = fs
  .readFileSync("./passed_days/2021/input_2.txt", "utf-8")
  .trim()
  .split("\n");

const commands = input;

let horizon = 0;
let depth = 0;
let aim = 0;

commands.forEach((command) => {
  let commando = command.split(" ");
  if (commando[0] == "forward") {
    horizon = horizon + parseInt(commando[1]);
    console.log("aim", aim, parseInt(commando[1]));

    depth = depth + aim * parseInt(commando[1]);
    console.log("dpet", depth);
  }
  if (commando[0] == "down") {
    aim = aim + parseInt(commando[1]);
  }
  if (commando[0] == "up") {
    aim = aim - parseInt(commando[1]);
  }
});
console.log(horizon * depth);
