module.exports = (context) => {
	const statsD = context('hotshots');
	return new statsD({
		host: 'datadog_container'
	});
};