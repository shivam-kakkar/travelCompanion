import React, { Component } from "react";
import ReactDOM from "react-dom";
const Signup = () => {
  document.addEventListener("click", e => {
    if (e.target.id == "close2" || e.target.id == "cancel") {
      document.getElementById("transparentBack").style.display = "none";
      ReactDOM.unmountComponentAtNode(document.getElementById("form"));
      document.getElementById("form").style.height = "0";
    }
  });
  return (
    <div id="signupDiv">
      <p id="close">
        <button type="submit" id="close2" class="btn btn-danger">
          X
        </button>
      </p>
      <center>
        <h3>Sign Up</h3>
        <form action="" method="">
          <table id="login_table">
            <tr>
              <td>
                <label>First Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  id="fname"
                  placeholder="Enter your First name"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Last Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  id="lname"
                  placeholder="Enter your Last name"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>User Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  id="uname"
                  placeholder="Enter your username"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Password: </label>
              </td>
              <td>
                <input
                  type="password"
                  id="upass"
                  placeholder="Enter Password"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Confirm Password: </label>
              </td>
              <td>
                <input
                  type="password"
                  id="uCpass"
                  placeholder="Confirm Password"
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <br />
                <pre>
                  {" "}
                  <button type="button" class="btn btn-danger" id="cancel">
                    Cancel
                  </button>
                </pre>
              </td>
              <td>
                <br />
                <pre>
                  {" "}
                  <button
                    type="button"
                    class="btn btn-primary"
                    id="signUpButton"
                  >
                    Signup
                  </button>
                </pre>
              </td>
            </tr>
            <tr>
              <td>
                <br />
              </td>
            </tr>
          </table>
        </form>
        <h6>
          Already Signed Up?{" "}
          <button id="aSignUp" class="btn btn-secondary">
            Login
          </button>{" "}
        </h6>
      </center>
    </div>
  );
};
export default Signup;
