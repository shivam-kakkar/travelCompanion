import React from 'react';

const Menu = ()=>{
  return(
    <div id="menuNav">
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" id="menuCloseButton">&times;</a>
        <a href="#" id="home">Home</a>
        <a href="#" id="loginPhoneButton">Login</a>
        <a href="#" id="places">Places</a>
        <a href="#" id="listOpen">Favourites</a>
        <a href="#">About</a>
      </div>
    </div>
  )
}
export default Menu;