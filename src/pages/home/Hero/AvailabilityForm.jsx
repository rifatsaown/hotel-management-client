import { enGB } from "date-fns/locale";
import { useState } from "react";
import { DateRangePicker, END_DATE, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

function AvailabilityForm() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.guests.value);
    // console.log(startDate);
    // console.log(endDate);
  }

  return (
    <div className="lg:flex justify-center -mt-20 relative z-10 ">
      <div className="backdrop-blur-2xl rounded-lg">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          minimumDate={new Date()}
          minimumLength={1}
          format="dd MMM yyyy"
          locale={enGB}
        >
          {({ startDateInputProps, endDateInputProps, focus }) => (
            <form onSubmit={handleSubmit} className="date-range mt-2 lg:flex p-8 px-16">
              <div className="">
                <input
                  className={
                    "input-primary input-ghost mb-2 font-bold input" +
                    (focus === START_DATE ? " -focused" : "")
                  }
                  {...startDateInputProps}
                  placeholder="Check In"
                />
              </div>
              <div>
                <input
                  className={
                    "input-primary input-ghost font-bold mb-2 lg:mx-2 input" +
                    (focus === END_DATE ? " -focused" : "")
                  }
                  {...endDateInputProps}
                  placeholder="Check-out"
                />
              </div>
              <div>
                <input
                  name="guests"
                  className="input input-primary mb-2 font-bold input-ghost"
                  type="number"
                  placeholder="Guests"
                />
              </div>
              <div>
                <input
                  className="btn mb-2 btn-primary lg:ml-2"
                  type="submit"
                  value="Check Availability"
                />
              </div>
            </form>
          )}
        </DateRangePicker>
      </div>
    </div>
  );
}

export default AvailabilityForm;
