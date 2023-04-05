const { initStatus } = require("../../../Helper/Constant/InitStatus");
const { identifier, empty } = require("../../../Helper/helperFunctions");
const { storeModel } = require("../../../Models/CommonModel/Store");

const storeInfo = (conditions = "", fields = "*", column = "") => {
  return storeModel.info(conditions, fields, column);
};

const findAllStores = () => {
  return storeInfo();
};

const singleStoreInfo = (id, fields = "*", location = "") => {
  let column = fields === "*" ? initStatus.empty : fields;
  return storeInfo(`id = '${id}'`, location, fields, column);
};

const findOneStore = (id) => {
  return singleStoreInfo(id)[0];
};
const findStoresByLocation = (loc_id) => {
  return storeInfo("", loc_id);
};

const storeName = (id, location = "") => {
  return singleStoreInfo(id, "name", location);
};

const storeStatus = (id, location = "") => {
  return singleStoreInfo(id, "status", location);
};

const isPrimaryStore = (id, location = "") => {
  return singleStoreInfo(id, "primary_status", location);
};

const primaryStore = (location = "") => {
  return storeInfo(`primary_status = '${initStatus.oneStatus}'`, location, "id", "id");
};

const primaryStoreRow = async (location = "") => {
  let primary = await storeInfo(`primary_status = '${initStatus.oneStatus}'`, location);
  return primary[0];
};
const saveStore = (arg) => {
  const { name } = arg;
  const store_identifier = identifier("STR");
  const values = `'${name}',${initStatus.status},${initStatus.status}`;
  storeModel.save(values, store_identifier);
};

const updateStore = (arg) => {
  const { storeId, name = "" } = arg;
  let nam = !empty(name) ? `name = '${name}'` : `status=${initStatus.oneStatus}`;
  storeModel.saveChanges(`id = '${storeId}'`, nam);
};

module.exports = {
  primaryStore,
  primaryStoreRow,
  storeName,
  updateStore,
  saveStore,
  isPrimaryStore,
  storeStatus,
  findAllStores,
  findOneStore,
  findStoresByLocation,
};
