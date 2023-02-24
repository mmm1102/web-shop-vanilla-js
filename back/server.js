//Server
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});

//Database for toys
const mysql = require("mysql");
const konekcija = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "toys",
});
konekcija.connect(function (err) {
  if (err) throw err;
  console.log("You have connected to Toys database!");
});

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Read toys data from database
app.get("/allToys", function (req, res) {
  konekcija.query("SELECT * FROM TOY", function (err, result, field) {
    if (result.length > 0) {
      if (err) throw err;

      res.json({
        result: "ok",
        data: result,
      });
    } else {
      res.json({
        result: "No toys",
      });
    }
  });
});


//Read cars category from database
app.get("/cars", function (req, res) {
  konekcija.query("SELECT * FROM toy WHERE category='1'", function (err, result, field) {
    if (result.length > 0) {
      if (err) throw err;

      res.json({
        result: "ok",
        data: result,
      })
    }else {
      res.json({
        result: "No toys",
      })
    }
  })
})

//Read dolls category from database
app.get("/dolls", function (req, res) {
  konekcija.query("SELECT * FROM toy WHERE category='2'", function (err, result, field) {
    if (result.length > 0) {
      if (err) throw err;

      res.json({
        result: "ok",
        data: result,
      })
    }else {
      res.json({
        result: "No toys",
      })
    }
  })
})

//Read balls category from database
app.get("/balls", function (req, res) {
  konekcija.query("SELECT * FROM toy WHERE category='3'", function (err, result, field) {
    if (result.length > 0) {
      if (err) throw err;

      res.json({
        result: "ok",
        data: result,
      })
    }else {
      res.json({
        result: "No toys",
      })
    }
  })
})

//Read lego category from database
app.get("/lego", function (req, res) {
  konekcija.query("SELECT * FROM toy WHERE category='4'", function (err, result, field) {
    if (result.length > 0) {
      if (err) throw err;

      res.json({
        result: "ok",
        data: result,
      })
    }else {
      res.json({
        result: "No toys",
      })
    }
  })
})

//Middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database for users
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web_shop",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("You have connected to web_shop database!");
});

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Read users data from database
app.post("/register", function (req, res) {
  const { firstName, lastName, username, email, password } = req.body;

  connection.query(
    "SELECT * FROM web_shop_users where username=?",
    [username],
    function (err, result, field) {
      if (err) throw err;
      console.log(result);

      if (result.length > 0) {
        res.json({
          message: "User with that username already exist",
          data: "notok",
        });
      } else {
        connection.query(
          "INSERT INTO web_shop_users (firstName, lastName, username, email, password) VALUES (?,?,?,?,?);",
          [firstName, lastName, username, email, password],
          function (err, result, field) {
            if (err) throw err;
          }
        );

        res.json({
          message: "User successfully added",
          data: "ok",
        });
      }
    }
  );
});

//Check user from Login Page

app.post("/checkUser", function (req, res) {
  const { username, password } = req.body;

  connection.query(
    "SELECT * from web_shop_users where username=? and password=?",
    [username, password],
    function (err, result, field) {
      if (result.length > 0) {
        res.json({
          message: "Successfull login",
          data: "ok",
          result: result,
        });
      } else {
        res.json({
          message: "Failed to login",
          data: "Notok",
        });
      }
    }
  );
});
