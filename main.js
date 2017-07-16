var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.set('port', (process.env.PORT || 2040));

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});

app.listen(app.get("port"), function () {
	console.log('Listening on port ' + app.get("port") + '.');
});
