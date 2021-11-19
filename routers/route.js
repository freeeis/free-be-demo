const path = require("path");
const express = require(path.resolve('./') + "/node_modules/express");
const router = express.Router();

router.get('', async (req, res, next) => {
    res.addData(`From the root of ${router.mdl.t('hello')}!`);

    return next();
})

router.get('/name', (req, res) => {
    res.endWithData(`Hi, my name is ${router.Config('name')}`);

    return;
})

module.exports = router;