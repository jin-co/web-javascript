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
