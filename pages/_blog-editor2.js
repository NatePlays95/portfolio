// document.getElementById("btn-return").onclick = function() {
//     window.open("../index.html", "_self")
// }
const btn = document.getElementById("btn-change-mode")
const textbox = document.getElementById("textbox")

const areaFileName =  document.getElementById("area-filename")
const areaEdit =  document.getElementById("area-edit")
const areaPreview = document.getElementById("area-preview")

let isModePreview = false;

const changeMode = () => {
    updateText()
    isModePreview = !isModePreview
    
    if (isModePreview) {
        btn.innerText = "in Preview Mode"
    } else {
        btn.innerText = "in Edit Mode"
    }
    areaPreview.style.display = isModePreview ? 'block' : 'none'
    areaEdit.style.display = isModePreview ? 'none' : 'block'
}

const updateText = () => {
    areaPreview.innerHTML = areaEdit.innerText
}

const savePost = () => {
    if (isModePreview) changeMode()

    const link = document.createElement("a");
    const content = areaEdit.innerText;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = areaFileName.innerText + ".txt";
    link.click();
    URL.revokeObjectURL(link.href);
}
// btn.onclick = (event) => {
//   console.log(textbox)
//   changeMode()
// }


areaPreview.style.display = 'none'

