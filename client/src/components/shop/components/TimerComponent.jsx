import React, { useState, useEffect } from "react";

const TimerComponent = ({ total_time }) => {
  const [days, setDays] = useState(Number(total_time.split(":")[0]));
  const [hours, setHours] = useState(Number(total_time.split(":")[1]));
  const [minutes, setMinutes] = useState(Number(total_time.split(":")[2]));
  const [seconds, setSeconds] = useState(Number(total_time.split(":")[3]));

  useEffect(() => {
    const interval = setInterval(() => {
      if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(interval);
        // Handle timer expiration here if needed
      } else if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      } else if (minutes <= 0 && seconds <= 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (seconds <= 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [days, hours, minutes, seconds]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 items-center">
        <button className="btn btn-circle bg-transparent border-shopPrimaryColor border-2 font-bold">
          {String(days).length < 2 ? `0${days}` : days}
        </button>
        <span className="font-bold">DAYS</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <button className="btn btn-circle bg-transparent border-shopPrimaryColor border-2 font-bold">
          {/* {hours} */}
          {String(hours).length < 2 ? `0${hours}` : hours}
        </button>
        <span className="font-bold">HRS</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <button className="btn btn-circle bg-transparent border-shopPrimaryColor border-2 font-bold">
          {/* {minutes} */}
          {String(minutes).length < 2 ? `0${minutes}` : minutes}
        </button>
        <span className="font-bold">MINS</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <button className="btn btn-circle bg-transparent border-shopPrimaryColor border-2 font-bold">
          {/* {seconds} */}
          {String(seconds).length < 2 ? `0${seconds}` : seconds}
        </button>
        <span className="font-bold">SECS</span>
      </div>
    </div>
  );
};

export default TimerComponent;

/**import React, { useState, useEffect } from "react";

const TimerComponent = ({ startDate, startTime, endDate, endTime }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetStartDate = new Date(startDate);
    const targetStartTimeParts = startTime.split(":");
    targetStartDate.setHours(targetStartTimeParts[0]);
    targetStartDate.setMinutes(targetStartTimeParts[1]);

    const targetEndDate = new Date(endDate);
    const targetEndTimeParts = endTime.split(":");
    targetEndDate.setHours(targetEndTimeParts[0]);
    targetEndDate.setMinutes(targetEndTimeParts[1]);

    const interval = setInterval(() => {
      const now = new Date();
      const timeDifferenceStart = targetStartDate - now;
      const timeDifferenceEnd = targetEndDate - now;

      if (timeDifferenceEnd <= 0) {
        clearInterval(interval);
        // Handle timer expiration here if needed
      } else if (timeDifferenceStart <= 0) {
        setDays(0);
        setHours(Math.floor(timeDifferenceEnd / (1000 * 60 * 60)));
        setMinutes(Math.floor((timeDifferenceEnd % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((timeDifferenceEnd % (1000 * 60)) / 1000));
      } else {
        const remainingDays = Math.floor(timeDifferenceStart / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((timeDifferenceStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifferenceStart % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifferenceStart % (1000 * 60)) / 1000);

        setDays(remainingDays);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startDate, startTime, endDate, endTime]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 items-center">
        <button className="btn btn-circle bg-transparent border-shopPrimaryColor border-2 font-bold">
          {days}
        </button>
        <span className="font-bold">DAYS</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <button className="btn btn-circle bg-transparent border-shopPrimaryColor border-2 font-bold">
          {hours}
        </button>
        <span className="font-bold">HRS</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <button className="btn btn-circle bg-transparent border-shopPrimaryColor border-2 font-bold">
          {minutes}
        </button>
        <span className="font-bold">MINS</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <button className="btn btn-circle bg-transparent border-shopPrimaryColor border-2 font-bold">
          {seconds}
        </button>
        <span className="font-bold">SECS</span>
      </div>
    </div>
  );
};

export default TimerComponent;*/
