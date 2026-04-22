const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("nyondo_stock.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to database");
  }
});

// A
db.all("SELECT * FROM products", [], (err, rows) => {
  console.log("Query A:", rows);
});

// B
db.all("SELECT name, price FROM products", [], (err, rows) => {
  console.log("Query B:", rows);
});

// C
db.all("SELECT * FROM products WHERE id = 3", [], (err, rows) => {
  console.log("Query C:", rows);
});
// D
db.all("SELECT * FROM products WHERE name LIKE '%sheet%'", [], (err, rows) => {
  console.log("Query D:", rows);
});

// E
db.all("SELECT * FROM products ORDER BY price DESC", [], (err, rows) => {
  console.log("Query E:", rows);
});
// F
db.all("SELECT * FROM products ORDER BY price DESC LIMIT 2", [], (err, rows) => {
  console.log("Query F:", rows);
});

// G
db.run("UPDATE products SET price = 38000 WHERE id = 1", function (err) {
  if (err) {
    return console.error(err.message);
  }

  db.all("SELECT * FROM products WHERE id = 1", [], (err, rows) => {
    console.log("Query G:", rows);
  });
});



