const { initStatus } = require("../helper/constant/InitStatus");
const { tbl } = require("../helper/constant/tableConstants");
const { lookUP, save, erase, saveChanges, countRows } = require("../utils/crud");

module.exports.childLogModel = {
  info: (conditions = "", fields = "*") => {
    const condition = conditions !== "" ? `${conditions} AND` : "";
    return lookUP(tbl.CHILDREN_LOG, fields, `${condition} status = '${initStatus.status}'`);
  },

  save: (values, identifier) => save(tbl.CHILDREN_LOG, "child_id, parent_id, tag, log_date", values, identifier),

  erase: (conditions, values) => erase(tbl.CHILDREN_LOG, values, `${conditions}`),

  saveChanges: (conditions, values) => saveChanges(tbl.CHILDREN_LOG, values, `${conditions} AND status = '${initStatus.status}'`),

  /////////////////////////
  // valueExists: (args, id = "") => {
  //   const { 0: field } = unknownObjectKeys(args);
  //   const { 0: value } = unknownObjectValues(args);
  //   const str_id = empty(id) ? "" : `id != '${id}' AND`;
  //   const res = countRows(tbl.STORE, "*", `${str_id}${field} = '${value}'`);
  //   return res;
  // },
};
