import React, {useState, useEffect} from "react";
import { clockIn, checkClockInStatus  } from "../api/attendanceAPI";

const ClockInButton = () => {
  const [isClockedIn, setIsClockedIn] = useState(true);

  // On render, determine if already clocked in
  useEffect(() => {
    //Am I clocked in?
    async function checkClockIn() {
      const status = await checkClockInStatus();
      setIsClockedIn(status);
      console.log("Am I clocked in? " + status);
    }

    checkClockIn();
  }, [])

  const handleClick = async () => {
    console.log("Clocking in...");
    // Call clock in function
    const clockedIn = await clockIn();
    console.log("Clocked in? " + clockedIn);
    if (clockedIn) {
      console.log("Clocked in!");
    } else {
      console.log("Error clocking in!");
    }
    setIsClockedIn(clockedIn);
  }

  return (
    <button className="btn" onClick={handleClick} disabled={isClockedIn}>Clock In</button>
  )
}

export default ClockInButton;