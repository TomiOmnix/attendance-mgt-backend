const identifier = (prefix) => {
  return `${prefix}${Math.floor(Math.random() * 10000000000000)}`;
};

module.exports = {
  identifier,
};
