// const fs = require('fs')
// const jsonData = './public/jsons/data.json'

// function checkLongUrlInData(jsonData, longUrl) {
//   for (const key in jsonData) {
//     if (jsonData[key] === longUrl) {
//       return 'https://shortenurl.ileven17.com/${key}' // 找到匹配的長URL，回傳對應的短網址
//     }
//   }
//   //如果沒有對影的資料則創建資料表 生成對應的短鏈結
//   generate_Short_Url()
// }
// function generateShortUrl() {
//   // 長URL不存在，生成新的短URL
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   let shortUrl = ''

//   for (let i = 0; i < 5; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length)
//     shortUrl += characters[randomIndex]
//   }

//   jsonData[shortUrl] = longUrl
//   //生成完後會回傳短鏈結
//   return `https://shortenurl.ileven17.com/${shortUrl}`
// }

// module.exports = {
//   checkLongUrlInData,
//   generate_Short_Url,
// }

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
  const jsonData = loadJsonData()

  for (const key in jsonData) {
    if (jsonData[key] === longUrl) {
      return `https://shortenurl.ileven17.com/${key}` // 找到匹配的長URL，回傳對應的短網址
    }
  }

  //如果沒有對影的資料則創建資料表 生成對應的短鏈結
  const shortUrl = generate_Short_Url(longUrl)
  jsonData[shortUrl] = longUrl
  saveJsonData(jsonData) // 保存更新后的 JSON
  return shortUrl
}

function generate_Short_Url(longUrl) {
  // 長URL不存在，生成新的短URL
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let shortUrl = ''

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    shortUrl += characters[randomIndex]
  }

  return `https://shortenurl.ileven17.com/${shortUrl}`
}

module.exports = {
  checkLongUrlInData,
  generate_Short_Url,
}
