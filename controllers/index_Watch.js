import express from 'express';
const router = express.Router();
import db from '../config/database.js';

// 新增手錶數量
router.post('/maxwatchid', async (req, res) => {
  db.collection('MaxWatchNum').doc('MaxWatchId').set(req.body);
  // console.log(req.body);
});

// 取得手錶數量
router.get('/maxwatchid', async (req, res) => {
  try {
    const watchNumData = [];
    // const watchId = [];
    const ref = db.collection('MaxWatchNum');
    // 使用 get() 的方式，一次性讀取資料
    ref.doc('MaxWatchId').get().then(items => {
      // watchNumId.push(doc.id);
      watchNumData.push(items.data());
      // console.log(watchNumData);
      res.send(watchNumData);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});


// 新增 watch 資料
router.post('/addwatch', async (req, res) => {
  db.collection('Watch').doc().set(req.body);
  // console.log(req.body);
});

  

// 取得所有手錶資料
router.get('/watch', async (req, res) => {
  try {
    const watchData = [];
    const watchId = [];
    const ref = db.collection('Watch');
    // 使用 get() 的方式，一次性讀取資料
    ref.orderBy('id').get().then(items => {
      items.forEach(doc => {
        watchId.push(doc.id);
        watchData.push(doc.data());
      });
      for (let i = 0; i < watchData.length; i++){
        watchData[i].firebaseid = watchId[i];
        // console.log(watchData[i]);
      }
      res.send(watchData);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

// 取得單一筆 手錶 資料
router.get('/watch/:firebaseid', async (req, res) => {
  try {
      // console.log('id',req.params.firebaseid);
        const ref = db.collection('Watch');
        // 使用 get() 的方式，一次性讀取資料
        ref.doc(req.params.firebaseid).get().then(items => {
        // console.log(items.data());
        res.json(items.data());
        });
    } catch (err) {
        res.json({message: err.message});
    }
});

// 修改 手錶 資料
router.post('/editwatch/:firebaseid', async (req, res) => {
    try {
        const ref = db.collection('Watch');
        ref.doc(req.params.firebaseid).update(req.body);
    } catch (err) {
        res.json({message: err.message});
    }
});


// 刪除單一筆 手錶 資料
router.delete('/watch/:firebaseid', async (req, res) => {
  try {
    // console.log(req.params.firebaseid);
    const ref = db.collection('Watch');
    ref.doc(req.params.firebaseid).delete().then(() => {
      console.log('delete data successful');
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});


  
export default router;
  