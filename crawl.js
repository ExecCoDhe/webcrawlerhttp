const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseURL, currentURL, pages) {
    console.log(`actively crawling ${currentURL}`)

    //normalize url
    const baseObj = new URL(baseURL)
    const currentObj = new URL(currentURL)

    if (baseObj.hostname != currentObj.hostname) {
        return pages
    }
  
    const currentUrlNormal = normalizeURL(currentURL)
    
    if(pages[currentUrlNormal] > 0){
        pages[currentUrlNormal] +=1
        return pages;
    }

    //add to pages
    pages[currentUrlNormal] = 1

    //check recursively for more links
    try {
        const data = await fetch(currentUrlNormal)
        if (data.status >399) {
            console.log(`Error: ${data.status}`)
            return pages;
        } else {
            if (data.headers.get("Content-Type").includes("text/html")) {
                const urls = getURLsfromHTML(await data.text(), baseURL)
                for (const nextURL of urls){
                    pages = await crawlPage(baseURL, nextURL, pages)
                }

            } else {
                console.log(`data not in html`)
                return pages;
            }
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    return pages;
}   

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)

    if (urlString.length > 0 && urlString.slice(-1) === '/') {
        return urlObj.protocol + "//" + urlObj.hostname + urlObj.pathname.slice(0,-1)
    }
    return urlObj.protocol + "//" + urlObj.hostname + urlObj.pathname
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