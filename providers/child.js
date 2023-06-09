const { initStatus } = require("../helper/constant/InitStatus");
const { identifier } = require("../helper/helperFunctions");
const { childModel } = require("../models/child");

const childInfo = (conditions = "", fields = "*") => {
  return childModel.info(conditions, fields);
};

const childInfoRaw = () => {
  return childModel.rawSQL(`SELECT *, FLOOR(DATEDIFF(CURDATE(), d_o_b) / 365) AS age
  FROM (
    SELECT *
    FROM children
    WHERE status = '0'
  ) AS subquery;
  `);
};

//CONCAT(DATE_FORMAT(date, '%Y-%m-%d'), ' ', time) AS registered_date

const findAllChildren = () => {
  return childInfoRaw();
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

const fetchChildrenList = (parentId) => {
  return childInfo(`parent_id = '${parentId}' AND status = '${initStatus.status}'`);
};

const existingChild = (arg) => {
  const { firstName, lastName, parentId } = arg;
  return childInfo(`first_name = '${firstName}' AND last_name = '${lastName}' AND parent_id = '${parentId}'`);
};

const saveChild = (arg) => {
  const { first_name, last_name, parent_id, gender, d_o_b, address } = arg;
  const child_identifier = identifier("chd");
  const values = `'${parent_id}','${first_name}','${last_name}','${gender}','${d_o_b}','${address}'`;
  childModel.save(values, child_identifier);
};

const editChild = (arg) => {
  const { id, first_name, last_name, parent_id, gender, d_o_b, address } = arg;
  childModel.saveChanges(`id='${id}'`, `first_name='${first_name}' ,last_name='${last_name}', parent_id='${parent_id}', gender='${gender}', d_o_b = '${d_o_b}', address = '${address}'`);
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
  fetchChildrenList,
};
