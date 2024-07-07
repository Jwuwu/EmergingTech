const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var GamelibSchema = new Schema({
   title: {
      type: String,
      required: false,
   },
   genre: {
      type: String,
      required: false,
   },
   platform: {
      type: [String], 
      required: false,
   },
   releaseYear: {
      type: String,
      required: false,
   },
   developer: {
      type: String,
      required: false,
   },
   rating: {
      type: String,
      required: false,
   },
   description: {
      type: String,
      required: false,
   },
   imageFile: {
      type: String,
      required: false,
   },
});

mongoose.model("Gamelib", GamelibSchema);
