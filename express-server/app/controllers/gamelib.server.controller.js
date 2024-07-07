const Game = require('mongoose').model('Gamelib');

// Create a new game
exports.create = async function (req, res) {
  try {
    const {
      title,
      genre,
      platform,
      releaseYear,
      developer,
      rating,
      description,
      imageFile
    } = req.body;

    // Create a new game object with only the provided fields
    const newGame = {};
    if (title) newGame.title = title;
    if (genre) newGame.genre = genre;
    if (platform) newGame.platform = platform;
    if (releaseYear) newGame.releaseYear = releaseYear;
    if (developer) newGame.developer = developer;
    if (rating) newGame.rating = rating;
    if (description) newGame.description = description;
    if (imageFile) newGame.imageFile = imageFile;

    const game = await Game.create(newGame);
    return res.status(201).json(game);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// List all games
exports.list = async function (req, res) {
  try {
    const games = await Game.find({});
    return res.status(200).json(games);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Read a single game by ID
exports.read = function (req, res) {
  res.status(200).json(req.game);
};

// Middleware to find a game by ID
exports.gameByID = async function (req, res, next, id) {
  try {
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).send({ message: 'Game not found' });
    }
    req.game = game;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.deleteById = async function (req, res) {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findByIdAndDelete(gameId);
    if (!game) {
      return res.status(404).send({ message: 'Game not found' });
    }
    return res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

exports.fetchforauth = async function (req, res) {
  try {
    const games = await Game.find({});
    return res.status(200).json(games);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};