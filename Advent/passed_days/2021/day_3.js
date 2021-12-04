const fs = require("fs");
const input = fs
  .readFileSync("./passed_days/2021/input_3.txt", "utf-8")
  .trim()
  .split("\n");

// parseInt(binary, 2);

const positionBits = input.map((bit) => {
  return bit.split("");
});

const getRow = (index) => {
  return positionBits.map((position, i) => {
    return position[index];
  });
};

const rates = positionBits.map((line) => {
  return line.map((number, i) => {
    return getRow(i);
  });
})[0];

const gammerate = rates
  .map((rate) => {
    const ones = rate.filter((number) => number === "1").length;
    const zeros = rate.filter((number) => number === "0").length;
    return ones > zeros ? "1" : "0";
  })
  .join("");

const epsilon = rates
  .map((rate) => {
    const ones = rate.filter((number) => number === "1").length;
    const zeros = rate.filter((number) => number === "0").length;
    return ones > zeros ? "0" : "1";
  })
  .join("");

console.log(parseInt(gammerate, 2) * parseInt(epsilon, 2));

rates.map((rate, i) => {
  const ones = rate.filter((number) => number === "1").length;
  const zeros = rate.filter((number) => number === "0").length;
  const mostcommon = ones > zeros ? "1" : "0";
    
});

const filterRates = (rates, index, condition) => {
  rates.filter((rate) => rate[index] === condition);
};

const co2 = 0;
