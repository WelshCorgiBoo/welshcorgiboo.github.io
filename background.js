const backgroundImages = [
    "back1.jpg",
    "back2.jpg",
    "back3.jpg",
    "back4.jpg",
    "back5.jpg",
    "back6.jpg",
    "back7.jpg",
    "back8.jpg",
    "back9.jpg",
    "back10.jpg",
]


const jsbody = document.querySelector("body");
const bgImage = document.createElement("img");
function backgd() {
    const chosenImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    jsbody.style.backgroundImage = `url(backgroundImages/${chosenImage})`;
    jsbody.style.backgroundSize = `cover`;
}




backgd();
setInterval(backgd, 10000);

    
    