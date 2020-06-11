const mongoose = require('mongoose')
const { Movie, validate } = require('../models/movie');
const {Genre} = require('../models/genre')
const express = require("express");
const router = express.Router();

// Getting all Movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid genre.')


  let movie = new Movie({ 
      title: req.body.title, 
      genre: {
          _id: genre_id,
          name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
     });

  movie = await movie.save();
  res.send(movie);
});

// router.put("/:id", async (req, res) => {
  
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, { 
//     new: true
//   });

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");
//   res.send(genre);
// });

// router.delete("/:id", async (req, res) => {

//   const genre = await Genre.findByIdAndRemove(req.params.id)
//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   // const index = genres.indexOf(genre);
//   // genres.splice(index, 1);

//   res.send(genre);
// });

// router.get("/:id", async  (req, res) => {

//   const genre = await Genre.findById(req.params.id);

//   if (!genre) return res.status(404).send("The genre with the given ID was not found.");
  
//   res.send(genre);
// });

module.exports = router;
