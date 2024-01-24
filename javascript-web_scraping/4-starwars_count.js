#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];
const characterId = 18;

if (!apiUrl) {
  console.error('Usage: node 4-starwars_count.js <API_URL>');
  process.exit(1);
}

if (apiUrl !== 'https://swapi-api.hbtn.io/api/films') {
  console.error('Error');
  process.exit(0);
}

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error fetching data:', error);
    process.exit(1);
  }

  const films = JSON.parse(body).results;
  const wedgeAntillesMovies = films.filter((film) =>
    film.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`)
  );

  console.log(wedgeAntillesMovies.length);
});
