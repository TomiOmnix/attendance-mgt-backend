let moment = require("moment");

// moment.locale("en-ie"); //

const tm = {
  CURRENT_DATE: moment().format("YYYY-MM-DD"),
  CURRENT_TIME: moment().format("hh:mm:ss"),
  CURRENT_UPDATE_DATE: moment().format("YYYY-MM-DD hh-mm-ss"),
  CURRENT_YEAR: moment().format("YYYY"),
  CURRENT_YEAR_SHORT: moment().format("YY"),
  CURRENT_MONTH: moment().format("MM"),
  CURRENT_DAY: moment().format("DD"),
  CURRENT_WEEK: moment().format("WW"),
  CURRENT_HOUR: moment().format("HH"),
  CURRENT_DAY_NAME: moment().format("dddd"),
  IDENTIFIER_DATE: `${moment().format("DD")}${moment().format("MM")}${moment().format("YY")}`,
};

const readableDate = (date) => {
  // console.log(date);
  let newDate = date.split("T")[0];
  console.log(newDate);
  const spl = newDate.split("-");
  const day = spl[2];
  const month = spl[1];
  const year = spl[0];
  return `${day}-${month}-${year}`;
};
const readableDateToString = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const updateTime = (data) => {
  let sub = data.split(" ");
  return dateTime(sub[0], sub[1]);
};

const dateTime = (date, time) => {
  let dt = readableDate(date);
  return `${dt} <b>${time}</b>`;
};

const sqlDate = (date) => {
  const spl = date.split("-");
  const day = spl[0];
  const month = spl[1];
  const year = spl[2];
  return `${year}-${month}-${day}`;
};

const refineDate = (userDate) => {
  const date = userDate === "" ? "" : sqlDate(userDate);
  return date;
};

const dateFunction = (eb = "", dateType, date, num, status) => {
  let stat = status === "month" ? "months" : status;
  if (eb) {
    if (dateType === "add") {
      return moment(date).add(num, stat).endOf(status).format("YYYY-MM-DD");
    } else {
      return moment(date).subtract(num, stat).endOf(status).format("YYYY-MM-DD");
    }
  } else {
    if (dateType === "add") {
      return moment(date).add(num, stat).startOf(status).format("YYYY-MM-DD");
    } else {
      return moment(date).subtract(num, stat).startOf(status).format("YYYY-MM-DD");
    }
  }
};

// Day Construct
// days("subtract", date, num)
const days = (dateType, date, num) => {
  let start = dateFunction("", dateType, date, num, "day");
  let end = dateFunction(1, dateType, date, num, "day");
  return { start, end };
};

const currentDay = () => {
  return days("add", tm.CURRENT_DATE, 0);
};

const nextDay = () => {
  return days("add", tm.CURRENT_DATE, 1);
};

const previousDay = () => {
  return days("subtract", tm.CURRENT_DATE, 1);
};

const futureDateInDay = (date, num) => {
  return days("add", date, num);
};

const dateIntervalInDay = (num) => {
  return pastDateInDay(tm.CURRENT_DATE, num);
};

const dateRangeInterval = (date, num, type = "") => {
  let dateType = type !== "" ? "add" : "subtract";
  let end = dayRange(dateType, date, num);
  let start = date;
  return { start, end };
};

const dayRange = (dateType, date, num) => {
  return dateFunction(1, dateType, date, num, "day");
};

const pastDateInDay = (date, num) => {
  return days("subtract", date, num);
};

//Month Construct
const months = (dateType, date, num) => {
  let start = dateFunction("", dateType, date, num, "month");
  let end = dateFunction(1, dateType, date, num, "month");
  return { start, end };
};

const currentMonth = () => {
  return months("add", tm.CURRENT_DATE, 0);
};

const nextMonth = () => {
  return months("add", tm.CURRENT_DATE, 1);
};

const previousMonth = () => {
  return months("subtract", tm.CURRENT_DATE, 1);
};

const futureDateInMonth = (date, num) => {
  return months("add", date, num);
};

const pastDateInMonth = (date, num) => {
  return months("subtract", date, num);
};

// Year Construct
const years = (dateType, date, num) => {
  let start = dateFunction("", dateType, date, num, "year");
  let end = dateFunction(1, dateType, date, num, "year");
  return { start, end };
};

const currentYear = () => {
  return years("add", tm.CURRENT_DATE, 0);
};

const nextYear = () => {
  return years("add", tm.CURRENT_DATE, 1);
};

const previousYear = () => {
  return years("subtract", tm.CURRENT_DATE, 1);
};

const futureDateInYear = (date, num) => {
  return years("add", date, num);
};

const pastDateInYear = (date, num) => {
  return years("subtract", date, num);
};

const isQuarters = (quarters) => {
  const start = moment().quarter(quarters).startOf("quarter");
  const end = moment().quarter(quarters).endOf("quarter");
  return { start, end };
};

//dateTime difference by Tominiyi
const dateTimeDiff = (then, now, min = "") => {
  let ms = moment.utc(moment(now, "YYYY/MM/DD HH:mm:ss").diff(moment(then, "YYYY/MM/DD HH:mm:ss"))).format("HH:mm:ss");
  let arr = ms.split(":");
  let secs = parseInt(arr[0], 10) * 60 * 60 + parseInt(arr[1], 10) * 60 + parseInt(arr[2], 10);
  return min !== "" ? Math.round(secs / 60) : secs;
};

const dateObj = (startDate, endDate) => {
  const from = new Date(`${startDate}`);
  const to = new Date(`${endDate}`);
  return { from, to };
};

const getDifferenceInDays = (startDate, endDate) => {
  let i = dateObj(startDate, endDate);
  const diffInMs = Math.abs(i.from - i.to);
  return diffInMs / (1000 * 60 * 60 * 24);
};

const getDifferenceInHours = (startDate, endDate) => {
  let i = dateObj(startDate, endDate);
  const diffInMs = Math.abs(i.from - i.to);
  return diffInMs / (1000 * 60 * 60);
};

const getDifferenceInMinutes = (startDate, endDate) => {
  let i = dateObj(startDate, endDate);
  const diffInMs = Math.abs(i.from - i.to);
  return diffInMs / (1000 * 60);
};

const getDifferenceInSeconds = (startDate, endDate) => {
  let i = dateObj(startDate, endDate);
  const diffInMs = Math.abs(i.from - i.to);
  return diffInMs / 1000;
};

const timeMap = () => {
  let week = tm.CURRENT_WEEK;
  let hour = tm.CURRENT_HOUR;
  let month = tm.CURRENT_MONTH;
  let day = tm.CURRENT_DAY;
  let dayName = tm.CURRENT_DAY_NAME;
  return { month, week, hour, day, dayName };
};

module.exports = { tm, timeMap, currentMonth, previousMonth, isQuarters, currentYear, readableDate, readableDateToString };
