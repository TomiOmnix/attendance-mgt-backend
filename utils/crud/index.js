const { empty, strlen, strToLower, clientTag, userTag, explode, removeSingleQuote, userQueueTag, identifier, escapeSingleQuote, escapeDoubleQuote } = require("../../helper/helperFunctions");
const { tbl } = require("../../helper/constant/tableConstants");

let moment = require("moment");
const { initStatus } = require("../../helper/constant/InitStatus");
const db = require("../database");

const saveChanges = (table, value, condition, queue = "", def = "", token = "") => {
  let cTag = clientTag();
  let q = empty(def) ? `AND ${cTag}` : "";
  const v = strToLower(value);
  const query = `UPDATE ${table} SET ${v}, update_date='${moment().format("YYYY-MM-DD hh-mm-ss")}' WHERE ${condition} ${q}`;
  let dtm = moment().format("YYYY-MM-DD hh-mm-ss");

  let uIdentifier = identifier("upd");
  db.query(query, (err, data) => {
    if (err) throw err;
    if (empty(queue)) {
      let modQuery = escapeSingleQuote(query);
      saveQueue(modQuery, initStatus.syncStatus, table, `${uIdentifier}`, 0, 0, dtm, "", strToLower(token));
    }
  });
};

const save = (table, fields, values, identifier) => {
  let field = `${fields},${id},date,tm`;

  let date = moment().format("YYYY-MM-DD");
  let tm = moment().format("hh:mm:ss");

  let values = `${values},"${identifier}","${date}","${tm}"`;

  const query = `INSERT INTO ${table} (${field}) VALUES (${values})`;

  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

const erase = (table, conditions = "", queue = "", token = "") => {
  let cTag = clientTag();
  const condition = !empty(conditions) ? `WHERE ${conditions} AND ${cTag}` : "";
  const query = `DELETE FROM ${table} ${condition}`;
  let dtm = moment().format("YYYY-MM-DD hh-mm-ss");

  // let stmt = db.prepare(query);
  // stmt.run();

  let dIdentifier = identifier("DEL");

  db.query(query, (err, data) => {
    if (err) throw err;
    if (empty(queue)) {
      let modQuery = escapeSingleQuote(query);
      saveQueue(modQuery, initStatus.syncStatus, table, dIdentifier, 0, 0, dtm, "", token);
    }
  });

  // await rollback(dIdentifier);
};

const lookUP = (table, fields = "*", conditions = "", column = "") => {
  let cTag = clientTag();
  const condition = !empty(conditions) ? `WHERE ${cTag} AND ${strToLower(conditions)}` : `WHERE ${cTag}`;
  const query = `SELECT ${fields} FROM ${table} ${condition}`;

  console.log(query);

  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      // if (err) throw err;
      return err ? reject(err) : resolve(!empty(column) ? (result && strlen(result) > 0 ? result[0][column] : "") : result && strlen(result) > 0 ? result : []);
    });
  });

  console.log("result", result);
};

const countRows = (table, fields = "*", conditions = "", def = "") => {
  let cTag = clientTag();
  let q = empty(def) ? `AND ${cTag}` : "";
  const condition = !empty(conditions) ? `WHERE ${conditions}` : "";
  const query = `SELECT ${fields} FROM ${table} ${condition} ${q}`;
  console.log(query);

  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result && result.length > 0 ? result.length : 0);
    });
  });
};

module.exports.lookUP = lookUP;
module.exports.save = save;
module.exports.erase = erase;
module.exports.saveChanges = saveChanges;
module.exports.countRows = countRows;
