// 長URL不存在，生成新的短URL
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
let shortUrl = ''

for (let i = 0; i < 5; i++) {
  const randomIndex = Math.floor(Math.random() * characters.length)
  shortUrl += characters[randomIndex]
}

jsonData[shortUrl] = longUrl
//生成完後會回傳短鏈結
return `https://shortenurl.ileven17.com/${shortUrl}`
