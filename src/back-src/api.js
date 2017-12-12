let express = require('express');
let databaseConnect = require('./databaseConnect');
let login = require('./routes/login');
let project = require('./routes/project');
let user = require('./routes/user');
let userstory = require('./routes/userstory');
let sprint = require('./routes/sprint');
let task = require('./routes/task');
let cors = require('cors');

let router = express.Router();

router.use(cors());

router.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.send('API Works');
	/*bd.query("INSERT INTO User (name,password,mail) VALUES('toto','toto','toto@toto')", (err,result) => {
		if (err) throw err;
		console.log(result);
		bd.query("SELECT * FROM User",(err,result,fields) => {
			if (err) throw err;
			console.log(result);
		})

	})*/

	//res.sendfile(__dirname + '/index.html');
});


router.get('/secured', login.tokenVerifier, (req, res) => {
	res.contentType('application/json');
	res.send('Secured OK');
});

let bd = databaseConnect();
bd.connect(err => {
	if (err) throw err;
	else {
		console.log('Connected to the database');

		// exemple d'utilisation pour lister toutes les tables de la base de donnée courante
		router.get('/tables', (req, res) => {
			res.contentType('application/json');
			bd.query('SHOW TABLES', (error, tables, fields) => {
				let result = {};
				if (tables.length === 0)
					res.end(JSON.stringify(result));
				else {
					let pendingRequests = tables.length;
					let content = [];
					for (let i in tables) {
						let table = tables[i]['Tables_in_pgp'];
						bd.query(`DESCRIBE ${table}`, (err, cols, fields) => {
							//pendingRequests += cols.length;
							let column = {};
							for (let j = 0; j < cols.length; j++) {
								for (let k = 0; k < fields.length; k++)
									column[fields[k].name] = cols[j][fields[k].name];
							}
							bd.query(`SELECT * FROM ${table}`, (e, c) => {
								column.database_content = c;
								content.push(column);
							}).on('end', () => {
								pendingRequests--;
								console.log(pendingRequests);
								if (pendingRequests === 0)
									res.end(JSON.stringify(content));
							});
						}).on('end', () => {
							/*pendingRequests--;
							console.log(pendingRequests);
							if (pendingRequests === 0)
								res.end(JSON.stringify(content));*/
						});
					}
				}
			});
		});

		router.use(login.router);
		router.use(project);
		router.use(user);
		router.use(userstory);
		router.use(sprint);
		router.use(task);
	}
});

module.exports = router;
