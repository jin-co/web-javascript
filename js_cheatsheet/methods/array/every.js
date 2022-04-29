/**
 * iterates through an array
 * runs a callback function on each value in the array
 * only if every callback function returns true, return true other wise return false
 * the result of the callback will always be a boolean
 * doesn't return a new array or undefined. it returns true or false
 * *to be true, everything must be true
 */

// arr.every(function(val, idx, arr) {
//     return val < 2
// })

// implement
function every(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if(!callback(array[i], i, array)) {
            return false
        }
    }
    return true
}

function allArrays(arr) {
    return arr.every(Array.isArray)
}

function allLowerCase(str) {
    return str.split('').every((val) => {
        return val === val.toLowerCase()
    })
}

/*
Write a function called hasOnlyOddNumbers which accepts an array and returns true if every single number in the array is odd. If any of the values in the array are not odd, the function should return false. 

Examples:
    hasOnlyOddNumbers([1,3,5,7]) // true
    hasOnlyOddNumbers([1,2,3,5,7]) // false
*/

function hasOnlyOddNumbers(arr){
    return arr.every((val) => {
        return val % 1 === 0
    })
}
console.log(hasOnlyOddNumbers([1,3,5,7]))

/*
Write a function called hasNoDuplicates which accepts an array and returns true if there are no duplicate values (more than one element in the array that has the same value as another). If there are any duplicates, the function should return false.

Examples:
    hasNoDuplicates([1,2,3,1]) // false
    hasNoDuplicates([1,2,3]) // true
*/

function hasNoDuplicates(arr){
    return arr.every((val, idx, arr) => {
        // return arr.includes(val, idx + 1)
        return arr.indexOf(val) === arr.lastIndexOf(val)
    })
}
console.log('has no duplicate: ',hasNoDuplicates([1,2,3,1,4]))

/*
Write a function called hasCertainKey which accepts an array of objects and a key, and returns true if every single object in the array contains that key. Otherwise it should return false.

Examples:
    var arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
        {title: "Instructor", first: 'Matt', last:"Lane"}, 
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]
    
    hasCertainKey(arr,'first') // true
    hasCertainKey(arr,'isCatOwner') // false
*/

function hasCertainKey(arr, key){
    return arr.every(function(val) {
        // return val[key]
        return key in val
        // return val.hasOwnProperty(key)
    })
}
console.log('has key: ',
    hasCertainKey(
        [
            {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
            {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
            {title: "Instructor", first: 'Matt', last:"Lane"}, 
            {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
        ],'first')
        
)
        /*
Write a function called hasCertainValue which accepts an array of objects and a key, and a value, and returns true if every single object in the array contains that value for the specific key. Otherwise it should return false.

Examples:
    var arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
        {title: "Instructor", first: 'Matt', last:"Lane"}, 
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]
    
    hasCertainValue(arr,'title','Instructor') // true
    hasCertainValue(arr,'first','Elie') // false
    
*/

function hasCertainValue(arr, key, searchValue){
    return arr.every(function(val) {
        return val[key] === searchValue
    })
}
console.log('has certain val: ', 
    hasCertainValue(
        [
            {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
            {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
            {title: "Instructor", first: 'Matt', last:"Lane"}, 
            {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
        ],'title','Instructor')
)