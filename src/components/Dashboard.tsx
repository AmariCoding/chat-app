import { Routes, Route } from "react-router-dom";
import RoomList from "../pages/RoomList";
import CreateRoom from "../pages/CreateRoom";
import ChatRoom from "../pages/ChatRoom";

const Dashboard = () => {
  return (
    <section className="chat-app">
      <Routes>
        <Route index element={<ChatRoom />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/create-room" element={<CreateRoom />} />
      </Routes>
    </section>
  );
};

export default Dashboard;
