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
var tomCal = calculateSum.bind(tom, 1, 2, 3)
console.log('this bind: ', tomCal())
console.log('this bind: ', tomCal(3, 5))

 