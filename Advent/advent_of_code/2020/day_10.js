const fs = require("fs");
const input = fs.readFileSync("./input_10.txt", "utf-8").trim().split("\n");

const adapterJoltages = input.map((x) => Number(x)).sort((a, b) => a - b);

adapterJoltages.unshift(0);
adapterJoltages.push(adapterJoltages[adapterJoltages.length - 1] + 3);

// part 1
function getAmountOfJoltSteps() {
  let accOneJolt = 0;
  let accThreeJolts = 0;
  adapterJoltages.forEach((adapterJoltage, i) => {
    const stepInJoltage = adapterJoltages[i + 1] - adapterJoltages[i];
    if (stepInJoltage === 1) accOneJolt++;
    if (stepInJoltage === 3) accThreeJolts++;
  });
}

// part 2

function checkValidStep(adapter1, adapter2) {
  const step = adapter2 - adapter1;
  console.log("step", step);
  return step === 1 || step === 2 || step === 3;
}

function checkValidArrangement(joltages) {
  const checkValid = joltages
    .map((joltage, i) => {
      if (i + 1 < joltages.length) {
        return checkValidStep(joltages[i], joltages[i + 1]);
      }
      return true;
    })
    .filter((x) => x !== true);
  console.log(checkValid);
  return checkValid.length === 0;
}

function checkArrangement(joltages) {
  let acc = 0;
  if (checkValidArrangement(joltages)) acc++;
  joltages.forEach((joltage, i) => {
    let iosi = 1;
    console.log("new swap");
    for (iosi; iosi < 3; iosi++) {
      if (i + iosi + 1 >= joltages.length) break;
      const copy = JSON.parse(JSON.stringify(joltages));
      const testArray = swapArrayElements(copy, i + 1, i + 1 + iosi);
      console.log("test", testArray);

      console.log("valid", checkValidArrangement(testArray), acc);
    }
  });
}

const swapArrayElements = (arr, indexA, indexB) => {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
  return arr;
};

checkArrangement([1, 2, 3, 4, 6, 8]);
// [1,2,3,4,6,9]

// 2,3,4
// 3,2,4
// 4,3,2

function combination(array, memo = {}) {
  const key = array.join`,`;
  if (key in memo) {
    return memo[key];
  }

  let result = 1;
  for (let i = 1; i < array.length - 1; i++) {
    if (array[i + 1] - array[i - 1] <= 3) {
      const arr2 = [array[i - 1]].concat(array.slice(i + 1));
      result += combination(arr2, memo);
    }
  }
  memo[key] = result;
  return result;
}

console.log(combination(adapterJoltages));
