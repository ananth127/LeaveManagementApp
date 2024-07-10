import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./login.css";
import Online_status from './Online_status';
import { LOGIN_1_URL } from '../config';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [objectid, setObjectid] = useState('');


  const navigate=useNavigate();
  function handlesignup(){
    navigate("/signup")
  }
  const handleLogin = async () => {
    if (navigator.onLine) {
    try {
      const response = await fetch("http://leavemanagementapp.onrender.com/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setObjectid(data.userId);
        console.log("User ID : ",data.userId);
        console.log("fjflf balance : ",data.leavebalance);
        navigate("/Leavemanagement/",{state:{id:data.userId,casual:data.casual,medical:data.medical,username:data.username1}});
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }else{
    alert('No internet connection. Action cannot be performed.');

  }
  };

  return (
    <>
    <Online_status/>
    <div class="login-container">
  <h2>Login</h2>

  <p id="object-id">{objectid}</p>

  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    class="input-field"
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    class="input-field"
  />

  <button onClick={handleLogin} class="login-button">Login</button>
  <p class="message">{message}</p>

  <br />

  <h1 onClick={handlesignup} class="signup-link">Signup</h1>
</div>
    </>
    

  );
}

export default Login;
