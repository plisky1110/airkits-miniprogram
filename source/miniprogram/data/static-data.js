const airlines = [
  {
    nameCn: "中国南方航空",
    nameEn: "China Southern Airlines",
    logoText: "CZ",
    iataCode: "CZ",
    icaoCode: "CSN",
    phone: "95539",
    category: "国内航司",
    keywords: ["南航", "广州", "95539"]
  },
  {
    nameCn: "中国国际航空",
    nameEn: "Air China",
    logoText: "CA",
    iataCode: "CA",
    icaoCode: "CCA",
    phone: "95583",
    category: "国内航司",
    keywords: ["国航", "北京", "95583"]
  },
  {
    nameCn: "中国东方航空",
    nameEn: "China Eastern Airlines",
    logoText: "MU",
    iataCode: "MU",
    icaoCode: "CES",
    phone: "95530",
    category: "国内航司",
    keywords: ["东航", "上海", "95530"]
  },
  {
    nameCn: "海南航空",
    nameEn: "Hainan Airlines",
    logoText: "HU",
    iataCode: "HU",
    icaoCode: "CHH",
    phone: "95339",
    category: "国内航司",
    keywords: ["海航", "海南", "95339"]
  }
]

const airports = [
  {
    nameCn: "北京首都国际机场",
    nameEn: "Beijing Capital Int'l Airport",
    city: "北京",
    province: "北京",
    district: "朝阳区/顺义区",
    iataCode: "PEK",
    icaoCode: "ZBAA",
    phone: "010-96158",
    level: "4F级",
    category: "大型枢纽",
    keywords: ["首都机场", "北京", "PEK"]
  },
  {
    nameCn: "上海浦东国际机场",
    nameEn: "Shanghai Pudong Int'l Airport",
    city: "上海",
    province: "上海",
    district: "浦东新区",
    iataCode: "PVG",
    icaoCode: "ZSPD",
    phone: "021-96990",
    level: "4F级",
    category: "大型枢纽",
    keywords: ["浦东机场", "上海", "PVG"]
  },
  {
    nameCn: "广州白云国际机场",
    nameEn: "Guangzhou Baiyun Int'l Airport",
    city: "广州",
    province: "广东",
    district: "广州市",
    iataCode: "CAN",
    icaoCode: "ZGGG",
    phone: "020-96158",
    level: "4F级",
    category: "大型枢纽",
    keywords: ["白云机场", "广州", "CAN"]
  },
  {
    nameCn: "成都天府国际机场",
    nameEn: "Chengdu Tianfu Int'l Airport",
    city: "成都",
    province: "四川",
    district: "简阳市",
    iataCode: "TFU",
    icaoCode: "ZUTF",
    phone: "028-86906666",
    level: "4F级",
    category: "大型枢纽",
    keywords: ["天府机场", "成都", "TFU"]
  }
]

