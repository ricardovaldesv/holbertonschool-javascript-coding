const { readDatabase } = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const studentsByField = await readDatabase(process.argv[2]);
      const response = ['This is the list of our students'];
      // eslint-disable-next-line
      const totalStudents = 0;

      Object.keys(studentsByField).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).forEach((field) => {
        // totalStudents += studentsByField[field].length;
        response.push(`Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].join(', ')}`);
      });

      // response.splice(1, 0, `Number of students: ${totalStudents}`);
      res.status(200).send(response.join('\n'));
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  // eslint-disable-next-line
  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const studentsByField = await readDatabase(process.argv[2]);
      const studentsInMajor = studentsByField[major] || [];
      res.status(200).send(`List: ${studentsInMajor.join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
