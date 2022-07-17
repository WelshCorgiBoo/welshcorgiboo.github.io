const backgroundImages = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
]


const jsbody = document.querySelector("body");
const bgImage = document.createElement("img");
function backgd() {
    const chosenImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    jsbody.style.backgroundImage = `url(https://welshcorgiboo.github.io/backgroundimages/${chosenImage})`;
    jsbody.style.backgroundSize = `cover`;
}



backgd();
setInterval(backgd, 10000);

    
    
