const { initStatus } = require("../helper/constant/InitStatus");
const { identifier } = require("../helper/helperFunctions");
const { parentModel } = require("../models/parent");

const parentInfo = (conditions = "", fields = "*") => {
  return parentModel.info(conditions, fields);
};

const findAllParents = () => {
  return parentInfo();
};

const singleParentInfo = (id, fields = "*") => {
  let column = fields === "*" ? "*" : "";
  return parentInfo(`id = '${id}'`, column);
};

const parentFirstName = (id) => {
  return singleParentInfo(id, "first_name");
};

const parentLastName = (id) => {
  return singleParentInfo(id, "last_name");
};

const parentPhoneNumber = (id) => {
  return singleParentInfo(id, "phone");
};

const parentTitle = (id) => {
  return singleParentInfo(id, "title");
};

const existingPhoneNumber = (phone) => {
  return parentInfo(`phone = '${phone}'`);
};

const saveParent = (arg) => {
  const { first_name, last_name, title, phone } = arg;
  const parent_identifier = identifier("prt");
  const values = `'${title}','${first_name}','${last_name}','${phone}'`;
  parentModel.save(values, parent_identifier);
};

const updateParents = (arg) => {
  const { id, first_name, last_name, title, phone } = arg;
  parentModel.saveChanges(`id='${id}'`, `first_name='${first_name}' ,last_name='${last_name}', title='${title}', phone='${phone}'`);
};

const removeParent = (arg) => {
  const { id } = arg;
  parentModel.saveChanges(`id='${id}'`, `status='${initStatus.oneStatus}'`);
};

module.exports = {
  updateParents,
  saveParent,
  findAllParents,
  parentInfo,
  parentFirstName,
  parentLastName,
  parentPhoneNumber,
  parentTitle,
  singleParentInfo,
  removeParent,
  existingPhoneNumber,
};
