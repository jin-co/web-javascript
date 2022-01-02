/*
Updated version of XHR
- support streaming(no need to get the whole data)
- has options
 */

const url = "https://dog.ceo/api/breeds/image/random"

fetch(url)
.then(function(res) {
    console.log('fetch response: ', res)

    // fetch method to get promise form response
    // console.log('fetch promise: ', res.json()) -> promise only can be read once
    return res.json()
    .then(function(data) {
        console.log('fetch json object: ', data)
    })
})

// fetch(url)
// .then(function(res) {
//     return res.json()    
// }).then(function(data) {
//     console.log('fetch json object: ', data)
// })