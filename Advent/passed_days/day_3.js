const fs = require('fs')
const input = fs.readFileSync('./input_3.txt', 'utf-8')
                .trim().replace(/(\r|\r)/gm, "")
                .split('\n')
                console.log(input)

const lines = input.map(line => {
    return line.split('')
})

console.log(lines.length)
lines.shift()

function doSteps(stepsRight, stepsDown, slopes) {
    console.log("==============")
    let countTrees = 0
    let currentIndex = 0
    slopes.forEach((slope, index) => {  
        if(stepsDown > 1 && index % 2 == 0) {
            // console.log("skip:", index)
            return
        } 
        currentIndex = (currentIndex + stepsRight) % slope.length
        // console.log("x stepright:", currentIndex, "y slope:", index) 
        // console.log("======", "index", currentIndex)
        // console.log("tree:", slope[currentIndex] === "#")
        if(slope[currentIndex] === "#"){ countTrees++ }
   })
   return countTrees
 }

 console.log("amount of trees", doSteps(1, 1, lines))
 console.log("ämount of trees ", doSteps(3, 1, lines))
 console.log("amount of trees", doSteps(5, 1, lines))
 console.log("amount of trees", doSteps(7, 1, lines))
 console.log("amount of trees", doSteps(1, 2, lines))

 console.log("amount:", doSteps(3,1, lines) * doSteps(1,1,lines) * doSteps(5,1,lines) * doSteps(7,1,lines) * doSteps(1,2, lines))


