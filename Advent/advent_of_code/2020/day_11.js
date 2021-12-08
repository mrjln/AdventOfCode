const fs = require("fs");
const input = fs
  .readFileSync("./input_11.txt", "utf-8")
  .trim()
  .split("\n")
  .map((x) => x.split(""));

// console.log(input);

const floor = ".";
const emptySeat = "L";
const occSeat = "#";

function getAnswer(lastRound) {
  let count = 0;
  lastRound.forEach((row) => {
    count += row.filter((item) => item == "#").length;
  });
  console.log("answer:", count);
}

// function checkSwitchAbility(topRow, currentRow, bottomRow, index) {
//   let adjOccSeats = 0;
//   if (checkValue(currentRow[index + 1])) adjOccSeats++;
//   if (checkValue(currentRow[index - 1])) adjOccSeats++;
//   if (topRow) {
//     if (checkValue(topRow[index])) adjOccSeats++;
//     if (checkValue(topRow[index - 1])) adjOccSeats++;
//     if (checkValue(topRow[index + 1])) adjOccSeats++;
//   }
//   if (bottomRow) {
//     if (checkValue(bottomRow[index])) adjOccSeats++;
//     if (checkValue(bottomRow[index - 1])) adjOccSeats++;
//     if (checkValue(bottomRow[index + 1])) adjOccSeats++;
//   }

//   if (currentRow[index] == "L" && adjOccSeats == 0) {
//     return true;
//   }
//   if (currentRow[index] == "#" && adjOccSeats >= 4) {
//     return true;
//   }
//   return false;
// }

function checkIfOccupied(value) {
  return value && value === occSeat && value !== floor;
}

function switchSeats(seatRows) {
  const copy = JSON.parse(JSON.stringify(seatRows));
  // console.log("new", copy);
  let switchCount = 0;
  let arrayCopy = [];
  seatRows.forEach((seatRow, rowIndex) => {
    let rowCopy = [];
    seatRow.forEach((seat, seatIndex) => {
      const amountOcc = getAmountOfOccSeatsInAllDirections(
        seatIndex,
        copy,
        rowIndex
      );
      const canSwitch = canSwitchPartTwo(amountOcc, copy[rowIndex][seatIndex]);
      // const canSwitch = checkSwitchAbility(
      //   seatRows[rowIndex - 1],
      //   seatRow,
      //   seatRows[rowIndex + 1],
      //   seatIndex
      // );

      if (canSwitch) {
        rowCopy.push(seat === "L" ? "#" : "L");
        switchCount++;
      } else {
        rowCopy.push(seat);
      }
    });
    arrayCopy.push(rowCopy);
  });

  if (switchCount !== 0) {
    switchSeats(arrayCopy);
  } else {
    getAnswer(arrayCopy);
    return arrayCopy;
  }
}

function canSwitchPartTwo(amountOcc, seat) {
  if (seat == "L" && amountOcc == 0) {
    return true;
  }
  if (seat == "#" && amountOcc >= 5) {
    return true;
  }
  return false;
}

function getAmountOfOccSeatsInAllDirections(
  curSeatIndex,
  allRows,
  curRowIndex
) {
  // console.log(
  //   "checking FROM seat:",
  //   curSeatIndex,
  //   "row:",
  //   curRowIndex,
  //   allRows[curRowIndex][curSeatIndex],
  //   allRows
  // );
  let amountOccSeats = 0;
  [-1, 0, 1].forEach((ystep) => {
    [-1, 0, 1].forEach((xstep) => {
      if (ystep == 0 && xstep == 0) return;
      // console.log("direction:", "x", xstep, "y", ystep);
      if (
        getOccSeatInDirection(xstep, ystep, curRowIndex, curSeatIndex, allRows)
      ) {
        amountOccSeats++;
      }
    });
  });
  // console.log("amount occ seats in sight", amountOccSeats);
  return amountOccSeats;
}

const getOccSeatInDirection = (
  Xsteps,
  Ysteps,
  curRowIndex,
  curSeatIndex,
  allRows
) => {
  let isFound = false;
  let i = 0;
  let nextRowIndex = curRowIndex;
  let nextSeatIndex = curSeatIndex;
  while (true) {
    i++;
    nextRowIndex += Ysteps;
    nextSeatIndex += Xsteps;
    if (nextRowIndex < 0 || nextRowIndex >= allRows.length) {
      // console.log("out of Y axis");
      break;
    }
    if (nextSeatIndex >= allRows[curRowIndex].length || nextSeatIndex < 0) {
      // console.log("out X axis");
      break;
    }

    const nextSeat = allRows[nextRowIndex][nextSeatIndex];
    // console.log(
    //   "Checking next in ONE direction",
    //   nextSeat,
    //   "ROW:",
    //   nextRowIndex,
    //   "SEAT:",
    //   nextSeatIndex,
    //   nextSeat
    // );
    if (nextSeat === emptySeat) {
      // console.log("found empty seat in sight");
      break;
    }
    if (checkIfOccupied(nextSeat)) {
      // console.log(
      //   "found occ in sight:",
      //   nextSeat,
      //   "loc: ",
      //   nextRowIndex,
      //   nextSeatIndex
      // );
      isFound = true;
      break;
    }
  }
  return isFound;
};

switchSeats(input);
