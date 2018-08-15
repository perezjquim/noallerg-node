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
						 "'pass' VARCHAR(45) ,"+
						 "'admin' INTEGER DEFAULT 0 )");
}

module.exports.getUsers = function()
{
	var users = this.query("SELECT user,pass FROM 'Login'");

	var oUsers = users.reduce(
    (obj, item) => Object.assign(obj, {[item.user]: item.pass}) ,{});

	return oUsers;
}
module.exports.insertUser = function(user,pass,admin)
{
	this.query("INSERT INTO 'Login'"+ 
						 "('user','pass','admin')"+
						 "VALUES"+
						 "('"+user+"','"+pass+"','"+admin+"')");
}
module.exports.updateUser = function(id,user,pass,admin)
{
	this.query("UPDATE 'Marker' SET"+ 
						 "'user'='"+user+"',"+
						 "'pass'='"+pass+"',"+
						 "'admin'='"+admin+"'"+
						 "WHERE id="+id);
}
module.exports.deleteUser = function(id)
{
	this.query("DELETE FROM 'Login'"+ 
						 "WHERE id="+id);
}

module.exports.getMarkers = function()
{
	return this.query("SELECT * FROM 'Marker'");
}
module.exports.insertMarker = function(title,subtitle,latitude,longitude)
{
	this.query("INSERT INTO 'Marker'"+ 
						 "('title','subtitle','latitude','longitude')"+
						 "VALUES"+
						 "('"+title+"','"+subtitle+"','"+latitude+"','"+longitude+"')");
}
module.exports.updateMarker = function(id,title,subtitle,latitude,longitude)
{
	this.query("UPDATE 'Marker' SET"+ 
						 "'title'='"+title+"',"+
						 "'subtitle'='"+subtitle+"',"+
						 "'latitude'='"+latitude+"',"+
						 "'longitude'='"+longitude+"'"+
						 "WHERE id="+id);
}
module.exports.deleteMarker = function(id)
{
	this.query("DELETE FROM 'Marker'"+ 
						 "WHERE id="+id);
}