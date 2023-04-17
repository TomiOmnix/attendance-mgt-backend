const express = require("express");
const router = express.Router();
const childLogController = require("../controllers/childLog");

router.get("/child-log/:logDate?", childLogController.fetchChildLog);
router.post("/child-log", childLogController.createChildLog);
router.put("/child-log/:id", childLogController.updateChildLog);

module.exports = router;
