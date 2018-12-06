const lucky21Constructor = require('./lucky21.js');
// create dependency dummies
let dependencies = {
	"deck": () => [
		'01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H', // Hearts
		'01C', '02C', '03C', '04C', '05C', '06C', '07C', '08C', '09C', '10C', '11C', '12C', '13C', // Clubs
		'01D', '02D', '03D', '04D', '05D', '06D', '07D', '08D', '09D', '10D', '11D', '12D', '13D', // Diamonds
		'01S', '02S', '03S', '04S', '05S', '06S', '07S', '08S', '09S', '10S', '11S', '12S', '13S', // Spades
	],
	"dealer": () => {
		return {
			"shuffle": () => { },
			"draw": (deck) => {
				return deck.pop();
			}
		};
	}
};
// variable to get dependencies
const context = (name) => {
	return dependencies[name];
};

// test game initation
test('a new game should have 50 cards left in the deck', () => {
	let game = lucky21Constructor(context);
	expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
	let game = lucky21Constructor(context);
	expect(game.state.cards.length).toEqual(2);
});

// isGameOver
test('isGameOver should return true', () => {
	// guessUnder and getCardsValue > 21
	// Arrange
	dependencies.deck = () => [
		'05C', '10D', '09S'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.isGameOver(game)).toEqual(true);
});

test('isGameOver should return true', () => {
	// guessOver
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S', '10H',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guessOver21(game);
	// Assert
	expect(game.isGameOver(game)).toEqual(true);
});

test('isGameOver should return true', () => {
	// guessUnder and getCardsValue = 21
	// Arrange
	dependencies.deck = () => [
		'05C', '10D', '06S',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.isGameOver(game)).toEqual(true);
});

test('isGameOver should return false', () => {
	// guessUnder and getCardsValue < 21
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.isGameOver(game)).toBe(false);
});

// playerWon
test('playerWon should return true', () => {
	// isGameOver = true and getCardsValue = 21 and getTotal = 21
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S', '06H',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);

	// Act
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);

	// Assert
	expect(game.playerWon(game)).toEqual(true);
});

test('playerWon should return true', () => {
	// isGameOver = true and getCardsValue < 21 and getTotal > 21
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S', '10H',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);

	// Assert
	expect(game.playerWon(game)).toEqual(true);
});

test('playerWon should return true', () => {
	// isGameOver = true and getCardsValue < 21 and getTotal = 21
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S', '06H',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);

	// Act
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);

	// Assert
	expect(game.playerWon(game)).toEqual(true);
});

test('playerWon should return false', () => {
	// isGameOver = true and getCardsValue < 21 and getTotal = 21
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S', '06H',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);
	// Assert
	expect(game.playerWon(game)).toEqual(false);
});

test('playerWon should return false', () => {
	// isGameOver = true and getCardsValue < 21 and getTotal < 21
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S', '03H',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);
	// Assert
	expect(game.playerWon(game)).toEqual(false);
});

// getCardsValue
test('getCardsValue should return 25', () => {
	// create deck of ["05H", "07D", "13S", "03C"]
	// Arrange
	dependencies.deck = () => [
		'05H', '07D', '13S', '03C'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);
	// Assert
	expect(game.getCardsValue(game)).toEqual(25);
});

