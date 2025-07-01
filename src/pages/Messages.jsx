import { useState , useEffect} from "react";
import { FaSearch, FaEnvelopeOpen, FaEnvelope, FaBan } from "react-icons/fa";
import "../styles/messages.css";
import Navbar from "../sections/common/Navbar";
import Footer from "../sections/common/Footer";
import ChatComponent from "../components/Chat";
import axios from "axios";
import { useNavigate } from "react-router-dom";

 

const Messages = () => {
  const navigate = useNavigate()
  const [messagesData, setMessagesData] = useState([]);

  const [filter, setFilter] = useState("all");
  const authToken = localStorage.getItem("fillInToken")
  const [myProfileId, setMyProfileId] = useState("")


  
const fetchMessages = async () => {
  try {
    const response = await axios.get(
      'https://fillin-admin.cyberxinfosolution.com/api/candidate/chat-users',
      { headers: {
    timeout: 10000,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
      "Accept": "application/json",
      // "Timezone": "Asia/Kolkata"
    },}
    );
    console.log("data",response);
    

    if (response.data?.status === "success") {
      const formatted = response.data.data.map((item) => ({
        id: item.id,
        sender: item.recruiter || "Unknown",
        text: item.message,
        time: item.time,
        read: item.msgStatus === "recieve" ? false : true, // you can refine this based on real logic
        recruiterId: item.recruiter_id,
        profile: item.profile,
      }));

      setMessagesData(formatted);
    }
  } catch (error) {
    console.error("Error fetching chat users:", error);
  }
};

const profileId = async()=>{
  try{
const response = await axios.get("https://fillin-admin.cyberxinfosolution.com/api/candidate/candidate-profile",{
  headers:{
    "Content-Type" :"application/json",
    "Authorization": `Bearer ${authToken}`,
    "Accept" : "application/json"
  }
}
)

console.log("response:::::::", response.data.data.id);
localStorage.setItem("profileId",response.data.data.id)

  }catch(error){
    // console.log();
    
  }
}
  
  const filteredMessages = messagesData.filter((msg) => {
    if (filter === "read") return msg.read;
    if (filter === "unread") return !msg.read;
    return true;
  });

  useEffect(() => {

  fetchMessages();
  profileId()
}, []);

const handleMessageClick = (msg) => {
  console.log("msg", msg);
  
  navigate("/chat-detail", { state: { message:msg, } });
};


  return (
    <>
            <Navbar />
    
    <div className="messages-container">
      <h3>Messages</h3>
      <div className="search-bar d-flex flex-row ">
        <div>

        <FaSearch />
        </div>

        <div>
        <input type="text" placeholder="Search Message" />

        </div>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          All
        </button>
        <button onClick={() => setFilter("read")} className={filter === "read" ? "active" : ""}>
          Read
        </button>
        <button onClick={() => setFilter("unread")} className={filter === "unread" ? "active" : ""}>
          Unread
        </button>
        <button onClick={() => setFilter("blocked")}>
          Blocked
        </button>
      </div>

      <div className="message-list">
        {filteredMessages.map((msg) => (
        <div
  key={msg.id}
  className={`message-item ${msg.read ? "read" : "unread"}`}
  onClick={() => handleMessageClick(msg)}
  style={{ cursor: "pointer" }}
>

            <div className="message-icon">{msg.read ? <FaEnvelopeOpen /> : <FaEnvelope />}</div>
            <div className="message-info">
              <div className="message-header">
                <span className="sender">{msg.sender}</span>
                <span className="time">{msg.time}</span>
              </div>
              <p className="text">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    

    {/* <ChatComponent token={`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGwtaW4uY3liZXJ4aW5mb3NvbHV0aW9uLmNvbS9hcGkvY2FuZGlkYXRlL2xvZ2luIiwiaWF0IjoxNzUwNzcyODE4LCJleHAiOjE3NTMzNjQ4MTgsIm5iZiI6MTc1MDc3MjgxOCwianRpIjoiVThxRHdRQlFIamlETFRWZCIsInN1YiI6IjY0IiwicHJ2IjoiODYxYjA1NjMxMDkxMzU3ZWM4ZTU1ZjJhZjE3ZTExMThmNzJmNzBkYyJ9.gKFDWJ2-6SI9Mm56G2bh1F3JcL4xKSkMx72TbuPKrzY`} myProfileId={64}/> */}
    <Footer/>
    </>
  );
};

export default Messages;
