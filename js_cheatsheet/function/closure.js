// a function that makes use of variable defined in outer functions that have previously returned

function outer() {
    var start = "Closures"
    return function inner() {
        return start + "what"
    }
}
console.log(
    'call outer function -> shows the definition: ', outer(), 
    '\ncall inner function -> shows the value: ', outer()()
)

function outer1(a) {
    return function inner(b) {
        return a + b
    }
}
console.log(outer1(5)(5))

function outerFn() {
    var data = "not remembered"
    var fact = "remembered"
    return function innerFn() {
        // debugger
        return fact
    }
}
var what = outerFn()
what()

function counter() {
    var count = 0
    return function() {
        count++
        return count
    }
}
var counter1 = counter()
console.log(counter1())
console.log(counter1())
var counter2 = counter()
console.log(counter2())
console.log(counter2())


function classRoom() {
    var instructors = ['Elie', 'Colt']
    return {
        getInstructors: function() {
            return instructors.slice() // this will return a copy
            // now it is completely private
            // return instructors
        },
        addInstructor: function(instructor) {
            instructors.push(instructor)
            return instructors.slice()
            // return instructors
        }
    }
}
var first = classRoom()
console.log(first.getInstructors())
first.addInstructor("Tim")
console.log(first.getInstructors())
first.getInstructors().pop() // this will end up removing a value which is not bad -> to prevent this return a copy of the array using slice
console.log(first.getInstructors())


/* 
Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it should return the product of the two. If the function is only passed one parameter - it should return a function which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this.

Examples: 

    specialMultiply(3,4); // 12
    specialMultiply(3)(4); // 12
    specialMultiply(3); // function(){}....
*/

function specialMultiply(a, b){
    if(arguments.length === 1) { // checking the numbers of arguments
        return function(b) {
            return a * b
        }
    }
    return a * b
}
console.log('closure specialMultiply: ', specialMultiply(2)())
/* 
Write a function called guessingGame which takes in one parameter amount. The function should return another function that takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a random number between 0 and 10 as well as a variable called guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should return the string "You got it!". If the guess is too high return "Your guess is too high!" and if it is too low, return "Your guess is too low!". You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the outer function.

You will have to make use of closure to solve this problem.

Examples (yours might not be like this, since the answer is random every time):

    var game = guessingGame(5)
    game(1) // "You're too low!"
    game(8) // "You're too high!"
    game(5) // "You're too low!"
    game(7) // "You got it!"
    game(1) // "You are all done playing!"

    var game2 = guessingGame(3)
    game2(5) // "You're too low!"
    game2(3) // "You're too low!"
    game2(1) // "No more guesses the answer was 0"
    game2(1) // "You are all done playing!"
*/

function guessingGame(amount){
    var answer = Math.floor(Math.random() * 11)
    var guesses = 0
    var completed = false
    return function(guess) {
        if (!completed) {
            guesses++
            if (guess === answer) {
                completed = true
                return "Got it"
            } 
            else if (guess > answer) return "too high"
            else if (guess < answer) return "too low"
            else if (guesses === answer) {
                completed = true
                return "no more " + answer
            }
        }
        return "done"
    }
}
