const md5 = require('md5');
const connection = require('../connection');

module.exports = function(app) {
	app.post('/manager/change-leave-status', (req, res) => {
		const {
			leave_id,
			status
		} = req.body;
		
		const query1 = `UPDATE leave_info SET status='${status}' WHERE leave_id='${leave_id}'`;
		const query2 = `SELECT * FROM leave_info JOIN employees ON leave_info.employee_id = employees.id WHERE employees.role='EMPLOYEE' AND leave_info.status='Pending'`;
		connection.query(query1, (err1, results1) => {
			connection.query(query2, (err, results) => {
				return res.json({
					err1,
					err,
					results1,
					results
				});
			});			
		});
	});

	app.get('/uploads/:path', (req, res) => {
		const path = req.params.path;

		res.download('./uploads/'+path);
	  });
	
	app.get('/manager/get-pending-requests', (req, res) => {
		const query = `SELECT * FROM leave_info JOIN employees ON leave_info.employee_id = employees.id WHERE employees.role='EMPLOYEE' AND leave_info.status='Pending'`;

		connection.query(query, (err, results) => {
			return res.json({
			  results,
			  err
			});
		});
	});

	app.get('/manager/get-holydays', (req, res) => {
		const query = `SELECT * FROM setting WHERE type='HOLYDAY'`;

		connection.query(query, (err, results) => {
			return res.json({
			  results,
			  err
			});
		});
	});

	app.post('/manager/add-holyday', (req, res) => {
		const {
			holyday
		} = req.body;
		
		const query1 = `INSERT INTO setting VALUES ('HOLYDAY', '${holyday}')`;
		const query2 = `SELECT * FROM setting WHERE type='HOLYDAY'`;
		connection.query(query1, (err1, results1) => {
			connection.query(query2, (err, results) => {
				return res.json({
					err1,
					err,
					results1,
					results
				});
			});			
		});
	});

	app.post('/manager/remove-holyday', (req, res) => {
		const {
			holyday
		} = req.body;
		
		const query1 = `DELETE FROM setting WHERE type='HOLYDAY' AND value='${holyday}'`;
		const query2 = `SELECT * FROM setting WHERE type='HOLYDAY'`;
		connection.query(query1, (err1, results1) => {
			connection.query(query2, (err, results) => {
				return res.json({
					err1,
					err,
					results1,
					results,query1
				});
			});			
		});
	});

	// app.get('/employee/get-holydays', (req, res) => {
	// 	connection.query(`SELECT * FROM setting where type='HOLYDAY' AND DATE(value) >= DATE(NOW())`, (err, results) => {
	// 		return res.json({
	// 		results,
	// 		err,
	// 		});
	// 	});
	// });

	// app.post('/employee/get-all-requests', (req, res) => {
	// 	const {
	// 		employee_id
	// 	} = req.body;
	// 	connection.query(`SELECT * FROM leave_info where employee_id=${employee_id} AND hide_by_emp='0' ORDER BY leave_id DESC`, (err, results) => {
	// 		return res.json({
	// 		results,
	// 		err,
	// 		});
	// 	});
	// });

	// app.post('/employee/hide-leave-request', (req, res) => {
	// 	const {
	// 		employee_id,
	// 		leave_id
	// 	} = req.body;
	// 	const query1 = `UPDATE leave_info SET hide_by_emp=1 where leave_id=${leave_id}`;
	// 	const query2 = `SELECT * FROM leave_info where employee_id=${employee_id} AND hide_by_emp='0' ORDER BY leave_id DESC`;
	// 	connection.query(query1, (err1, results1) => {
	// 		connection.query(query2, (err2, results2) => {
	// 			return res.json({
	// 			results: results2,
	// 			err1,
	// 			query1,
	// 			query2
	// 			});
	// 		});
	// 	})
	// });
}