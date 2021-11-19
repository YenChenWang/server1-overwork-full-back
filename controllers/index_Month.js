import express from 'express';
const router = express.Router();
import db from '../config/database.js';

// 新增 month 資料
router.post('/addmonth', async (req, res) => {
  db.collection('Month').doc().set(req.body);
});


// 取得中 Month 所有的資料
router.get('/month', async (req, res) => {
  try {
    const monthData = [];
    const monthId = [];
    const ref = db.collection('Month');
    // 使用 get() 的方式，一次性讀取資料
    ref.orderBy('createdTime').get().then(items => {
      items.forEach(doc => {
        monthId.push(doc.id);
        monthData.push(doc.data());
      });
      for (let i = 0; i < monthData.length; i++){
        monthData[i].firebaseid = monthId[i];
        // console.log(monthData[i]);
      }
      res.send(monthData);
    });

    // 使用 onSnapshot() 方式，是即時監聽變化
    // db.collection('Month').orderBy('watchid').onSnapshot(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     monthData.push(doc.data());
    //   });
    //   console.log('+++++++++++++++++');
    //   res.send(monthData);
    //   console.log('---', monthData,'---');
    // });
  } catch (err) {
    res.json({message: err.message});
  }
});

// 取得單一筆 Month 資料
router.get('/month/:firebaseid', async (req, res) => {
    try {
        const data = [];
        const ref = db.collection('Month');
        // 使用 get() 的方式，一次性讀取資料
        ref.doc(req.params.firebaseid).get().then(items => {
        // console.log(items.data());
        res.json(items.data());
        });
    } catch (err) {
        res.json({message: err.message});
    }
});

// 修改 Month 資料
router.post('/editmonth/:firebaseid', async (req, res) => {
    try {
        const ref = db.collection('Month');
        ref.doc(req.params.firebaseid).update(req.body);
    } catch (err) {
        res.json({message: err.message});
    }
});


// 刪除單一筆 Month 資料
router.delete('/month/:firebaseid', async (req, res) => {
  try {
    // console.log(req.params.firebaseid);
    const ref = db.collection('Month');
    ref.doc(req.params.firebaseid).delete().then(() => {
      console.log('delete data successful');
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});


export default router;
