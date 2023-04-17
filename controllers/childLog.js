const { findAllChildren } = require("../providers/child");
const { fetchChildByLogDate, saveChildLog, editChildLog } = require("../providers/childLog");
const db = require("../utils/database");
let moment = require("moment");

const fetchChildLog = async (req, res, next) => {
  try {
    let result = await findAllChildren();
    let arr = [];

    for (let r of result) {
      let chkTag = await fetchChildByLogDate(r.id, moment().format("YYYY-MM-DD"));
      arr.push({ child_id: r.id, parent_id: r.parent_id, first_name: r.first_name, last_name: r.last_name, tag: chkTag.length > 0 ? chkTag[0].tag : "" });
    }
    res.status(200).json({ success: true, data: arr });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const createChildLog = async (req, res, next) => {
  try {
    const { childId, parentId, tag, logDate } = req.body;

    if (!childId || !tag || !parentId || !logDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let existChildLog = await fetchChildByLogDate(childId, logDate ? logDate : moment().format("YYYY-MM-DD"));
    if (existChildLog.length > 0) {
      return res.status(400).json({ success: false, message: "This child log already exists" });
    }

    saveChildLog({ child_id: childId, parent_id: parentId, tag, log_date: logDate ? logDate : moment().format("YYYY-MM-DD") });
    res.status(201).json({ success: true, message: "Child Log successfully created", data: { child_id: childId, parent_id: parentId, tag, log_date: logDate ? logDate : moment().format("YYYY-MM-DD") } });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const updateChildLog = async (req, res, next) => {
  try {
    const { logDate } = req.body;
    const childId = req.params.id;
    if (!childId) {
      return res.status(400).json({ success: false, message: "child id is required!" });
    }
    if (!logDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let existChildLog = await fetchChildByLogDate(childId, logDate ? logDate : moment().format("YYYY-MM-DD"));
    if (existChildLog.length == 0) {
      return res.status(400).json({ success: false, message: "This child log does not exist" });
    }

    await editChildLog({ childId, logDate });
    res.status(200).json({ success: true, message: "Child Log successfully updated!", data: { childId, logDate } });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

module.exports = { fetchChildLog, createChildLog, updateChildLog };
