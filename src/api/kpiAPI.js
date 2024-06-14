const getUserKPI = async (_id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/kpi?user=${_id}`,
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
    console.error("Failed to get KPI:", error.message);
    throw new Error("Failed to get KPI. Please try again later.");
  }
};

async function addKPIRecord(_id, newItem) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/kpi/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          user: _id,
          date: newItem.date,
          kpi: newItem.kpi,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    return data;
  } catch (error) {
    console.error("Failed to add kpi record:", error.message);
    throw new Error("Failed to add kpi record. Please try again later.");
  }
}

// Delete record from server by ID
async function deleteKPIRecord(kpiID) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/kpi/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ _id: kpiID }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg);
    }
    return data;
  } catch (error) {
    console.error("Failed to delete kpi record:", error.message);
    throw new Error("Failed to delete kpi record. Please try again later.");
  }
}

// Edit record on server by ID
async function editKPIRecord(updatedItem) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/kpi/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: updatedItem._id,
          date: updatedItem.date,
          kpi: updatedItem.kpi,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg);
    }
    return data;
  } catch (error) {
    console.error("Failed to update kpi record:", error.message);
    throw new Error("Failed to update kpi record. Please try again later.");
  }
}

export { getUserKPI, addKPIRecord, deleteKPIRecord, editKPIRecord };
