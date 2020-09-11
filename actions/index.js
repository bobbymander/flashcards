export const SET_DECKS = "SET_DECKS"
export const ADD_DECK = "ADD_DECK"
export const DELETE_DECK = "DELETE_DECK"
export const ADD_CARD = "ADD_CARD"

export function setDecks(decks) {
  return {
    type: SET_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function deleteDeck(deckTitle) {
  return {
    type: DELETE_DECK,
    deckTitle
  }
}

export function addCard(card, deckTitle) {
  return {
    type: ADD_CARD,
    card,
    deckTitle
  }
}