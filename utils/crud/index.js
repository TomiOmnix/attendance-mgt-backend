let moment = require("moment");
const { initStatus } = require("../../helper/constant/InitStatus");
const db = require("../database");

const lookUP = (table, fields = "*", conditions = "") => {
  const condition = conditions ? `WHERE ${conditions}` : "";
  const query = `SELECT ${fields} FROM ${table} ${condition}`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

const save = (table, fields, value, identifier) => {
  let field = `${fields},status,id,time,date`;

  let date = moment().format("YYYY-MM-DD");
  let time = moment().format("hh:mm:ss");

  let values = `${value},"${initStatus.status}","${identifier}","${time}","${date}"`;

  const query = `INSERT INTO ${table} (${field}) VALUES (${values})`;

  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

const saveChanges = (table, value, condition) => {
  const query = `UPDATE ${table} SET ${value} WHERE ${condition}`;
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

const erase = (table, conditions = "") => {
  const condition = conditions ? `WHERE ${conditions}` : "";
  const query = `DELETE FROM ${table} ${condition}`;

  db.query(query, (err, data) => {
    if (err) throw err;
  });
};

const countRows = (table, fields = "*", conditions = "", def = "") => {
  const condition = conditions ? `WHERE ${conditions}` : "";
  const query = `SELECT ${fields} FROM ${table} ${condition}`;

  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
};

module.exports.lookUP = lookUP;
module.exports.save = save;
module.exports.erase = erase;
module.exports.saveChanges = saveChanges;
module.exports.countRows = countRows;
