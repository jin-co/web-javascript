/**
 * iterates through an array
 * runs a callback function on each value in the array
 * returns 'undefined' when the loop ends -> this is why I cannot store a value from or to a value in the forEach
 */

// foreach anatomy
// array.forEach((element, idx, array) => {
//     // fallback is executed 3times for each parameter
// });

// implementation
function forEach(array, callback) {
    for(var i = 0; i < array.length; i++) {
        callback(array[i], i, array)
        // functions that do not have return keyword always return 'undefined'
    }
}

function halfArray(arr) {
    let newArr = []
    arr.forEach(a => {
        newArr.push(a / 2)
    });
    return newArr
}
console.log(halfArray([2, 4, 7, 8]))

/*
Write a function called doubleValues which accepts an array and returns a new array with all the values in the array passed to the function doubled

Examples:
    doubleValues([1,2,3]) // [2,4,6]
    doubleValues([5,1,2,3,10]) // [10,2,4,6,20]

*/
function doubleValues(arr){
    let newArr = []
    arr.forEach(a => {
        newArr.push(a * 2)
    });
    return newArr
}
console.log(doubleValues([2, 4, 7, 8]))

/*
Write a function called onlyEvenValues which accepts an array and returns a new array with only the even values in the array passed to the function

Examples:
    onlyEvenValues([1,2,3]) // [2]
    onlyEvenValues([5,1,2,3,10]) // [2,10]

*/
function onlyEvenValues(arr){
    let newArr = []
    arr.forEach(a => {
        if(a % 2 == 0) newArr.push(a)
    });
    return newArr
}
console.log(onlyEvenValues([2, 4, 7, 8]))

/*
Write a function called showFirstAndLast which accepts an array of strings and returns a new array with only the first and last character of each string.

Examples:
    showFirstAndLast(['colt','matt', 'tim', 'udemy']) // ["ct", "mt", "tm", "uy"]
    showFirstAndLast(['hi', 'goodbye', 'smile']) // ['hi', 'ge', 'se']

*/
function showFirstAndLast(arr){
    let newArr = []
    arr.forEach(a => {
        newArr.push(a[0] + a[a.length - 1])
    });
    return newArr
}
console.log(showFirstAndLast(['colt','matt', 'tim', 'udemy']))

/*
Write a function called addKeyAndValue which accepts an array of objects, a key, and a value and returns the array passed to the function with the new key and value added for each object 

Examples:
    addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor') 
    
    // [{name: 'Elie', title:'instructor'}, {name: 'Tim', title:'instructor'}, {name: 'Matt', title:'instructor'}, {name: 'Colt', title:'instructor'}]

*/
function addKeyAndValue(arr,key,value){
    arr.forEach(a => {
        a[key] = value
    });
    return arr
}
console.log(addKeyAndValue([{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}], 'title', 'instructor'))

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/
function vowelCount(str){
    let vowels = 'ieaou'
    let newStr = str.toLowerCase().split('')
    console.log(newStr)

    let newArr = {}

    newStr.forEach(s => {
        if (vowels.includes(s, newStr)) {            
            newArr[s] = countVowel(s, newStr)
        }
    });
    return newArr
}

function countVowel(target, arr) {
    count = 0
    arr.forEach(a => {
        if(a == target)
        count++
    });
    return count
}
console.log(vowelCount('Elie'))

function vowelCount2(str) {
    var splitArr = str.split('')
    var obj = {}
    var vowels = 'aeiou'

    splitArr.forEach(i => {
        if(vowels.indexOf(i.toLowerCase()) != -1) {
            if(i in obj) { // if in: checks if the value exists in the object
                obj[i]++
            } else {
                obj[i.toLowerCase()] = 1
            }
        }
    });
    return obj
}
console.log(vowelCount2('Elie'))