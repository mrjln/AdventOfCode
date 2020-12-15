const fs = require('fs')
const input = fs.readFileSync('./input_1.txt', 'utf-8')
                .trim().replace(/(\r\n|\n|\r)/gm, "")
                .split(' ')
console.log(input)

// part 1
// function getNumber(input, array){
//     return array.filter(number => {
//         return Number(input) + Number(number) === 2020
//     })
// }

// const result = input.map(i => getNumber(i, input))

// part 2 

const result = input.map(firstItem => {
    return input.map(secondItem => {
        return input.map(thirdItem => {
            return Number(firstItem) + Number(secondItem) + Number(thirdItem) === 2020 ? [firstItem, secondItem, thirdItem] : 0
        }).filter(item => item != 0)
    }).filter(item => item != 0)
}).filter(item => item != 0)




console.log("result", result[0][0])
