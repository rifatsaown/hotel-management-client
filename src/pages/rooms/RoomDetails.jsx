import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import useBookingList from "../../hooks/useBookingList";
import { toast } from "react-hot-toast";

const RoomDetails = () => {
  const {refetch} = useBookingList();
    const {user} = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingDays, setBookingDays] = useState(0);

  const data = useLoaderData();
  const { image, type, description, facilities, pricePerNight } = data;

  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateBookingDays(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateBookingDays(startDate, date);
  };

  const calculateBookingDays = (start, end) => {
    if (start && end) {
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setBookingDays(days);
    }
  };

  const totalPrice = (pricePerNight * bookingDays).toFixed(2);

  const handleBookNow = (e) => {
    e.preventDefault();
    const bookingInfo = {
      roomData: data,
      startDate,
      endDate,
      bookingDays,
      totalPrice,
      email: user.email
    };
    axiosSecure
      .post("/booking/addToBookingList", bookingInfo)
      .then(() => {
        toast.success("Room Added to Booking List ");
        toast.success("Check Your Dashboard and Confirm Booking");
        refetch();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mb-10 mt-8">
      <div className="mx-auto lg:grid grid-cols-2 ">
        <div>
          <img className="w-11/12 ml-2" src={image} alt={type} />
        </div>
        <div className="py-6 ml-4">
          <h1 className="font-bold text-3xl">{type}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
          <ul className="mt-4">
            {facilities.map((facility, index) => (
              <li key={index} className="text-sm text-gray-500">
                {"- " + facility}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center">
            <h2 className="text-4xl font-bold text-primary">
              ${pricePerNight}
            </h2>
            <span className="text-gray-600 text-lg ml-2">/ night</span>
          </div>
          <div>
            <p className="mt-4 text-xl font-semibold">
              Total Price: ${totalPrice}
            </p>
          </div>
          <div className="mt-4">
            <form onSubmit={handleBookNow}>
              <div>
                <div className="flex flex-wrap">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Check-In Date</span>
                    </label>
                    <DatePicker
                      className="input input-primary"
                      selected={startDate}
                      onChange={handleStartDateChange}
                      minDate={new Date()}
                      maxDate={new Date().setDate(new Date().getDate() + 10)}
                      placeholderText="Select a date"
                      dateFormat="MMMM d, yyyy"
                      required
                    />
                  </div>
                  <div className="form-control lg:ml-2">
                    <label className="label">
                      <span className="label-text">Check-Out Date</span>
                    </label>
                    <DatePicker
                      className="input input-primary"
                      minDate={startDate}
                      maxDate={new Date().setDate(new Date().getDate() + 10)}
                      placeholderText="Select a date"
                      selected={endDate}
                      onChange={handleEndDateChange}
                      dateFormat="MMMM d, yyyy"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <p>
                    Number of Nights: {bookingDays}{" "}
                    {bookingDays === 1 ? "night" : "nights"}
                  </p>
                </div>
              </div>
              <div className="form-control mt-4">
                <button className="btn btn-primary">Book Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
