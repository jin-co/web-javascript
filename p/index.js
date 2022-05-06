const bgImg = document.querySelector(".bg-img");
const title = document.querySelector(".title");
const text = document.querySelector(".text");
const bioImg = document.querySelector(".bio-picture");
const name = document.querySelector(".name");
const date = document.querySelector(".date");

const Els = [bgImg, title, text, bioImg, name, date];

setTimeout(() => {
  bgImg.src = "https://source.unsplash.com/random";
  title.innerHTML = "Lorem ipsum dolor sit amet";
  text.innerHTML =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,accusamus.";
  bioImg.src = "https://source.unsplash.com/user";
  name.innerHTML = "John";
  date.innerHTML = "Oct. 05. 3000";

  removeBg();
}, 1000);

function removeBg() {
    Els.forEach(el => {
        el.classList.remove('animated-bg')
    });
}
