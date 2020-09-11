import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text, Card } from 'react-native-elements'

import { getDecks, saveDecks } from '../utils/storage'
import { setDecks } from '../actions'
import { loadInitialData } from '../utils/misc'

class Decks extends Component {
  // Load some data to start, if necessary
  async componentDidMount() {
    const { dispatch } = this.props

    // Get decks from async storage
    let decks = await getDecks()

    // If there are no decks, load the starter decks
    if (decks === null) {
      await saveDecks(loadInitialData())
      decks = await getDecks()
    }
    
    // Update redux
    dispatch(setDecks(decks))
  }

  // Head over to the deck selected
  handleOnPress = deckTitle => {
    const { navigate } = this.props.navigation
    navigate('Deck', { deckTitle })
  }

  render() {
    const { decks } = this.props

    // Make sure we have some decks
    if (! decks) {
      return (
        <View>
          <Text>In flux...</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.view}>
        {Object.keys(decks).map(deckTitle => {
          const deck = decks[deckTitle]

          return (
            <TouchableOpacity
              key={deckTitle}
              onPress={() => this.handleOnPress(deckTitle)}
            >
              <Card containerStyle={styles.card}>
                <Text h3>{deckTitle}</Text>
                <Text>{deck.questions.length} card(s)</Text>
              </Card>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

const mapStateToProps = decks => {
  return { decks }
}

export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor:'lightslategrey'
  },
  card: {
    backgroundColor:'khaki',
  }
})