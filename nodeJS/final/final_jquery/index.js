const input = document.getElementsByTagName("input");
const button = document.getElementById("button1");
const button1 = document.getElementById("button2");
const message = document.getElementById("display");
const change = document.getElementById("change");

button.addEventListener("click", () => {
    const input1 = parseInt(input[0].value);
    const input2 = parseInt(input[1].value);

    const result = input1 + input2;
    alert(result);
});

function go() {
    let num1 = parseInt(prompt("what"));
    let num2 = parseInt(prompt("and what"));
    alert(num1 + num2);
};

button1.addEventListener('click', goGo);
function goGo() {
    for (let i = 10; i >= 0; i--) {
        message.innerHTML += i;
    }
};

change.addEventListener("click", () => {
    change.style.backgroundColor = "blue";
})
change.addEventListener("dblclick", () => {
    change.style.backgroundColor = "red";
})

// jquery zone
$("#button3").on('click', () => {
    $("h1").hide();
})
$("#button4").on('click', () => {
    $("h1").toggle();
})
$("#button5").on('click', () => {
    $("h1").animate({
        height:"toggle",
        opacity: .3,
        color: "red"
        }, 1000);
})