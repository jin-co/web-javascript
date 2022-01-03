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


// with options
// https://developer.mozilla.org/en-US/docs/Web/API/fetch
// fetch(url, {
//     method: 'POST', // default is GET
//     // body is an extra info(string form) -> GET doesn't have body
//     body: JSON.stringify({ 
//         name: 'blue',
//         login: 'what'
//     })
// })
// .then(function(res) {
//     return res.json()    
// }).then(function(data) {
//     console.log('fetch json object: ', data)
// })

// with catch and error handling
const fetchBtn = document.querySelector('.get-fetch')
const fetchText = document.querySelector('.fetch-text')
fetchBtn.addEventListener('click', () => {
    let url = 'https://api.github.com/users/colt'
    fetch(url)
    .then(function(res) {
        if(!res.ok) {
            fetchText.innerHTML = "Error"
        }
    })
    // here catch only work when there is a problem in request(user side) e.g. internet problem
    .catch(function() {
        console.log("There is an error in REQUEST")
    })

    // to make it catch the problem in response
    let rightUrl = 'https://api.github.com/users/colt'
    let wrongUrl = 'https://api.github.com/users/coltaa'
    fetch(wrongUrl)
    .then(function(req) {
        if(!req.ok) {
            throw Error("Error", req.error)
        }
        return req // when ok return request to the .then below
    })
    .then(function(req) {
        console.log('fetch right url: Good', req)
    })
    .catch(function(error) {
        console.log('fetch right url: Error', error)
    })

})

const getUser = document.querySelector('.get-user')
const userImage = document.querySelector('.user-image')
const content = document.querySelector('.content')
getUser.addEventListener('click', () => {
    const url = 'https://randomuser.me/api/'
    fetch(url)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {

        console.log('fetch user: ', data)            
        content.innerHTML = `
        <img class="user-image" src="${data.results[0].picture.large}" alt="">
        <div class="text-box">
            <h3>${data.results[0].name}</h3>
            <small>${data.results[0].gender}</small>
            <p>email: ${data.results[0].email}</p>
            <p>city: ${data.results[0].location.city}</p>
        </div>
        `
    })
})

/* fetch example */
// var url = 'https://randomuser.me/api/';
// var fullnameDisp = document.querySelector("#fullname");
// var avatar = document.querySelector("#avatar");
// var username = document.querySelector("#username");
// var city = document.querySelector("#city");
// var email = document.querySelector("#email");

// var btn = document.querySelector("#btn");
// btn.addEventListener("click", function(){
//   fetch(url)
//   .then(handleErrors)
//   .then(parseJSON)
//   .then(updateProfile)
//   .catch(displayErrors);
// });

// function handleErrors(res){
//   if(!res.ok){
//     throw Error(res.status);
//   }
//   return res;
// }

// function parseJSON (res){
//   return res.json().then(function(parsedData){
//     return parsedData.results[0];
//   })
// }

// function updateProfile (data){
//     var fullname = data.name.first + " " + data.name.last;
//     fullnameDisp.innerText = fullname;
//     avatar.src = data.picture.medium;
//     username.innerText = data.login.username;
//     city.innerText = data.location.city;
//     email.innerText = data.email;
// }

// function displayErrors(err){
//   console.log("INSIDE displayErrors!");
//   console.log(err);
// }