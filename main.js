var express = require('express');
var path = require('path');
var admin = require('firebase-admin');
var json3 = require('json3');
var bodyParser = require('body-parser');
var reviews = require('./public/static/js/reviews.json');
var admin = require("firebase-admin");
var emotional = require("emotional");

// Fetch the service account key JSON file contents
var serviceAccount = require('./code2040-hack-2c918-firebase-adminsdk-sw672-0f4d44db29.json');

// Initialize the app with a service account, granting admin privilege
admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: 'https://code2040-hack-2c918.firebaseio.com'
});

var db = admin.database();
var ref = db.ref('/');
var app = express();


// Attach an asynchronous callback to read the data at our posts reference

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 2040));

app.get('/', function (req, res) {
  ref.once('value', function(snapshot) {
    res.render('index', { title : 'Home', data: JSON.stringify(snapshot.val()) });
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
    res.render('index', { title : 'Home', data: 'error' });
  });
});

console.log()
app.get('/:user', function (req, res) {
  ref.once('value', function(snapshot) {
    var userDb = snapshot.val().users;
    console.log(userDb);
    res.render('profile', { title : "Magic's Profile", data: userDb[req.params.user]});
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
    res.render('profile', { title : "Magic's Profile", data: 'error' });
  });
});

app.listen(app.get("port"), function () {
	console.log('Listening on port ' + app.get("port") + '.');

});

function PROPRIETARY_MACHINE_LEARNING_NATURAL_LANGUAGE_PROCESSING_SENTIMENT_ANALYSIS_ALGORITHM(sentiment) {
  return 45 * (sentiment.polarity + 1) + -10 * Math.sign(Math.sign(Math.sin(sentiment.polarity)) + Math.E / Math.PI) * Math.log(Math.abs(10 * sentiment.polarity * sentiment.subjectivity)) / Math.log(10);
}

app.get('/sentiment/:text', (req, res) => {
  emotional.load(() => {
    res.send({
      text: req.params.text,
      sentiment: emotional.get(req.params.text),
      score: PROPRIETARY_MACHINE_LEARNING_NATURAL_LANGUAGE_PROCESSING_SENTIMENT_ANALYSIS_ALGORITHM(
        emotional.get(req.params.text)
      ),
    });
  });
});

function createUserProfile(userId, name) {
  db.ref('users/' + userId).set({
    username: name,
    reviews: [{"key1": "value1"}], // Dummy values to initialize the reviews array as non-empty. skip the 0th index when accessing reviews
  });
}

// note: review is an array of answers where each index is the answer to a
// different question
function submitReview(userId, reviewerId, review) {
  var userRef = db.ref('users/' + userId)
  var reviewsRef = userRef.child("reviews")
  return userRef.once('value').then(function(snapshot) {
    var reviews = snapshot.val().reviews
    reviews[reviewerId] = review
    reviewsRef.set(reviews);
  });
}
// Use to set/update bio
function updateBio(userId, bio) {
  db.ref('users/' + userId).update({
    bio: bio
  });
}
// Use to set/update profile photo
function updateImage(userId, imageUrl) {
  db.ref('users/' + userId).update({
    image: imageUrl
  });
}
// Use to link fb account
function updateFb(userId, fbUrl){
  db.ref('users/' + userId).update({
    facebook: fbUrl
  });
}

// Use to link twitter account
function updateTwitter(userId, twitterUrl){
  db.ref('users/' + userId).update({
    twitter: twitterUrl
  });
}

// Use to link linkedin account
function updateLinkedin(userId, linkedinUrl){
  db.ref('users/' + userId).update({
    linkedin: linkedinUrl
  });
}

// Use to store user score
function updateScore(userId, score){
  db.ref('users/' + userId).update({
    score: score
  });
}

updateImage("userId1", "/static/img/headshot.png");