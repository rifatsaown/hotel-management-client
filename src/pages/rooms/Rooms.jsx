import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { InfoContext } from "../../provider/InfoProvider";

const Rooms = () => {
  const { user } = useContext(AuthContext);
  const { rooms } = useContext(InfoContext);
  const roomData = rooms;

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = roomData.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(roomData.length / roomsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleClicked = (id) => {
    location.pathname = `/toys/${id}`;
    if (!user) {
      toast.error("Please login first to see Detals About This Page");
      navigate("/auth/login", { state: { from: location } });
    } else {
      navigate(`/rooms/${id}`);
    }
  };

  return (
    <div className="lg:mx-16 mx-2 mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">All Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRooms.map((room) => (
          <div key={room._id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={room.image}
              alt={room.type}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-2xl font-semibold mt-2">{room.type}</h2>
            <p className="text-gray-600">{room.description}</p>
            <ul className="mt-2">
              <p className="font-semibold text-lg">Facilities</p>
              {room.facilities.map((facility, index) => (
                <li key={index} className="text-sm text-gray-500">
                  {"- " + facility}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">
              ${room.pricePerNight.toFixed(2)} / night
            </p>
            <button
              onClick={() => handleClicked(room._id)}
              className="btn btn-secondary w-full my-2"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
      <div className="my-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`${
              currentPage === index + 1
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-full w-8 h-8 flex items-center justify-center mx-1 cursor-pointer`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ScrollRestoration/>
    </div>
  );
};

export default Rooms;
