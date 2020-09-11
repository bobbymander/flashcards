import { AsyncStorage } from 'react-native'
import { sampleData, FLASHCARD_STORAGE_KEY } from './_flashcards'

// load dummy data
export function loadInitialData() {
  return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(sampleData))
}

// get all data
export function getDecks () {
  return JSON.parse(AsyncStorage.getItem(FLASHCARD_STORAGE_KEY))
}

// get single deck
export function getDeck (id) {
  return getDecks().then((decks)  => {
    const data = JSON.parse(decks)
    return data[id]
  })
}

// add an empty deck
export function saveDeckTitle ({title}) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      'title': title,
      'questions': []}
  }))
}

// add a single card to a deck
export function addCardToDeck ({ title, card }) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: {card}
  }))
}

// remove a single deck
export function removeDeck (id) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[id] = undefined
      delete data[id]
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    })
}
