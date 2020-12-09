const fs = require('fs')
const input = fs.readFileSync('./input_2.txt', 'utf-8')
                .trim().replace(/(\r|\r)/gm, "")
                .split('\n')
                console.log(input)

const pwObjects = input.map(password => {
    // console.log("first", password)
    const pw = password.split(' ');
    // console.log("before", pw)

    //  console.log(Number(pw[0].split("-").shift()), Number(pw[0].split("-").pop()), pw[1].charAt(0), pw[2].split(''))
    const pwObject = {
        lowValue: Number(pw[0].split("-").shift()), 
        highValue: Number(pw[0].split("-").pop()),
        letter: pw[1].charAt(0),
        password: pw[2].split('')
    }
    // console.log(pwObject)
    return  pwObject
})


// function countCorrectPWs(){
//     return pwObjects.filter(pwObject => {
//           const amountLetterInPW = pwObject.password.filter(x => x === pwObject.letter).length
//           return amountLetterInPW >= pwObject.lowValue && amountLetterInPW <= pwObject.highValue
//     }).length

// }

function countCorrectPWs(){
     return pwObjects.filter(pw => {
         console.log(pw)
         const isLetterInLowPos = pw.password[pw.lowValue -1] === pw.letter
         const isLetterInHighPos = pw.password[pw.highValue-1] === pw.letter 
         const areBothLetterinPos = isLetterInLowPos && isLetterInHighPos
         console.log("low:", isLetterInLowPos, "high:", isLetterInHighPos, "both:", areBothLetterinPos)
          console.log((isLetterInHighPos || isLetterInLowPos) && !areBothLetterinPos)
          return ((isLetterInHighPos || isLetterInLowPos) && !areBothLetterinPos)
      }).length

    }

console.log(countCorrectPWs(pwObjects))