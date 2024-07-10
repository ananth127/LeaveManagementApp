import React, { useState } from "react";
import './Leavemanagement.css';
import { useLocation } from "react-router-dom";

const Leavemanagement = () => {
  const location = useLocation();
  const [leavebalanceData, setLeaveBalanceData] = useState(location.state.casual);
  const [message, setMessage] = useState("Welcome!!!");
  const [medical, setMedical] = useState(location.state.medical);
  const [casual, setCasual] = useState(location.state.casual);
  const [leaveType, setLeaveType] = useState("casual");
  const [leaveDays, setLeaveDays] = useState("");

  const id = location.state.id;
  const name = location.state.username;

  const handleSignup = async () => {
    try {
      const response = await fetch(`https://leave-management-app-orpin.vercel.app/leave/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leaveType, leaveDays }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setCasual(data.casual);
        setMedical(data.medical);
        if (leaveType === "casual") {
          setLeaveBalanceData(data.casual);
        } else if (leaveType === "medical") {
          setLeaveBalanceData(data.medical);
        }
      } else {
        const data = await response.json();
        setMessage(data.message);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
    if (event.target.value === "casual") {
      setLeaveBalanceData(casual);
    } else if (event.target.value === "medical") {
      setLeaveBalanceData(medical);
    }
  };

  const handleLeaveDaysChange = (event) => {
    setLeaveDays(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLeaveDays("");
    handleSignup();
  };

  return (
    <div className="container">
      <h1>Leave Management System</h1>
      <div className="form-container">
        <h2>Leave Application</h2>
        <table>
          <tr>
            <td>ID</td><td>: </td><td>{location.state.id}</td>
          </tr>
          <tr>
            <td>Name</td><td>: </td><td>{name}</td>
          </tr>
          <tr>
            <td>Message</td><td>: </td><td>{message}</td>
          </tr>
        </table>
        <br />
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
          <p>Available casual leave: {casual} medical leave: {medical}</p>
        </div>
      </div>
    </div>
  );
};

export default Leavemanagement;
