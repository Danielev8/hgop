modules.exports = (context) => {
	const statsD = context('hotshot');
	return statsD({
		host: 'datadog_container'
	});
};