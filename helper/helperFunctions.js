const { currentMonth, previousMonth, isQuarters, currentYear, tm } = require("./time");
const { fetchFromLocalStorage } = require("../utils/storage");

const strlen = (arg) => {
  let i = typeof arg === "number" ? arg.toString() : arg;
  return i.length;
};

const strToLower = (arg) => {
  return arg.toLowerCase();
};

const strToUpper = (arg) => {
  return arg.toUpperCase();
};

const empty = (arg) => {
  return arg === "" || arg === null || arg == null || arg.length === 0 ? true : false;
};
const checkType = (arg) => {
  return typeof arg;
};
const explode = (delimiter, string, index = null) => {
  const rlt = string.split(delimiter);
  return index !== null ? rlt[index] : rlt;
};

const removeSingleQuote = (arr) => {
  let arr2 = arr.map((v) => {
    return (v = v.replace(/[']+/g, "").trim());
  });
  return arr2;
};

const timeStamp = () => {
  return new Date().getTime();
};

const strShuffle = (string) => {
  let parts = string.split("");
  for (let i = parts.length; i > 0; ) {
    let random = parseInt(Math.random() * i);
    let temp = parts[--i];
    parts[i] = parts[random];
    parts[random] = temp;
  }
  return parts.join("");
};

const hasTimeStamp = () => {
  const tsp = `${timeStamp()}`;
  return strShuffle(tsp);
};

const ucFirst = (arg) => {
  return arg.charAt(0).toUpperCase() + arg.slice(1);
};
const numberRandomizer = (num) => {
  return Math.floor(Math.random() * num);
};
const randSku = (sku, name = "") => {
  let acronymn = "";

  if (sku !== "") {
    let arr = sku.split("");
    acronymn = `${ucWord(sku)}${numberRandomizer(999)}`;
  } else {
    let arr = name.split("");
    let str = `${arr[0]}${arr[1]}${arr[2]}`;
    acronymn = `${ucWord(str)}${numberRandomizer(999)}`;
  }

  return acronymn;
};

const ucWord = (str) => {
  let strArr = str.split(" ");
  let arr = "";

  for (let i = 0; i < strArr.length; i++) {
    if (i === strlen(strArr) - 1) {
      arr = arr.concat(ucFirst(strArr[i]));
    } else {
      arr = arr.concat(ucFirst(strArr[i])) + " ";
    }
  }
  return arr;
};

const format = (num, decimal = "", check = "") => {
  decimal = decimal === "" ? 0 : 2;
  return num !== null
    ? check !== ""
      ? num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      : parseInt(num)
          .toFixed(decimal)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    : 0;
};

const datefilter = (filter) => {
  let from, to, dt;
  if (filter === "MTD") {
    dt = currentMonth();
    from = dt.start;
    to = dt.end;
  } else if (filter === "LM") {
    dt = previousMonth();
    from = dt.start;
    to = dt.end;
  } else if (filter === "LQ") {
    dt = isQuarters(1);
    from = dt.start;
    to = dt.end;
  } else if (filter === "YTD") {
    dt = currentYear();
    from = dt.start;
    to = dt.end;
  }
  return { from, to };
};

const escapeSingleQuote = (str) => {
  let arr = str.split(",");
  let arr2 = arr.map((v) => {
    return (v = v.replace(/[']+/g, "~").trim());
  });
  return arr2.join(" ");
};

const clientTag = () => {
  let profile = fetchFromLocalStorage("profile");
  if (!empty(profile)) {
    const { client_id } = profile;
    return `client_id = '${client_id}'`;
  }
  return;
};

//this is handy when saving to database
const locationTag = (loc = "") => {
  if (empty(loc)) {
    let ids = fetchFromLocalStorage("profile");
    return `location_id = '${ids.location_id}'`;
  } else if (loc === "all") {
    return "";
  } else {
    return `location_id = '${loc}'`;
  }
};

const locationId = (loc = "") => {
  const ids = fetchFromLocalStorage("profile");
  return empty(loc) ? ids.location_id : loc;
};

const removeDoubleQuote = (arr) => {
  let arr2 = arr.map((v) => {
    return (v = v.replace(/["]+/g, "").trim());
  });
  return arr2;
};

const removeQuote = (query, status = "") => {
  if (empty(status)) {
    return removeSingleQuote(query.split(","));
  } else {
    let val = query.split("VALUES");
    let value = removeDoubleQuote(val[1].split(","));
    return `${val[0]} VALUES (${value})`;
  }
};

const trims = (v) => {
  return v.trim();
};

const UndoEscapeSingleQuote = (str) => {
  console.log(str, "strrrrr");
  let arr = str.split(" ");
  console.log(arr, "arr");
  let arr2 = arr.map((v) => {
    return (v = v.replace(/[~]+/g, '"').trim());
  });
  console.log(arr2, "arr2");
  console.log(arr2.join(" "), "arr2.join");
  return arr2.join(" ");
};

const removeBracket = (arr) => {
  return arr.replace(/[{()}]+/g, "");
};

const trimReplaceBracketSplitByComma = (arr) => {
  let s = removeBracket(trims(arr));
  return s.split(",");
};

const addDoubleQuote = (v) => {
  let r, x;
  if (typeof v === "object") {
    let s = trimReplaceBracketSplitByComma(v[1]);
    r = s.map((i) => {
      x = trims(i);
      // console.log(`checking for space: '${x}' |  '${i}'`);
      return `'${strToLower(x)}'`;
    });
  } else {
    x = trims(v);
    r = `'${strToLower(x)}'`;
  }
  return r;
};

const modifiedField = (data) => {
  if (data.split(" ")[0] === "INSERT") {
    let arr = data.split("VALUES ");
    let r = addDoubleQuote(arr);
    return arr[0] + "VALUES (" + r + ")";
  } else {
    return UndoEscapeSingleQuote(data);
  }
};

//get unknown object keys
const unknownObjectKeys = (obj) => {
  return Object.keys(obj);
};

//get unknown object values
const unknownObjectValues = (obj) => {
  return Object.values(obj);
};

//this is handy when fetching from database
const locationTagAccess = (loc = "") => {
  let location = locationTag(loc);
  return !empty(location) ? `${location} AND ` : "";
};

const userTag = () => {
  let profile = fetchFromLocalStorage("profile");
  if (!empty(profile)) {
    const { location_id, device_id, user_id, client_id } = profile;
    return `${client_id},${location_id},${device_id},${user_id}`;
  }
  return;
};

const userQueueTag = (onlineDeviceId) => {
  let profile = fetchFromLocalStorage("profile");
  if (!empty(profile)) {
    const { location_id, device_id, user_id, client_id } = profile;
    return `${client_id},${location_id},${onlineDeviceId},${user_id}`;
  }
  return;
};

const identifier = (prefix) => {
  const { user_id } = fetchFromLocalStorage("profile");
  const tsp = hasTimeStamp();
  let identifier = `${prefix}${user_id}${tsp}`;
  return identifier;
};

const currencyFormatter = (value, denotation = "₦") => {
  let newFormat = format(value, 2);
  return `${denotation} ${newFormat}`;
};

const noToFutureDate = (date) => {
  if (date > tm.CURRENT_DATE) {
    return false;
  }
  return true;
};

const emptyObject = (arg) => {
  if (Object.keys(arg).length === 0 && arg.constructor === Object) {
    return true;
  }
  return false;
};

const addSingleQuote = (v) => {
  let r, x;
  if (typeof v === "object") {
    let s = trimReplaceBracketSplitByComma(v[1]);
    r = s.map((i) => {
      trims(i.replace(/["]+/g, ""));
      x = trims(i);
      // console.log(`checking for space: '${x}' |  '${i}'`);
      return `'${strToLower(x)}'`;
    });
  } else {
    x = trims(v);
    r = `'${strToLower(x)}'`;
  }
  return v[0] + "VALUES (" + r + ")";
};

const escapeDoubleQuote = (str, delim) => {
  let arr = str.split(" ");
  let arr2 = arr.map((v) => {
    return (v = v.replace(/["]+/g, delim).trim());
  });
  return arr2.join(" ");
};

const noZeroDivision = (arg1, arg2) => {
  return arg1 > 0 && arg2 > 0 ? arg1 / arg2 : 0;
};

const profitMargin = (retailValue, inventoryBalance) => {
  let sub = retailValue - inventoryBalance;
  let pm = noZeroDivision(sub, retailValue);
  let per = pm * 100;
  return per ? per : 0;
};

const errorMsg = (msg) => {
  return ucWord(msg);
};

const noToPastDate = (date) => {
  if (date < tm.CURRENT_DATE) {
    return true;
  }
  return false;
};

const decimal = (value, num) => {
  return value.toFixed(num);
};

const isPercentage = (per) => {
  return noZeroDivision(per, 100);
};

const percentValue = (per, amount) => {
  return amount * isPercentage(per);
};

const substr = (str, position = 0, num = 1) => {
  return str.substring(position, num);
};

const isFirstCharacters = (name) => {
  let fku;
  let x = explode(" ", name);
  if (!empty(x[2])) {
    fku = `${substr(x[0], 0)}${substr(x[1], 0)}${substr(x[2], 0)}`;
  } else if (!empty(x[1])) {
    fku = `${substr(x[0], 0)}${substr(x[1], 0)}`;
  } else {
    fku = `${substr(x[0], 0, 3)}`;
  }
  return fku;
};

const isOverDigits = (num, digits) => {
  if (num.length > digits && num[digits] !== ".") {
    return true;
  }
  return false;
};
const checkError = (value, errMsg = "", errorCode = 500) => {
  if (!value) {
    const error = new Error(errMsg);
    error.statusCode = errorCode;
    throw error;
  }
};

module.exports = {
  empty,
  locationId,
  locationTag,
  locationTagAccess,
  clientTag,
  strlen,
  strToLower,
  userTag,
  userQueueTag,
  explode,
  removeSingleQuote,
  escapeSingleQuote,
  identifier,
  strShuffle,
  unknownObjectKeys,
  unknownObjectValues,
  ucWord,
  ucFirst,
  checkType,
  format,
  currencyFormatter,
  datefilter,
  randSku,
  numberRandomizer,
  emptyObject,
  noToFutureDate,
  strToUpper,
  UndoEscapeSingleQuote,
  modifiedField,
  removeQuote,
  addSingleQuote,
  escapeDoubleQuote,
  trims,
  checkError,
  noZeroDivision,
  profitMargin,
  errorMsg,
  noToPastDate,
  decimal,
  isPercentage,
  percentValue,
  substr,
  isFirstCharacters,
  isOverDigits,
};
