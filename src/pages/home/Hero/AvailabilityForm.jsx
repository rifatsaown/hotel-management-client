import { enGB } from "date-fns/locale";
import { useState } from "react";
import { DateRangePicker, END_DATE, START_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

function AvailabilityForm() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <div className="flex justify-center -m-20 relative z-10 ">
      <div className="backdrop-blur-2xl p-8 px-10 rounded-lg">
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
            <form className="date-range flex">
              <div>
              <input
                className={"input-primary input-ghost font-bold input" + (focus === START_DATE ? " -focused" : "")}
                {...startDateInputProps}
                placeholder="Check In"
              />
              </div>
              <div>
              <input
                className={
                  "input-primary input-ghost mx-2 input" +
                  (focus === END_DATE ? " -focused" : "")
                }
                {...endDateInputProps}
                placeholder="Check-out"
              />
              </div>
              <div>
              <input className="input input-primary font-bold input-ghost" type="number" 
              placeholder="Guests"
              />
              </div>
              <div>
              <input className="btn btn-primary ml-2" type="submit" value="Check Availability" />
              </div>
            </form>
          )}
        </DateRangePicker>
      </div>
    </div>
  );
}

export default AvailabilityForm;
