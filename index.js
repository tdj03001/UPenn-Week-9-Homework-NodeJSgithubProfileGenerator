const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const axios = require ("axios");

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?"
    },
    {
      type: "input",
      name: "color",
      message: "What is your favorite color?"
    },
    {
      type: "input",
      name: "hobby",
      message: "What is your favorite hobby?"
    },
    {
      type: "input",
      name: "game",
      message: "What is your favorite game?"
    },
    {
      type: "input",
      name: "movie",
      message: "Name your favorite movie"
    },
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]).then(function({ username }) {
    const queryURL = `https://api.github.com/users/${username}`;

    axios.get(queryURL).then(function(res) {
      console.log(res.data);
      console.log(res.data.id);
      // const repoNames = res.data.map(function(repo) {
      //   return repo.name;
      // });

      // const repoNamesStr = repoNames.join("\n");

      // fs.writeFile("repos.txt", repoNamesStr, function(err) {
      //   if (err) {
      //     throw err;
      //   }

      //   console.log(`Saved ${repoNames.length} repos`);
      // });
    });
  })
}

function createHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
  <title>Dev Profile</title>
  <link rel="icon" href="Assets/images/favicon.png">
</head>
<body>
  <div class="jumbotron jumbotron-fluid" style="background-color:${answers.color}">
    <div class="container container-fluid">
      <img src="" class="profileImg">
      <p class="gitHubUserName"></p>
      <a href=""><p class="location"></p></a>
      <a href=""><p class="gitHubProfile"></p></a>
      <a href=""><p class="blog"></p></a>
      <p class="bio"></p>
      <p class="repos"></p>
      <p class="followers"></p>
      <p class="stars"></p>
      <p class="followees"></p>
      <h1 class="display-4">Hi, I'm ${answers.name}</h1>
      <h5>I am from ${answers.location}.</h5>
      <h5>My favorite hobby is ${answers.hobby}.</h5>
      <h5>My favorite game is ${answers.game}.</h5>
      <h5>My favorite movie is ${answers.movie}.</h5>
      <h4>Contact Info:</h4>
      <ul class="list-group">
        <li class="list-group-item">GitHub username: ${answers.username}</li>
        <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
      </ul>
    </div>
  </div>
</body>
</html>`;

//make the HTML file mobile-first
}

promptUser()
.then((answers) => {
  const html = createHTML(answers);

  return writeFileAsync("index.html", html);
})
.then(function() {
  console.log("Successfully wrote to index.html");
})
.catch(function(err) {
  console.log(err);
});


/* DEVELOPMENT NOTES=========================================

- Maybe have two separate promptUser(), one for just github userID and other for rest of info, then invoke them in appropriate order?


===========================================================*/
