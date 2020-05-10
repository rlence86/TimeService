var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let date = new Date();
  if (req.params.date_string) {
    if (!isNaN(req.params.date_string)) {
      date = new Date(parseInt(req.params.date_string));
    } else {
      date = new Date(req.params.date_string);      
    }
  }
  if (isNaN(date.getTime())) {
    res.json({"error" : "Invalid Date" });
  } else {
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  }
});

app.get("/api/whoami", function (req, res) {
  res.json({"ipaddress":req.get("X-Forwarded-For"),
            "language":req.get("Accept-Language"),
            "software":req.get("User-Agent")});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
