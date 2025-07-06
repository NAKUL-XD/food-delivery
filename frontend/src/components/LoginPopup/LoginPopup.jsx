import React from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets';

import { use } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';



const LoginPopup = ({ setShowLogin }) => {
  const {url, setToken} = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Sign Up")
const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
})

const onchangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setData({ ...data, [name]: value });
  
}

const onLogin = async (event) => {
  event.preventDefault(); 
  let newUrl = url;
  if (currentState === "Login") {
    newUrl += "/api/user/login";
  } else {
    newUrl += "/api/user/register";
  }

  const response = await axios.post(newUrl, data);
  if (response.data.success) {
    setToken(response.data.token);
    localStorage.setItem("token", response.data.token);
    setShowLogin(false);
  } else {
    alert(response.data.message || "An error occurred. Please try again.");
   
  }


}

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? <></> : <input name='name' onChange={onchangeHandler} value={data.name} type="text" placeholder='Your name' required />}

          <input name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onchangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the termms of use and privacy policy
          </p>
        </div>
        {currentState === "Login" ? <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p> 
        : <p>Already have an account?<span onClick={()=>setCurrentState("Login")}>Login here
        </span></p>
        }



      </form>

    </div>
  )
}

export default LoginPopup
