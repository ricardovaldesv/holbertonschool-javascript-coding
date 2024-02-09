const fs = require('fs');

function countStudents(file) {
  try {
    const fileContent = fs.readFileSync(file, 'utf8');

    const lines = fileContent.trim().split('\n');

    // Gets the field names from the first line
    const fields = lines[0].trim().split(',');

    // Array for storing CSV data objects
    const data = [];

    // Iterate over each line starting from the second line.
    for (let i = 1; i < lines.length; i += 1) {
      // Divide la línea en valores separados por comas
      const values = lines[i].trim().split(',');

      // Creates an object with the field names and their corresponding values
      const entry = {};
      for (let j = 0; j < fields.length; j += 1) {
        entry[fields[j]] = values[j];
      }

      // Adds the object to the data array
      data.push(entry);
    }

    console.log(`Number of students: ${data.length}`);

    // a array is created with only the fields
    const dataFields = data.map((data) => data.field);

    // set the array so as not to repeat the fields
    const uniqueFields = [...new Set(dataFields)];

    for (let i = 0; i < uniqueFields.length; i += 1) {
      const fieldCS = data.filter((data) => data.field === uniqueFields[i]);
      const fieldNames = fieldCS.map((data) => data.firstname);
      console.log(`Number of students in ${uniqueFields[i]}: ${fieldNames.length}. List: ${fieldNames.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
