import React, { useState, useEffect } from 'react';
import './Online_st.css'; 
const Online_status = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="app-container">
      {!isOnline && (
        <div className="offline-message">
          <img src="offline.png" alt="Offline Icon" className="offline-icon" />
          <p>No internet connection detected. Please check your network settings.</p>
        </div>
      )}
    </div>
  );
};

export default Online_status;
