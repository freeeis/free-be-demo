const path = require("path");
const express = require(path.resolve('./') + "/node_modules/express");
const router = express.Router();

router.post(
    "",
    router.CreateDocument("author")
);

router.get(
    "/author",
    router.FindDocuments("author")
);

module.exports = router;
