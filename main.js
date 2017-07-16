var express = require('express');
var path = require('path');
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
    console.log(snapshot.val());
    res.render('index', { title : 'Home', data: JSON.stringify(snapshot.val()) });
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
    res.render('index', { title : 'Home', data: 'error' });
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

app.listen(app.get('port'), function () {
	console.log('Listening on port ' + app.get('port') + '.');
});
