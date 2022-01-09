/**
 * accepts a callback function and an optional second parameter
 * iterates through an array
 * runs a callback on each value in the array
 * the first parameter to the callback is either the first value in the array or the optional second parameter
 * the returned value from the callback becomes the new value of accumulator
 * whatever is returned from the callback function, becomes the new value of the accumulator
 * *simply put, it accumulate value in an array
 */ 

// arr.reduce(function(accumulator, nextValue, idx, arr) {
//     return val < 2
// }, optional startingValue) 
/*
say if 10 is starting value then it accumulator uses 10 as a starting value and adds every value in the array from the beginning
same logic applies to a string
*/

// implement

var names = ['tim', 'matt', 'colt', 'elie']
names.reduce(function(acc, next) {
    return acc += ' ' + next
}, 'instructors are')
console.log('reduce: ', 
    names.reduce(function(acc, next) {
        return acc += ' ' + next
    }, 'instructors are')
)

// counting duplicate values
function countDuplicate(arr) {
    return arr.reduce(function(acc, next) {
        if (next in acc) {
            acc[next]++
        } else {
            acc[next] = 1
        }
        return acc
    }, {}) // note: an empty object is used to start with
}
console.log('reduce: ', countDuplicate([1, 2, 5, 1, 2]))

function sumOddNumbers(arr) {
    return arr.reduce(function(acc, next) {
        if (next % 2 !== 0) {
            acc += next
        }
        return acc
    }, 0) 
}
console.log('reduce: ', sumOddNumbers([1, 2, 5, 1, 2]))

function createFullName(arr) {
    return arr.reduce(function(acc, next) {
        acc.push(next.first + " " + next.last)
        return acc
    }, []) 
}
console.log('reduce: ', createFullName([
    {first: 'what', last: 'the'},
    {first: 'what', last: 'the'},
    {first: 'what', last: 'the'}
]))


/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.

Examples:
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    extractValue(arr,'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractValue(arr, key){
    return arr.reduce((acc, next) => {
        acc.push(next[key])
        return acc
        // return acc.push(next[key]) // this doesn't work
    }, [])   
}
console.log('reduce extractValue: ', extractValue(
    [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    , 'name'
))

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
    let vowels = 'iouae'
    return str.toLowerCase().split('').reduce(function(acc, next) {
        if (vowels.includes(next)) {
            if (next in acc) {
                acc[next]++
            } else {
                acc[next] = 1
            }
        }
        return acc
    }, {})
}
console.log('reduce vowelCount: ', vowelCount('Elie'))

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
    
    addKeyAndValue(arr, 'title', 'Instructor') // 
      [
        {title: 'Instructor', name: 'Elie'}, 
        {title: 'Instructor', name: 'Tim'}, 
        {title: 'Instructor', name: 'Matt'}, 
        {title: 'Instructor', name: 'Colt'}
       ]
*/

function addKeyAndValue(arr, key, value){
    return arr.reduce(function(acc, next) {
        acc.push({
            [key]: value,
            name: next.name
        })
        return acc
    }, [])
}
console.log('reduce addKeyAndValue: ', addKeyAndValue(
    [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}],
    'title',
    'instructor'
))

/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray. 

Examples:
    
    function isEven(val){
        return val % 2 === 0;
    }
    
    var arr = [1,2,3,4,5,6,7,8];
    
    partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];
    
    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }
    
    var names = ['Elie', 'Colt', 'Tim', 'Matt'];
    
    partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]
*/

function partition(arr, callback){
    
}