import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./login.css";
import Online_status from './Online_status';
import { SIGNUP_1_URL } from '../config';
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate=useNavigate();
  function handleLogin(){
    navigate("/")
  }

  const handleSignup = async () => {
    if (navigator.onLine) {
      if(username =="" || password==""){
        setMessage("Enter All Fields !!");
      }
      else{
    try {
      const response = await fetch("https://leavemanagementapp.onrender.com/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      if(error){
        setMessage("Sorry , Technical issues please try again later !!");
      }
    }
  }
  }else{ alert('No internet connection. Action cannot be performed.');
  
    }
      
    };

  return (
    <>
    <div class="login-container">
    <Online_status/>
      <h2>Sign up</h2>
        
      <input required
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        class="input-field"
      />
      <input required
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        class="input-field"
      />
      <button type='submit' onClick={handleSignup}  class="login-button">Signup</button>
      <p>{message}</p>
      <br>
      </br>
      <h1 onClick={handleLogin} class="signup-link">Login</h1>
    </div>
    </>
  );
}

export default Signup;
