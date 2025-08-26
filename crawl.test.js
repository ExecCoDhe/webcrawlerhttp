const normalizeURL = require('./crawl')

test('normalizeURL pathname', () => {
  const urlString = "https://github.com/ExecCoDhe/webcrawlerhttp"
  const answer = normalizeURL(urlString)
  const expected = "github.com/ExecCoDhe/webcrawlerhttp"
  expect(answer).toEqual(expected);
});

test('normalizeURL capital', () => {
  const urlString = "https://GIThub.com/ExecCoDhe/webcrawlerhttp"
  const answer = normalizeURL(urlString)
  const expected = "github.com/ExecCoDhe/webcrawlerhttp"
  expect(answer).toEqual(expected);
});

test('normalizeURL right-slash', () => {
  const urlString = "https://github.com/ExecCoDhe/webcrawlerhttp/"
  const answer = normalizeURL(urlString)
  const expected = "github.com/ExecCoDhe/webcrawlerhttp"
  expect(answer).toEqual(expected);
});