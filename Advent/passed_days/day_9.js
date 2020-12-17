const fs = require("fs");
const input = fs.readFileSync("./input_10.txt", "utf-8").trim().split("\n");

const numbers = input.map((x) => Number(x));
