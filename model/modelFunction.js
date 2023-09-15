const fs = require('fs')
const jsonDataPath = './public/jsons/data.json'

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
  let jsonData = loadJsonData()

  for (const key in jsonData) {
    if (jsonData[key] === longUrl) {
      return `http://localhost:3000/${key}` // 找到匹配的長URL，回傳對應的短網址
    }
  }

  //如果沒有對應的資料則創建資料表 生成對應的短鏈結
  const shortUrl = generate_Short_Url(longUrl)
  // jsonData[shortUrl] = longUrl
  // saveJsonData(jsonData) // 保存更新後的 JSON
  return shortUrl
}

function generate_Short_Url(longUrl) {
  let jsonData = loadJsonData()
  // 長URL不存在，生成新的短URL
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
  let jsonData = loadJsonData()
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
