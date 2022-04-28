
$(document).ready(function() {
    $("h2").hide();
    $("img").hide();
    $("#button1").on("click", function()
    {
        $("h1").hide();
    });

    $("#button2").on("click", function()
    {
        $("h1").show();
    });

    $("#button3").on("click", function()
    {
        $("h1").toggle();
    });

    $("#button4").on("click", function()
    {
        $("h1").fadeToggle();
    });

    $("#button5").on("click", function()
    {
        $("h1").slideToggle();
    });

    $("#button6").on("click", function()
    {
        $("h1").animate({opheight: "toggle"}, 1000);
        $("h1").animate({opacity: 0, height: "toggle"}, 1000);
        $("h2").show();
        $("h2").animate({width: "toggle"}, 5000);
        $("h2").animate({width: "toggle"}, 5000);
        $("img").fadeIn();
    });
});