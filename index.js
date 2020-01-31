const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const github= require("./github.js");


// function promptUser() {
//   return inquirer.prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "What is your name?"
//     },
//     {
//       type: "input",
//       name: "color",
//       message: "What's your favorite color?"
//     },
//     {
//       type: "input",
//       name: "username",
//       message: "What is your GitHub Username"
//     }
//   ]) 
// }


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
      <a href=""><p class="gitHubProfile"></p></a>
      <p class="bio">${answers.bio}</p>
      <p class="repos">My repos: ${answers.repos_url}</p>
      <p class="followers"> My followers: </p>
      <p class="stars">Starred repos: </p>
      <p class="followees">Who I follow: </p>
      <h1 class="display-4">Hi, I'm ${answers.name}</h1>
      <h4>Contact Info:</h4>
      <ul class="list-group">
        <li class="list-group-item">GitHub username: ${answers.username}</li>
      </ul>
    </div>
  </div>
</body>
</html>`;

//make the HTML file mobile-first
}

// promptUser()
github.gitUsername()
.then(github.getGit)
.then(function(answers) {
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

- Why does 'answers' in getGit function not correlate to user-entered responses?
- Try two separate promptUser functions, one for just github userID and other for rest of info, then invoke them in appropriate order
- how to convert to PDF once functional
- 

===========================================================*/
