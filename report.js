function printReport(pages) {
    const sortedPages = Object.entries(pages).sort(([, a], [, b]) => b - a);

    for (const [page, count] of sortedPages) {
        console.log(`Found ${count} internal links to ${page}`);
    }

    return;
}

module.exports = printReport;
