const { crawlPage} = require('./crawl')
const printReport = require('./report')

async function main() {
    const args = process.argv.slice(2);
    if (args.length == 1) {
        console.log(`Crawler starting at ${args}`);

        let pages = {};

        const data = await crawlPage(args, args, pages);

        printReport(data)

    }else{
        console.log("Error");
        process.exit(1)
    }
}

main()