import express from 'express';
const router = express.Router();
import db from '../config/database.js';

// 新增 personal 資料
router.post('/addpersonals', async (req, res) => {
  db.collection('Personal').doc().set(req.body);
});

// 取得資料庫中 Personal 的資料並回傳，
router.get('/personals', async (req, res) => {
  try {
    const personalsData = [];
    const personalsId = [];
    const ref = db.collection('Personal');
    // 使用 get() 的方式，一次性讀取資料
    ref.orderBy('createdTime').get().then(items => {
      items.forEach(doc => {
        personalsId.push(doc.id);
        personalsData.push(doc.data());
      });
      for (let i = 0; i < personalsData.length; i++){
        personalsData[i].firebaseid = personalsId[i];
        // console.log(personalsData[i]);
      }
      res.send(personalsData);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});


// 取得單一筆 Personal 資料
router.get('/personals/:firebaseid', async (req, res) => {
  try {
      // console.log('id',req.params.firebaseid);
        const data = [];
        const ref = db.collection('Personal');
        // 使用 get() 的方式，一次性讀取資料
        ref.doc(req.params.firebaseid).get().then(items => {
        // console.log(items.data());
        res.json(items.data());
        });
    } catch (err) {
        res.json({message: err.message});
    }
});

// 修改 Personal 資料
router.post('/editpersonals/:firebaseid', async (req, res) => {
    try {
        const ref = db.collection('Personal');
        ref.doc(req.params.firebaseid).update(req.body);
    } catch (err) {
        res.json({message: err.message});
    }
});


// 刪除單一筆 Personal 資料
router.delete('/personals/:firebaseid', async (req, res) => {
  try {
    // console.log(req.params.firebaseid);
    const ref = db.collection('Personal');
    ref.doc(req.params.firebaseid).delete().then(() => {
      console.log('delete data successful');
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});


export default router;
