var express = require('express');
var app = express();
var SqliteToJson = require('sqlite-to-json');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/favs', function (req, res) {
  const db = new sqlite3.Database('./favorites.sqlite');
  db.all('SELECT * FROM favorites', function(err,data) {
    console.log(data);
    res.send(data);
  });
  db.all('SELECT * FROM categories', function(err,data) {
    console.log(data);
  });
  db.close();
});

app.post('/favs', function (req, res) {
  var input = req.body;
  console.log(input);

  var db = new sqlite3.Database('./favorites.sqlite');

  var stmt1;
  input.category.forEach(function(categ) {
    stmt1 = db.prepare("INSERT OR IGNORE INTO categories VALUES (?)");
    stmt1.run(categ, function (err) {
      if (err) {
       console.log(err);
       return res.status(505).send(err);
      };
    });
    stmt1.finalize();
  });

  var stmt2 = db.prepare("INSERT INTO favorites (category, url, description) VALUES (?, ?, ?)");
  stmt2.run(input.category.join(","), input.url, input.description, function (err, data) {
    if (!err) {
      return res.status(201).send(data);
    }
    else {
     console.log(err);
     return res.status(505).send(err);
    }
  });
  stmt2.finalize();
});

app.delete('/favs/:id', function (req, res) {
  var fav_id = req.params.id;
  console.log("deleting: " + fav_id);

  var db = new sqlite3.Database('./favorites.sqlite');

  var stmt = db.prepare("DELETE FROM favorites where id=?");
  stmt.run(fav_id, function (err) {
    if (err) {
     console.log(err);
     return res.status(505).send(err);
    };
  });
  stmt.finalize();
});

app.put('/favs/:id', function (req, res) {
  var input = req.body;
  console.log(input);

  var db = new sqlite3.Database('./favorites.sqlite');

  var stmt1 = db.prepare("INSERT OR IGNORE INTO categories VALUES (?)");
  stmt1.run(input.category);
  stmt1.finalize();

  var stmt2 = db.prepare("INSERT INTO favorites (category, url, description) VALUES (?, ?, ?)");
  stmt2.run(input.category, input.url, input.description);
  stmt2.finalize();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
