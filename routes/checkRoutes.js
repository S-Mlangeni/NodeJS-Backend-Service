const express = require("express");
const checkController = require("../controllers/checkController");

const router = express.Router();

router.post("/watch-video", checkController.watch_check);
router.post("/close-video", checkController.close_check);

module.exports = router;