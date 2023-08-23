import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const TimerComponent = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2023-09-01"); // Replace with your target date
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        // Handle timer expiration here if needed
      } else {
        const remainingDays = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );
        const remainingHours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const remainingMinutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const remainingSeconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );

        setDays(remainingDays);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

export default TimerComponent;
