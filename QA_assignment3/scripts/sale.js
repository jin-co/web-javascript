const btn = document.querySelector(".btn");
const formData = document.querySelector(".form");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  // test
  let data = new FormData(formData);

//   data.append("firstName", document.getElementById("first-name").value);
//   data.append("lastName", document.getElementById("last-name").value);

  console.log(data);
  
});
