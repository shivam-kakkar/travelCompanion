import React from 'react';
import ReactDOM from 'react-dom';
const Login = ()=>{

  document.addEventListener("click",(e)=>{
    if(e.target.id=="close2" || e.target.id=="cancel")
    {
        document.getElementById('transparentBack').style.display="none";
        ReactDOM.unmountComponentAtNode(document.getElementById("form"));
        document.getElementById('form').style.height="0";

    }
  })
    
    return(
      <div id="loginDiv">
        <div>
          <p id="close">
            <button type="submit" class="btn btn-danger" id="close2">X</button>
          </p>
          <center>
          <br/>
          <br/>
            <h3>Login</h3>
            <form>
              <table id="login_table">
                <tr>
                  <br/>
                </tr>
                <tr>
                  <td><label>User Name:</label></td>
                  <td><input type="text" id="uname" placeholder="Enter your username"></input></td>
                </tr>    
                <tr>
                  <td><label>Password: </label></td>
                  <td><input type="password" id="upass"  placeholder="Enter Password"></input></td>
                </tr>
                <tr>
                  <td>
                    <br/><pre>            <button type="button" class="btn btn-danger" id="cancel">Cancel</button></pre>
                  </td>
                  <td>
                    <br/><pre><button type="button" class="btn btn-primary" id="ulogin">Login</button></pre>
                  </td>
                </tr>
                <tr>
                  <td><br/></td>
                </tr>
              </table>
            </form>
            <h6>Not Registered yet? <button id="nSignUp" class="btn btn-secondary">Signup</button> </h6>
                  
          </center>
        </div>
      </div>
    )
  }

export default Login;