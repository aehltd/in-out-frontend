async function getUserAttendance(_id = null) {
  try {
    // If _id is null, get all attendance records, otherwise get attendance records for a specific user
    const url = _id
      ? `${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance?user=${_id}`
      : `${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/history`

    // Get attendance records from server
    const response = await fetch(url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);

    return data;
  } catch (error) {
    console.error("Failed to get attendance:", error.message);
    throw new Error("Failed to get attendance. Please try again later.");
  }
};

async function addAttendanceRecord(_id, newItem) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          user: _id,
          date: newItem.date,
          isClockedIn: newItem.isClockedIn,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    return data;
  } catch (error) {
    console.error("Failed to add attendance record:", error.message);
    throw new Error("Failed to add attendance record. Please try again later.");
  }
}

// Delete record from server by ID
async function deleteAttendanceRecord(attendanceID) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ _id: attendanceID }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg);
    }
    return data;
  } catch (error) {
    console.error("Failed to delete attendance record:", error.message);
    throw new Error(
      "Failed to delete attendance record. Please try again later."
    );
  }
}

// Edit record on server by ID
async function editAttendanceRecord(updatedItem) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: updatedItem._id,
          date: updatedItem.date,
          isClockedIn: updatedItem.isClockedIn,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg);
    }
    return data;
  } catch (error) {
    console.error("Failed to update attendance record:", error.message);
    throw new Error(
      "Failed to update attendance record. Please try again later."
    );
  }
}

// Handle the clock in event
async function clockIn() {
  const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/clockin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  });

  const data = await response.json();
  if (response.ok) {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Check if the user is punctual, almost late, or late
    if (hours < 9 || (hours === 9 && minutes < 35)) {
      alert("You are punctual");
    } else if (hours === 9 && minutes < 40) {
      alert("You are almost late");
    } else {
      alert("You are late");
    }
    return true;
  } else {
    alert(data.msg);
    return false;
  }
}

// Check if the user has clocked in today
async function checkClockInStatus() {
  try {
    console.log('Checking clock in status from server...');
    const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/today`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    console.log('API response:', data);

    const clockedIn = data.msg === "Records found"
    console.log('Clocked in:', clockedIn);
    return clockedIn;
  } catch (error) {
    console.error('Fetch error:', error);
    return false;
  }
}

export {
  getUserAttendance,
  addAttendanceRecord,
  deleteAttendanceRecord,
  editAttendanceRecord,
  clockIn,
  checkClockInStatus,
};
