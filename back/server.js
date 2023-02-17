//Server
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});

//Database
const mysql = require("mysql");
const konekcija = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "toys",
});
konekcija.connect(function (err) {
  if (err) throw err;
  console.log("You have connected to database!");
});

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Read data from database
app.get("/allToys", function(req,res){

  konekcija.query("SELECT * FROM TOY", function(err,result,field){

    if (result.length>0){
      if(err) throw err;

      res.json({
        result: "ok",
        data:result
      })
    }else {
      res.json({
        result: "No toys"
      })
    }
  })
})

//Middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





