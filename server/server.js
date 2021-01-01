const express  = require('express');
const app = express();
const routes = require('./routes');
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
const morgan = require('morgan');

// app.get("/",(req,res,next)=>{
//   res.sendFile(path.join(__dirname,"../build","index.html"));
// })

app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb',extended: true}))
app.use(morgan('tiny'));
app.use('/', routes);
    
// app.use((req,res)=>{
//   res.send("404,not found");
// })

server.listen(process.env.PORT||5000,(req,res)=>{
  console.log("server is listening to port number 5000")
})