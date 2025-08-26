function normalizeURL(urlString) {
    const urlObj = new URL(urlString)

    if (urlString.length > 0 && urlString.slice(-1) === '/') {
        return urlObj.hostname + urlObj.pathname.slice(0,-1)
    }
    return urlObj.hostname + urlObj.pathname
}

module.exports =normalizeURL