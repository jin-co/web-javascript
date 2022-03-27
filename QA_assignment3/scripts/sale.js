const btn = document.querySelector(".btn");
let formData = document.querySelectorAll(".form input");
// let form = document.querySelector('.form');

btn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log(formData);
  let newArray = Array.from(formData).reduce(
    (acc, input) => ({ ...acc, [input.id]: input.value }),
    {}
  );

  // let formD = new FormData(form);

  // this is only to add additional data
  // formD.append('api-key', 'my-key');

  console.log(newArray);
  // console.log(formD);
  // for(let key of formD.keys()) {
  //   console.log(key, formD.get(key))
  // }

  // window.location.href = '/pages/list.html'
});
