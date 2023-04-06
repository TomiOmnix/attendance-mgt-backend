const { initStatus } = require("../helper/constant/InitStatus");
const { identifier } = require("../helper/helperFunctions");
const { childModel } = require("../models/child");

const childInfo = (conditions = "", fields = "*") => {
  return childModel.info(conditions, fields);
};

const findAllChildren = () => {
  return childInfo();
};

const singleChildInfo = (id, fields = "*") => {
  let column = fields === "*" ? "*" : "";
  return childInfo(`id = '${id}'`, column);
};

const childFirstName = (id) => {
  return singleChildInfo(id, "first_name");
};

const childLastName = (id) => {
  return singleChildInfo(id, "last_name");
};

const childPhoneNumber = (id) => {
  return singleChildInfo(id, "parent_id");
};

const childGender = (id) => {
  return singleChildInfo(id, "gender");
};

const childDob = (id) => {
  return singleChildInfo(id, "d_o_b");
};

const existingChild = (arg) => {
  const { firstName, lastName, parentId } = arg;
  return childInfo(`first_name = '${firstName}' AND last_name = '${lastName}' AND parent_id = '${parentId}'`);
};

const saveChild = (arg) => {
  const { first_name, last_name, parent_id, gender, d_o_b } = arg;
  const child_identifier = identifier("chd");
  const values = `'${parent_id}','${first_name}','${last_name}','${gender}','${d_o_b}'`;
  childModel.save(values, child_identifier);
};

const editChild = (arg) => {
  const { id, first_name, last_name, parent_id, gender, d_o_b } = arg;
  childModel.saveChanges(`id='${id}'`, `first_name='${first_name}' ,last_name='${last_name}', parent_id='${parent_id}', gender='${gender}', d_o_b = '${d_o_b}'`);
};

const removeChild = (arg) => {
  const { id } = arg;
  childModel.saveChanges(`id='${id}'`, `status='${initStatus.oneStatus}'`);
};

module.exports = {
  removeChild,
  saveChild,
  editChild,
  childDob,
  childFirstName,
  childGender,
  childInfo,
  childLastName,
  findAllChildren,
  childPhoneNumber,
  singleChildInfo,
  existingChild,
};
