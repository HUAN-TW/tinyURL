// replace log url to my domain/random_characters*5 <--- working in backend
// render the short url to page /short-url
// when shoet_url ckick redirect to long url
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
  console.log(req.body)
  const url = req.body.url

  // res.send(`You submitted the URL: ${url}`)
  // 把長URL丟到函式進行檢查
  // function 會回傳短鏈結
  const shortUrl = model.checkLongUrlInData(url)
  // console.log(shortUrl)
  // 傳給key 頁面作渲染
  res.render('key', { shortUrl })
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
