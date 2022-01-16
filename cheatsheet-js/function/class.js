// JS doesn't have a class, it can be mimicked using functions and objects

// constructor function: used to create an object

function House(bed, bath, sqf) {
    this.bed = bed
    this.bath = bath
    this.sqf = sqf
}
var house1 = new House(2, 2, 2) 
console.log('class: ', house1)

function Dog(name, age) {
    this.name = name
    this.age = age
    this.bark = function(){
        console.log(this.name + ' bark')
    }
}
var rock = new Dog('rock', 40)
rock.bark()

function Car(make, model, year) {
    this.make = make
    this.model = model
    this.year = year
}

function Motorcycle(make, model, year) {
    Car.call(this, make, model, year)
    Car.apply(this, [make, model, year])
    this. wheels = 2
}

function MotorcycleArg() {
    Car.apply(this, arguments) // all the list of arguments that are passed to a function, this won't work with 'call'
    this. wheels = 2
}

function argumentsTest() {
    return arguments
}
console.log('class argument test: ', argumentsTest(1, 2, 3, 4))

// PART 1

// Create a constructor function for a Person, each person should have a firstName, lastName, favoriteColor and favoriteNumber. Your function MUST be named Person. 

// Write a method called multiplyFavoriteNumber that takes in a number and returns the product of the number and the object created from the Person functions' favorite number.

// PART 2

// Given the following code - refactor the Child function to remove all the duplication from the Parent function. You should be able to remove 4 lines of code in the Child function and replace it with 1 single line.

function Parent(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteFood = favoriteFood;
    this.m// PART 1

// Create a constructor function for a Person, each person should have a firstName, lastName, favoriteColor and favoriteNumber. Your function MUST be named Person. 

// Write a method called multiplyFavoriteNumber that takes in a number and returns the product of the number and the object created from the Person functions' favorite number.

// PART 2

// Given the following code - refactor the Child function to remove all the duplication from the Parent function. You should be able to remove 4 lines of code in the Child function and replace it with 1 single line.

function Humen(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteNum = favoriteFood;
    this.multiplyFavoriteNumber = function(num) {
        return num * this.favoriteNum
    }
}

function Parent(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteFood = favoriteFood;
}

function Child(firstName, lastName, favoriteColor, favoriteFood){
    // this.firstName = firstName;
    // this.lastName = lastName;
    // this.favoriteColor = favoriteColor;
    // this.favoriteFood = favoriteFood;
    // invoke the parent
    Parent.apply(this, arguments)
}
}

function Child(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteFood = favoriteFood;
}