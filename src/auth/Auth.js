import React, { useState } from "react";
import "./Auth.css";
import { API } from "../constants/time";
import axios from "axios";

export default function Auth(props) {
  // let [authMode, setAuthMode] = useState("signin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState([]);

  // const changeAuthMode = () => {
  //   setAuthMode(authMode === "signin" ? "signup" : "signin");
  // };

  async function handleOnSignInSubmit(event) {
    event.preventDefault();

    // Validate the form data

    // If the form data is valid, log in the user or create a new account

    const data = {
      Email: event.target.elements.email.value,
      Password: event.target.elements.password.value,
    };
    // console.log(email, password);

    // try {
    setIsLoading(true);
    axios.post(`${API}/signin`, data).then(
      (result) => {
        // console.log(result);
        if (result.data) {
          setIsLoggedIn(true);
          alert("You are logged in successfully.");
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          alert("Invalid email or password.");
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        console.log(error);
      }
    );
    // e.target.reset();

    //   if (response.ok) {
    //     // The user is logged in successfully
    //     // setIsLoggedIn(true);
    //   } else {
    //     // Display an error message to the user
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // Otherwise, display an error message to the user
  }
  // async function handleOnSignUpSubmit(event) {
  //   event.preventDefault();

  //   // Validate the form data

  //   // If the form data is valid, log in the user or create a new account
  //   const name = event.target.elements.name.value;
  //   const email = event.target.elements.email.value;
  //   const phoneNumber = event.target.elements.phoneNumber.value;
  //   const password = event.target.elements.password.value;

  //   try {
  //     const request = new Request(`${API}/signup`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         phoneNumber,
  //         password,
  //       }),
  //     });

  //     const response = await fetch(request);
  //     const data = await response.json();

  //     if (response.ok) {
  //       // The user account was created successfully
  //       setIsLoggedIn(true);
  //     } else {
  //       // Display an error message to the user
  //       alert("Unable to create user account.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // Otherwise, display an error message to the user
  // }

  // if (authMode === "signin") {
  if (!isLoading) {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleOnSignInSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            {/* <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div> */}
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                name="email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div class="scene">
        <div class="shadow"></div>
        <div class="jumper">
          <div class="spinner">
            <div class="scaler">
              <div class="loader">
                <div class="cuboid">
                  <div class="cuboid__side"></div>
                  <div class="cuboid__side"></div>
                  <div class="cuboid__side"></div>
                  <div class="cuboid__side"></div>
                  <div class="cuboid__side"></div>
                  <div class="cuboid__side"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="Auth-form-container">
  //     <form className="Auth-form" onSubmit={handleOnSignUpSubmit}>
  //       <div className="Auth-form-content">
  //         <h3 className="Auth-form-title">Sign In</h3>
  //         <div className="text-center">
  //           Already registered?{" "}
  //           <span className="link-primary" onClick={changeAuthMode}>
  //             Sign In
  //           </span>
  //         </div>
  //         <div className="form-group mt-3">
  //           <label>Full Name</label>
  //           <input
  //             type="text"
  //             className="form-control mt-1"
  //             placeholder="e.g Jane Doe"
  //             name="name"
  //           />
  //         </div>
  //         <div className="form-group mt-3">
  //           <label>Email address</label>
  //           <input
  //             type="email"
  //             className="form-control mt-1"
  //             placeholder="Email Address"
  //             name="email"
  //           />
  //         </div>
  //         <div className="form-group mt-3">
  //           <label>Phone Number</label>
  //           <input
  //             type="number"
  //             className="form-control mt-1"
  //             placeholder="Phone Number"
  //             name="phoneNumber"
  //           />
  //         </div>
  //         <div className="form-group mt-3">
  //           <label>Password</label>
  //           <input
  //             type="password"
  //             className="form-control mt-1"
  //             placeholder="Password"
  //             name="password"
  //           />
  //         </div>
  //         <div className="d-grid gap-2 mt-3">
  //           <button type="submit" className="btn btn-primary">
  //             Submit
  //           </button>
  //         </div>
  //         {/* <p className="text-center mt-2">
  //           Forgot <a href="#">password?</a>
  //         </p> */}
  //       </div>
  //     </form>
  //   </div>
  // );
}
