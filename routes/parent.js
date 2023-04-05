const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parent");

router.get("/parent", parentController.fetchParentsData);
router.get("/parent/:id", parentController.fetchSingleParentData);
router.post("/parent", parentController.saveParentData);
router.put("/parent/:id", parentController.updateParentData);
router.delete("/parent/:id", parentController.deleteParentData);

module.exports = router;
