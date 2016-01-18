var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('favorites.sqlite');
 
db.serialize(function() {

  db.run("CREATE TABLE categories (category NVARCHAR(50) UNIQUE)");
  db.run("CREATE TABLE favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, category NVARCHAR(50), url NVARCHAR(2083) UNIQUE, description NVARCHAR(2083) UNIQUE)");
 
  db.run("INSERT INTO favorites (category, url, description) VALUES ('banking','http://td.com', 'http://td.com')");
//  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//  for (var i = 0; i < 10; i++) {
//      stmt.run("Ipsum " + i);
//  }
//  query.finalize();
 
  db.each("SELECT id, category, url, description FROM favorites", function(err, row) {
      console.log(row.id + ": " + row.category + ": " + row.url + ": " + row.description);
  });
});
 
db.close();
