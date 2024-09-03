const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const cors = require('cors');
app.use(cors());

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'))); // ใช้ไฟล์ static จาก public

let users = [];



// Route สำหรับรับข้อมูลผู้ใช้ทั้งหมด
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Route สำหรับสร้างผู้ใช้ใหม่
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Route สำหรับอัปเดตข้อมูลผู้ใช้
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updateUser = req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updateUser };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Route สำหรับลบผู้ใช้
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.status(204).send();
});

// Route สำหรับให้บริการหน้าเว็บหลัก
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ใช้สำหรับทดสอบ local server เท่านั้น
if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}


module.exports = app;
module.exports.handler = serverless(app);
