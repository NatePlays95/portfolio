

//link the pages

document.getElementById("btn-social-git").onclick = function() {
    window.open("https://github.com/NatePlays95", "_blank")
}
document.getElementById("btn-social-itch").onclick = function() {
    window.open("https://nate-the-bard.itch.io", "_blank")
}
document.getElementById("btn-social-twi").onclick = function() {
    window.open("https://twitter.com/95natanmaia", "_blank")
}
document.getElementById("btn-social-gift").onclick = function() {
    window.open("secret.html", "_self")
    //link to hidden page
}



//add blog posts

var blogFilePaths = []
async function getBlogFiles() {
    var f = await fetch('blog').then(response => response.text())
    var blogFileList = f.split('\n')
    pattern = /\/.*?\.txt/
    blogFileList.forEach(s => {
        if (s.includes("href")) {
            var match = s.match(pattern)
            if (match != null) blogFilePaths.push(match[0].substring(1))
        }
    })
    getBlogTexts()
}

let blogFilePromises = []
function getBlogTexts() {
    blogFilePromises = blogFilePaths.map(url => fetch(url).then(y => y.text()))
    Promise.all(blogFilePromises).then(results => {
        results.forEach((result, index) => {
            var filepath = blogFilePaths[index]
            createBlogDiv(result, filepath)
        })
        
    });
}

// let postHolder = document.getElementById("post-holder")
// function createBlogDiv(text, filepath) {
//     let post = document.createElement('div')
//     post.dataset.filepath = filepath
//     let children = postHolder.children
//     let inserted = false
//     for(let i = 0; i < children.length; i++) {
//         if (filepath.localeCompare(children[i].dataset.filepath)) {
//             document.getElementById("post-holder").insertBefore(post, children[i])
//             inserted = true
//             break;
//         }
//     }
//     if (!inserted) document.getElementById("post-holder").appendChild(post)

//     post.classList.add("frame")
//     post.classList.add("mini-post")
    
    
//     let inner = document.createElement('div')
//     inner.classList.add("mini-post-inner")
//     inner.innerHTML = text
//     //inner.innerHTML = filepath + text
//     post.appendChild(inner)
// }




//run
getBlogFiles()