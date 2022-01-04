/*
pros:
- no need to parse
- checks every error so no need to throw an error to catch like fetch

four methods
- .$.ajax
- .$.get
- .$.post
- .$.getJSON

https://api.jquery.com/jQuery.ajax/
*/ 

$('.get-fetch').on('click', () => {

    $.ajax({
        method: 'GET', // GET is default so I can omit this
        url: 'https://baconipsum.com/api/?type=meat-and-filler',
        dataType: 'json' // json is default so I can omit this
    })
    .done(function(data) {
        // use data here
        $('.jquery-ajax-text').text(data[0])
        console.log('jquery: ', data)
    })
    .fail(function() {
        // if fails handle here
    })
})

// $.get('https://baconipsum.com/api/?type=meat-and-filler')
// .done(function(data) {

// })

// $.post('https://baconipsum.com/api/?type=meat-and-filler')
// .done(function(data) {
    
// })

// $.getJSON('https://baconipsum.com/api/?type=meat-and-filler')
// .done(function(data) {
    
// })

const getCat = document.querySelector('.get-cat')
getCat.addEventListener('click', () => {
    $.ajax({
        url: 'https://dog.ceo/api/breeds/image/random'
    })
    .done(function(data) {
        $('.img-cat').attr('src', data.message)
    })
    .fail(() => {
        console.log('error')
    })
})