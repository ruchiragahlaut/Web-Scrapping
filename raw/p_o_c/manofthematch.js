url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
let request = require("request"); //async function 
let cheerio = require("cheerio");
const { html } = require("cheerio");
console.log("Before");
request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        extractHtml(html);
    }
}
function extractHtml(html){
    let seltool = cheerio.load(html);
    let matchcard = seltool(".col-md-8.col-16");
    console.log(matchcard.length);
    for(let i =0;i<matchcard.length;i++){
        let cardbtns = seltool(matchcard[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        let link = seltool(cardbtns[2]).attr("href");
        let fulllink = "https://www.espncricinfo.com"+link;
        //console.log(fulllink);
        getplayerofthematchname(fulllink);
    }
}

function getplayerofthematchname(fulllink){
    request(fulllink,cb);
    function cb(err,res,html){
        if(err){
            console.log(err);
        }
        else{
            extractPlayer(html);
            
        }
    }
}
function extractPlayer(html){
    let seltool = cheerio.load(html);
    let playerdetails = seltool(".best-player-content").text();
    console.log(playerdetails);// here answer will come parallelly bcz request function is async.
}




