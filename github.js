const fs = require('fs');
const inquirer = require("inquirer");
const axios = require ("axios");
const index = require("./index.js");

// function getGit() {
//   const queryURL = `https://api.github.com/users/${username}`;

//   axios.get(queryURL).then(function(res) {
//     console.log(res.data);
//     console.log(res.data.id);
// }



// .then(function({ username }) {
//   const queryURL = `https://api.github.com/users/${username}`;

//   axios.get(queryURL).then(function(res) {
//     console.log(res.data);
//     console.log(res.data.id);
   
//   });
// })



module.exports = {
  gitUsername: function(answers) {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "color",
        message: "What is your favorite color?"
      },
      {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
      }
    ])
  },
  getGit: function(answers) {
    const queryURL = `https://api.github.com/users/${answers.username}`;
    axios.get(queryURL).then(function(res) {
      console.log(res.data);
      console.log(res.data.id);
    })
  }
}