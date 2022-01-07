/**
 * creates a new array
 * iterates through an array
 * runs a callback function on each value in the array
 * only if the callback function returns true, then the value will be added to the new array
 * the result of the callback will always be a boolean
 * good for remove some items in the array
 */

// filter anatomy
// arr.filter(function(value, index, array) {
//     return value > 2 // no need to use if
// })

// implementation
function filter(arr, callback) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            newArr.push(i)
        }
    }
    return newArr
}

let instructors = [
    {name: 'elie'},
    {name: 'eli'},
    {name: 'eie'},
    {name: 'elie'},
]
console.log(
instructors.filter(function(val, idx) {
    return val.name.length > 3
}))

function onlyFourLetterNames(arr) {
    return arr.filter((val) => {
        return val.length === 4
    })
}
console.log(onlyFourLetterNames(['wht', 'the', 'good']))

function divisibleByThree(arr) {
    return arr.filter((val) => {
        return val % 3 === 0
    })
}
console.log(divisibleByThree([1, 2, 3]))

/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.

Examples:
    filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner') // [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]
*/

function filterByValue(arr, key){
    return arr.filter((val) => {
        return val[key]
        // return val[key] !== undefined
    })
}
console.log(filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner'))

/*
Write a function called find which accepts an array and a value and returns the first element in the array that has the same value as the second parameter or undefined if the value is not found in the array.

Examples:
    find([1,2,3,4,5], 3) // 3
    find([1,2,3,4,5], 10) // undefined
*/

function find(arr, searchValue){
    // return arr.filter(function(val) {
    //     return val === searchValue
    // }) //wrong
    return arr.filter(function(val) {
        return val === searchValue
    })[0] // use index to access a certain value
}
console.log('find: ',find([1,2,3,4,3,5], 3))

/*
Write a function called findInObj which accepts an array of objects, a key, and some value to search for and returns the first found value in the arrayt.

Examples:
    findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true) // {first: 'Tim', last:"Garcia", isCatOwner: true}
*/

function findInObj(arr, key, searchValue){
    return arr.filter((val) => {
        return val[key] === searchValue
    })[0]
}
console.log(findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true))

/*
Write a function called removeVowels which accepts a string and returns a new string with all of the vowels (both uppercased and lowercased) removed. Every character in the new string should be lowercased.

Examples:
    removeVowels('Elie') // ('l')
    removeVowels('TIM') // ('tm')
    removeVowels('ZZZZZZ') // ('zzzzzz')
*/

function removeVowels(str){
    let letters = str.toLowerCase().split('')
    let vowels = 'aoieu'
    return letters.filter((val) => {
        return !vowels.includes(val)
    }).join('') //**note: join at the end */
}
console.log(removeVowels('Eliek'))

/*
Write a function called doubleOddNumbers which accepts an array and returns a new array with all of the odd numbers doubled (HINT - you can use map and fitler to double and then filter the odd numbers).

Examples:
    doubleOddNumbers([1,2,3,4,5]) // [2,6,10]
    doubleOddNumbers([4,4,4,4,4]) // []
*/

function doubleOddNumbers(arr){
    return arr.filter((val) => {
        return val % 2 !== 0 // here i can only check if it is true or not
    }).map((val) => { //**note: use map to multiply */
        return val * 2
    })
}
console.log(doubleOddNumbers([1,2,3,4,5]))

