const identifier = (prefix) => {
  return `${prefix}${Math.floor(Math.random() * 10000000000000)}`;
};

const checkValidDate = (logDate) => {
  let chkDate = Date.parse(logDate);
  if (isNaN(chkDate)) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  identifier,
  checkValidDate,
};
