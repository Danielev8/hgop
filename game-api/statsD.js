module.exports = (context) => {
	const StatsD = context('hotshots');
	return new StatsD({
		host: 'datadog_container'
	});
};