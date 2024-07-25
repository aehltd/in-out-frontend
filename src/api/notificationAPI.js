async function addNotification(type, item) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/${type}/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          date: item.date,
          title: item.title,
          description: item.description,
          recipients: item.recipients,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg);
    }
    return data;
  } catch (err) {
    console.log(err);
    return { msg: err.message };
  }
}

export { addNotification };
