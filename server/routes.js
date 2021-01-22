const express = require("express");
const router = express.Router();
let crypto = require("crypto-js");
const myKey = "forkify";
const list = require("./data/list");
const info = require("./data/info");

let mongoClient = require("mongodb").MongoClient;

//mongodb connectivity
var mongoUrl = "mongodb://localhost:27017/";
// var mongoUrl ="mongodb+srv://shivam:shivam027@cluster0-jg0ns.mongodb.net/test?retryWrites=true&w=majority";
mongoClient.connect(
  mongoUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db("travelCompanion");
  }
);

//mongo DB funtions
// insertOne
// findOne
// updateOne
// deleteOne

//--------------------------------------------------------------------------------------------------------------------------//

//TO ADD LIST IN DATABASE //

// db.collection('content').insertOne({'list':list},(err,res)=>{
//   if(err) throw err;
// })

//TO ADD INFO IN DATABASE //

// db.collection('info').insertOne({'info':info},(err,res)=>{
//   if(err) throw err;
// })

//--------------------------------------------------------------------------------------------------------------------------//

router.post("/login", (req, res) => {
  console.log("yes");
  var pwd = crypto.SHA256(req.body.userPass).toString();
  db.collection("users").findOne(
    { username: req.body.userName, password: pwd },
    (err, r) => {
      if (err) throw err;
      if (r == null) {
        res.send({ token: "invalid" });
      } else {
        console.log(r.username);
        var token = new Date().getDate() + myKey;
        var token2 = crypto.SHA256(token).toString();
        console.log(token2);
        res.send({ token: token2 });
      }
    }
  );
});

router.post("/signup", (req, res) => {
  db.collection("users").findOne({ username: req.body.userName }, (err, al) => {
    console.log(al);
    if (al == null) {
      var pwd = crypto.SHA256(req.body.userPass).toString();
      db.collection("users").insertOne(
        {
          firstname: req.body.firstName,
          lastname: req.body.lastName,
          username: req.body.userName,
          password: pwd,
          favList: [],
        },
        (err, result) => {
          res.send({ status: "loginNow" });
        }
      );
    } else {
      res.send({ status: "already" });
    }
  });
});

router.post("/verifyToken", (req, res) => {
  var todaysToken = crypto.SHA256(new Date().getDate() + myKey);

  if (req.body.token == todaysToken) {
    res.send({ status: "valid" });
  } else {
    res.send({ status: "invalid" });
  }
});

router.get("/sendData/:destinationName", (req, res) => {
  db.collection("info").findOne({}, (err, result) => {
    res.send(result.info[req.params.destinationName]);
  });
});

router.get("/list", (req, res) => {
  db.collection("content").findOne({}, (err, result) => {
    res.send(result.list.data);
  });
});

router.delete("/deleteAccount/:delUser", (req, res) => {
  console.log(req.body.delUser);
  db.collection("users").deleteOne(
    { username: req.params.delUser },
    (err, result) => {
      res.send({ status: "deleted" });
    }
  );
});

router.post("/addFavList", (req, res) => {
  db.collection("users").updateOne(
    { username: req.body.userName },
    {
      $push: {
        favList: req.body.listItem,
      },
    }
  );
});

router.get("/favList/:userName", (req, res) => {
  db.collection("users").findOne(
    { username: req.params.userName },
    (err, result) => {
      res.send(result.favList);
    }
  );
});

module.exports = router;
