// Function to get current date in YYYY-MM-DD format
export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Function to get current time in HH:MM format
export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Function to get default time for clockin (9:30 AM)
export const getDefaultTime = () => {
  return "09:30";
};

// Function combining current date and default time
export const getDefaultDateTime = (date = null) => {
  if (date) {
    return `${date}T${getDefaultTime()}`;
  } else return `${getCurrentDate()}T${getDefaultTime()}`;
};

// Function to convert mongoDB UTC datetime string to our time zone
export const convertUTCtoLocal = (utcDateTime) => {
  const date = new Date(utcDateTime);
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset); // convert to local time
  return date.toISOString().slice(0, 16); // remove seconds and milliseconds
};

// Function to convert mongoDB UTC datetime string to our time zone, only YYYY-MM-DD
export const convertUTCtoLocalDate = (utcDateTime) => {
  const date = new Date(utcDateTime);
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset); // convert to local time
  return date.toISOString().slice(0, 10); // remove time
};

// Function to convert mongoDB UTC datetime string to our time (HH:MM)
export const convertUTCtoLocalTime = (utcDateTime) => {
  const date = new Date(utcDateTime);
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset); // convert to local time
  return date.toISOString().slice(11, 16); // remove date and seconds
};

// Function to convert local datetime string to mongoDB UTC time
export const convertLocalToUTC = (localDateTime) => {
  const date = new Date(localDateTime);
  return date.toISOString(); // add seconds and milliseconds
};
