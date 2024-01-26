import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css"; // Create a separate CSS file for styling
import { useNavigate } from "react-router-dom";
import { LoginApi,SignupApi } from "../utils/userapi";
import image from '../assets/bookstore-logo.png'

const AuthComponent = () => {
  const [authType, setAuthType] = useState("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuthTypeChange = (type) => {
    setAuthType(type);
  };
  const route = useNavigate();
  const handleSave = async() => {
    if (authType === "login") {
      const res = await LoginApi({email:email,password:password})
      if(res.status===201){
        route('/dashboard/books');
      }
    } else {
      const res = await SignupApi({name:fullName,email:email,password:password})
      if(res.status>=200&&res.status<=299)
      {
        setAuthType("login")
        route('/');
      }
    }
  };

  return (
    <div className="auth-container">
      <div
        className="centered-container"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="image-container">
          <img
            // className="image"
            src={image}
            alt="Description of the image"
            style={{ width: "70%", height: "60%" ,borderRadius:"50%",marginTop:"10px"}}
          />
          <br></br>
          <h5>ONLINE BOOK SHOPING</h5>
        </div>
        <div className="form-container" >
          <div
            className="button-container"
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              marginTop: "10px",
              justifyContent: "center",
            }}
          >
            <Button
              variant="text"
              onClick={() => handleAuthTypeChange("login")}
              style={{color:"#b50707",fontWeight:"bold",fontSize:"medium"}}
            >
              Login
            </Button>
            <Button
              variant="text"
              onClick={() => handleAuthTypeChange("signup")}
              style={{color:"#b50707",fontWeight:"bold",fontSize:"medium"}}
            >
              Signup
            </Button>
          </div>
          {authType === "login" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "30px",
                height: "80%",
              }}
            >
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleSave} style={{backgroundColor:"#900000"}}>
                Login
              </Button>
              <p style={{ textAlign: "center" }}>or</p>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20%",justifyContent:"center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  facebook
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleSave}
                  style={{backgroundColor:"#900000",color:"white"}}
                >
                  google
                </Button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "30px",
              }}
            >
              <TextField
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleSave} style={{backgroundColor:"#900000"}}>
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
