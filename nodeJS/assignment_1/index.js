const quiz = document.querySelectorAll("button");
const rightAnswer = document.getElementById("left");
const wrongAnswer = document.getElementById("right");
const questions = [
    {
    quiz: ["Rabbit is mammal: \nYes or No"],
    answer: ["yes"]
    },
    
    {
    quiz: ["4 + 6 ?\n7\n8\n9\n10"],
    answer: [10]
    },
     
    {
    quiz: ["The color of banana is ?\nRed\nBlue\nYellow\nGreen"],
    answer: ["yellow"]
    },

    {
    quiz: ["3 - 1 ?\n1\n2\n3\n4"],
    answer: [2]
    },

    {
    quiz: ["2 * 2 ?\n3\n4\n5\n6"],
    answer: [4]
    }
]

var answer;
var score = 0;

// create click events that allow users to try quizzes
for (var i = 0; i < document.querySelectorAll("button").length; i++)
{
    quiz[i].addEventListener("click",function() {
        if (this.innerText == 2 || this.innerText == 4 || this.innerText == 5)
        {
            answer = prompt(questions[(this.innerText)-1].quiz);
            while(isNaN(parseInt(answer)) && answer != null)
            {
               answer = prompt("You have not entered a numeric value! Please enter again\n" + questions[(this.innerText)-1].quiz);
            }
        }

        else
        {
            answer = prompt(questions[(this.innerText)-1].quiz);
        }
        showResult(answer, (this.innerText)-1, this.nextElementSibling);
    });
}

// show if the answer is right or wrong
// if it is right answer add score by 1
function showResult(answer, questionNumber, resultElement) {
    if (isRightAnswer(answer, questionNumber))
    {
        resultElement.innerHTML = "Correct!";
        resultElement.removeAttribute("style");
        resultElement.style.backgroundColor = "#69b0f8";
        score++;
        document.getElementById("score").innerHTML = score;
    }

    else
    {
        resultElement.innerHTML = "Incorrect!";
        resultElement.removeAttribute("style");
        resultElement.style.backgroundColor = "#f79bb3";
    }
}

// decide if it is the right answer
function isRightAnswer(answer, questionNumber) {
    if (answer == questions[questionNumber].answer)
    {
        return true;
    }

    else
    {
        return false;
    }
}


