let express = require("express");
let checkController = require("../controllers/checkController");

let router = express.Router();

router.post("/watch-video", checkController.watch_check);

module.exports = router;