// call back: function that is passed into another function as a parameter

// higher order function: function that accepts another function as a parameter

function callback() {
    console.log('hi')
}

function higherOrder(callback) {
    console.log('h')
    callback()
    console.log('i')
}

higherOrder(callback) //note: without parenthesis

// callbacks with anonymous functions
function greet(name, formatter) {
    console.log('hello ' + formatter(name))
}

greet('tim', function(name) {
    return name.toUpperCase()
})

// foreach
var strings = ['my', 'foreach', 'example']
var result = ''
strings.forEach((str, idx) => {
    if(strings.length - 1 === idx) {
        result += str + " "
    } else {
        result += str + "!!!"
    }
});
console.log(result)

result = "";
forEach(strings, function(str, index, array) {  
  if (array.length - 1 !== index){
    result += str + " ";
  } else {
    result += str + "!!!";
  }
});
console.log(result)

function forEach(arr, callback) {
    for (let i = 0; i < array.length; i++) {                
    }
}

function forEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i, arr)
    }
}