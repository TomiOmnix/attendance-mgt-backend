const { saveParent, findAllParents, singleParentInfo, updateParents, removeParent, existingPhoneNumber } = require("../providers/parent");
const db = require("../utils/database");

const fetchParents = async (req, res, next) => {
  try {
    let result = await findAllParents();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const fetchParent = async (req, res, next) => {
  try {
    const parentId = req.params.id;

    if (!parentId) {
      return res.status(400).json({ success: false, message: "Parent id is required!" });
    }
    let result = await singleParentInfo(parentId);
    if (result.length == 0) {
      return res.status(404).json({ success: false, message: "This parent id doesnt exist!" });
    } else {
      res.status(200).json({ success: true, data: result });
    }
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const createParent = async (req, res, next) => {
  try {
    const { title, firstName, lastName, phone } = req.body;

    if (!title || !firstName || !lastName || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let existingphone = await existingPhoneNumber(phone);
    if (existingphone.length > 0) {
      return res.status(400).json({ success: false, message: "Parent with this phone number already exists" });
    }

    saveParent({ title, phone, first_name: firstName, last_name: lastName });
    res.status(201).json({ success: true, message: "Parent successfully created", data: { title, firstName, lastName, phone } });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const updateParent = async (req, res, next) => {
  try {
    const { title, firstName, lastName, phone } = req.body;
    const parentId = req.params.id;
    if (!title || !firstName || !lastName || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (!parentId) {
      return res.status(400).json({ success: false, message: "Parent id is required!" });
    }
    let isParentExist = await singleParentInfo(parentId);
    if (isParentExist.length == 0) {
      return res.status(404).json({ success: false, message: "This parent Id does not exist!" });
    }
    await updateParents({ id: parentId, title, first_name: firstName, last_name: lastName, phone });
    res.status(200).json({ success: true, message: "Parent successfully updated", data: { id: parentId, title, first_name: firstName, last_name: lastName, phone } });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

const deleteParent = async (req, res, next) => {
  try {
    const parentId = req.params.id;
    if (!parentId) {
      return res.status(400).json({ success: false, message: "Parent id is required!" });
    }
    let isParentExist = await singleParentInfo(parentId);
    if (isParentExist.length == 0) {
      return res.status(404).json({ success: false, message: "This parent id doesnt exist!" });
    }
    await removeParent({ id: parentId });
    res.status(200).json({ success: true, message: "Parent successfully deleted", data: { id: parentId } });
  } catch (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
};

module.exports = { fetchParents, fetchParent, createParent, updateParent, deleteParent };
