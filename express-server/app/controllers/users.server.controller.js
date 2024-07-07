const User = require('mongoose').model('User');
const Game = require('mongoose').model('Gamelib');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

const getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.create = function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};

exports.list = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
  User.findOne({ _id: id }).populate('favoriteGames').exec((err, user) => {
    if (err) {
      return next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
};

exports.delete = function(req, res, next) {
  User.findByIdAndRemove(req.user.id, req.body, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
};

exports.authenticate = function(req, res, next) {
  const username = req.body.auth.username;
  const password  = req.body.auth.password;

  User.findOne({username: username}, (err, user) => {
    if (err) {
      return next(err);
    } else {
      if(bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user._id, username: user.username }, jwtKey, 
          {algorithm: 'HS256', expiresIn: jwtExpirySeconds });
        res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true});
        res.status(200).send({ screen: user.username });
        req.user=user;
        next()
      } else {
        res.json({status:"error", message: "Invalid username/password!!!", data:null});
      }
    }
  });
};

exports.welcome = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).end()
  }

  var payload;
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return res.status(400).end()
  }

  res.send(`${payload.username}`)
};

exports.signout = (req, res) => {
  res.clearCookie("token")
  return res.status('200').json({message: "signed out"})
};

exports.isSignedIn = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.send({ screen: 'auth' }).end();
  }
  var payload;
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return res.status(400).end()
  }
  res.status(200).send({ screen: payload.username });
};

exports.requiresLogin = function(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.send({ screen: 'auth' }).end();
  }
  var payload;
  try {
    payload = jwt.verify(token, jwtKey)
    req.id = payload.id;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).end()
    }
    return res.status(400).end()
  }
  next();
};
