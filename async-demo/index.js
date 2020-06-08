// Asynchronous
console.log("Before");
getUser(1, getRepositories);
//console.log(user);
console.log("After");

function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id) {
  return new Promise((resolve, reject) => {});
  setTimeout(() => {
    console.log("Reading a user from a database");
    resolve({ id: id, gitHubUsername: "habdallah005" });
  }, 2000);
  //return 1;
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["repo1", "repos2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    console.log("Calling GitHub API...");
    resolve(["commit"]);
  }, 2000);
}
