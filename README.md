# mobile-flashcards

This React native project provides a way to study for exams using decks of flashcards.

## Files
The following files have been modified or added to the starter project. All are needed to run the app: 
  actions/index.js: Actions for the various parts of the state 
  components/: The various components used 
    AddCard.js:  Used to add a card to a deck
    AddDeck.js:  Used to add another deck
    Deck.js:  Used to display/manage a single deck
    Decks.js:  Used on the main screen to show a listing of all decks
    Flashcard.js:  Used to show a single q&a card
    Quiz.js:  Used to give a quiz
  reducers/index.js:  Used to manage various changes to the state
  utils/:  Helpers
    misc.js:  Used to manage notifications and startup data
    storage.js:  Used to manage the async storage
  App.js: The main router page that direct the flow for the user 
  package.json:  All the npm dependencies required

## Installation
To run the app, load the project into http://snack.expo.io.  You can use your own device or the simulators they have.

## Testing
This project was tested using my own iPhone and the Android simulator.

## State

The application state is represented by:

decks:  A collection of decks each containing flashcards
  deck:  Each deck
    title:  The deck title
    questions:  A collection of flashcards