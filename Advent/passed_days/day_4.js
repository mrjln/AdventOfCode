const fs = require('fs')
const input = fs.readFileSync('./input_4.txt', 'utf-8')
    .trim().replace(/(\r|\r)/gm, "")
    .split('\n\n')
console.log(input)

function getCredentials() {
    return input.map(credentials => {
        const removeSpaces = credentials.replace(/(\r\n|\n|\r)/gm, " ")
        let credentialArray = removeSpaces.split(' ')
        return Object.assign({}, ...credentialArray.map(key => {
            return { [key.substring(0, 3)]: key.slice(4, key.length) }
        }))
    })
}


const credentials = getCredentials();

function checkValidity(credits) {
    const validCredits = credits.filter(creditObject => {

        return (Object.keys(creditObject).length === 8 || (Object.keys(creditObject).indexOf("cid") == -1 && Object.keys(creditObject).length === 7))
    })
    return validCredits
}

// console.log(checkValidity(credentials))
const validCredentialsByLength = checkValidity(credentials)

const credits = validCredentialsByLength
console.log(credits.filter(pass => 
    pass.byr >= 1920 && 
    pass.byr <= 2002 && 
    pass.iyr >= 2010 && 
    pass.iyr <= 2020 && 
    pass.eyr >= 2020 && 
    pass.eyr <= 2030 && 
    pass.ecl.match(/amb|blu|gry|brn|grn|hzl|oth/) &&
    pass.pid && pass.pid.length == 9 && 
    pass.hgt && pass.hgt.match(/^[0-9]{3}(cm)|^[0-9]{2}(in)/) && 
    pass.hcl && pass.hcl.match(/#[a-z0-9]{6}/)
).length)

function checkKeys(credits) {
    let validPasports = 0
    console.log(credits.length)
    credits.forEach(creditObject => {
        let validity = true;
        const byr = creditObject["byr"];
        const iyr = creditObject["iyr"];
        const eyr = creditObject["eyr"];
        const hgt = creditObject["hgt"];
        const units = hgt.slice(hgt.length - 2, hgt.length)
        let array = hgt.split('')
        array.pop()
        array.pop()
        let heigth = array.join('');
        const hcl = creditObject["hcl"]
        const ecl = creditObject["ecl"]
        const pid = creditObject["pid"]
        const pidArray = pid.split('')
        const indexOfZeros = pidArray.map((pid, i) => pid === "0" ? i : null).filter(value => value != null)
        let pidValid = indexOfZeros.length == 0 ? true : indexOfZeros.length - 1 === indexOfZeros[indexOfZeros.length - 1];

        if (!(byr.length === 4 && Number(byr) >= 1920 && Number(byr) <= 2002)) {
            console.log("false byr", byr)
            validity = false;
            return
        }
        if (!(iyr.length === 4 && Number(iyr) >= 2010 && Number(iyr) <= 2020)) {
            console.log("false iyr", iyr)
            validity = false;
            return
        }
        if (!(eyr.length === 4 && Number(eyr) >= 2020 && Number(eyr) <= 2030)) {
            console.log("false eyr", eyr)
            validity = false;
            return
        }
        if (!(units !== "in" || units !== "cm")) {
            console.log("false units", units)
            validity = false;
            return
        }
        if (units === "in" && !(Number(heigth) >= 59 && Number(heigth) <= 76)) {
            console.log("false height in", heigth)
            validity = false;
            return
        }
        if (units === "cm" && !(Number(heigth) >= 150 && Number(heigth) <= 193)) {
            console.log("false height cm", heigth)
            validity = false;
            return
        }
        if (!(hcl.length === 7)) {
            console.log("false hcl", hcl)
            validity = false;
            return
        }
        if(!(["amb","blu","brn", "gry", "grn", "hzl", "oth"].indexOf(ecl) !== -1)){
            console.log("false ecl", ecl)
            validity = false;
            return
        }
        if(!(pid.length === 9)) {
            console.log("false pid", pid, pid.length)
            validity = false;
            return
        }
        validPasports++
        console.log(validity, creditObject)
    })
    return validPasports
}
// console.log(checkKeys(validCredentialsByLength))


    // credits.forEach(creditObject => {

    //     const byr = creditObject["byr"];
    //     if (!(byr.length === 4 && Number(byr) >= 1920 && Number(byr) <= 2002)) {
    //         console.log("false byr")
    //         validity = false;
    //     }
    //     const iyr = creditObject["iyr"];
    //     if (!(iyr.length === 4 && Number(iyr) >= 2010 && Number(iyr) <= 2020)) {
    //         console.log("false iyr")
    //         validity = false;
    //     }
    //     const eyr = creditObject["eyr"];
    //     if (!(eyr.length === 4 && Number(eyr) >= 2020 && Number(eyr) <= 2030)) {
    //         console.log("false eyr")
    //         validity = false;
    //     }
    //     const hgt = creditObject["hgt"];
    //     const units = hgt.slice(hgt.length - 2, hgt.length)
    //     let array = hgt.split('')
    //     array.pop()
    //     array.pop()
    //     let heigth = array.join('')
    //     if (units !== "in" || units !== "cm") validity = false;
    //     if (units === "in" && !(Number(height) >= 59 && Number(heigth) <= 76)) {
    //         validity = false
    //     }
    //     if (units === "cm" && !(Number(height) >= 150 && Number(heigth) <= 193)) {
    //         validity = false
    //     }

    // })