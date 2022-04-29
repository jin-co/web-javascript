/**
 * all object created by a function using 'new' keyword have shared prototype 
 * if methods and properties are not found js keeps going into the __proto__ property until the methods and properties are found
 */

// function Person(name) {
//     this.name = name
//     this.sayHi = function() {
//         return 'hi ' + this.name
//     }
// }

// tom = new Person('tom')
// console.log('prototype: ', tom.sayHi())

// using prototype
function Person(name) {
    this.name = name
}

Person.prototype.sayHi = function() {
    return 'hi ' + this.name
}

tom = new Person('tom') // this is better because it only needs to be create once and shared among the instances created using the same object
console.log('prototype: ', tom.sayHi())

function Vehicle(make, model, year) {
    this.make = make
    this.model = model
    this.year = year
    this.isRunning = false
}

Vehicle.prototype.turnOn = function() {
    this.isRunning = true
}

Vehicle.prototype.turnOff = function() {
    this.isRunning = false
}

Vehicle.prototype.honk = function() {
    if (this.isRunning) {
        return 'beep'
    }
}

// 1 - Create a constructor function for a Person. Each person should have a firstName, lastName, favoriteColor, favoriteNumber)
function PPerson(firstName, lastName, favoriteColor, favoriteNumber) {
    this.firstName = firstName
    this.lastName = lastName
    this.favoriteColor = favoriteColor
    this.favoriteNumber = favoriteNumber
    this.family = []
}

/* 2 - Add a function on the Person.prototype called fullName that returns the firstName and lastName property of an object created by the Person constructor concatenated together.
    
Examples:    
    var person = new Person("Elie", "Schoppik", "purple", 34)
    person.fullName() // "Elie Schoppik"

*/
PPerson.prototype.fullName = function() {
    return this.firstName + ' ' + this.lastName
}
var one = new PPerson('o', 'n', 'e', 3)
console.log('prototype fullname: ', one.fullName())

/* 4 - Add a function on the Person.prototype called addToFamily which adds an object constructed from the Person constructor to the family array. To make sure that the object you are adding is an object construced from the Person constructor (HINT - take a look at the instanceof keyword). Make sure that your family array does not include duplicates! This method should return the length of the family array.

Examples: 
    
    var person = new Person("Elie", "Schoppik", "purple", 34)
    var anotherPerson = new Person()
    person.addToFamily(anotherPerson); // 1
    person.addToFamily(anotherPerson); // 1
    person.family.length // 1
    
    person.addToFamily("test"); // 1
    person.addToFamily({}); // 1
    person.addToFamily([]); // 1
    person.addToFamily(false); // 1
    person.family.length // 1
*/

PPerson.prototype.addToFamily = (person) => {
    if(this.family.indexOf(person) === -1 && person instanceof Person) {
        this.family.push(person)
    }
    return this.family.length
}

// PART II 

// 1 - Implement your own version of Array.prototype.map. The function should accept a callback and return a new array with the result of the callback for each value in the array. 

/* 2 - Implement a function called reverse that reverses a string and place it on the String.prototype

Examples:
    "test".reverse() // "tset"
    "tacocat".reverse() // "tacocat"
*/
Array.prototype.map = (callback) => {
    var newArr = []
    for (let i = 0; i < this.length; i++) {
        newArr.push(callback(this[i], i, this))
    }
    return newArr
}

String.prototype.reverse = function() {
    var newStr = ''
    for (let i = 0; i >= this.length; i--) {
        newStr += this[i]
    }
    return newStr
}
