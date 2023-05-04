const http = require('http')
const fs = require('fs')
const path = require('path')
const util = require('util');

let htmlText = fs.readFileSync(path.join(__dirname, '/../index.html'), 'utf8')
//console.log(util.inspect(htmlText))

const cheerio = require('cheerio')
const $ = cheerio.load(htmlText)

// $('head').addClass('welcome');
// $('body').append('<p>Hello World</p>');

let postHolder = $('#post-holder')
// postHolder.append('<p>Hello World</p>');
postHolder.empty();

let blogPath = path.join(__dirname, '/../blog')
let pagesPath = path.join(__dirname, '/../pages')
// let fileNames = fs.readdirSync(blogPath)

let postTemplateHtml = fs.readFileSync(pagesPath + '/' + '_blog-template.html', 'utf8')

let fileNames = fs.readdirSync(blogPath)
let files = fileNames.map(function (fileName) {
    return {
    name: fileName,
    time: fs.statSync(blogPath + '/' + fileName).birthtime.getTime(),
    contents: fs.readFileSync(blogPath + '/' + fileName, 'utf-8')
    };
})
files.sort(function (a, b) { return b.time - a.time; })

files.forEach(file => {
    // let contents = fs.readFileSync(blogPath + '/' + file.name, 'utf-8')
    
    let contents = file.contents
    let htmlName = 'blog-' + file.name.substring(0, file.name.length-4) + '.html';
    console.log(htmlName)
    postHolder.append(
        `<div class="frame mini-post">
                <div class="mini-post-inner">
                    ${contents}
                </div>
                <a href="../pages/${htmlName}">Read more</a>
            </div>`)
    
    let tempHtml = cheerio.load(postTemplateHtml)
    tempHtml('#frame-main').append(`<div>${contents}</div>`)
    fs.writeFileSync(pagesPath + '/' + htmlName, tempHtml.html())
})




let finalText = $.html();

// console.log(finalText)
fs.writeFileSync(path.join(__dirname, '../index.html'), finalText);