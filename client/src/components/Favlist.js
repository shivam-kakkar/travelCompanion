import React,{useEffect} from 'react';
import axios from 'axios';

const Favlist =()=>{

  const populate=()=>
  {
    document.getElementById('listItem').innerHTML="";
    // document.getElementById('itemlist').innerHTML = `<img id="loading3" src="${require('../images/loading3.gif')}"/>`

    axios.get(`http://localhost:8080/http://localhost:5000/favList/${localStorage.getItem('userName')}`)
      .then((result)=>{
        console.log(result.data);
        if(result.data.length != 0)
        {
          document.getElementById("list").style.display = "none";
        }
        for(var i=0;i<result.data.length;i++){
          document.getElementById("listItem").insertAdjacentHTML('beforeend',
          ` <li class="alert alert-warning alert-dismissable">
              <button type="button" class="close" data-dismiss="alert">×</button>
              ${result.data[i]}
            </li>
          `)       
        }
      })
      .catch((error)=>{
        alert("something has went wrong");
      })
  }

  useEffect(()=>{
    populate()
  },[])

  return(
    <div id="shopping">
      <a href="javascript:void(0)" id="favCloseButton">&times;</a>
      <h1 id="shoppingTitle">Favourites</h1>
      <br/>
      <div id="list">
        <center>
          <h5><b>Your favourites list is empty</b></h5>
        </center>
        <br/>
      </div>
      <div id="listcontent">
        <ol id="listItem">

        </ol>
      </div>
      <center>
      </center>
    </div>
  )
}

export default Favlist;