const express = require('express');
const router = express.Router();
const db = require('./database/database');

router.get('/markers', function (req, res) 
{
	return res.json(db.getMarkers());
});

module.exports = router;