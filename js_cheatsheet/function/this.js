// what is 'this'
// every time a function is run two special keywords are given:
// argument and this 
// four rules:
// 1. global
// - when 'this' is not inside of a declared object (only object not something else)
console.log(this) // window
function what() {return this} // window
function thisBecomesGlobalVariable() {
    this.person = 'what'
} // since this is a global object here anything attached will be a global variable

function omitVarThenItBecomesGlobalVariable() {
    person = 'amazing'
}
// -> but this is a bad practice so there is a feature to prevent this:
// -- write "use strict" at the top then every variable attached to this inside a function will become 'undefine'

// 2. Implicit / object
// - when 'this' is inside of a declared object value of 'this' will be the closest parent object 
var person = {
    first: 'El',
    say: function() {
        return 'hi' + this.first // refers to the person object
    },
    determine: function() {
        return this === person // true
    }
}
// - a *keyword 'this' is defined only when a function is run
var person = {
    determine: this
}
person.determine // window

// 3. Explicit binding
// can change the value of 'this'
// three methods:
// call, apply, and bind

var animal = {
    name: 'bolt',
    say: function() {
        return 'hi ' + this.name
    },
    determine: function() {
        return this === person
    },
    dog: {
        bark: function() {
            return 'bu ' + this.name
        },
        determine: function() {
            return this === person
        }
    }
}
// call(target, target, ...)
// used to eliminate a code duplication
console.log(animal.dog.bark.call(person)) // 'hi bolt'
console.log(animal.dog.determine.call(person)) // true

var colt = {
    first: 'colt',
    say: function() {
        return 'hi ' + this.first
    }
}

// var garbage = { // duplicate
//     first: 'el',
//     say: function() {
//         return 'hi ' + this.first
//     }
// }

var garbage = {
    first: 'el',    
}
console.log('this call: ', colt.say()) //** don't forget () at the end */
console.log('this call: ', colt.say.call(garbage))

function sayHi() {
    return 'hi ' + this.first
}

var tom = {
    first: 'tom'
}

var jack = {
    first: 'jack'
}
console.log('this call: ', sayHi.call(tom))

function addNums(a, b, c, d) {
    return this.first + ': ' + (a + b + c + d)
}
console.log(addNums.call(tom, 1, 2, 3, 4))
// apply(target, [target, ...])
// spreads out the values that is not in an array
// useful when a function doesn't accept an array
var nums = [3, 4, 5, 6]
console.log(Math.max(nums)) // NaN -> Math.max: accepts a list of comma separated values not an array
console.log(Math.max.apply(this, nums))

function calculateSum(a, b, c) {
    return a + b + c
}
console.log(calculateSum(nums))
console.log(calculateSum.apply(this, nums))

// bind(target, target, ...) -> returns a new function
// useful when we don't know the number of parameters for a function
// only bind can be used with async
var tomCal = calculateSum.bind(tom, 1, 2, 3)
console.log('this bind: ', tomCal())
console.log('this bind: ', tomCal(3, 5))

var ayncColt = {
    first: 'colt',
    say: function() {
        setTimeout(function() {
            console.log('this bind : hi ' + this.first)
        }.bind(this), 1000) // oddly, 'this' inside setTimeout refers to the global object
    }
}
ayncColt.say()


/*
Write a function called arrayFrom which converts an array-like-object into an array.

Examples:
    var divs = document.getElementsByTagName('divs');
    divs.reduce // undefined
    var converted = arrayFrom(divs);
    converted.reduce // function(){}....
*/

function arrayFrom(arrayLikeObject){
    return [].slice.call(arrayLikeObject)
}
console.log(arrayFrom('this arrayFrom: ', document.getElementsByTagName('divs')))

/* 
// Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.

Examples:
    sumEvenArguments(1,2,3,4) // 6
    sumEvenArguments(1,2,6) // 8
    sumEvenArguments(1,2) // 2
*/

