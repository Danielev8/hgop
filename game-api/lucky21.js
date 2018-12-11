module.exports = (context) => {
	let deckConstructor = context('deck');
	let deck = deckConstructor(context);

	let dealerConstructor = context('dealer');
	let dealer = dealerConstructor(context);

	dealer.shuffle(deck);
	let card0 = dealer.draw(deck);
	let card1 = dealer.draw(deck);
	let state = {
		deck: deck,
		dealer: dealer,
		cards: [
			card0,
			card1,
		],
		// The card that the player thinks will exceed 21.
		card: undefined,
	};
	return {
		state: state,
		// Is the game over (true or false).
		isGameOver: (game) => {
			if (game.state.card) {
				return true;
			}
			if (game.getCardsValue(game) >= 21) {
				return true;
			}
			return false;
		},
		// Has the player won (true or false).
		playerWon: (game) => {
			if (game.state.card && game.getTotal(game) > 21) {
				return true;
			}
			if (game.getCardsValue(game) === 21) {
				return true;
			}
			return false;
		},
		// The highest score the cards can yield without going over 21 (integer).
		getCardsValue: (game) => {
			let arrOfAces = [];
			let arrOfRest = [];

			for (let i = 0; i < game.state.cards.length; i++) {
				let value = parseCard(game.state.cards[i]);
				if (value === 1) {
					arrOfAces.push(1);
				} else if (value > 10) {
					arrOfRest.push(10);
				} else {
					arrOfRest.push(value);
				}
			}

			let maxValueOfAces = 0;
			if (arrOfAces.length > 0 && arrOfAces.length === 1) {
				maxValueOfAces = 11;
			} else if (arrOfAces.length > 1) {
				maxValueOfAces = 11 + arrOfAces.length - 1;
			}

			let sumOfRest = arrOfRest.reduce((sum, curr) => {
				return sum + curr;
			}, 0);

			if (sumOfRest + maxValueOfAces > 21) {
				return sumOfRest + arrOfAces.length;
			} else {
				return sumOfRest + maxValueOfAces;
			}
		},
		// The value of the card that should exceed 21 if it exists (integer or undefined).
		getCardValue: (game) => {
			let value = parseCard(game.state.card);
			if (value) {
				if (value === 1) {
					if (game.getCardsValue(game) > 10) {
						return 1;
					}
					return 11;
				} else if (value > 10) {
					return 10;
				}
			}
			return value;
		},

		// The cards value + the card value if it exits (integer).
		getTotal: (game) => {
			if (game.state.card) {
				return game.getCardsValue(game) + game.getCardValue(game);
			}
			return game.getCardsValue(game);
		},
		// The player's cards (array of strings).
		getCards: (game) => {
			return game.state.cards;
		},
		// The player's card (string or undefined).
		getCard: (game) => {
			return game.state.card;
		},
		// Player action (void).
		guess21OrUnder: (game) => {
			game.state.cards = [...game.state.cards, dealer.draw(game.state.deck)];
		},
		// Player action (void).
		guessOver21: (game) => {
			game.state.card = dealer.draw(game.state.deck);
		},
		getState: (game) => {
			return {
				cards: game.state.cards,
				cardsValue: game.getCardsValue(game),
				card: game.state.card,
				cardValue: game.getCardValue(game),
				total: game.getTotal(game),
				gameOver: game.isGameOver(game),
				playerWon: game.playerWon(game),
			};
		}
	};
};

parseCard = (card) => {
	if (card) {
		return parseInt(card);
	}
	return card;
};