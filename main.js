var express = require('express');
var path = require('path');
var admin = require('firebase-admin');

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

app.listen(app.get('port'), function () {
	console.log('Listening on port ' + app.get('port') + '.');
});

// Template for the data to be stored
// revieweesRef.set ({
//    userId1: {
//       name: "Person A",
//       bio: "This is a test bio."
//       // img: 'public/static/img/sample_profile_img'
//       // facebook: https:www.facebook.com/profile.php?id=100002315758201
//       // twitter: https:twitter.com/abdul_ali5
//       // linkedin: https:www.linkedin.com/in/abdul-ali19/
//       reviews: { reviewerId1: answers, reviewerId2: answers }
//    },
//    userId2: {
//       name: "Person B",
//       reviews: {reviewerId1: "review1", reviewerId2: "review2"}
//    },
// });

function createUserProfile(userId, name, email /*imageUrl */) {
  return db.ref('users/' + userId).set({
    username: name,
    email: email,
    reviews: [{"key1": "value1"}],
    //profile_picture : imageUrl
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
    console.log(reviews);

    return reviewsRef.set(reviews);
  });
}

userId1 = "userId1";
reviewerId1 = "reviewerId1";
review1 = ["answer1", "answer2"];

reviewerId2 = "reviewerId2";
review2 = ["answer3", "answer4"];

createUserProfile(userId1, "AbdulA", "aliabdul5@gmail.com").then(function(){
  submitReview(userId1, reviewerId1, review1).then(function(){
  submitReview(userId1, reviewerId2, review2)
});
});
