import React, { useState} from "react";
import './Leavemanagement.css'
import { useLocation } from "react-router-dom";
import { LEAVE_1_URL,LEAVE_2_URL } from "../config";
import Online_status from './Online_status';
const Leavemanagement = () => {
  const location = useLocation();
  // const [users, setUsers] = useState();
  const [leavebalanceData, setLeaveBalanceData] = useState(location.state.casual);
  const [message, setMessage] = useState("Welcome!!!");
  const [medical, setMedical] = useState(location.state.medical);
  const [casual, setCasual] = useState(location.state.casual);
  //const [data, setData] = useState([]);
  const [leaveType, setLeaveType] = useState("casual");
  const [leaveDays, setLeaveDays] = useState("");


  const id = location.state.id;
  const name=location.state.username;
  const handleSignup = async () => {

    fetchUsers();
    if (navigator.onLine) {
    try {
      const response = await fetch("https://leave-management-app-4kpz.vercel.app/leave/", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, leaveType, leaveDays}),
      });


      if (response.status === 200) {
        const data = await response.json();
        setMessage(data.message);
        setCasual(data.casual);
        setMedical(data.medical);
        if (leaveType === "casual") {
          setLeaveBalanceData(data.casual);
        }
        else if (leaveType === "medical") {
          setLeaveBalanceData(data.medical);
        }
        Change();
        
      } else {
        const data = await response.json();
        setMessage(data.message);
      }

    } catch (error) {
      
      setMessage("Sorry , Technical issues please try again later !!");
    }
  }else{
      alert('No internet connection. Action cannot be performed.');
  
    }
      
    };
  

  const Change=() =>{
    if (leaveType === "casual") {
      setLeaveBalanceData(casual);
    }
    else if (leaveType === "medical") {
      setLeaveBalanceData(medical);
    }
  }
  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://leave-management-app-4kpz.vercel.app/leave/${id}`);
      const data = await response.json();
      if (response.ok) {
        if (leaveType === "casual") {
          setLeaveBalanceData(data.casual);
        }
        else if (leaveType === "medical") {
          setLeaveBalanceData(data.medical);
        }
        //setData(data);
      } else {
        setMessage("Sorry ,Failed to fetch users !!");

      }
    } catch (error) {
      
      setMessage("Sorry ,Technical issues please try again later !!");
    }
  };
  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
    if (event.target.value === "casual") {
      setLeaveBalanceData(casual);

    }
    else if (event.target.value === "medical") {
      setLeaveBalanceData(medical);

    }

  };

  const handleLeaveDaysChange = (event) => {
    setLeaveDays(event.target.value);
  };

  const handleSubmit = (event) => {
    if (navigator.onLine) {
    event.preventDefault();
    //const days = parseInt(leaveDays);
    setLeaveDays("");
    updateleave();
    handleSignup();
    }else{
      alert('No internet connection. Action cannot be performed.');
  
    }
      
  };
  const updateleave = async () => {
    try {
      const response = await fetch(`https://leave-management-app-4kpz.vercel.app/leave/${id}`);
      const data = await response.json();
      if (response.ok) {
        // setUsers(data.leavebalance);
      } else {
        setMessage("Failed to fetch user !!");

      }
    } catch (error) {
      
      setMessage("Sorry , Technical issues please try again later !!");
    }
  };
  /*const reset = () =>{
    setLeaveBalanceData({
      ...leaveBalanceData,
      [leaveType]: leaveBalanceData[leaveType] + 5,
    });
  }
  <button type="submit" onClick={() => reset()}>Reset</button>
  */

  return (
    <>
    <Online_status/>
    <div className="container">
      <h1>Leave Management System</h1>
      <div className="form-container">
      <h2>Leave Application</h2>
        <table><tr>
          <td>ID</td><td>: </td><td>{location.state.id}</td></tr>
         <tr> <td>Name</td><td>: </td><td>{name}</td></tr>
          <tr><td>Message</td><td>: </td><td>{message}</td></tr>
          
        </table>
        <br></br>
        <form onSubmit={handleSubmit}>
          <select value={leaveType} onChange={handleLeaveTypeChange}>
            <option value="casual">Casual Leave</option>
            <option value="medical">Medical Leave</option>
          </select>
          <input
            type="number"
            min={1}
            max={10}
            value={leaveDays}
            onChange={handleLeaveDaysChange}
            placeholder="No. of days"
            required
          />
          <button type="submit">Apply Leave</button>
        </form>

      </div>
      <div className="balance-container">

        <h2>Leave Balance</h2>
        <div className="balance">
          
        <p>Available casual leave: {casual}   medical leave: {medical}</p>
          
        </div>

      </div>
    </div>
    </>
  );
//Available {leaveType} Leaves: {leavebalanceData} 

}

export default Leavemanagement;
