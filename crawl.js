const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(urlString) {
    const url = new URL(urlString);

    try {
        const data = await fetch(urlString)
        if (data.status >399) {
            console.log(`Error: ${data.status}`)
            return;
        } else {
            if (data.headers.get("Content-Type").includes("text/html")) {
                return data.text()
            } else {
                console.log(`Error`)
            }
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}   

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)

    if (urlString.length > 0 && urlString.slice(-1) === '/') {
        return urlObj.hostname + urlObj.pathname.slice(0,-1)
    }
    return urlObj.hostname + urlObj.pathname
}


function getURLsfromHTML(inputHTMLbody, inputbaseURL) {
    let urls = []
    const dom = new JSDOM(inputHTMLbody)
    const baseURL= new URL(inputbaseURL)
    const allLinks = dom.window.document.getElementsByTagName('a');
    for (let i = 0; i < allLinks.length; i++) { 
        try {
            let url = new URL(allLinks[i].href)
            let urlString =''
            if (url.hostname === baseURL.hostname) {
                urlString = baseURL+ url.pathname.slice(1)
            } else {
                urlString = url.toString()
            }
            urls.push(urlString); 
        } catch (error) {
            let url = allLinks[i].href
            if (url.slice(0,1) != '/') {
                continue
            }
            let urlString = baseURL + url.slice(1)
            urls.push(urlString);
        }
    }
    return urls
}

module.exports ={
    normalizeURL,
    getURLsfromHTML,
    crawlPage
};