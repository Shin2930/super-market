const db = require('../models/db');
const fs = require('fs');
const path = require('path');

// แสดงสินค้าทั้งหมด (Read) [cite: 15]
exports.getIndex = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM products');
    res.render('index', { products: rows, success: req.query.success });
};

// หน้าฟอร์มเพิ่มสินค้า [cite: 25]
exports.getAddProduct = (req, res) => {
    res.render('form', { product: null });
};

// บันทึกสินค้าใหม่ (Create) [cite: 15]
exports.postAddProduct = async (req, res) => {
    const { name, category, price, stock } = req.body;
    const image = req.file ? req.file.filename : null;
    await db.query('INSERT INTO products (name, category, price, stock, image) VALUES (?, ?, ?, ?, ?)', 
        [name, category, price, stock, image]);
    res.redirect('/?success=added');
};

// หน้าฟอร์มแก้ไขสินค้า [cite: 26]
exports.getEditProduct = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.render('form', { product: rows[0] });
};

// อัปเดตสินค้า (Update) และลบรูปเก่า [cite: 15]
exports.postEditProduct = async (req, res) => {
    const { id, name, category, price, stock } = req.body;
    let image = req.body.old_image;

    if (req.file) {
        image = req.file.filename;
        // ลบไฟล์รูปเก่าออกจากเซิร์ฟเวอร์ [cite: 15]
        const oldPath = path.join(__dirname, '../uploads/', req.body.old_image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await db.query('UPDATE products SET name=?, category=?, price=?, stock=?, image=? WHERE id=?', 
        [name, category, price, stock, image, id]);
    res.redirect('/?success=updated');
};

// ลบสินค้า (Delete) และลบรูปภาพ [cite: 16]
exports.deleteProduct = async (req, res) => {
    const [rows] = await db.query('SELECT image FROM products WHERE id = ?', [req.params.id]);
    if (rows[0].image) {
        const filePath = path.join(__dirname, '../uploads/', rows[0].image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.redirect('/?success=deleted');
};