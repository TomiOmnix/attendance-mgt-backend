const { locationTagAccess, unknownObjectKeys, unknownObjectValues, empty } = require("../../../Helper/helperFunctions");
const { tbl } = require("../helper/constant/tableConstants");
const { lookUP, save, erase, saveChanges, countRows } = require("../../../utils/crud");
const { initStatus } = require("../../../Helper/Constant/InitStatus");

module.exports.parentModel = {
  info: (conditions = "", location = "", fields = "*", column = "") => {
    const loc = locationTagAccess(location);
    const condition = conditions !== "" ? `${conditions} AND` : "";
    return lookUP(tbl.STORE, fields, `${loc} ${condition} status = ${initStatus.status}`, column);
  },

  save: (values, identifier) => save(tbl.PARENT, "title, first_name, last_name, phone", values, identifier),

  erase: (conditions, values) => erase(tbl.STORE, values, `${conditions}`),

  saveChanges: (conditions, values) => saveChanges(tbl.STORE, values, `${conditions} AND status = ${initStatus.status}`, "", ""),

  /////////////////////////
  valueExists: (args, id = "") => {
    const { 0: field } = unknownObjectKeys(args);
    const { 0: value } = unknownObjectValues(args);
    const str_id = empty(id) ? "" : `id != '${id}' AND`;
    const res = countRows(tbl.STORE, "*", `${str_id}${field} = '${value}'`);
    return res;
  },
};
