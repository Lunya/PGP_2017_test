let express = require('express');
let databaseConnect = require('../databaseConnect')

let router = express.Router();

function checkUndefinedObject(object, fields) {
	let ok = true;
	for (let field in fields) {
		if (object[fields[field]] === undefined)
			ok = false;
	}
	return ok;
}

function sendError(res, reason) {
	res.status(400).send({ error: true, reason: reason });
	console.log(reason);
}


router.get('/tasks/:id', (req, res) => {
	let db = databaseConnect();
	db.query('SELECT * FROM Task WHERE id_sprint = ?', [req.params.id], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let tasks = [];
			for (let i = 0; i < results.length; i++) {
				tasks.push({
					id: results[i].id,
					description: results[i].description,
					developer: results[i].developer,
					state: results[i].state
				});
			}
			res.send(tasks);
		}
	});
});

router.get('/tasks/:idproject/:developerName', (req, res) => {
	let db = databaseConnect();
	db.query('SELECT * FROM Task WHERE developer = ?', [req.params.developerName], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let tasks = [];
			for (let i = 0; i < results.length; i++) {
				tasks.push({
					id: results[i].id,
					id_sprint: results[i].id_sprint,
					description: results[i].description,
					developer: results[i].developer,
					state: results[i].state
				});
			}
			res.send(tasks);
		}
	});
});

/*router.get('/tasks/:idsprint/:id', (req, res) => {
	db.query('SELECT * FROM Task WHERE id_sprint = ?', [req.params.id], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let tasks = [];
			for (let i = 0; i < results.length; i++) {
				tasks.push({
					id: results[i].id,
					description: results[i].description,
					developer: results[i].developer,
					state: results[i].state
				});
			}
			res.send(tasks);
		}
	});
});*/


router.post('/tasks/:id', (req, res) => {
	if (checkUndefinedObject(req.body, ['description', 'developer', 'state'])) {
		let db = databaseConnect();
		db.query('INSERT INTO Task (id_sprint, description, developer, state) VALUES (?,?,?,?)',
		[req.params.id, req.body.description, req.body.developer, req.body.state], (error, dbRes) => {
			if (error)
				sendError(res, 'Unable to query database');
			else {
				res.status(200).send({
					insertId: dbRes.insertId
				});
			}
		});
	} else
		sendError(res, 'Error: required parameters not set');
});


router.patch('/task/:idsprint/:id', (req, res) => {
	if (checkUndefinedObject(req.body, ['description', 'developer', 'state'])) {
		let db = databaseConnect();
		db.query('UPDATE Task SET description = ?, developer=?, state = ? WHERE id_sprint = ? AND id = ? ',
	            [req.body.description, req.body.developer, req.body.state, req.params.idsprint, req.params.id], (error, dbRes) => {
			if (error)
				sendError(res, 'Unable to query database');
			else {
				res.status(200).send({
					insertId: dbRes.insertId
				});
			}
		});
	} else
		sendError(res, 'Error: required parameters not set');
});

router.delete('/task/:idsprint/:id', (req, res) => {
	let db = databaseConnect();
	db.query("DELETE FROM Task WHERE id_sprint = ? AND id = ?", [req.params.idsprint, req.params.id], (error, dbRes) => {
		if (error)
			sendError(res, 'Unable to query database');
		else {
			res.status(200).send({
				error: false
			});
		}
	});
});

module.exports = router;


/*router.get('/tasks/:idSprint', (req, res) => {
  let idSprint = req.params.idSprint;
  bd.query('SELECT * FROM Task WHERE id_sprint = ?',[idSprint], (err,cols) => {
    let values = [];
    treatment(err,res,values,cols)
  })
});

router.post('/tasks/:idSprint', (req, res) => {
  let id_sprint = req.params.idSprint;
  let values = [];
  if (typeof req.body.description !== 'undefined'){
    bd.query('INSERT INTO Task VALUES(?,?)',[id_sprint,req.body.description],(err,result) => {
      treatment(err,result,values,"success")
    });
  }
  else{
    values.push({'result' : 'error', 'msg' : 'Missing field'});
    res.setHeader('Content-Type', 'application/json');
    res.send(200, JSON.stringify(values));
  }
});

router.patch('/tasks/:idSprint/:idTask', (req,res) => {
  let id_sprint = req.params.idSprint;
  let id = req.params.idTask;
  bd.query('UPDATE Task SET description = ? state = ? WHERE id = ? AND id_sprint = ? ',
            [req.body.description, req.body.state,id,id_sprint], (err, cols) => {
      let values = [];
      treatment(err,res,values,"success");
  });
});

router.delete('/tasks/:idSprint/:idTask', (req,res) => {
  let id_sprint = req.params.idSprint;
  let id = req.params.idTask;
  bd.query('DELETE FROM Task WHERE id_sprint = ? AND id = ?', [id_sprint,id], (err,count) => {
    if(err) throw err;
    else{
      let values = [];
      treatment(err,res,values,"success");
    }
  });
});

module.exports  = router;*/
