module.exports = function (context) {
	const Client = context('pgClient');
	const configConstructor = context('config');
	const config = configConstructor(context);

	function getClient() {
		return new Client({
			host: config.pgHost,
			user: config.pgUser,
			password: config.pgPassword,
			database: config.pgDatabase,
		});
	}

	let client = getClient();

	setTimeout(() =>
		client.connect((err) => {
			if (err) {
				console.log('failed to connect to postgres!');
			} else {
				console.log('successfully connected to postgres!');
				client.query('CREATE TABLE IF NOT EXISTS GameResults (ID SERIAL PRIMARY KEY, Won BOOL NOT NULL, Score INT NOT NULL, Total INT NOT NULL, InsertedDate TIMESTAMP NOT NULL);', (err) => {
					if (err) {
						console.log('error creating game result table!');
					} else {
						console.log('successfully created game result table!');
					}
					client.end();
				});
			}
		}), 5000);

	// Function returns total count and takes in "WHERE X = Y" as parameters
	const whereQueryHelper = (onSuccess, onError, whereQuery) => {
		let client = getClient();
		client.connect((err) => {
			if (err) {
				onError(err);
				client.end();
			} else {
				const query = {
					text: `SELECT COUNT(*) FROM GameResults r ${whereQuery}`,
				};
				client.query(query, (err, res) => {
					if (err) {
						onError();
					} else {
						onSuccess(res.rows[0].count);
					}
					client.end();
				});
			}
		});
		return;
	};

	return {
		insertResult: (won, score, total, onSuccess, onError) => {
			let client = getClient();
			client.connect((err) => {
				if (err) {
					onError(err);
					client.end();
				} else {
					const query = {
						text: 'INSERT INTO GameResults (Won, Score, Total, InsertedDate) VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
						values: [won, score, total],
					};
					client.query(query, (err) => {
						if (err) {
							onError();
						} else {
							onSuccess();
						}
						client.end();
					});
				}
			});
			return;
		},

		// Should call onSuccess with integer.
		getTotalNumberOfGames: (onSuccess, onError) => {
			return whereQueryHelper(onSuccess, onError, ";");
		},
		// Should call onSuccess with integer.
		getTotalNumberOfWins: (onSuccess, onError) => {
			return whereQueryHelper(onSuccess, onError, "WHERE r.Won = TRUE;");
		},
		// Should call onSuccess with integer.
		getTotalNumberOf21: (onSuccess, onError) => {
			return whereQueryHelper(onSuccess, onError, "WHERE r.total = 21;");
		},
	};
};