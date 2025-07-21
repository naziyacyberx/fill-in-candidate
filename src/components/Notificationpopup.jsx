import React from "react";
import "../styles/notificationpopup.css";

const NotificationPopup = ({ notifications = [], onClose }) => {
  return (
    <div className="notification-popup">
      <div className="popup-header">
        <h6>Notifications</h6>
        <span className="close-btn" onClick={onClose}>×</span>
      </div>
      <div className="popup-body">
        {notifications[0]?.data?.length > 0 ? (
          notifications[0].data.map((note, index) => (
            <div key={index} className="notification-item d-flex align-items-start gap-2 mb-3">
              <img
                src={note.icone}
                alt="icon"
                className="notification-icon"
              />
              <div>
                <p className="fw-bold mb-1">{note.title}</p>
                <p className="mb-0">
                  <a href={note.redirect_url || "#"} target="_blank" rel="noopener noreferrer">
                    {note.message}
                  </a>
                </p>
              </div>
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