test('getCardsValue should return 15', () => {
	// create deck and get values from ["01S", "04D"]
	// Arrange
	dependencies.deck = () => [
		'01S', '04D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Assert
	expect(game.getCardsValue(game)).toEqual(15);
});

test('getCardsValue should return 13', () => {
	// create deck of ['01C', '01H']
	// Arrange
	dependencies.deck = () => [
		'01C', '01D', '01S', '01H'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);
	// Assert
	expect(game.getCardsValue(game)).toEqual(13);
});

test('getCardsValue should return 28', () => {
	// create deck and get values from ["01C", "08D", "06S", "13S"]
	// Arrange
	dependencies.deck = () => [
		'01C', '08D', '09S', '13S'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);

	// Assert
	expect(game.getCardsValue(game)).toEqual(28);
});

test('getCardsValue should return 23', () => {
	// create deck and get values from ["08S", "05C", "01D", "02H", "07S"]
	// Arrange
	dependencies.deck = () => [
		'08S', '05C', '01D', '02H', '07S'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);

	// Assert
	expect(game.getCardsValue(game)).toEqual(23);
});

test('getCardsValue should return 18', () => {
	// create deck and get ["03C", "13S", "07D"]
	// Arrange
	dependencies.deck = () => [
		'05H', '04D', '01S', '03C'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);
	// Assert
	expect(game.getCardsValue(game)).toEqual(18);
});

test('getCardsValue should return 13', () => {
	// create deck and get ["01C", "01S", "01D"]
	// Arrange
	dependencies.deck = () => [
		'01D', '01S', '01C'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.getCardsValue(game)).toEqual(13);
});

// getCardValue
test('getCardValue should return 1', () => {
	// getCardsValue > 10 and guessOver21 and we get an ACE from that
	// Arrange
	dependencies.deck = () => [
		'01H', '03S', '04C', '04D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);
	// Assert
	expect(game.getCardValue(game)).toEqual(1);
});

test('getCardValue should return 11', () => {
	// getCardsValue < 11 and guessOver21 and we get an ACE from that
	// Arrange
	dependencies.deck = () => [
		'01H', '03S', '04C', '03D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);
	// Assert
	expect(game.getCardValue(game)).toEqual(11);
});

test('getCardValue should return undefined', () => {
	// Arrange
	dependencies.deck = () => [
		'03S', '04C', '04D', '01H'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);
	// Assert
	expect(game.getCardValue(game)).toEqual(undefined);
});

test('getCardValue should return undefined', () => {
	// start game guessUnder and call the function
	// Arrange
	dependencies.deck = () => [
		'03S', '04C', '04D', '01H'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Assert
	expect(game.getCardValue(game)).toEqual(undefined);
});

test('getCardValue should return 7', () => {
	// start game guessUnder a few times and call the function (when 7 is coming)
	// Arrange
	dependencies.deck = () => [
		'07H', '03S', '04C', '04D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);
	// Assert
	expect(game.getCardValue(game)).toEqual(7);
});

// getTotal
test('getTotal should return 16', () => {
	// guessUnder: 10, 3, 3 + undefined
	// Arrange
	dependencies.deck = () => [
		'12S', '03C', '03D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.getTotal(game)).toEqual(16);
});

test('getTotal should return 21', () => {
	// guessUnder: 5, 5, A + undefined
	// Arrange
	dependencies.deck = () => [
		'05S', '05C', '01D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.getTotal(game)).toEqual(21);
});

test('getTotal should return 25', () => {
	// guessUnder: 10, 13, 5 + undefined
	// Arrange
	dependencies.deck = () => [
		'10S', '13C', '05D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.getTotal(game)).toEqual(25);
});

test('getTotal should return 16', () => {
	// guessOver: 10, 3 + 3
	// Arrange
	dependencies.deck = () => [
		'12S', '03C', '03D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guessOver21(game);
	// Assert
	expect(game.getTotal(game)).toEqual(16);
});

test('getTotal should return 21', () => {
	// guessOver: 5, 5 + A
	// Arrange
	dependencies.deck = () => [
		'05S', '05C', '01D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guessOver21(game);
	// Assert
	expect(game.getTotal(game)).toEqual(21);
});

test('getTotal should return 27', () => {
	// guessOver: 10, 5, 2 + 13
	// Arrange
	dependencies.deck = () => [
		'10S', '05C', '02D', '13D'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guessOver21(game);
	// Assert
	expect(game.getTotal(game)).toEqual(27);
});

// getCards
test('getCards should return ["13S", "07D", "05H"]', () => {
	// create a deck with these cards and some more, and draw them 1 time
	// Arrange
	dependencies.deck = () => [
		'05H', '07D', '13S'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.getCards(game)).toEqual(["13S", "07D", "05H"]);
});

test('getCards should return ["04D", "01S"]', () => {
	// create a deck with these cards and should get these values right away
	// Arrange
	dependencies.deck = () => [
		'01S', '04D',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);

	// Assert
	expect(game.getCards(game)).toEqual(["04D", "01S"]);
});

test('getCards should return ["13S", "06S", "08D", "01C"]', () => {
	// create a deck with these cards and draw 2 times
	// Arrange
	dependencies.deck = () => [
		'01C', '08D', '06S', '13S'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);
	// Assert
	expect(game.getCards(game)).toEqual(["13S", "06S", "08D", "01C"]);
});

test('getCards should return ["07S", "01H", "10D", "05C", "08S"]', () => {
	// create a deck with these cards and draw 3 times
	// Arrange
	dependencies.deck = () => [
		'08S', '05C', '10D', '01H', '07S'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);
	game.guess21OrUnder(game);
	// Assert
	expect(game.getCards(game)).toEqual(["07S", "01H", "10D", "05C", "08S"]);
});

// getCard
test('getCard should return "08S"', () => {
	// start the game and guessOver right away (10H being the next card)
	// Arrange
	dependencies.deck = () => [
		'08S', '05C', '10H'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guessOver21(game);
	// Assert
	expect(game.getCard(game)).toEqual("08S");
});

test('getCard should return undefined', () => {
	// start the game and do getCard
	// Arrange
	dependencies.deck = () => [
		'08S', '05C', '03S'
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.getCard(game)).toEqual(undefined);
});

// guess21OrUnder
test('guess21OrUnder should draw the next card', () => {
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S', '10H',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guess21OrUnder(game);
	// Assert
	expect(game.state.cards.length).toEqual(3);
	expect(game.state.cards[2]).toEqual('01D');
});

// guessOver21
test('guessOver21 should draw next card and set player card as that card', () => {
	// Arrange
	dependencies.deck = () => [
		'05C', '01D', '09S', '10H',
	];
	// Inject our dependencies
	let game = lucky21Constructor(context);
	// Act
	game.guessOver21(game);
	// Assert
	expect(game.state.cards.length).toEqual(2);
	expect(game.state.card).toEqual('01D');
});