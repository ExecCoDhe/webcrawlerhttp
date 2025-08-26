const { normalizeURL, getURLsfromHTML} = require('./crawl')

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



test('getURLsfromHTML absolute', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsfromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/' ]
  expect(actual).toEqual(expected)
})

test('getURLsfromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsfromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsfromHTML both', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsfromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsfromHTML handle error', () => {
  const inputURL = 'https://blog.boot.dev'
  const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsfromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})
