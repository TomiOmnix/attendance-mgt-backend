// const { initStatus } = require("../../../Helper/Constant/InitStatus");
// const { ucWord, checkError } = require("../../../Helper/helperFunctions");
// const { updateStore, findAllStores, saveStore } = require("../../../Providers/CommonProvider/Store");

const fetchStores = async (req, res, next) => {
  try {
    let readQuery = `select * from parent where status = 0`;

    db.query(readQuery, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error!" });
      }
      res.status(200).json({ success: true, data: result });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const fetchStoreDropDownData = async (req, res, next) => {
  try {
    const strs = await findAllStores();
    checkError(strs, "data not found", 404);
    const stores = strs.map((r) => {
      return { title: ucWord(r.name), value: r.id, primary: r.primary_status };
    });
    const primary = stores.filter((res) => res.primary === initStatus.oneStatus)[0];
    res.status(200).json({
      data: { stores, primary },
      // post: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
const saveStoreData = (req, res, next) => {
  try {
    let store = req.body;
    saveStore(store);
    res.status(201).json({
      message: "Store Saved Successfully",
      // post: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateStoreData = async (req, res, next) => {
  try {
    updateStore(req.body);
    res.status(201).json({
      message: "Store Updated Successfully",
      // post: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const deleteStoreData = async (req, res, next) => {
  try {
    updateStore(req.body);
    res.status(201).json({
      message: "Store deleted Successfully",
      // post: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = { fetchStores, saveStoreData, updateStoreData, deleteStoreData, fetchStoreDropDownData };
