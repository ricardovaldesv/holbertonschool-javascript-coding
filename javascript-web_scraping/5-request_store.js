#!/usr/bin/node
const request = require('request');
const fs = require('fs');

const url = process.argv[2];

request.get(url, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    const filePath = process.argv[3];

    fs.writeFile(filePath, response.body, 'utf-8', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }
});
