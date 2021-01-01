import React,{ useState, useEffect} from 'react';
import axios from 'axios';
const List = ()=>{

  const [j,setJ] = useState(1)
  const [val,setVal] = useState(0)

  const prev=()=>{
    if(j>1)
    {
      setJ(j-10)
      populate();
    }
  }
  const next=()=>{
    if(val-j>=1)
    {
      setJ(j+10)
      populate()
    }
  }

  const populate=()=>
  {
    document.getElementById('itemlist').innerHTML="";
    document.getElementById('itemlist').innerHTML = `<img id="loading3" src="${require('../images/loading3.gif')}"/>`


    axios.post("http://localhost:8080/http://localhost:5000/list")
      .then((result)=>{

        localStorage.setItem('content',JSON.stringify(result));
        setVal(30)


        if(result.data[j-1]!=undefined){
        document.getElementById('itemlist').innerHTML="";

        }
        else {
          return ; // Gets out of function
        }

        for(var i=j-1;i<j+9;i++)
        {
          if(result.data[i]==undefined)
            break;
          else{
            document.getElementById("itemlist").insertAdjacentHTML("beforeend",`
              <li class="items">
                <p><img id="destinationimg" src=${result.data[i].img} /></p>
                 <b><p class="destinationIdentity">${result.data[i].title}</p></b>
               </li>

            `);
          }
        }
       document.getElementById("itemlist").insertAdjacentHTML('beforeend',`
         <div id="nav">
         <button id="prev" class="btn btn-primary">Prev</button>
         <button id="next" class="btn btn-primary">Next</button>
         </div>
       `)

      })

      .catch((error)=>{
        alert("something has went wrong");
      })
  }

  

  document.addEventListener("click",(e)=>{
    if(e.target.id=="next")
    {
      next();

    }
    else if (e.target.id=="prev")
    {
      prev();
    }

  })
  
  useEffect(()=>{
    populate()
  },[])
  
    return(
      <div id="listcontainer">
        <div id="listCloseDiv">
          <a href="javascript:void(0)" id="listCloseButton">&times;</a>
          {/* <button type="submit" class="btn btn-light" id="listCloseButton">X</button> */}
        </div>
        <h1 id="listTitle">Trending Places</h1>
        <br/>
        <ul id="itemlist">
        </ul>
      </div>
    );
}

export default List ;