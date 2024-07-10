import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./login.css";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate=useNavigate();
  function handleLogin(){
    navigate("/")
  }

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3001/signup', {
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
      console.error(error);
    }
  };

  return (
    
    <div class="login-container">
      <h2>Signup</h2>
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
      <button onClick={handleSignup} class="login-button">Signup</button>
      <p>{message}</p>
      <br>
      </br>
      <h1 onClick={handleLogin} class="signup-link">Login</h1>
    </div>
  );
}

export default Signup;
