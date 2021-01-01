import React,{useEffect} from 'react';
import Axios from 'axios';
import menuImage from '../images/menu.png';
import userImage from '../images/user.jpg';
import logoImage from '../images/logo5.jpg';

const Header = ()=>{

  const verifyToken = ()=>{
    if(localStorage.getItem('token')!=undefined){
      Axios.post('http://localhost:8080/http://localhost:5000/verifyToken',{'token':localStorage.getItem('token')})
      .then((result)=>{
        console.log(result)
        if(result.data.status=='valid'){
          if(window.outerWidth<450){
            document.getElementById('home').insertAdjacentHTML('beforebegin',`
              <div id="loggedIn">
                <img class="userIcon" src = ${userImage}/>
                <span class="userButton">${localStorage.getItem('userName')}</span>
              </div>
            `)
          document.getElementById('loginPhoneButton').style.display="none";
          document.getElementById('logo').style.display="block";
          }
          else{              
            document.getElementById('login').insertAdjacentHTML('afterend',`
            <div id="loggedIn">
              <img class="userIcon" src = ${userImage}/>
              <span class="userButton">${localStorage.getItem('userName')}</span>
            </div>
            `)
          document.getElementById('login').style.display="none";
          document.getElementById('logo').style.display="block";
          }
        }
        else{

        localStorage.removeItem('token')
        localStorage.removeItem('userName');
        alert('your session has expired')

        }
      })
      .catch((error)=>{
        alert("something has went wrong");
      })
    }
  }
  useEffect(()=>{
    verifyToken()
  })
  
  return(
    <div id="header">
      <img id="menu" src = {menuImage}/>
      <p id="headertitle">Travel Companion</p>
      <input type="text" id="searchbar" placeholder="Search here"/>
      <button className="btn btn-primary" type="button" id="searchButton">Search</button>
      
      <button  className="btn btn-success" type="button" id="login">Login</button>
      <img id="logo" src = {logoImage}/>
      {/* <img id="heart2" src = {require('../images/heart.png')}/> */}
    </div>
  ); 
}

export default Header;