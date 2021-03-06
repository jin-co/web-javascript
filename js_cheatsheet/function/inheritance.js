/**
 * passes prototype of one constructor to another
 */

// Object.create -> for inheritance: it doesn't affect the original
function Student(firstName, lastName) {
  return personalbar.apply(this, arguments)
}
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student // resetting the constructor property



// 1 - Create a constructor function for a Vehicle. Each vehicle should have a make, model and year property.

// 2 - Add a function to the Vehicle prototype called start which returns the string "VROOM!"

// 3 - Add a function to the Vehicle prototype called toString which returns the string "The make, model, and year are" concatenated with the make, model and year property

/* Examples 
    var vehicle = new Vehicle("Tractor", "John Deere", 1999)
    vehicle.toString() // 'The make, model, and year are Tractor John Deere 1999'
*/

// 4 - Create a constructor function for a Car. Each object created from the Car function should also have a make, model, and year and a property called numWheels which should be 4. The Car prototype should inherit all of the methods from the Vehicle prototype

// 5 - Create a constructor function for a Motorcycle. Each object created from the Motorcycle function should also have a make, model, and year and a property called numWheels which should be 2. The Motorcycle prototype should inherit all of the methods from the Vehicle prototype

// inherit 1 thing from another

function Vehicle(make,model,year){
  this.make = make;
  this.model = model;
  this.year = year;
}

Vehicle.prototype.start = function(){
  return "VROOM!"
}

Vehicle.prototype.toString = () => {
  return "The make, model, and year are " + this.make + " " + this.model  + " " + this.year;
}

var vehicle = new Vehicle("Tractor", "John Deere", 1999)
console.log('inheritance toString: ', vehicle.toString())

function Car(make,model,year){
  Vehicle.apply(this, arguments)
  this.numWheels = 4;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Motorcycle(make,model,year){
  Vehicle.apply(this, arguments)
  this.numWheels = 2;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;