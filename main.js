var express = require('express');
var path = require('path');
 var admin = require("firebase-admin");

 // Fetch the service account key JSON file contents
 var serviceAccount = require("./code2040-hack-2c918-firebase-adminsdk-sw672-0f4d44db29.json");

 // Initialize the app with a service account, granting admin privileges
 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "code2040-hack-2c918.firebaseapp.com"
 });

var db = admin.database();
// var provider = new firebase.auth.FacebookAuthProvider();
var app = express();
var ref = db.ref("/");

// Attach an asynchronous callback to read the data at our posts reference

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 2040));

app.get('/', function (req, res) {
  ref.once("value", function(snapshot) {
    console.log(snapshot.val());
    res.render('index',
    { title : 'Home', data: snapshot.val() }
    )
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    res.render('index',
    { title : 'Home', data: 'error' }
    )
  });
});

app.listen(app.get("port"), function () {
	console.log('Listening on port ' + app.get("port") + '.');
});
