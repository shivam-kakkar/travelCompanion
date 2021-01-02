import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import Welcome from './components/Welcome';
import axios from 'axios';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Favlist from './components/Favlist';
import Menu from './components/Menu.js';
import Usermenu from './components/Usermenu';

ReactDOM.render(<Welcome />, document.getElementById('welcomeDiv'));
ReactDOM.render(<Menu/>,document.getElementById('menuBar'));
ReactDOM.render(<Favlist/>,document.getElementById('FavoriteList'));
ReactDOM.render(<Usermenu/>,document.getElementById('userMenuBar'));

if(localStorage.getItem('token') !== undefined){
  document.getElementById("welcome").style.display = "none";
  ReactDOM.unmountComponentAtNode(document.getElementById("welcomeDiv"));
  ReactDOM.render(<App />, document.getElementById('root'));
}

  var i=0;
  var m=0;
  var l = 0;
  document.addEventListener("click",(e)=>{

  if(e.target.id === "login"){
    document.getElementById('transparentBack').style.display="block";
    document.getElementById('form').style.height="62vh";
    setTimeout(()=>{ReactDOM.render(<Login/>,document.getElementById('form'))},300);
    
  }
  else if(e.target.id === "nSignUp"){
    ReactDOM.unmountComponentAtNode(document.getElementById("form"));
    ReactDOM.render(<Signup/>,document.getElementById('form'));
  }
  else if(e.target.id === "aSignUp"){
    ReactDOM.unmountComponentAtNode(document.getElementById("form"));
    ReactDOM.render(<Login/>,document.getElementById('form'));
  }
  else if(e.target.id === "explore"){
    ReactDOM.render(<App />, document.getElementById('root'));
    ReactDOM.unmountComponentAtNode(document.getElementById("welcomeDiv"));
  }
  else if(e.target.className === "userIcon"){
    if(l===0){
      document.getElementById('userMenuBar').style.display = "block";
      l++;
    }
    else if(l===1){
      document.getElementById('userMenuBar').style.display = "none";
      l--;
    }
  }
  else if(e.target.id === "userMenuCloseButton"){
    document.getElementById('userMenuBar').style.display = "none";
    l--;
  }
  else if(e.target.id === "logout"){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload();
  }
  else if(e.target.id === "deleteAccount"){
    if (window.confirm("Do you Confirm Account Deletion ?")) {
      var delUser = localStorage.getItem('userName');

      axios.delete(`http://localhost:8080/http://localhost:5000/deleteAccount/${delUser}`)
      .then((result)=>{
        if(result.data.status === 'deleted'){
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          alert("Account deleted Successfully");
          window.location.reload();
        }
      })
      .catch((error)=>{
        alert("something has went wrong");
      })
    } else {
      
    }
  }
  else if(e.target.id === "menu"){
    if(window.outerWidth<450){
      if(m===0)
      {
        document.getElementById('middle').style.gridTemplateColumns = "100% 0%";
        document.getElementById("listcontainer").style.display = "none";
        document.getElementById('mySidenav').style.width = "250px";
        document.getElementById('shopping').style.width = "0";
        i--;
        m++;
      }
      else if(m===1)
      {
        document.getElementById('mySidenav').style.width = "0";
        m--;
      }
    }
    else{
      if(m===0)
      {
        document.getElementById('middle').style.gridTemplateColumns = "100% 0%";
        document.getElementById("listcontainer").style.display = "none"; 
        document.getElementById('mySidenav').style.width = "250px";
        m++;
      }
      else if(m===1)
      {
        document.getElementById('mySidenav').style.width = "0";
        m--;
      }
    }
  }
  else if(e.target.id === "places"){
    if(window.outerWidth<450){
      document.getElementById('middle').style.gridTemplateColumns = "100% 0%";
      document.getElementById("listcontainer").style.display = "block"; 
      document.getElementById('mySidenav').style.width = "0";
      m--;
    }
    else{
      document.getElementById('middle').style.gridTemplateColumns = "25% 75%";
      document.getElementById("listcontainer").style.display = "block"; 
      document.getElementById('mySidenav').style.width = "0";
      m--;
    }
  }
  else if(e.target.id === "menuCloseButton"){
    document.getElementById('mySidenav').style.width = "0";
    m--;
  }
  else if(e.target.id === "favCloseButton"){
    document.getElementById('shopping').style.width = "0";
  }
  else if(e.target.id === "home"){
    document.getElementById("main").style.display = "block";
    document.getElementById("content").style.display = "none";
    document.getElementById('mySidenav').style.width = "0";
    m--;
  }
  else if(e.target.id==="logo")
  {
      document.getElementById('shopping').style.width = "20rem";
  }

  else if(e.target.id==="listOpen"){
    axios.post('http://localhost:8080/http://localhost:5000/verifyToken',{'token':localStorage.getItem('token')})
    .then((result)=>{
      if(window.outerWidth<450){
        if(result.data.status==='valid'){
          document.getElementById('shopping').style.width = "20rem";
          document.getElementById('mySidenav').style.width = "0";
          m--;
          i++;
        }
        else{
          alert("Login first");
          document.getElementById('transparentBack').style.display="block";
          document.getElementById('form').style.height="62vh";
          ReactDOM.render(<Login/>,document.getElementById('form'));
        }
      }
      else{
        if(result.data.status==='valid'){
          document.getElementById('shopping').style.width = "20rem";
        }
        else{
          alert("Login first");
          document.getElementById('transparentBack').style.display="block";
          document.getElementById('form').style.height="62vh";
          ReactDOM.render(<Login/>,document.getElementById('form'));
        }
      }
      if(result.data.status==='valid'){
        document.getElementById('shopping').style.display = "block";
        i++;
      }
      else{
        alert("Login first");
        document.getElementById('transparentBack').style.display="block";
        document.getElementById('form').style.height="62vh";
        ReactDOM.render(<Login/>,document.getElementById('form'));
      }
    })
  }
  else if(e.target.id === "ulogin"){
    var uname = document.getElementById("uname").value;
    var upass = document.getElementById("upass").value;
    
    axios.post('http://localhost:8080/http://localhost:5000/login',({'userName':uname,'userPass':upass}))
    .then((result)=>{
      

      if(result.data.token==='invalid'){
        alert("The username or password does not exist");
      }
      else{
        localStorage.setItem('token',result.data.token);
        localStorage.setItem('userName',uname)
        window.location.reload();
        document.getElementById("welcomeDiv").style.display = "none";
      }
      
      
    })
    .catch()
  }
  else if(e.target.id === "signUpButton"){

    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var uname = document.getElementById("uname").value;
    var upass = document.getElementById("upass").value;
    var uCpass = document.getElementById("uCpass").value;
    let statusR = '';


    if(fname==="" || lname==="" || uname==="" || upass==="" || uCpass===""){
      alert("fields cannot be empty");
      window.location.reload();
    }


                
    else if(uname.length < 6){
      alert("Username should be of atleast 6 characters");
    }

    
    
    else if(upass.length < 6){
        alert("Password should be of atleast 6 characters");
    }
    
    else if(uCpass !== upass){
        alert("Password does not match");
    }             
               
    
    else{

      axios.post('http://localhost:8080/http://localhost:5000/signup',({'firstName':fname,'lastName':lname,
      'userName':uname,'userPass':upass,'userConfirmPass':uCpass}))
      .then((result)=>{
        console.log(result)
        if(result.data.status === 'already'){
          alert('This username already exists');
          window.location.reload();
        }
        else if(result.data.status === "loginNow"){

          statusR = 'success';

          // alert("Signup succesfull. \n Now login using your credentials");
          // document.getElementById("welcomeDiv").style.display = "none";
          // window.location.reload();
        }
        
        
        
      })
      .then(()=>{
        if(statusR === 'success'){
          axios.post('http://localhost:8080/http://localhost:5000/login',({'userName':uname,'userPass':upass}))
          .then((result)=>{
            
      
            if(result.data.token==='invalid'){
              alert("The username or password does not exist");
            }
            else{
              localStorage.setItem('token',result.data.token);
              localStorage.setItem('userName',uname)
              window.location.reload();
              document.getElementById("welcomeDiv").style.display = "none";
            }
            
            
          })     
        }  
      })
      .catch()




    }

  }


  else if(e.target.className === "items"){
    document.getElementById("favButtonDiv").style.display="block";
  }









  // Phone Javascript //
  

  else if(e.target.id==="listCloseButton")
  {
    document.getElementById("listcontainer").style.display = "none";
    document.getElementById("show").style.display = "block";
    document.getElementById("middle").style.gridTemplateColumns = "100% 0%";
  }
  else if(e.target.id==="loginPhoneButton"){
    document.getElementById('transparentBack').style.display="block";
    document.getElementById('form').style.height="66vh";
    ReactDOM.render(<Login/>,document.getElementById('form'));
    document.getElementById('mySidenav').style.width = "0";
    m--;

  }

  else if(e.target.className==='destinationIdentity' && window.outerWidth<450)
  {
    document.getElementById("listcontainer").style.display = "none";
    document.getElementById("show").style.display = "block";
  }
  
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();