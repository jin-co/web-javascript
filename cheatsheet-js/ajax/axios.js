// library that only deals with ajax -> light weight than jquery
// https://github.com/axios/axios

const urlAxios = 'https://opentdb.com/api.php?amount=1'

axios.get(urlAxios)
.then((res) => {
    console.log('axios: ',res)
    console.log('axios: ',res.data.results[0].question)
})
.catch(() => {
    console.log('axios: error')
})

var btnAxios = document.querySelector(".get-axios");
var axiosBox = document.querySelector(".axios-box");
btnAxios.addEventListener("click", sendRequest);

function sendRequest(){
  axios.get("https://jsonplaaskjldceholder.typicode.com/comments", {
    params: {
      postId: 1
    }
  })
  .then(addComments)
  .catch(handleErrors)
 }

function addComments(res){
  res.data.forEach(function(comment){
    appendComment(comment);
  });
}

function appendComment (comment){
  var newP = document.createElement("p");
  newP.innerText = comment.email;
  axiosBox.appendChild(newP);
}

function handleErrors(err) {
    if (err.response) {
      console.log("Problem With Response ", err.response.status);
    } else if (err.request) {
      console.log("Problem With Request!");
    } else {
      console.log('Error', err.message);
    }
  }