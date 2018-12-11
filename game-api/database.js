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
	const sendQuery = (onSuccess, onError, query) => {
		let client = getClient();
		client.connect((err) => {
			if (err) {
				onError(err);
				client.end();
			} else {
				client.query(query, (err, res) => {
					if (err) {
						onError();
					} else {
						return res.rows[0] ? onSuccess(res.rows[0].count) : onSuccess();
					}
					client.end();
				});
			}
		});
		return;
	};

	return {

		insertResult: (won, score, total, onSuccess, onError) => {
			const query = {
				text: 'INSERT INTO GameResults (Won, Score, Total, InsertedDate) VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
				values: [won, score, total],
			};
			return sendQuery(onSuccess, onError, query);
		},

		// Should call onSuccess with integer.
		getTotalNumberOfGames: (onSuccess, onError) => {
			const query = {
				text: 'SELECT COUNT(*) FROM GameResults;'
			};
			return sendQuery(onSuccess, onError, query);
		},
		// Should call onSuccess with integer.
		getTotalNumberOfWins: (onSuccess, onError) => {
			const query = {
				text: 'SELECT COUNT(*) FROM GameResults r WHERE r.Won = TRUE;'
			};
			return sendQuery(onSuccess, onError, query);
		},
		// Should call onSuccess with integer.
		getTotalNumberOf21: (onSuccess, onError) => {
			const query = {
				text: 'SELECT COUNT(*) FROM GameResults r WHERE r.Total = 21'
			};
			return sendQuery(onSuccess, onError, query);
		},
	};
};