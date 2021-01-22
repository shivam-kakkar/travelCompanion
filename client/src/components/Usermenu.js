import React from "react";

const Usermenu = () => {
  return (
    <div id="userMenu">
      <div id="rightSidenav" class="rightsidenav">
        <a href="javascript:void(0)" id="userMenuCloseButton">
          &times;
        </a>
        {/* <a href="#" id="profile">Profile</a> */}
        <a href="#" id="logout">
          Logout
        </a>
        <a href="#" id="deleteAccount">
          Delete Account
        </a>
      </div>
    </div>
  );
};

export default Usermenu;
