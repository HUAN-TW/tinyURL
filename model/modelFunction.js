const fs = require('fs')
const jsonDataPath = './public/jsons/data.json'
let jsonData = loadJsonData()

function loadJsonData() {
  try {
    const data = fs.readFileSync(jsonDataPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

function saveJsonData(data) {
  fs.writeFileSync(jsonDataPath, JSON.stringify(data, null, 2), 'utf-8')
}

function checkLongUrlInData(longUrl) {
  for (const key in jsonData) {
    if (jsonData[key] === longUrl) {
      return `http://localhost:3000/${key}` // 找到匹配的長URL，回傳對應的短網址
    }
  }

  const shortUrl = generate_Short_Url(longUrl)
  return shortUrl
}

function generate_Short_Url(longUrl) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let shortUrl = ''

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    shortUrl += characters[randomIndex]
  }

  jsonData[shortUrl] = longUrl
  saveJsonData(jsonData)
  return `http://localhost:3000/${shortUrl}`
}

function getLongUrlFromKey(key) {
  if (jsonData[key]) {
    return jsonData[key]
  } else {
    return null
  }
}

module.exports = {
  checkLongUrlInData,
  generate_Short_Url,
  getLongUrlFromKey,
}
