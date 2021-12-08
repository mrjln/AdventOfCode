const fs = require("fs");
const input = fs
  .readFileSync("./advent_of_code/2021/input_5.txt", "utf-8")
  .trim()
  .split("\n");

const generateCoordinates = (inputs) => {
  return inputs.map((line) => {
    const lineCoordinates = line.split("->");
    return lineCoordinates.map((coordinate) => {
      const x = coordinate.split(",")[0];
      const y = coordinate.split(",")[1];
      return { x: parseInt(x), y: parseInt(y) };
    });
  });
};

const filterDiagonals = (allCoordinates) => {
  return allCoordinates.filter((line) => {
    return line[0].x == line[1].x || line[0].y == line[1].y;
  });
};

const drawDiagram = (coordinates) => {
  let xMax = Math.max(
    ...coordinates.map((line) => [line[0].x, line[1].x]).flat()
  );

  let yMax = Math.max(
    ...coordinates.map((line) => [line[0].y, line[1].y]).flat()
  );

  return new Array(yMax + 1).fill(".").map(() => new Array(xMax + 1).fill("."));
};

const drawLine = (playingField, line) => {
  let start = 0;
  let end = 1;

  let xStart = line[start].x < line[end].x ? line[start].x : line[end].x;
  let xEnd = line[start].x > line[end].x ? line[start].x : line[end].x;
  let yStart = line[start].y < line[end].y ? line[start].y : line[end].y;
  let yEnd = line[start].y > line[end].y ? line[start].y : line[end].y;

  if (line[start].y == line[end].y) {
    while (xStart <= xEnd) {
      let currValue = playingField[line[start].y][xStart];
      playingField[line[start].y][xStart] =
        currValue == "." ? 1 : currValue + 1;
      xStart++;
    }
  } else if (line[start].x == line[end].x) {
    while (yStart <= yEnd) {
      let currValue = playingField[yStart][line[start].x];
      playingField[yStart][line[start].x] =
        currValue == "." ? 1 : currValue + 1;
      yStart++;
    }
  } else {
    if (
      (line[start].x < line[end].x && line[start].y < line[end].y) ||
      (line[start].x > line[end].x && line[start].y > line[end].y)
    ) {
      while (yStart <= yEnd && xStart <= xEnd) {
        let currValue = playingField[yStart][xStart];
        playingField[yStart][xStart] = currValue == "." ? 1 : currValue + 1;
        yStart++;
        xStart++;
      }
    } else if (line[start].x > line[end].x && line[start].y < line[end].y) {
      let endOfX = line[start].x;
      while (yStart <= yEnd && endOfX >= line[end].x) {
        let currValue = playingField[yStart][endOfX];
        playingField[yStart][endOfX] = currValue == "." ? 1 : currValue + 1;
        yStart++;
        endOfX--;
      }
    } else if (line[start].x < line[end].x && line[start].y > line[end].y) {
      let endOfY = line[start].y;
      while (endOfY >= line[end].y && xStart <= xEnd) {
        // draw /
        let currValue = playingField[endOfY][xStart];
        playingField[endOfY][xStart] = currValue == "." ? 1 : currValue + 1;
        endOfY--;
        xStart++;
      }
    }
  }

  return playingField;
};

const coordinates = generateCoordinates(input);
const filteredcoordinates = filterDiagonals(coordinates);
let diagram = drawDiagram(filteredcoordinates);

const drawLines = (field, coordinatesOfLines) => {
  let diag = [...field];
  coordinatesOfLines.forEach((line) => {
    diag = drawLine(diag, line);
  });
  return diag;
};

// part one
// const drawnDiagram = drawLines(diagram, filteredcoordinates);

// const answer = drawnDiagram
//   .map((line) => line.filter((coordinate) => coordinate >= 2))
//   .flat().length;

//part two
const drawnDiagram = drawLines(diagram, coordinates);

const answer = drawnDiagram
  .map((line) => line.filter((coordinate) => coordinate >= 2))
  .flat().length;
console.log(answer);
