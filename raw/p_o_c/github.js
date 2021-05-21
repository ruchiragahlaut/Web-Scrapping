
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let PDFDocument = require('pdfkit');


console.log("before");
request("https://github.com/topics",cb);
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
    let topicsArr = seltool(".col-12.col-sm-6.col-md-4.mb-4 a");
    for(let i =0;i<topicsArr.length;i++){
        let link = seltool(topicsArr[2]).attr("href");
        let fulllink = "https://github.com" + link;
        //console.log(fulllink);
        processrepoPage(fulllink);
    }
    
}
function processrepoPage(fulllink){
    request(fulllink,cb);
    function cb(error,resp,html){
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        getRepoLinks(html);
    }
}
}

function getRepoLinks(html){
    let seltool = cheerio.load(html);
    let topicElem = seltool(".h1-mktg")
    console.log(topicElem.text());
    let topicname  = topicElem.text().trim();
    //console.log(topicname);
    dirCreater(topicname);
    let arr = seltool("a.text-bold");
    for(let i=0;i<8;i++){
        let link = seltool(arr[i]).attr("href");
        let repoName = link.split("/").pop();
        repoName = repoName.trim();
        //let full = "https://github.com"+link;
        //console.log(repoName);
      //  console.log("full");
       //createFile(repoName,topicname);
       let fullRepoLink = "https://github.com"+link+"/issues";
       getIssues(repoName,topicname,fullRepoLink);
        }
    console.log("''''''''''''''")
}

function  dirCreater(topicname){
    let pathofFolder = path.join(__dirname,topicname);
    if(fs.existsSync(pathofFolder)==false){
        fs.mkdirSync(pathofFolder);
    }
}
//__dirname is the path of current folder where your code is working
function createFile(repName,topicname){
    let pathofFile = path.join(__dirname,topicname,repName+".json");
    if(fs.existsSync(pathofFile)==false){
        let createStream = fs.createWriteStream(pathofFile);
        createStream.end();
    }
}

function getIssues(repoName,topicName,repoPageLink){
    request(repoPageLink,cb);
    function cb(err,resp,html){
        if(err){
            if(resp.statusCode==404){
                    console.log("No issues page found");
            }
            else{
                console(err);
            }
        }
        else{
            extractIssues(html,repoName,topicName);
        }
    }
}
function extractIssues(html,repoName,topicName){
    let selTool = cheerio.load(html);
    let IssuesAncharAr = selTool("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr = [];
    for(let i=0;i<IssuesAncharAr.length;i++){
        let name = selTool(IssuesAncharAr[i]).text();
        let link = selTool(IssuesAncharAr[i]).attr("href");
        arr.push({
            "Name" :name,
            "Link":"https://github.com"+link

        })
    }

    let filePath = path.join(__dirname,topicName,repoName+".pdf");
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(JSON.stringify(arr));
    pdfDoc.end();
}
//console.log(table);*/


