import {
  getDefaultDateTime,
  getCurrentDate,
  convertUTCtoLocal,
  convertLocalToUTC,
} from "./dateFormatting";

export const formatFieldValue = (field, value) => {
  //console.log(`Formatting field: ${field}, value: ${value}`);
  switch (field) {
    case "datetime-local":
      return convertUTCtoLocal(value);
    case "date":
      return convertUTCtoLocal(value).slice(0, 10);
    case "checkbox":
      return value ? "true" : "false";
    default:
      return value;
  }
};

export const getDefaultFieldValue = (field, date = null) => {
  switch (field) {
    case "datetime-local":
      return convertLocalToUTC(getDefaultDateTime(date));
    case "date":
      return convertLocalToUTC(getCurrentDate());
    case "time":
      return "09:30";
    case "checkbox":
      return false;
    case "number":
      return 0;
    default:
      return "";
  }
};

export const getFieldNames = (field) => {
  switch (field) {
    case "date":
      return "Date";
    case "isClockedIn":
      return "Clocked In";
    case "kpi":
      return "KPI";
    default:
      return field;
  }
}