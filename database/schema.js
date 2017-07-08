let mongoose = require('react-native-local-mongodb');

mongoose.connect('mongodb://localhost/bestTime');

let db = mongoose.connection;

db.on('error', () => {
  console.log('could not connect to mongoDB');
})
db.once('open', () => {
  console.log('monogoDB connection established');
});

let bestTimeSchema = mongoose.Schema({
  userName: String,
  time: String,
  course: String
});

let bestTime = mongoose.model('bestTime', bestTimeSchema);

module.exports.bestTime = bestTime;
