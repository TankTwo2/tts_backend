const express = require('express');
const router = express.Router();
const tts = require('../controller/tts')

/* POST 기존 데이터 Save */
router.post('/save', tts.saveCell);

module.exports = router;
