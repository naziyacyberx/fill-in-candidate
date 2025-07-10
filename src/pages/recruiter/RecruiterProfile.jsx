import React from "react";
import { Card, ListGroup, Image } from "react-bootstrap";
import { FaUser, FaClipboardList, FaCalendarAlt, FaStar, FaInfoCircle, FaShieldAlt, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "My Profile", icon: <FaUser />, link:"my-profile" },
  { label: "Posted Jobs", icon: <FaClipboardList /> ,link:"posted-jobs" },
  { label: "Scheduled Interviews", icon: <FaCalendarAlt /> ,link:"scheduled-interviews" },
  { label: "Ratings & Reviews", icon: <FaStar /> ,link:"my-ratings" },
  { label: "About Us", icon: <FaInfoCircle />  ,link:"about-us"},
  { label: "Privacy Policy", icon: <FaShieldAlt />  ,link:"privacy-policy"},
  { label: "Log Out", icon: <FaSignOutAlt /> ,link:""  },
];

const RecruiterProfile = () => {
    const navigate = useNavigate()
  return (
    <div className="container d-flex flex-column align-items-center py-4">
      {/* Profile Photo */}
      <div className="position-relative mb-2">
        <Image
          src="https://via.placeholder.com/100"
          roundedCircle
          width={100}
          height={100}
        />
        <span
          className="position-absolute bottom-0 end-0 bg-primary p-1 rounded-circle"
          style={{ transform: "translate(25%, 25%)", cursor: "pointer" }}
        >
          <FaEdit color="white" size={14} />
        </span>
      </div>

      {/* Complete Profile Link */}
      <div className="text-primary mb-4" role="button">
        <strong>Complete Profile</strong>
      </div>

      {/* Menu Items */}
      <ListGroup style={{ width: "100%", maxWidth: "400px" }}>
        {menuItems.map((item, idx,) => (
          <ListGroup.Item
    onClick={()=>{navigate(`/recruiter/${item.link}`)}}
            key={idx}
            className="d-flex align-items-center gap-2 border"
            action
          >
            <span        className="text-primary">{item.icon}</span>
            <span>{item.label}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default RecruiterProfile;
