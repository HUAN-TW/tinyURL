function isLongUrlInData(jsonData, longUrl) {
  for (const key in jsonData) {
    if (jsonData[key] === longUrl) {
      return jsonData[key]; // 找到匹配的長URL，回傳對應的短網址
    }
  }
  //如果沒有對影的資料則創建資料表 生成對應的短鏈結
  generate_Short_Url()
 }
