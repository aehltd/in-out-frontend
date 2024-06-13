import {
  getDefaultDateTime,
  getCurrentDate,
  convertUTCtoLocal,
  convertLocalToUTC,
} from "./dateFormatting";

export const formatFieldValue = (field, value) => {
  console.log(`Formatting field: ${field}, value: ${value}`);
  switch (field) {
    case "datetime-local":
      return convertUTCtoLocal(value);
    case "date":
      return convertUTCtoLocal(value).slice(0, 10);
    case "checkbox":
      console.log(`Checkbox value: ${value}`);
      return value ? "true" : "false";
    default:
      return value;
  }
};

export const getDefaultFieldValue = (field) => {
  switch (field) {
    case "datetime-local":
      return convertLocalToUTC(getDefaultDateTime());
    case "date":
      return convertLocalToUTC(getCurrentDate());
    case "checkbox":
      return true;
    case "number":
      return 0;
    default:
      return "";
  }
};
