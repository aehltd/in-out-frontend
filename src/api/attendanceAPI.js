const getUserAttendance = async (token, _id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance?user=${_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
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

async function addAttendanceRecord(token, _id, newItem) {
    try {
    const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        user: _id,
        date: newItem.date,
        isClockedIn: newItem.isClockedIn,
      }),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    return data;
  } catch (error) {
    console.error("Failed to add attendance record:", error.message);
    throw new Error("Failed to add attendance record. Please try again later.");
  }
};

// Delete record from server by ID
async function deleteAttendanceRecord(token, attendanceID) {
  try{
    const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({ _id: attendanceID }),
    });
  
    const data = await response.json();
    if (!response.ok) {throw new Error(data.msg);}
    return data;
  } catch (error) {
    console.error("Failed to delete attendance record:", error.message);
    throw new Error("Failed to delete attendance record. Please try again later.");
  }
};

// Edit record on server by ID
async function editAttendanceRecord(token, updatedItem) {
  try{
    const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          _id: updatedItem._id,
          date: updatedItem.date,
          isClockedIn: updatedItem.isClockedIn,
        }),
      });
    
      const data = await response.json();
      if (!response.ok) {throw new Error(data.msg);}
      return data;
  } catch (error) {
    console.error("Failed to update attendance record:", error.message);
    throw new Error("Failed to update attendance record. Please try again later.");
  }
}

export { getUserAttendance, addAttendanceRecord , deleteAttendanceRecord, editAttendanceRecord };
