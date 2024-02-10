const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    fs.readFile(process.argv[2], 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      const lines = data.trim().split('\n');
      const fields = lines[0].trim().split(',');

      // Extract unique fields from the data
      const uniqueFields = [...new Set(lines.slice(1).map((line) => line.trim().split(',')[fields.indexOf('field')]))];

      // Initialize an object to store students by field
      const studentsByField = {};
      uniqueFields.forEach((field) => {
        studentsByField[field] = [];
      });

      // Iterate over each line and organize students by field
      lines.slice(1).forEach((line) => {
        const values = line.trim().split(',');
        const student = {};
        for (let i = 0; i < fields.length; i += 1) {
          student[fields[i]] = values[i];
        }
        studentsByField[student.field].push(student);
      });

      // Calculate total number of students
      const totalStudents = lines.length - 1;

      // Generate the response
      const response = [`This is the list of our students\nNumber of students: ${totalStudents}`];
      Object.keys(studentsByField).forEach((field) => {
        response.push(`Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].map((student) => student.firstname).join(', ')}`);
      });
      res.statusCode = 200;
      res.end(response.join('\n'));
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245);
module.exports = app;
