const sqlite = require('sqlite-sync');

module.exports.connect = function()
{
	sqlite.connect("./database/database.db");
	console.log("> Connected to database!");
}

module.exports.query = function(_sql)
{
	console.log("> Executing query '"+_sql+"'");
	return sqlite.run(_sql);
}

module.exports.init = function()
{
	this.connect();

	this.query("CREATE TABLE IF NOT EXISTS 'Marker' ( "+
						 "'id' INTEGER NOT NULL PRIMARY KEY , "+
						 "'title' VARCHAR(45) ,"+
						 "'subtitle' VARCHAR(45) ,"+
						 "'latitude' DOUBLE ,"+
						 "'longitude' DOUBLE )");

	this.query("CREATE TABLE IF NOT EXISTS 'Login' ( "+
						 "'id' INTEGER NOT NULL PRIMARY KEY , "+
						 "'user' VARCHAR(45) ,"+
						 "'pass' VARCHAR(45))");
}

module.exports.getUsers = function()
{
	var users = this.query("SELECT user,pass FROM 'Login'");

	var oUsers = users.reduce(
    (obj, item) => Object.assign(obj, {[item.user]: item.pass}) ,{});

	return oUsers;
}
