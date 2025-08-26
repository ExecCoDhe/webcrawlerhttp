const { crawlPage} = require('./crawl')

async function main() {
    const args = process.argv.slice(2);
    if (args.length == 1) {
        console.log(`Crawler starting at ${args}`);
        const data = await crawlPage(args);
        console.log(data)
    }else{
        console.log("Error");
        process.exit(1)
    }
}

main()