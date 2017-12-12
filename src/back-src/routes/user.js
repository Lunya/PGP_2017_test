let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let databaseConnect = require('../databaseConnect');

let router = express.Router();
const saltRounds = 8;

function checkUndefinedObject(object, fields) {
	let ok = true;
	for (let field in fields) {
		if (object[fields[field]] === undefined)
			ok = false;
	}
	return ok;
}

function sendError(res, reason) {
	res.status(400).send({
		error: true,
		reason: reason
	});
	console.log(reason);
}

router.post('/users', (req, res) => {
	res.contentType('application/json');
	if (checkUndefinedObject(req.body, ['name'])) {
		let db = databaseConnect();
		db.query("SELECT id, name, mail FROM User WHERE name LIKE ? ", '%' + req.body.name + '%', (err, result) => {
			if (err) throw err;
			else {
				let users = [];
				for (let i = 0; i < result.length; i++) {
					users.push({
						id: result[i]['id'],
						name: result[i]['name'],
						email: result[i]['mail']
					});
				}
				res.status(200).send(users);
			}
		})
	} else
		sendError(res, 'Error: required parameters not set');

});


router.post('/user/:idproject', (req, res) => {
	res.contentType('application/json');
	if (checkUndefinedObject(req.body, ['id'])) {
		let db = databaseConnect();
		db.query("INSERT INTO User_Project (id_project, id_user) VALUES(?,?)", [req.params.idproject, req.body.id], (error, result) => {
			if (error)
				sendError(res, 'Unable to query database');
			else {
				res.status(200).send({
					error: false
				});
			}
		});
	} else
		sendError(res, 'Error: required parameters not set');
});


router.patch('/user/:id', (req, res) => {
	res.contentType('application/json');
	if (checkUndefinedObject(req.body, ['email', 'name', 'password', 'newPassword'])) {
		let db = databaseConnect();
		db.query("SELECT id, name, password, mail FROM User WHERE mail = ?", [req.body.email], (err, result) => {
			if (err) throw err;
			if (result.length === 0)
				res.status(400).send({
					error: true
				});
			else {
				let user = result[0];
				bcrypt.compare(req.body.password, user.password).then(match => {
					if (match) {
						bcrypt.hash(req.body.newPassword, saltRounds, (err, newPassword) => {
							if (!err) {
								db.query("UPDATE User SET name=?, password=?, mail=? WHERE id=? ", [req.body.name, newPassword, req.body.email, req.params.id], (err2, result) => {
									if (err2) throw err2;
									res.send({
										error: false
									});
								});
							} else {
								res.send({
									error: err2
								});
							}
						});
					} else
						res.status(401).send({
							error: true
						});
				});
			}
		});
	} else
		sendError(res, 'Error: required parameters not set');
});

router.delete('/user/:id', (req, res) => {
	let db = databaseConnect();
	db.query('DELETE FROM User WHERE id = ?', [req.params.id], (error, dbRes) => {
		if (error)
			sendError(res, 'Unable to query database');
		else {
			res.status(200).send({
				error: false
			});
		}
	});
});

router.delete('/user/:idproject/:id', (req, res) => {
	let db = databaseConnect();
	db.query('DELETE FROM User_Project WHERE id_project = ? AND id_user = ?', [req.params.idproject, req.params.id], (error, dbRes) => {
		if (error)
			sendError(res, 'Unable to query database');
		else {
			res.status(200).send({
				error: false
			});
		}
	});
});


router.get('/users/:idProject', (req, res) => {
	res.contentType('application/json');
	let db = databaseConnect();
	db.query('SELECT User_Project.id_project, User_Project.id_user, User.id, User.mail, User.name FROM User_Project INNER JOIN User ON User_Project.id_user = User.id AND User_Project.id_project = ?', [req.params.idProject], (error, result) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let users = [];
			for (let i = 0; i < result.length; i++) {
				users.push({
					id: result[i]['id'],
					name: result[i]['name'],
					email: result[i]['mail']
				});
			}
			res.status(200).send(users);
		}
	});
});




module.exports = router;
