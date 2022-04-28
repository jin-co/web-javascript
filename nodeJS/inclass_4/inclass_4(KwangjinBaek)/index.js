// variable for the image
var image = document.querySelector("img");

    // show other image when clicked
    image.addEventListener("click", function() {
        image.setAttribute("src","images/Ace_of_spades.svg.png");
    });

    // show the original image when double clicked
    image.addEventListener("dblclick", function() {
        image.setAttribute("src","images/CardBack.png")
    });