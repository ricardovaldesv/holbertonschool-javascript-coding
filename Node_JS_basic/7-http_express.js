const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.end('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('This is the list of our students\nCannot load the database');
      return;
    }
    const lines = data.trim().split('\n');
    const fields = lines[0].trim().split(',');

    const uniqueFields = [...new Set(lines.slice(1).map((line) => line.trim().split(',')[fields.indexOf('field')]))];
    const studentsByField = {};
    uniqueFields.forEach((field) => {
      studentsByField[field] = [];
    });

    lines.slice(1).forEach((line) => {
      const values = line.trim().split(',');
      const student = {};
      for (let i = 0; i < fields.length; i += 1) {
        student[fields[i]] = values[i];
      }
      studentsByField[student.field].push(student);
    });

    const response = ['This is the list of our students'];
    const totalStudents = lines.length - 1;
    response.push(`Number of students: ${totalStudents}`);
    Object.keys(studentsByField).forEach((field) => {
      response.push(`Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].map((student) => student.firstname).join(', ')}`);
    });
    res.statusCode = 200;
    res.end(response.join('\n'));
  });
});

app.use((req, res) => {
  res.statusCode = 404;
  res.end('Not Found');
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
