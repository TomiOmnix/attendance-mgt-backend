const { singleChildInfo, findAllChildren, saveChild, editChild, removeChild, existingChild } = require("../providers/child");
const db = require("../utils/database");

const fetchChildren = async (req, res, next) => {
  try {
    let result = await findAllChildren();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const fetchChild = async (req, res, next) => {
  try {
    const childId = req.params.id;

    if (!childId) {
      return res.status(400).json({ success: false, message: "child id is required!" });
    }
    let result = await singleChildInfo(childId);
    if (result.length > 0) {
      res.status(200).json({ success: true, data: result });
    } else {
      return res.status(404).json({ success: false, message: "This child id does not exist!" });
    }
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const createChild = async (req, res, next) => {
  try {
    const { firstName, lastName, parentId, gender, dob } = req.body;

    if (!gender || !firstName || !lastName || !parentId || !dob) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let existChild = await existingChild({ firstName, lastName, parentId });
    if (existChild.length > 0) {
      return res.status(400).json({ success: false, message: "Child with this parent id already exists" });
    }

    saveChild({ first_name: firstName, last_name: lastName, gender, parent_id: parentId, d_o_b: dob });
    res.status(201).json({ success: true, message: "Child successfully created", data: { gender, firstName, lastName, parentId, dob } });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const updateChild = async (req, res, next) => {
  try {
    const { firstName, lastName, parentId, gender, dob } = req.body;
    const childId = req.params.id;
    if (!gender || !firstName || !lastName || !parentId || !dob) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (!childId) {
      return res.status(400).json({ success: false, message: "child id is required!" });
    }
    let isChildExist = await singleChildInfo(childId);
    if (isChildExist.length == 0) {
      return res.status(404).json({ success: false, message: "This child Id does not exist!" });
    }

    await editChild({ id: childId, gender, first_name: firstName, last_name: lastName, d_o_b: dob, parent_id: parentId });
    res.status(200).json({ success: true, message: "Child successfully updated", data: { id: childId, gender, firstName, lastName, dob, gender } });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const deleteChild = async (req, res, next) => {
  try {
    const childId = req.params.id;
    if (!childId) {
      return res.status(400).json({ success: false, message: "Child id is required!" });
    }
    let isChildExist = await singleChildInfo(childId);
    if (isChildExist.length == 0) {
      return res.status(404).json({ success: false, message: "This child Id does not exist!" });
    }
    await removeChild({ id: childId });
    res.status(200).json({ success: true, message: "Child successfully deleted", data: { id: childId } });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

module.exports = { fetchChildren, fetchChild, createChild, updateChild, deleteChild };
