const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

// isGameOver
test('isGameOver should return true', () => {
  // guessUnder and getCardsValue > 21
  expect().toEqual(true);
  
});

test('isGameOver should return true', () => {
  // guessOver
  expect().toEqual(true);
});

test('isGameOver should return true', () => {
  // guessUnder and getCardsValue = 21
  expect().toEqual(true);
});

test('isGameOver should return false', () => {
  // guessUnder and getCardsValue < 21
  expect().toEqual(false);
});
////////////////////////////////////////////////////////////////////////////
// playerWon
test('playerWon should return true', () => {
  // isGameOver = true and getCardsValue = 21 and getTotal = 21
  expect().toEqual(false);
});

test('playerWon should return true', () => {
  // isGameOver = true and getCardsValue < 21 and getTotal > 21
  expect().toEqual(true);
});

test('playerWon should return false', () => {
  // isGameOver = true and getCardsValue < 21 and getTotal = 21
  expect().toEqual(false);
});

test('playerWon should return false', () => {
  // isGameOver = true and getCardsValue < 21 and getTotal < 21
  expect().toEqual(false);
})

test('playerWon should return false', () => {
  // isGameOver = true and getCardsValue
  expect().toEqual(false);
});
////////////////////////////////////////////////////////////////////////////
// getCardsValue
test('getCardsValue should return 25', () => {
  // create deck and get ["05H", "07D", "13S"]
  expect().toEqual(25);
});

test('getCardsValue should return 15', () => {
  // create deck and get values from ["01S", "04D"]
  expect().toEqual(15);
});

test('getCardsValue should return 28', () => {
  // create deck and get values from ["01C", "08D", "06S", "13S"]
  expect().toEqual(28);
});

test('getCardsValue should return 23', () => {
  // create deck and get values from ["08S", "05C", "01D", "02H", "07S"]
  expect().toEqual(23);
});
///////////////////////////////////////////////////////////////////////////////
// getCardValue
test('getCardValue should return 1', () => {
  // getCardsValue > 10 and guessOver21 and we get an ACE from that
  expect().toEqual(1);
});

test('getCardValue should return 11', () => {
  // getCardsValue < 11 and guessOver21 and we get an ACE from that
  expect().toEqual(11);
});

test('getCardValue should return undefined', () => {
  // just start the game and call the function
  expect(1).toEqual(undefined);
});

test('getCardValue should return undefined', () => {
  // start game guessUnder and call the function
  expect(1).toEqual(undefined);
});

test('getCardValue should return 7', () => {
  // start game guessUnder a few times and call the function (when 7 is coming)
  expect().toEqual(7);
});
////////////////////////////////////////////////////////////////////////////////////
// getTotal
test('getTotal should return 16', () => {
  // guessUnder: 10, 3, 3 + undefined
  expect().toEqual(16);
});

test('getTotal should return 21', () => {
  // guessUnder: 5, 5, A + undefined
  expect().toEqual(21);
});

test('getTotal should return 25', () => {
  // guessUnder: 10, 13, 5 + undefined
  expect().toEqual(25);
});

test('getTotal should return 16', () => {
  // guessOver: 10, 3 + 3
  expect().toEqual(16);
});

test('getTotal should return 21', () => {
  // guessOver: 5, 5 + A
  expect().toEqual(21);
});

test('getTotal should return 25', () => {
  // guessOver: 10, 5 + 13
  expect().toEqual(25);
});

////////////////////////////////////////////////////////////////////////////////////
// getCards
test('getCards should return ["05H", "07D", "13S"]', () => {
  // create a deck with these cards and some more, and draw them 1 time
  expect().toEqual(["05H", "07D", "13S"]);
});

test('getCards should return ["01S", "04D"]', () => {
  // create a deck with these cards and should get these values right away
  expect().toEqual(["01S", "04D"])
});

test('getCards should return ["01C", "08D", "06S", "13S"]', () => {
  // create a deck with these cards and draw 2 times
  expect().toEqual(["01C", "08D", "06S", "13S"])
});

test('getCards should return ["08S", "05C", "10D", "01H", "07S"]', () => {
  // create a deck with these cards and draw 3 times
  expect().toEqual(["08S", "05C", "10D", "01H", "07S"])
});
/////////////////////////////////////////////////////////////////////////////////////
// getCard
test('getCard should return "10H"', () => {
  // start the game and guessOver right away (10H being the next card)
  expect().toEqual("10H");
});

test('getCard should return undefined', () => {
  // start the game and do getCard
  expect(1).toEqual(undefined);
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
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('09S');
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
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guessOver21(game);
  
  // Assert
  expect(game.state.cards.length).toEqual(2);
  expect(game.state.card).toEqual('09S');
});