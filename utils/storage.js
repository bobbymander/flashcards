import { AsyncStorage } from "react-native"

const DECKS = "MobileFlashcards:Decks"

// Save all decks
export async function saveDecks(decks) {
  await AsyncStorage.setItem(DECKS, JSON.stringify(decks))
}

// Insert one deck
export async function insertDeck(deck) {
  await AsyncStorage.mergeItem(DECKS, JSON.stringify(deck))
}

// Insert one card into a deck
export async function insertCard(card, deckTitle) {
  const decks = await AsyncStorage.getItem(DECKS)
  const decksParsed = JSON.parse(decks)

  decksParsed[deckTitle] = {
    ...decksParsed[deckTitle],
    questions: [...decksParsed[deckTitle].questions, card]
  }
  await AsyncStorage.setItem(DECKS, JSON.stringify(decksParsed))
}

// Get all decks
export async function getDecks() {
  let decks = await AsyncStorage.getItem(DECKS)
  return JSON.parse(decks)
}

// Remove one deck
export async function removeDeck(deckTitle) {
  const decks = await AsyncStorage.getItem(DECKS)
  const decksParsed = JSON.parse(decks)
  delete decksParsed[deckTitle]
  await AsyncStorage.setItem(DECKS, JSON.stringify(decksParsed))
}