function sumEvenArguments(){
    var result = [].slice.call(arguments)
    return result.reduce(function(acc, next) {
        if (next % 2 === 0) {
            return acc + next
        } 
        return acc
    }, 0)
}
console.log('this sumEvenArgument: ', sumEvenArguments())

/* 
Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should return a function that when called increments a counter. If the counter is greater than the maximum amount, the inner function should return "Maxed Out"

Examples:

    function add(a,b){
        return a+b
    }

    var addOnlyThreeTimes = invokeMax(add,3);
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(2,2) // 4
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(1,2) // "Maxed Out!"

*/

function invokeMax(fn, num){
    var max = 0
    return function() {
        if (max >= num) {
            return 'Maxed out'
        } 
        max++
        return fn.apply(this, arguments)
    }
}

/* 
Write a function called once which accepts two parameters, a function and a value for the keyword 'this'. Once should return a new function that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.

Examples:

    function add(a,b){
        return a+b
    }

    var addOnce = once(add, this);
    addOnce(2,2) // 4
    addOnce(2,2) // undefined
    addOnce(2,2) // undefined
    
    function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }
    
    var instructor = {firstName: "Elie"}
    var doMathOnce = once(doMath, instructor);
    doMathOnce(1,2,3) // "Elie adds 6"
    doMathOnce(1,2,3) // undefined
    

*/

function once(fn, thisArg){
    var hasBeenCalled = false
    return function() {
        if (!hasBeenCalled) {
            hasBeenCalled = true
            return fn.apply(thisArg, arguments)
        }
    }
}

/**
 * 4. new
 * we can set the context of the keyword 'this' using the 'new' keyword
 * it should be used with function
 */
function personNew(fir, la) {
    this.fir = fir
    this.la = la // this should refer to the window object but
}
var ali = new personNew('a', 'li') // whit new keyword 'this' refers to the object that is created

// BONUSES! 

/* 
Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Examples:

    function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
    }
    
    var person = {
        firstName: 'Elie'
    }
    
    var bindFn = bind(firstNameFavoriteColor, person);
    bindFn('green') // "Elie's favorite color is green"
    
    var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
    bindFn2('green') // "Elie's favorite color is blue" 
    
    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

    bind(addFourNumbers,this,1)(2,3,4) // 10
    bind(addFourNumbers,this,1,2)(3,4) // 10
    bind(addFourNumbers,this,1,2,3)(4) // 10
    bind(addFourNumbers,this,1,2,3,4)() // 10
    bind(addFourNumbers,this)(1,2,3,4) // 10
    bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10

*/

function bind(fn, thisArg){
    var outerArgs = [].slice.call(arguments, 2)
    return function() {
        var innerArgs = [].slice.call(arguments)
        var allArgs = outerArgs.concat(innerArgs)
        return fn.apply(thisArg, allArgs)
    }
}

/* 
Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the arguments passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure! 

Flip should return a new function that when invoked takes the correct number of required arguments to that function which are then reversed. HINT - you will need to use the .length property on functions to figure out the correct amount of arguments. For example:

flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) 




Examples:

    function personSubtract(a,b,c){
        return this.firstName + " subtracts " + (a-b-c);
    }
    
    var person = {
        firstName: 'Elie'
    }
    
    var flipFn = flip(personSubtract, person);
    flipFn(3,2,1) // "Elie subtracts -4"
    
    var flipFn2 = flip(personSubtract, person, 5,6);
    flipFn2(7,8). // "Elie subtracts -4"
    
    function subtractFourNumbers(a,b,c,d){
        return a-b-c-d;
    }

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/


function flip(fn, thisArg){
    var outerArgs = [].slice.call(arguments, 2)
    return function() {
        var innerArgs = [].slice.call(arguments)
        var allArgs = outerArgs.concat(innerArgs).slice(0, fn.length)
        return fn.apply(thisArg, allArgs.reverse())
    }
}

