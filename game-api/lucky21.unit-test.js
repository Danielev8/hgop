const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

// test game initation
test('a new game should have 50 cards left in the deck', () => {
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  let game = lucky21Constructor(deck, dealer);
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  let game = lucky21Constructor(deck, dealer);
  expect(game.state.cards.length).toEqual(2);
});

// isGameOver
test('isGameOver should return true', () => {
  // guessUnder and getCardsValue > 21
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '10D', '09S'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
});

test('isGameOver should return true', () => {
  // guessOver
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guessOver21(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
});

test('isGameOver should return true', () => {
  // guessUnder and getCardsValue = 21
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '10D', '06S',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toEqual(true);
});

test('isGameOver should return false', () => {
  // guessUnder and getCardsValue < 21
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.isGameOver(game)).toBe(false);
});

////////////////////////////////////////////////////////////////////////////
// playerWon
test('playerWon should return true', () => {
  // isGameOver = true and getCardsValue = 21 and getTotal = 21
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '06H',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);

  // Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('playerWon should return true', () => {
  // isGameOver = true and getCardsValue < 21 and getTotal > 21
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guessOver21(game);

  // Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('playerWon should return true', () => {
  // isGameOver = true and getCardsValue < 21 and getTotal = 21
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '06H',
  ]
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);

  // Assert
  expect(game.playerWon(game)).toEqual(true);
});

test('playerWon should return false', () => {
  // isGameOver = true and getCardsValue < 21 and getTotal = 21
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '06H',
  ]
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guessOver21(game);

  // Assert
  expect(game.playerWon(game)).toEqual(false);
});

test('playerWon should return false', () => {
  // isGameOver = true and getCardsValue < 21 and getTotal < 21
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '03H',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guessOver21(game);

  // Assert
  expect(game.playerWon(game)).toEqual(false);
});

////////////////////////////////////////////////////////////////////////////
// getCardsValue
test('getCardsValue should return 25', () => {
  // create deck of ["05H", "07D", "13S", "03C"]
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05H', '07D', '13S', '03C'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCardsValue(game)).toEqual(25);
});

