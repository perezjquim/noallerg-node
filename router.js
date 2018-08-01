const express = require('express');
const router = express.Router();
const db = require('./database/database');

router.get('/markers', function (req, res) 
{
	return res.json(db.query("SELECT * FROM Marker"));
});

module.exports = router;