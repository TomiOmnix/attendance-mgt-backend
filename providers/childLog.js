const { initStatus } = require("../helper/constant/InitStatus");
const { identifier } = require("../helper/helperFunctions");
const { childLogModel } = require("../models/childLog");

const childLogInfo = (conditions = "", fields = "*") => {
  return childLogModel.info(conditions, fields);
};

const findAllChildLog = () => {
  return childLogInfo();
};

const singleChildLogInfo = (id, fields = "*") => {
  let column = fields === "*" ? "*" : "";
  return childLogInfo(`id = '${id}'`, column);
};

const childLogChildId = (id) => {
  return singleChildLogInfo(id, "child_id");
};

const childLogParentId = (id) => {
  return singleChildLogInfo(id, "parent_id");
};

const childLogTag = (id) => {
  return singleChildLogInfo(id, "tag");
};

const childLogDate = (id) => {
  return singleChildLogInfo(id, "log_date");
};

const fetchChildByLogDate = (childId, logDate) => {
  return childLogInfo(`child_id = '${childId}' AND log_date = '${logDate}'`);
};

const saveChildLog = (arg) => {
  const { child_id, parent_id, tag, log_date } = arg;
  const child_log_identifier = identifier("log");
  const values = `'${child_id}','${parent_id}','${tag}','${log_date}'`;
  childLogModel.save(values, child_log_identifier);
};

const editChildLog = (arg) => {
  const { childId, logDate } = arg;
  childLogModel.saveChanges(`child_id='${childId}' AND log_date='${logDate}'`, `status='${initStatus.oneStatus}'`);
};

module.exports = {
  saveChildLog,
  editChildLog,
  childLogDate,
  findAllChildLog,
  childLogDate,
  childLogParentId,
  childLogTag,
  childLogChildId,
  fetchChildByLogDate,
};
