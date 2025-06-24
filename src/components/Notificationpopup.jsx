// src/components/common/NotificationPopup.jsx
import React from "react";
import "../styles/notificationpopup.css"


const NotificationPopup = ({ notifications = [], onClose }) => {
    console.log("notification", notifications);
    
  return (
    <div className="notification-popup">
      <div className="popup-header">
        <h6>Notifications</h6>
        <span className="close-btn" onClick={onClose}>×</span>
      </div>
      <div className="popup-body">
        {notifications.length > 0 ? (
          notifications.map((note, index) => (
            <div key={index} className="notification-item">
              <p className="fw-bold mb-1">{note.title}</p>
              <p className="mb-1">
                <a href={note.redirect_url} target="_blank" rel="noopener noreferrer">
                  {note.message}
                </a>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
