const fs = require('fs').promises;

async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.trim().split('\n');
    const fields = lines[0].trim().split(',');
    const studentsByField = {};

    lines.slice(1).forEach((line) => {
      const values = line.trim().split(',');
      const field = values[fields.indexOf('field')];
      const firstname = values[fields.indexOf('firstname')];

      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(firstname);
    });

    return studentsByField;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = { readDatabase };
