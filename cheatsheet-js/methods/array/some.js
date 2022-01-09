/**
 * iterates through an array
 * runs a callback function on each value in the array
 * if the callback function returns true for at least one single value, return true other wise return false
 * the result of the callback will always be a boolean
 * doesn't return a new array or undefined. it returns true or false
 * *to be true, at least one is true
 */

// arr.some(function(val, idx, arr) {
//     return val < 2
// })

// implement
function some(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if(callback(array[i], i, array)) {
            return true
        }
    }
    return false
}

function hasEvenNumber(arr) {
    return arr.some((val) => {
        return val % 2 === 0
    })
}

function hasComma(str) {
    return str.split('').some((val) => {
        return val === ','
    })
}

/*
Write a function called hasOddNumber which accepts an array and returns true if the array contains at least one odd number, otherwise it returns false.

Examples:
    hasOddNumber([1,2,2,2,2,2,4]) // true
    hasOddNumber([2,2,2,2,2,4]) // false
*/

function hasOddNumber(arr){
    return arr.some((val) => {
        return val % 1 === 0
    })
}
console.log(hasOddNumber([1,2,2,2,2,2,4]))

/*
Write a function called hasAZero which accepts a number and returns true if that number contains at least one zero. Otherwise, the function should return false

Examples:
    hasAZero(3332123213101232321) // true
    hasAZero(1212121) // false
*/

function hasAZero(num){
    return num.toString().split('').some(function(val) {
        // return val % 10 === 0
        return val === '0'
    })
}
console.log('has a zero: ', hasAZero(123123414066))