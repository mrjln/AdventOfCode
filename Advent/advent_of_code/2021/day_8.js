const fs = require("fs");
const input = fs
  .readFileSync("./advent_of_code/2021/input.txt", "utf-8")
  .trim()
  .split("\n");

const model = input.map((line) => line.split(""));
const heightMap = model.map((row) => {
  return row.map((number) => parseInt(number));
});

const getLowPoints = (mapOfHeights) => {
  let lowpoints = [];
  mapOfHeights.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      let higherAdjacentPoints = [];
      let requiredAdjacentPoints = 4;
      const currentLocation = mapOfHeights[rowIndex][columnIndex];
      const getUp = () => {
        if (mapOfHeights[rowIndex - 1] !== undefined) {
          return mapOfHeights[rowIndex - 1][columnIndex];
        } else {
          requiredAdjacentPoints--;
          return null;
        }
      };

      const up = getUp();

      const getDown = () => {
        if (mapOfHeights[rowIndex + 1] !== undefined) {
          return mapOfHeights[rowIndex + 1][columnIndex];
        } else {
          requiredAdjacentPoints--;
          return null;
        }
      };

      const down = getDown();

      const getLeft = () => {
        if (mapOfHeights[rowIndex][columnIndex - 1] !== undefined) {
          return mapOfHeights[rowIndex][columnIndex - 1];
        } else {
          requiredAdjacentPoints--;
          return null;
        }
      };
      const left = getLeft();

      const getRight = () => {
        if (mapOfHeights[rowIndex][columnIndex + 1] !== undefined) {
          return mapOfHeights[rowIndex][columnIndex + 1];
        } else {
          requiredAdjacentPoints--;
          return null;
        }
      };

      const right = getRight();

      if (up && up > currentLocation) {
        higherAdjacentPoints.push(up);
      }
      if (down && down > currentLocation) {
        higherAdjacentPoints.push(down);
      }
      if (left && left > currentLocation) {
        higherAdjacentPoints.push(left);
      }
      if (right && right > currentLocation) {
        higherAdjacentPoints.push(right);
      }

      if (higherAdjacentPoints.length >= requiredAdjacentPoints) {
        lowpoints.push(currentLocation);
      }
    });
  });
  return lowpoints;
};

// const lowPoints = getLowPoints(heightMap);
// console.log(lowPoints);
// const riskLevels = lowPoints.map((point) => point + 1);

// const answer = riskLevels.reduce((a, b) => a + b);

const getBassins = (mapOfHeights) => {
  let lowpoints = [];
  mapOfHeights.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      function recurse() {
        if (condition) {
          recurse();
        } else {
          // stop calling recurse()
        }
      }

      recurse();
    });
  });
  return lowpoints;
};

console.log(getBassins(heightMap));
