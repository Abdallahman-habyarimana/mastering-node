// Creating a custom middleware
function log(req, res, next) {
  console.log("Logging...");
  next();
}

//   // Creating a custom middleware
//   function (req, res, next) {
//     console.log("Authenticating...");
//     next();
//   };

module.exports = log;
