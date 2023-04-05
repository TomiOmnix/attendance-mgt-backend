const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parent");

router.get("/parent", parentController.fetchParents);
router.get("/parent/:id", parentController.fetchParent);
router.post("/parent", parentController.createParent);
router.put("/parent/:id", parentController.updateParent);
router.delete("/parent/:id", parentController.deleteParent);

module.exports = router;
