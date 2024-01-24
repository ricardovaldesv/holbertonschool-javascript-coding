#!/usr/bin/node
const request = require('request');

const url = 'https://swapi-api.hbtn.io/api/films/';
const id = process.argv[2];
const fullUrl = url + id;

request.get(fullUrl, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  const responseData = JSON.parse(response.body);
  const title = responseData.title;
  console.log(title);
});
