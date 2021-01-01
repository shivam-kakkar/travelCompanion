import React from 'react';

const Favlist =()=>{
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