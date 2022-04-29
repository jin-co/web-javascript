var button = document.getElementsByTagName("button");
var result = document.getElementById("result");

// loop through 1 to 100 
// print only even numbers
// if the number is 60 write "I can count"
function startLoop() {
    for (i = 1; i <= 100; i++) {
        
        if (i % 60 == 0) {
            result.textContent += "I can count" + ", ";
        }
        else if (i % 2 == 0) {
            result.textContent += i + ", ";
        }
        else if (i == 100) {
            result.textContent += i;
        }
    };
};