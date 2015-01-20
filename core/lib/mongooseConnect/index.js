var mongoose = require('mongoose');

module.exports = {
  connect: connect
};

function connect(uri, done) {

  switch (mongoose.connection.readyState) {
    case 0: // not connected
      mongoose.connect(uri, done);
      break;

    case 1: // connected
      setImmediate(done);
      break;

    case 2: // connecting
      mongoose.connection.once('connected', done);
      break;

    case 3: // disconnecting
      mongoose.connection.once('disconnected', function() {
        mongoose.connect(uri, done);
      });
  }
}