const mongoose = require('mongoose')
const express = require("express");
const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json());
app.use("/api/genres", require("./routes/genres"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/movies", require("./routes/movies"))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
