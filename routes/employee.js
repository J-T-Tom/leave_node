const md5 = require('md5');
const connection = require('../connection');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		fs.mkdir('./uploads/',(err)=>{
			cb(null, './uploads/');
		 });
	},
	filename: function(req, file, cb) {
	  cb(null, Date.now() + file.originalname);
	}
});

  
const upload = multer({
	storage: storage,
});
  
module.exports = function(app) {
	app.post('/employee/check_balance', (req, res) => {
		const {
			leave_type,
			info
		} = req.body;
		
		const query1 = `SELECT SUM(amount) AS sum FROM leave_info 
			WHERE employee_id='${info.id}' AND 
				leave_type='${leave_type}' AND
				status = 'Approved'`;
		const query2 = `SELECT SUM(amount) AS sum FROM leave_info 
			WHERE employee_id='${info.id}' AND 
				leave_type='${leave_type}' AND
				status = 'Pending'`;
		connection.query(query1, (approve_err, approve_sum) => {
			connection.query(query2, (pending_err, pending_sum) => {
				return res.json({
					approve_sum,
					approve_err,
					pending_sum,
					pending_err
				});
			});			
		});
	});
	
	app.post('/employee/add-leave', upload.single('attached_file'), (req, res) => {

		const {
			employee_id,
			leave_type,
			start_date,
			leave_days_count
		} = req.body;
		var file = req.file === undefined ? '' : req.file.path;

		const query = `INSERT INTO leave_info (employee_id, leave_type, start_date, amount, attached_file) VALUES (${employee_id}, '${leave_type}', '${start_date}', ${leave_days_count}, '${file.slice(8)}')`;
		connection.query(query, (err, results) => {
			return res.json({
			  results,
			  err
			});
		});
	});

	app.get('/employee/get-holydays', (req, res) => {
		connection.query(`SELECT * FROM setting where type='HOLYDAY' AND DATE(value) >= DATE(NOW())`, (err, results) => {
			return res.json({
			results,
			err,
			});
		});
	});

	app.post('/employee/get-all-requests', (req, res) => {
		const {
			employee_id
		} = req.body;
		connection.query(`SELECT * FROM leave_info where employee_id=${employee_id} AND hide_by_emp='0' ORDER BY leave_id DESC`, (err, results) => {
			return res.json({
			results,
			err,
			});
		});
	});

	app.post('/employee/hide-leave-request', (req, res) => {
		const {
			employee_id,
			leave_id
		} = req.body;
		const query1 = `UPDATE leave_info SET hide_by_emp=1 where leave_id=${leave_id}`;
		const query2 = `SELECT * FROM leave_info where employee_id=${employee_id} AND hide_by_emp='0' ORDER BY leave_id DESC`;
		connection.query(query1, (err1, results1) => {
			connection.query(query2, (err2, results2) => {
				return res.json({
				results: results2,
				err1,
				query1,
				query2
				});
			});
		})
	});
}