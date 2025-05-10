import { useQuery } from "@tanstack/react-query";
import { useChatStore, type Room } from "../store/chatStore";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const fetchRooms = async (): Promise<Room[]> => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw Error(error.message);
  return data as Room[];
};

const RoomList = () => {
  const { setCurrentRoom } = useChatStore();
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });

  const handleJoinRoom = (room: Room): void => {
    setCurrentRoom(room);
  };

  if (isLoading) return <p className="loader-text">Loading rooms...</p>;
  if (error)
    return <p className="loader-text">Error loading rooms: {error.message}</p>;

  return (
    <div className="room-list">
      <h2>Available Room</h2>
      <ul>
        {rooms?.map((room: Room, key) => {
          return (
            <li key={key}>
              <Link to={"/"} onClick={() => handleJoinRoom(room)}>
                {room.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoomList;
