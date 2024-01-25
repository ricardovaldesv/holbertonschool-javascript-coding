#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.error('Usage: ./6-completed_tasks.js <API_URL>');
  process.exit(1);
}

request(apiUrl, (error, response, body) => {
  if (error) {
    console.log(error);
  }
  const data = JSON.parse(response.body);

  // Object to store the count of completed tasks by userId
  const completedCountByUserId = {};

  // Iterate on each task
  data.forEach(task => {
    const userId = task.userId;

    // Check if the task is completed
    if (task.completed) {
      // Increment the count for the corresponding userId
      completedCountByUserId[userId] = (completedCountByUserId[userId] || 0) + 1;
    }
  });
  console.log(completedCountByUserId);
});
