const express = require("express");
const router = express.Router();
const childController = require("../controllers/child");

router.get("/child", childController.fetchChildren);
router.get("/child/:id", childController.fetchChild);
router.post("/child", childController.createChild);
router.put("/child/:id", childController.updateChild);
router.delete("/child/:id", childController.deleteChild);

module.exports = router;
