/**
 * creates a new array
 * runs a callback function to each value in the array
 * adds the result of that callback function to the new array
 * return the new array -> always returns a new array of the same length
 * good for creating a new array of the same length
 */

// map anatomy
// arr.map(function(value, index, array) {
//     return value * 2 // return must be inside loop -> omit return then it will return an array of undefined values
// })

// implementation
function map(array, callback) {
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        newArray.push(callback(arr[i], i, arr))
    }
    return newArray
}

function tripleValues(arr) {
    return arr.map((value) => {
        return value * 3 // remember without this value is undefined
    })
}
console.log(tripleValues([2, 3]))

function onlyFirstName(arr) {
    return arr.map(function(value) {
        return value.first
    })
}
console.log(onlyFirstName([
    {first: 'Tim', last: 'tok'},
    {first: 'Gim', last: 'tok'},
    {first: 'Zim', last: 'tok'},
]))

/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([1,-2,-3]) // [2,-4,-6]
*/

function doubleValues(arr){
    return arr.map((v) => {
        return v * 2
    })
}
console.log(doubleValues([2, 3, 5]))

/*
Write a function called valTimesIndex which accepts an array and returns a new array with each value multiplied by the index it is currently at in the array.

Examples:
    valTimesIndex([1,2,3]) // [0,2,6]
    valTimesIndex([1,-2,-3]) // [0,-2,-6]
*/

function valTimesIndex(arr){
    return arr.map(function(v, idx) {
        return v * idx
    })
}
console.log(valTimesIndex([3, 3, 6]))
/*
Write a function called extractKey which accepts an array of objects and some key and returns a new array with the value of that key in each object.

Examples:
    extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractKey(arr, key){
    return arr.map((val) => {
        return val[key]
    })
}
console.log(extractKey([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'name'))

/*
Write a function called extractFullName which accepts an array of objects and returns a new array with the value of the key with a name of "first" and the value of a key with the name of  "last" in each object, concatenated together with a space. 

Examples:
    extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]) // ['Elie Schoppik', 'Tim Garcia', 'Matt Lane', 'Colt Steele']
*/

function extractFullName(arr){
    return arr.map(function(val) {
        return val.first + ' ' + val.last
    })
}
console.log(extractFullName([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia"}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele"}]))