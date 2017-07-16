const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const json3 = require('json3');
const bodyParser = require('body-parser');
const reviews = require('./public/static/js/reviews.json');
const emotional = require('emotional');

// Fetch the service account key JSON file contents
const serviceAccount = require('./code2040-hack-2c918-firebase-adminsdk-sw672-0f4d44db29.json');

// Initialize the app with a service account, granting admin privilege
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://code2040-hack-2c918.firebaseio.com'
});

const db = admin.database();
const ref = db.ref('/');
const app = express();
// Attach an asynchronous callback to read the data at our posts reference

app.use(express.static(`${__dirname}/public`));

app.set('views', `${__dirname }/public/views`);
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 2040));

app.get('/', (req, res) => {
  ref.once('value', (snapshot) => {
    res.render('index', { title: 'Home', data: JSON.stringify(snapshot.val()) });
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
    res.render('index', { title: 'Home', data: 'error' });
  });
});

app.get('/recs', (req, res) => {
  ref.once('value', (snapshot) => {
    console.log(snapshot.val());
    res.render('recs', { title: 'Home', data: JSON.stringify(snapshot.val()) });
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
    res.render('recs', { title: 'Home', data: 'error' });
  });
});

app.get('/:user', (req, res) => {
  ref.once('value', (snapshot) => {
    const userDb = snapshot.val().users;
    console.log(userDb[req.params.user]);
    res.render('profile', { title: "Magic's Profile", data: userDb[req.params.user] });
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
    res.render('profile', { title: "Magic's Profile", data: 'error' });
  });
});

// Log in with Facebook
app.get('/oauth', (req, res) => {
  ref.once('value', (snapshot) => {
    console.log(snapshot.val());
    res.sendFile(`${__dirname }/public/views/oauth.html`);
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
    res.render('index', { title: 'oauth', data: 'error' });
  });
});

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}.`);
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
  db.ref(`users/${userId}`).set({
    username: name,
    reviews: [{ key1: 'value1' }], // Dummy values to initialize the reviews array as non-empty. skip the 0th index when accessing reviews
  });
}

// note: review is an array of answers where each index is the answer to a
// different question
function submitReview(userId, reviewerId, review) {
  const userRef = db.ref(`users/${userId}`);
  const reviewsRef = userRef.child('reviews');
  return userRef.once('value').then((snapshot) => {
    const reviews = snapshot.val().reviews;
    reviews[reviewerId] = review;
    reviewsRef.set(reviews);
  });
}
// Use to set/update bio
function updateBio(userId, bio) {
  db.ref(`users/${userId}`).update({
    bio
  });
}

// Use to set/update profile photo
function updateImage(userId, imageUrl) {
  db.ref(`users/${userId}`).update({
    image: imageUrl
  });
}
// Use to link fb account
function updateFb(userId, fbUrl) {
  db.ref(`users/${userId}`).update({
    facebook: fbUrl
  });
}

// Use to link twitter account
function updateTwitter(userId, twitterUrl) {
  db.ref(`users/${userId}`).update({
    twitter: twitterUrl
  });
}

// Use to link linkedin account
function updateLinkedin(userId, linkedinUrl) {
  db.ref(`users/${userId}`).update({
    linkedin: linkedinUrl
  });
}

// Use to store user score
function updateScore(userId, score) {
  db.ref(`users/${userId}`).update({
    score
  });
}

updateImage('userId3', '/static/img/david.png');