const aviationCities = [
  { cityCn: "北京", cityEn: "Beijing", countryCn: "中国", region: "亚洲", timezone: "Asia/Shanghai", airportCodes: ["PEK", "PKX"] },
  { cityCn: "上海", cityEn: "Shanghai", countryCn: "中国", region: "亚洲", timezone: "Asia/Shanghai", airportCodes: ["PVG", "SHA"] },
  { cityCn: "香港", cityEn: "Hong Kong", countryCn: "中国香港", region: "亚洲", timezone: "Asia/Hong_Kong", airportCodes: ["HKG"] },
  { cityCn: "台北", cityEn: "Taipei", countryCn: "中国台湾", region: "亚洲", timezone: "Asia/Taipei", airportCodes: ["TPE"] },
  { cityCn: "东京", cityEn: "Tokyo", countryCn: "日本", region: "亚洲", timezone: "Asia/Tokyo", airportCodes: ["HND", "NRT"] },
  { cityCn: "大阪", cityEn: "Osaka", countryCn: "日本", region: "亚洲", timezone: "Asia/Tokyo", airportCodes: ["KIX", "ITM"] },
  { cityCn: "首尔", cityEn: "Seoul", countryCn: "韩国", region: "亚洲", timezone: "Asia/Seoul", airportCodes: ["ICN", "GMP"] },
  { cityCn: "新加坡", cityEn: "Singapore", countryCn: "新加坡", region: "亚洲", timezone: "Asia/Singapore", airportCodes: ["SIN"] },
  { cityCn: "曼谷", cityEn: "Bangkok", countryCn: "泰国", region: "亚洲", timezone: "Asia/Bangkok", airportCodes: ["BKK", "DMK"] },
  { cityCn: "吉隆坡", cityEn: "Kuala Lumpur", countryCn: "马来西亚", region: "亚洲", timezone: "Asia/Kuala_Lumpur", airportCodes: ["KUL"] },
  { cityCn: "雅加达", cityEn: "Jakarta", countryCn: "印度尼西亚", region: "亚洲", timezone: "Asia/Jakarta", airportCodes: ["CGK"] },
  { cityCn: "马尼拉", cityEn: "Manila", countryCn: "菲律宾", region: "亚洲", timezone: "Asia/Manila", airportCodes: ["MNL"] },
  { cityCn: "胡志明市", cityEn: "Ho Chi Minh City", countryCn: "越南", region: "亚洲", timezone: "Asia/Ho_Chi_Minh", airportCodes: ["SGN"] },
  { cityCn: "新德里", cityEn: "New Delhi", countryCn: "印度", region: "亚洲", timezone: "Asia/Kolkata", airportCodes: ["DEL"] },
  { cityCn: "孟买", cityEn: "Mumbai", countryCn: "印度", region: "亚洲", timezone: "Asia/Kolkata", airportCodes: ["BOM"] },

  { cityCn: "伦敦", cityEn: "London", countryCn: "英国", region: "欧洲", timezone: "Europe/London", airportCodes: ["LHR", "LGW"] },
  { cityCn: "巴黎", cityEn: "Paris", countryCn: "法国", region: "欧洲", timezone: "Europe/Paris", airportCodes: ["CDG", "ORY"] },
  { cityCn: "法兰克福", cityEn: "Frankfurt", countryCn: "德国", region: "欧洲", timezone: "Europe/Berlin", airportCodes: ["FRA"] },
  { cityCn: "阿姆斯特丹", cityEn: "Amsterdam", countryCn: "荷兰", region: "欧洲", timezone: "Europe/Amsterdam", airportCodes: ["AMS"] },
  { cityCn: "马德里", cityEn: "Madrid", countryCn: "西班牙", region: "欧洲", timezone: "Europe/Madrid", airportCodes: ["MAD"] },
  { cityCn: "罗马", cityEn: "Rome", countryCn: "意大利", region: "欧洲", timezone: "Europe/Rome", airportCodes: ["FCO"] },
  { cityCn: "苏黎世", cityEn: "Zurich", countryCn: "瑞士", region: "欧洲", timezone: "Europe/Zurich", airportCodes: ["ZRH"] },
  { cityCn: "莫斯科", cityEn: "Moscow", countryCn: "俄罗斯", region: "欧洲", timezone: "Europe/Moscow", airportCodes: ["SVO", "DME"] },
  { cityCn: "赫尔辛基", cityEn: "Helsinki", countryCn: "芬兰", region: "欧洲", timezone: "Europe/Helsinki", airportCodes: ["HEL"] },
  { cityCn: "雅典", cityEn: "Athens", countryCn: "希腊", region: "欧洲", timezone: "Europe/Athens", airportCodes: ["ATH"] },

  { cityCn: "迪拜", cityEn: "Dubai", countryCn: "阿联酋", region: "中东", timezone: "Asia/Dubai", airportCodes: ["DXB"] },
  { cityCn: "阿布扎比", cityEn: "Abu Dhabi", countryCn: "阿联酋", region: "中东", timezone: "Asia/Dubai", airportCodes: ["AUH"] },
  { cityCn: "多哈", cityEn: "Doha", countryCn: "卡塔尔", region: "中东", timezone: "Asia/Qatar", airportCodes: ["DOH"] },
  { cityCn: "利雅得", cityEn: "Riyadh", countryCn: "沙特阿拉伯", region: "中东", timezone: "Asia/Riyadh", airportCodes: ["RUH"] },
  { cityCn: "伊斯坦布尔", cityEn: "Istanbul", countryCn: "土耳其", region: "中东", timezone: "Europe/Istanbul", airportCodes: ["IST", "SAW"] },

  { cityCn: "纽约", cityEn: "New York", countryCn: "美国", region: "美洲", timezone: "America/New_York", airportCodes: ["JFK", "EWR"] },
  { cityCn: "芝加哥", cityEn: "Chicago", countryCn: "美国", region: "美洲", timezone: "America/Chicago", airportCodes: ["ORD"] },
  { cityCn: "洛杉矶", cityEn: "Los Angeles", countryCn: "美国", region: "美洲", timezone: "America/Los_Angeles", airportCodes: ["LAX"] },
  { cityCn: "旧金山", cityEn: "San Francisco", countryCn: "美国", region: "美洲", timezone: "America/Los_Angeles", airportCodes: ["SFO"] },
  { cityCn: "多伦多", cityEn: "Toronto", countryCn: "加拿大", region: "美洲", timezone: "America/Toronto", airportCodes: ["YYZ"] },
  { cityCn: "温哥华", cityEn: "Vancouver", countryCn: "加拿大", region: "美洲", timezone: "America/Vancouver", airportCodes: ["YVR"] },
  { cityCn: "墨西哥城", cityEn: "Mexico City", countryCn: "墨西哥", region: "美洲", timezone: "America/Mexico_City", airportCodes: ["MEX"] },
  { cityCn: "圣保罗", cityEn: "Sao Paulo", countryCn: "巴西", region: "美洲", timezone: "America/Sao_Paulo", airportCodes: ["GRU"] },
  { cityCn: "布宜诺斯艾利斯", cityEn: "Buenos Aires", countryCn: "阿根廷", region: "美洲", timezone: "America/Argentina/Buenos_Aires", airportCodes: ["EZE", "AEP"] },
  { cityCn: "圣地亚哥", cityEn: "Santiago", countryCn: "智利", region: "美洲", timezone: "America/Santiago", airportCodes: ["SCL"] },
  { cityCn: "利马", cityEn: "Lima", countryCn: "秘鲁", region: "美洲", timezone: "America/Lima", airportCodes: ["LIM"] },

  { cityCn: "悉尼", cityEn: "Sydney", countryCn: "澳大利亚", region: "大洋洲", timezone: "Australia/Sydney", airportCodes: ["SYD"] },
  { cityCn: "墨尔本", cityEn: "Melbourne", countryCn: "澳大利亚", region: "大洋洲", timezone: "Australia/Melbourne", airportCodes: ["MEL"] },
  { cityCn: "布里斯班", cityEn: "Brisbane", countryCn: "澳大利亚", region: "大洋洲", timezone: "Australia/Brisbane", airportCodes: ["BNE"] },
  { cityCn: "珀斯", cityEn: "Perth", countryCn: "澳大利亚", region: "大洋洲", timezone: "Australia/Perth", airportCodes: ["PER"] },
  { cityCn: "奥克兰", cityEn: "Auckland", countryCn: "新西兰", region: "大洋洲", timezone: "Pacific/Auckland", airportCodes: ["AKL"] },

  { cityCn: "开罗", cityEn: "Cairo", countryCn: "埃及", region: "非洲", timezone: "Africa/Cairo", airportCodes: ["CAI"] },
  { cityCn: "约翰内斯堡", cityEn: "Johannesburg", countryCn: "南非", region: "非洲", timezone: "Africa/Johannesburg", airportCodes: ["JNB"] },
  { cityCn: "开普敦", cityEn: "Cape Town", countryCn: "南非", region: "非洲", timezone: "Africa/Johannesburg", airportCodes: ["CPT"] },
  { cityCn: "内罗毕", cityEn: "Nairobi", countryCn: "肯尼亚", region: "非洲", timezone: "Africa/Nairobi", airportCodes: ["NBO"] },
  { cityCn: "卡萨布兰卡", cityEn: "Casablanca", countryCn: "摩洛哥", region: "非洲", timezone: "Africa/Casablanca", airportCodes: ["CMN"] }
]

const currencies = [
  { code: "CNY", nameCn: "人民币", symbol: "¥", sampleRateToCny: 1 },
  { code: "USD", nameCn: "美元", symbol: "$", sampleRateToCny: 7.275 },
  { code: "JPY", nameCn: "日元", symbol: "¥", sampleRateToCny: 0.0489 },
  { code: "EUR", nameCn: "欧元", symbol: "€", sampleRateToCny: 7.79 },
  { code: "GBP", nameCn: "英镑", symbol: "£", sampleRateToCny: 9.22 },
  { code: "HKD", nameCn: "港币", symbol: "HK$", sampleRateToCny: 0.93 }
]

module.exports = {
  airlines,
  airports,
  aviationCities,
  currencies
}