test('getCardsValue should return 15', () => {
  // create deck and get values from ["01S", "04D"]
  // Arrange
  let deck = deckConstructor();
  deck = [
    '01S', '04D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.getCardsValue(game)).toEqual(15);
});

test('getCardsValue should return 13', () => {
  // create deck of ['01C', '01H']
  // Arrange
  let deck = deckConstructor();
  deck = [
    '01C', '01D', '01S', '01H'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guessOver21(game);

  // Assert
  expect(game.getCardsValue(game)).toEqual(13);
})

test('getCardsValue should return 28', () => {
  // create deck and get values from ["01C", "08D", "06S", "13S"]
  // Arrange
  let deck = deckConstructor();
  deck = [
    '01C', '08D', '09S', '13S'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCardsValue(game)).toEqual(28);
});

test('getCardsValue should return 23', () => {
  // create deck and get values from ["08S", "05C", "01D", "02H", "07S"]
  // Arrange
  let deck = deckConstructor();
  deck = [
    '08S', '05C', '01D', '02H', '07S'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

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
  let deck = deckConstructor();
  deck = [
    '05H', '04D', '01S', '03C'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guessOver21(game);

  // Assert
  expect(game.getCardsValue(game)).toEqual(18);
});

test('getCardsValue should return 13', () => {
  // create deck and get ["01C", "01S", "01D"]
  // Arrange
  let deck = deckConstructor();
  deck = [
    '01D', '01S', '01C'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCardsValue(game)).toEqual(13);
});

///////////////////////////////////////////////////////////////////////////////
// getCardValue
test('getCardValue should return 1', () => {
  // getCardsValue > 10 and guessOver21 and we get an ACE from that
  // Arrange
  let deck = deckConstructor();
  deck = [
    '01H', '03S', '04C', '04D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guessOver21(game);

  // Assert
  expect(game.getCardValue(game)).toEqual(1);
});

test('getCardValue should return 11', () => {
  // getCardsValue < 11 and guessOver21 and we get an ACE from that
  // Arrange
  let deck = deckConstructor();
  deck = [
    '01H', '03S', '04C', '03D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guessOver21(game);

  // Assert
  expect(game.getCardValue(game)).toEqual(11);
});

test('getCardValue should return undefined', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '03S', '04C', '04D', '01H'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);

  // Assert
  expect(game.getCardValue(game)).toEqual(undefined);
});

test('getCardValue should return undefined', () => {
  // start game guessUnder and call the function
  // Arrange
  let deck = deckConstructor();
  deck = [
    '03S', '04C', '04D', '01H'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.getCardValue(game)).toEqual(undefined);
});

test('getCardValue should return 7', () => {
  // start game guessUnder a few times and call the function (when 7 is coming)
  // Arrange
  let deck = deckConstructor();
  deck = [
    '03S', '04C', '04D', '07H'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  game.guessOver21(game);
  // Assert
  expect(game.getCardValue(game)).toEqual(7);
});
////////////////////////////////////////////////////////////////////////////////////
// getTotal
test('getTotal should return 16', () => {
  // guessUnder: 10, 3, 3 + undefined
  // Arrange
  let deck = deckConstructor();
  deck = [
    '12S', '03C', '03D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  // Assert
  expect(game.getTotal(game)).toEqual(16);
});

test('getTotal should return 21', () => {
  // guessUnder: 5, 5, A + undefined
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05S', '05C', '01D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  // Assert
  expect(game.getTotal(game)).toEqual(21);
});

test('getTotal should return 25', () => {
  // guessUnder: 10, 13, 5 + undefined
  // Arrange
  let deck = deckConstructor();
  deck = [
    '10S', '13C', '05D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  // Assert
  expect(game.getTotal(game)).toEqual(25);

});

test('getTotal should return 16', () => {
  // guessOver: 10, 3 + 3
  // Arrange
  let deck = deckConstructor();
  deck = [
    '12S', '03C', '03D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guessOver21(game);
  // Assert
  expect(game.getTotal(game)).toEqual(16);
});

test('getTotal should return 21', () => {
  // guessOver: 5, 5 + A
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05S', '05C', '01D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guessOver21(game);
  // Assert
  expect(game.getTotal(game)).toEqual(21);
});

test('getTotal should return 27', () => {
  // guessOver: 10, 5, 2 + 13
  // Arrange
  let deck = deckConstructor();
  deck = [
    '10S', '05C', '02D', '13D'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  game.guessOver21(game);
  // Assert
  expect(game.getTotal(game)).toEqual(27);
});

////////////////////////////////////////////////////////////////////////////////////
// getCards
test('getCards should return ["13S", "07D", "05H"]', () => {
  // create a deck with these cards and some more, and draw them 1 time
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05H', '07D', '13S'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  // Assert
  expect(game.getCards(game)).toEqual(["13S", "07D", "05H"]);
});

test('getCards should return ["04D", "01S"]', () => {
  // create a deck with these cards and should get these values right away
  // Arrange
  let deck = deckConstructor();
  deck = [
    '01S', '04D',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Assert
  expect(game.getCards(game)).toEqual(["04D", "01S"])
});

test('getCards should return ["13S", "06S", "08D", "01C"]', () => {
  // create a deck with these cards and draw 2 times
  // Arrange
  let deck = deckConstructor();
  deck = [
    '01C', '08D', '06S', '13S'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  // Assert
  expect(game.getCards(game)).toEqual(["13S", "06S", "08D", "01C"])
});

test('getCards should return ["07S", "01H", "10D", "05C", "08S"]', () => {
  // create a deck with these cards and draw 3 times
  // Arrange
  let deck = deckConstructor();
  deck = [
    '08S', '05C', '10D', '01H', '07S'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  game.guess21OrUnder(game);
  // Assert
  expect(game.getCards(game)).toEqual(["07S", "01H", "10D", "05C", "08S"])
});
/////////////////////////////////////////////////////////////////////////////////////
// getCard
test('getCard should return "08S"', () => {
  // start the game and guessOver right away (10H being the next card)
  // Arrange
  let deck = deckConstructor();
  deck = [
    '08S', '05C', '10H'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guessOver21(game);
  // Assert 
  expect(game.getCard(game)).toEqual("08S");
});

test('getCard should return undefined', () => {
  // start the game and do getCard
  // Arrange
  let deck = deckConstructor();
  deck = [
    '08S', '05C', '03S'
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  // Act
  game.guess21OrUnder(game);
  // Assert
  expect(game.getCard(game)).toEqual(undefined);
});

//////////////////////////////////////////////////////////////////////////////////////
// guess21OrUnder
test('guess21OrUnder should draw the next card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

// guessOver21
test('guessOver21 should draw next card and set player card as that card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };

  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);

  // Act
  game.guessOver21(game);

  // Assert
  expect(game.state.cards.length).toEqual(2);
  expect(game.state.card).toEqual('01D');
});