import React,{Component} from 'react';
import axios from 'axios';
import Login from "./Login";
import ReactDOM from 'react-dom';

const Show =()=>{

  const fav=()=>{
    axios.post('http://localhost:8080/http://localhost:5000/verifyToken',{'token':localStorage.getItem('token')})
    .then((result)=>{
      if(result.data.status=='valid'){
        alert("Added to Favourites");
        document.getElementById("list").innerHTML = "";
        var name = document.getElementById("destinationTitle").textContent;
        document.getElementById("listItem").insertAdjacentHTML('beforeend',
            ` <li class="alert alert-warning alert-dismissable">
                <button type="button" class="close" data-dismiss="alert">×</button>
                ${name}
              </li>
            `)
      }
      else{
        alert("Login first");
        document.getElementById('transparentBack').style.display="block";
        document.getElementById('form').style.height="62vh";
        ReactDOM.render(<Login/>,document.getElementById('form'));
      }
    })

  }

  document.addEventListener('click',(e)=>{

    if(e.target.className=='destinationIdentity'){
      var destinationName = e.target.textContent;
      document.getElementById('destinationTitle').textContent = destinationName;
      document.getElementById("favButtonDiv").style.display="block";
      var contentJSON = JSON.parse(localStorage.getItem('content'));
      document.getElementById('first').innerHTML = `<img id="loading2" src="${require('../images/loading2.gif')}"/>`
      document.getElementById("main").style.display = "none";
      document.getElementById("content").style.display = "block";

      axios.get("http://localhost:8080/http://localhost:5000/list")
      .then((result)=>{
        
        document.getElementById('first').innerHTML = "";
        for(var i=0;;i++){
          if(result.data[i].title==destinationName){
            document.getElementById("first").insertAdjacentHTML("beforeend",`                      
                        <img id="destinationImg" src="${result.data[i].img}"/>`);                      
                        break;
          }
        }
      })

      axios.get(`http://localhost:8080/http://localhost:5000/sendData/${destinationName}`)
      .then((result)=>{
        document.getElementById('ing').innerHTML="";
          document.getElementById('ing').insertAdjacentHTML('beforeend',`
            ${result.data}
          `)

          
      })
      .catch()

    }
  })

  return(
    <div id="show" class="section-dark">
      <div id="main">
          <div class="pimg1">
            <div class="ptext">
              <span class="border">
                Travel Companion
              </span>
            </div>
          </div>
          <section class="section section-light justified">
            <h2>Why Travel Companion ?</h2>
            <p>
              Travel Companion is an online travel guide which helps people to find the best places to visit in the world. Here we keep record of the most trending places to visit in the world right now. The places are ranked from top to bottom. For more information click on the links present in the website
            </p>
          </section>

          <div class="pimg2">
            <div class="ptext">
              <span class="border trans">
                Paris
              </span>
            </div>
          </div>

          <section class="section section-dark2">
            <h2>What else do we provide ?</h2>
            <p>
              Find top hotels in the best places to visit in the world. You can find hotels according to your budget and need. We also provide information about most popular destinations in the city that will help you explore the place in a convenient and hassle free way We also provide exciting discounts and deals on hotels and other places you want to visit in the city
            </p>
          </section>

          <div class="pimg3">
            <div class="ptext">
              <span class="border trans">
                Big City
              </span>
            </div>
          </div>
      </div>


      <div id="content">
        <h1 id='destinationTitle'></h1>
        <div id="first"></div>


        <section id="second" class="section2">
            <p id="ing"></p>
            <div id="favButtonDiv">
              <button class="btn" id="favButton" onClick={fav}>Add to Favourites</button>
            </div>
        </section>
      </div>
    </div>
  )
}
export default Show;