import { SET_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case SET_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK: {
      const { deckTitle } = action
      const { [deckTitle]: value, ...decks } = state
      return decks
    }
    case ADD_CARD:
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: [...state[action.deckTitle].questions, action.card]
        }
      }
    default:
      return state
  }
}

export default decks