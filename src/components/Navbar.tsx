import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Navbar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <nav className="navbar">
      <ul className="clearfix">
        <li>
          <Link to="/">Chat Room</Link>
        </li>
        <li>
          <Link to="/rooms">Available Rooms</Link>
        </li>
        <li>
          <Link to="/create-room">Create Room</Link>
        </li>
      </ul>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
