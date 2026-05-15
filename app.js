const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();

// ตั้งค่า Template Engine และ Middleware [cite: 11, 12]
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // สำหรับดึงรูปภาพมาแสดง [cite: 15]

// ใช้งาน Routes [cite: 43]
app.use('/', productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));