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

// findIndex
// the callback function has three parameters - the value you are iterating over, the index you are currently at, and the entire array
var langs1 = ["Java", "C++", "JavaScript"];
findIndex(langs1, function(lang, index, arr) {
  lang === "JavaScript";
});

var langs = ["Java", "C++", "Python", "Ruby"];
findIndex(langs, function(lang, index, arr) {
  return lang === "JavaScript";
});

var arr1 = [5,11,13,8,6,7];
findIndex(arr1, function(num, index, array) {
  return num % 2 === 0;
});

var arr = [3,4,6,2,1];
findIndex(arr, function(num, index, array) {
  return num === 6;
});

function findIndex(arr, callback) {    
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            console.log(i)
            return i
        }         
    }    
    return -1
}

// capitalize
function capitalize(word) {
    console.log(word)
    return word[0].toUpperCase() + word.slice(1)
}

function upperCaseWords(sentence) {
    var words = sentence.split(" ")
    for(var i = 0; i < words.length; i++) {
        words[i] = capitalize(words[i])
    }
    return words.join(" ")
}

console.log(upperCaseWords("lower case"))

// setInterval
function countDown(seconds) {
    var decrement = setInterval(() => {
        seconds--
        if (seconds <= 0) {
            clearInterval(decrement)
        }
        console.log(seconds)
    }, 1000)
}
countDown(4)

// promise
var p1 = new Promise(function(resolve, reject) {
    resolve([1, 2, 3, 4, 5])
    reject("Error")
})

p1.then(function(arr) {
    console.log("this function is called whenever resolve is invoked: ", arr)
}).catch(function(arr) {
    console.log("this function is called whenever reject is invoked: ", arr)
})

var p2 = new Promise(function(resolve, reject) {
    let num = Math.random()
    if(num < .5) {
        resolve([1, 2, 3, 4, 5])
    } else {
        reject("Error")
    }
})

p2.then(function(arr) {
    console.log("success: ", arr)
}).catch(function(arr) {
    console.log("fail: ", arr)
})

var promiseAsync = new Promise(function(resolve, reject) {
    setTimeout(() => {
        let randomNum = Math.floor(Math.random() * 10)
        resolve(randomNum)
    }, 4000)
})

promiseAsync.then(function(data) {
    console.log("promise with async: ", data)
})

var counter = 0;
setTimeout(function() {
    counter++
    console.log('nested async: ', counter)
    setTimeout(function() {
        counter++
        console.log('nested async: ', counter)
        setTimeout(function() {
            counter++
            console.log('nested async: ', counter)  
        }, 3000)  
    }, 2000)
}, 1000)

var counterChaining = 0;
function incCounter() {
    counter++
    console.log('counter chaining: ', counter)
}

function runLater(callback, timeInMs) {
    var p = new Promise(function(resolve, reject) {
        setTimeout(function() {
            var res = callback()
            resolve(res)
        }, timeInMs)
    })
    return p
}

runLater(incCounter, 1000).then(function() {
    return runLater(incCounter, 2000)
}).then(function() {
    return runLater(incCounter, 3000)
})


var promiseChaining = new Promise(function(resolve, reject) {
    setTimeout(function() {
        randomNum = Math.floor(Math.random() * 10)
        resolve(randomNum)
    }, 500)
})

promiseChaining.then(function(data) {
    console.log('chaining: ', data)
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(Math.floor(Math.random() * 10))
        }, 3000)
    })
}).then(function(data) {
    console.log('chaining: ', data)
})