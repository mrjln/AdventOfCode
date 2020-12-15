const fs = require("fs");
const input = fs
  .readFileSync("./input_7.txt", "utf-8")
  .trim()
  .split("\n")
  .filter((x) => x);

const map = new Map();

function containsShinyGold(color) {
  if (color === "shiny gold") return true;
  if (!map.has(color)) return false;

  const innerBags = map.get(color);
  for (const { color: bag } of innerBags) {
    if (containsShinyGold(bag)) {
      return true;
    }
  }
  return false;
}

const inputLines = input;
inputLines.forEach((line) => {
  const [bag, containsBags] = line.split(" bags contain ");
  containsBags
    .replace(/\./, "")
    .split(", ")
    .map((txt) => {
      const { groups } = /((?<number>\d+) )?(?<color>.*)/.exec(
        txt.replace(/ bags?/, "")
      );

      if (!map.has(bag)) {
        map.set(bag, []);
      }
      map.set(bag, [...map.get(bag), groups.color]);
      if (!groups.number) groups.number = 0;
      map.set(bag, [...map.get(bag), groups]);
    });
});

const listOfColors = map.keys();
let total = 0;
for (const color of listOfColors) {
  if (containsShinyGold(color) && color != "shiny gold") {
    total++;
  }
}

// part 2
const shinyGoldBag = map.get("shiny gold");
console.log(shinyGoldBag.filter((x) => typeof x != "string"));

const countLayers = (color, amountOfBags) => {
  if (amountOfBags === 0) return 0;
  let layerBag = map.get(color);
  console.log("amount", amountOfBags);
  let counter = 1;

  layerBag = layerBag.filter((x) => typeof x != "string");
  for (const innerLayerBag of layerBag) {
    counter +=
      Number(innerLayerBag.number) *
      countLayers(innerLayerBag.color, Number(innerLayerBag.number));
    console.log("bab", innerLayerBag);
  }
  console.log("hoi", counter - 1);
  return counter;
};

countLayers("shiny gold", 1);
