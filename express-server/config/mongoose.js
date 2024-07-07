var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    const db = mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => console.log('DB Connected!'))
      .catch(err => {
        console.error('Error', err);
      });

    require('../app/models/user.server.model');
    require('../app/models/gamelib.server.model');

    return db;
};
