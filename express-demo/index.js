const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

// Define template engines
app.set("view engine", "pug");
app.set("views", "./views");

// console.log(`Node_Env: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`);
// Define build in middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
appp.use("/", home);
// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan Enabled");
}

//Database work
dbDebugger("Connected database");

// Define middleware in a separate folder
app.use(logger);

//PORT : environment which application runs
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// app.post();
// app.put();
// app.delete();

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}
