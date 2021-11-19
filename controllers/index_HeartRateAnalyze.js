import express from 'express';
const router = express.Router();
import db from '../config/database.js';

//! 從 秒數 轉成 幾點幾分幾秒
const secondToTime = (sec) => {
  // parseInt() : 只取除法中的整數
  // % : 取餘數
  const s = sec % 60;   // 秒
  const m = (parseInt(sec / 60)) % 60;   // 分
  const h = parseInt((parseInt(sec / 60)) / 60);   // 時
  // 0 點 ~ 9 點
  if (h >= 0 && h < 10) {
    // 0 分 ~ 9 分
    if (m >= 0 && m < 10) {
      // 0 秒 ~ 9 秒
      if (s >= 0 && s < 10) {
        return ('0' + h + ':0' + m + ':0' + s);
      }
      // 10 秒 ~ 59 秒
      else if(s >= 10 && s < 60) {
        return ('0' + h + ':0' + m + ':' + s);
      }
    }
    // 10 分 ~ 59 分
    else if (m >= 10 && m < 60) {
      // 0 秒 ~ 9 秒
      if (s >= 0 && s < 10) {
        return ('0' + h + ':' + m + ':0' + s);
      }
      // 10 秒 ~ 59 秒
      else if(s >= 10 && s < 60){
        return ('0' + h + ':' + m + ':' + s);
      }
    }
  }
  // 10 點 ~ 23 點
  else if(h >= 10 && h < 24){
    // 0 分 ~ 9 分
    if (m >= 0 && m < 10) {
      // 0 秒 ~ 9 秒
      if (s >= 0 && s < 10) {
        return (h + ':0' + m + ':0' + s);
      }
      // 10 秒 ~ 59 秒
      else if(s >= 10 && s < 60) {
        return (h + ':0' + m + ':' + s);
      }
    }
    // 10 分 ~ 59 分
    else if (m >= 10 && m < 60) {
      // 0 秒 ~ 9 秒
      if (s >= 0 && s < 10) {
        return (h + ':' + m + ':0' + s);
      }
      // 10 秒 ~ 59 秒
      else if(s >= 10 && s < 60){
        return (h + ':' + m + ':' + s);
      }
    }
  }
}

//! 在存資料進 array 時，如果 array 中有資料了就不要存入 array
// array 是陣列，arg 是資料，判斷 arg 是否已存在於 array 中，如果已存在就不儲存
// arg 只能是數字或文字
const pushNoRepeat = (array, arg) => {
  for (let i = 0; i <= array.length; i++){
    if (array.indexOf(arg) == -1) {
      array.push(arg);
      return 'T';
    }
    else {
      return 'F';
    }
  }
}


router.post('/heartrateanalyze', async (req, res) => {
  try {
    const uat = req.body.uat;
    console.log(uat);
    
    const dailiesAllData = [];    // 取得 Dailie 所有資料
    const secArray = [];    // 存放心率的秒數 
    const heartRateArray = [];    // 存放沒有重複過並且已經轉換成幾點幾分幾秒的時間

    db.collection('Dailie').get().then(items => {
      items.forEach(doc => {
        dailiesAllData.push(doc.data());
      });
      for (let i = 0; i < dailiesAllData.length; i++) {
        for (let j = 0; j < dailiesAllData[i].dailies.length; j++) {
          // ! 判斷使用者 userAccessToken
          if (dailiesAllData[i].dailies[j].userAccessToken === uat) {
            // 將資料庫中的 日期 從文字轉成 日期 格式
            const date = new Date(dailiesAllData[i].dailies[j].calendarDate);
            const calendar = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            // ! 判斷日期
            if (calendar == '2021-11-10') {
              // heartRateSec 代表 timeOffsetHeartRateSamples 中的每筆 key
              for (let heartRateSec in dailiesAllData[i].dailies[j].timeOffsetHeartRateSamples) {
                if (pushNoRepeat(secArray, secondToTime(heartRateSec)) == 'T') {
                  heartRateArray.push({
                    sec: heartRateSec,
                    Time: secondToTime(heartRateSec),
                    HeartRate: dailiesAllData[i].dailies[j].timeOffsetHeartRateSamples[heartRateSec]
                  });
                  
                  // console.log(dailiesAllData[i].dailies[j].timeOffsetHeartRateSamples[heartRateSec]);
                }
              }
            }
          }
        }
      }
      console.log(heartRateArray);
      res.send(heartRateArray);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});



export default router;
