import express from 'express';
const router = express.Router();
import db from '../config/database.js';



// shift 輪班別
router.get('/shiftmenu', async (req, res) => {
  try {
    const data = [];
    db.collection('ShiftMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

// Sex 性別
router.get('/sexmenu', async (req, res) => {
  try {
    const data = [];
    db.collection('SexMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

// age 年齡
router.get('/agemenu', async (req, res) => {
  try {
    const data = [];
    db.collection('AgeMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

// marriage 婚姻狀況
router.get('/marriagemenu', async (req, res) => {
  try {
    const data = [];
    db.collection('MarriageMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

// children 孩子有無
router.get('/childrenmenu', async (req, res) => {
  try {
    const data = [];
    db.collection('ChildrenMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

// position 職位名稱
router.get('/positionmenu', async (req, res) => {
  try {
    const data = [];
    db.collection('PositionMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

// department 所屬部門
router.get('/departmentmenu', async (req, res) => {
  try {
    const data = [];
    db.collection('DepartmentMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

// education 最高學歷
router.get('/educationmenu', async (req, res) => {
  try {
    const data = [];
    db.collection('EducationMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

//  salary 薪資範圍
router.get('/salarymenu', async (req, res) => {
  try {
    const data = [];
    db.collection('SalaryMenu').orderBy('id').onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      res.json(data);
    });
  } catch (err) {
    res.json({message: err.message});
  }
});

export default router;
