//https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard


let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"


let request = require("request");
let cheerio = require("cheerio");

console.log("Before");
request(url,cb);
function cb(error,reponse,html){
    if(error){
        console.log("error")
    }
    else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let allCommentries = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text")
    console.log(allCommentries.length)
    // rule -> index ,cheerioselector
    let lastbComment = selectorTool(allCommentries[2]).text()
    console.log(lastbComment);
    //selectorTool
}

console.log("after")
