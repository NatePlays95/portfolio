let btnReturn = document.getElementById("btn-return")
btnReturn.onclick = function() {
    window.open("index.html", "_self")
} 

let imageFrames = document.getElementsByClassName("frame-image")
console.log(imageFrames)

for (let i = 0; i < imageFrames.length; i++) {
    let imgFrame = imageFrames[i];
    
    imgFrame.onmouseover = function(){
        imgFrame.getElementsByClassName("frame-date")[0].animate({
            opacity: `100%`, top: '-20%'
        }, {duration: 100, fill: "forwards"});
    }
    imgFrame.onmouseout = function(){
        imgFrame.getElementsByClassName("frame-date")[0].animate({
            opacity: '100%', top: '0%'
        }, {duration: 100, fill: "forwards"});
    }
}


let framePixelArt = document.getElementById("cat-pixelart")
let frameIllustration = document.getElementById("cat-illustration")
let frameSketches = document.getElementById("cat-sketches")

//close all subwindows at start
let closeSubWindows = function() {
    framePixelArt.style.display = "none";
    frameIllustration.style.display = "none";
    frameSketches.style.display = "none";
}
closeSubWindows();

document.getElementById("btn-cat-pixelart").onclick = function() {
    closeSubWindows();
    framePixelArt.style.display = "block";
}
document.getElementById("btn-cat-illustration").onclick = function() {
    closeSubWindows();
    frameIllustration.style.display = "block";
}
document.getElementById("btn-cat-sketches").onclick = function() {
    closeSubWindows();
    frameSketches.style.display = "block";
}


//create lightbox stuff
//https://www.youtube.com/watch?v=uKVVSwXdLr0
const lightbox = document.createElement('div')
lightbox.id = "lightbox"
document.body.appendChild(lightbox)


let allImgs = document.querySelectorAll('img')
allImgs.forEach(function(image) {
    image.addEventListener("click", function(e) {
        lightbox.classList.add("active")
        const newImage = document.createElement('img')
        newImage.src = image.src
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(newImage)
    })
})

lightbox.addEventListener("click", function(e) {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove("active")
})