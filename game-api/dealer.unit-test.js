const dealerConstructor = require('./dealer.js');

test('dealer should should shuffle cards', () => {
	// Arrange
	let deck = ['a', 'b', 'c'];
	let dealer = dealerConstructor();

	// Act
	dealer.shuffle(deck, () => {
		return 0.99;
	});
	
	// Assert
	expect(deck).toEqual(['c', 'b', 'a']);
});