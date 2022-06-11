const md5 = require('md5');
const connection = require('../connection');

module.exports = function(app) {
	app.post('/login/checkUsername', (req, res) => {
		const {
			username
		} = req.body;
  
		const query = `SELECT * FROM employees WHERE id = '${username}'`;
		connection.query(query, (err, results) => {
		  if (err) {
			return res.json({
			  found: false,
			  err,
			});
		  } else {
			return res.json({
			  results
			});
		  }
		});
	});
	
	app.post('/login/sign-in', (req, res) => {
		const {
			username,
			password
		} = req.body;
  
		var md = md5(password);

		const query = `SELECT * FROM employees WHERE id = '${username}' AND BINARY password = '${md}'`;
		connection.query(query, (err, results) => {
		  if (err) {
			return res.json({
			  found: false,
			  err,
			});
		  } else {
			return res.json({
			  results
			});
		  }
		});
	}); 
}