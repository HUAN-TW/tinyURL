const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

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

  res.send(`You submitted the URL: ${url}`)
})

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})
