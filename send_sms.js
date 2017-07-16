
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session')
//hide these later on
var accountSid = 'ACff65e983906d23ec9c8f6882e21c4ef9'; 
var authToken = 'fcb3a80a51df00b1f8937ebc203fc5e7'; 
var app = express();

var questions = {
1: "How long have you known David?",
2: "What are the individuals top 2 qualties?",
3: "Where has he lived in last 6 months?",
4: "Would you wanna work with this individual?",
5: "What steps has they taken to rehabilitate themselves into society?"
}
var answers = {}
app.set('trust proxy', 1) // trust first proxy

app.use(session({ secret: 'anything-you-want-but-keep-secret', proxy: true,
    resave: true,
    saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: true })); 

var client = require('twilio')(accountSid, authToken);
// +6475026641'
client.messages.create({
	to:'INSERT PHONE HERE',
	from:'+14154032666',
	body:"This is CHESS texting to see if you'd vouch for David L. I will ask you a series of questions, send READY to begin?",

},function(err, req, message) { 
	// console.log(req);
	console.log(err);
    // console.error(message); 
});


app.post('/sms', function(req, res) {
	// console.log(req.body.Body);
	// console.log(req.session.counter);
	var smsCount = req.session.counter || 0;
	// var message = "OK I will ask you a series of questions, send READY to begin."
	var twilio = require('twilio');
    var twiml = new twilio.twiml.MessagingResponse();
    // twiml.message(message);
	if((smsCount == 0) && (req.body.Body === "READY" || req.body.Body === "Ready" 
		|| req.body.Body === "ready")) {
		req.session.counter = smsCount + 1;
		twiml.message(questions[1]);
	}
	if(smsCount == 1) {
		req.session.counter = smsCount + 1;
		answers[1] = req.body.Body;
		twiml.message(questions[2]);
	}
	else if(smsCount == 2) {
		req.session.counter = smsCount + 1;
		answers[2] = req.body.Body;
		twiml.message(questions[3]);
	}
	else if(smsCount == 3) {
		req.session.counter = smsCount + 1;
		answers[3] = req.body.Body;
		twiml.message(questions[4]);
	}
	else if(smsCount == 4) {
		req.session.counter = smsCount + 1;
		answers[4] = req.body.Body;
		twiml.message(questions[5]);
	} 
	else if(smsCount == 5) {
		req.session.counter = smsCount + 1;
		answers[5] = req.body.Body;
		twiml.message("We are done here, thanks for your time!");
	}
	// } else if(smsCount = 0) {
	// 	twiml.message("Please respond by typing READY?")

	// }
	
    console.log(twiml.toString());
	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});


http.createServer(app).listen(2040, function() {
	console.log('Express server listening on port');
});
