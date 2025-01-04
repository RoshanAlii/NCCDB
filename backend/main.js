const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors());

const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'MDIsql1223@#',
    database: 'NCCDB'
});

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Student Management System!');
});

// Fetch all students
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a student
app.post('/students', (req, res) => {
    const { IndexNo, Name, DoB, GPA } = req.body;
    db.query('INSERT INTO students SET ?', { IndexNo, Name, DoB, GPA }, (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
});

// Delete a student by ID
app.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Student deleted successfully' });
    });
});

// Fetch all courses
app.get('/courses', (req, res) => {
    db.query('SELECT * FROM course', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a course
app.post('/courses', (req, res) => {
    const { course_id, course_name, lecturer_name } = req.body;
    db.query('INSERT INTO course SET ?', { course_id, course_name, lecturer_name }, (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
});

// Delete a course by ID
app.delete('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    db.query('DELETE FROM course WHERE id = ?', [courseId], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Course deleted successfully' });
    });
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));
