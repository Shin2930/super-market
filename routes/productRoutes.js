const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// ตั้งค่า Multer [cite: 12]
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/', productController.getIndex);
router.get('/add', productController.getAddProduct);
router.post('/add', upload.single('image'), productController.postAddProduct);
router.get('/edit/:id', productController.getEditProduct);
router.post('/edit', upload.single('image'), productController.postEditProduct);
router.get('/delete/:id', productController.deleteProduct);

module.exports = router;