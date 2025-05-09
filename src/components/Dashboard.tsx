import { Routes, Route } from "react-router-dom";
import RoomList from "../pages/RoomList";
import CreateRoom from "../pages/CreateRoom";
import ChatRoom from "../pages/ChatRoom";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <section className="chat-app">
      <Navbar />
      <Routes>
        <Route index element={<ChatRoom />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/create-room" element={<CreateRoom />} />
      </Routes>
    </section>
  );
};

export default Dashboard;
