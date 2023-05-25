const { initStatus } = require("../helper/constant/InitStatus");
const { tbl } = require("../helper/constant/tableConstants");
const { lookUP, save, erase, saveChanges, countRows } = require("../utils/crud");

module.exports.parentModel = {
  info: (conditions = "", fields = "*") => {
    const condition = conditions !== "" ? `${conditions} AND` : "";
    return lookUP(tbl.PARENT, fields, `${condition} status = '${initStatus.status}'`);
  },

  rawSQL: (query) => {
    return lookUP(tbl.PARENT, "*", "", query);
  },

  save: (values, identifier) => save(tbl.PARENT, "title, first_name, last_name, phone", values, identifier),

  erase: (conditions, values) => erase(tbl.PARENT, values, `${conditions}`),

  saveChanges: (conditions, values) => saveChanges(tbl.PARENT, values, `${conditions} AND status = '${initStatus.status}'`),

  /////////////////////////
  // valueExists: (args, id = "") => {
  //   const { 0: field } = unknownObjectKeys(args);
  //   const { 0: value } = unknownObjectValues(args);
  //   const str_id = empty(id) ? "" : `id != '${id}' AND`;
  //   const res = countRows(tbl.STORE, "*", `${str_id}${field} = '${value}'`);
  //   return res;
  // },
};
