const express  = require('express');
const app = express();
// app.enable('trust proxy');
// app.use((req,res,next)=>{
//   if(req.protocol=='https'){
//     next();
//   }else{
//     res.redirect(`https://${req.hostname}`);
//   }
// })
// const path=require('path');
// app.use(express.static(path.join(__dirname,"../build")));
const server  = require('http').createServer(app);
let bodyParser = require('body-parser');
let mongoClient = require('mongodb').MongoClient;
let crypto = require('crypto-js');
const myKey = "forkify";
const list = require('./data/list');
const info = require('./data/info');
// app.get("/",(req,res,next)=>{
//   res.sendFile(path.join(__dirname,"../build","index.html"));
// })


//mongodb connectivity
var mongoUrl = "mongodb://localhost:27017/"
// var mongoUrl ="mongodb+srv://shivam:shivam027@cluster0-jg0ns.mongodb.net/test?retryWrites=true&w=majority";
mongoClient.connect(
  mongoUrl,
  {useNewUrlParser: true,  useUnifiedTopology: true }
  ,(err, client)=>{
    db = client.db('travelCompanion')
  }
);

//mongo DB funtions
// insertOne
// findOne
// updateOne
// deleteOne

app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb',extended: true}))

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
    




app.post('/login',(req,res)=>{
  console.log("yes");
    var pwd = crypto.SHA256(req.body.userPass).toString();
    db.collection("users").findOne({username : req.body.userName,password:pwd},(err,r)=>{
      if(err) throw err;
     if(r==null){
      res.send({'token':'invalid'});
     }
     else{
        console.log(r.username);
        var token = new Date().getDate() + myKey;
        var token2 = crypto.SHA256(token).toString();
        console.log(token2)
        res.send({'token':token2});
     }   
    }) 
})

app.post('/signup',(req,res)=>{
    db.collection('users').findOne({username:req.body.userName},(err,al)=>{
      console.log(al);
      if(al == null){
        var pwd = crypto.SHA256(req.body.userPass).toString();
        db.collection('users').insertOne({firstname:req.body.firstName,lastname:req.body.lastName,username:req.body.userName,password:pwd},(err,result)=>{
          res.send({'status':'loginNow'})
        })
      }
      else{
        res.send({'status':'already'});
      }
    })
})



app.post('/verifyToken',(req,res)=>{
  var todaysToken = crypto.SHA256( new Date().getDate()+myKey );

  if(req.body.token==todaysToken){
    res.send({'status':'valid'})
  }
  else{
    res.send({'status':'invalid'})
  }
})


app.get('/sendData/:destinationName',(req,res)=>{
    db.collection('info').findOne({},(err,result)=>{
      res.send(result.info[req.params.destinationName])    
    })
})


app.get('/list',(req,res)=>{
    db.collection('content').findOne({},(err,result)=>{
      res.send(result.list.data);   
    }) 
})

app.delete('/deleteAccount/:delUser',(req,res)=>{
    console.log(req.body.delUser);
    db.collection('users').deleteOne({username:req.params.delUser},(err,result)=>{
      res.send({'status':'deleted'});
    })
})

// app.use((req,res)=>{
//   res.send("404,not found");
// })

server.listen(process.env.PORT||5000,(req,res)=>{
  console.log("server is listening to port number 5000")
})