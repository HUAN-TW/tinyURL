//TO DO
const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const model = require('./model/modelFunction')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/url', (req, res) => {
  const url = req.body.url
  const isHttpOrHttpsUrl = /^https?:\/\//.test(url)
  if (isHttpOrHttpsUrl) {
    const shortUrl = model.checkLongUrlInData(url)
    res.render('key', { shortUrl })
  } else {
    const errorMessage =
      'Invalid URL!!! Please provide a valid URL  with http:// or https://'
    res.render('key', { errorMessage })
  }
})

app.get('/:key', (req, res) => {
  const key = req.params.key
  console.log('key' + key)
  const longUrl = model.getLongUrlFromKey(key)

  if (longUrl) {
    res.redirect(longUrl)
  } else {
    res.render('error', { message: 'URL Not Found' })
  }
})

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})
