import React, { useEffect } from "react";
import useCountdown from "../../hooks/useCountdown";
import "./index.css";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Time Over !!!</span>
    </div>
  );
};

const CustomCountdownTimer = ({ targetDate, isTimedOut, setIsTimedOut }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  useEffect(() => {
    if (new Date(targetDate) - new Date() < 0) {
      if (!isTimedOut) {
        setIsTimedOut(true);
      }
    }
  }, [days, hours, minutes, seconds, isTimedOut, setIsTimedOut, targetDate]);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <div className="show-counter">
        <div className="countdown-link">
          <div className="countdown">
            <p>{days}</p>
            <span>Days</span>
          </div>
          <div>:</div>
          <div className="countdown">
            <p>{hours}</p>
            <span>Hours</span>
          </div>
          <div>:</div>
          <div className="countdown">
            <p>{minutes}</p>
            <span>Mins</span>
          </div>
          <div>:</div>
          <div className="countdown">
            <p>{seconds}</p>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    );
  }
};

export default CustomCountdownTimer;
