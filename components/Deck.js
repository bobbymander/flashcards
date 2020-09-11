import React, { Component } from 'react'
import { Alert, ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button, Text, Card } from 'react-native-elements'

import { removeDeck } from '../utils/storage'
import { deleteDeck } from '../actions'

class Deck extends Component {
  // Head to add card screen
  handleAdd = () => {
    const { navigation } = this.props
    const deckTitle = navigation.getParam('deckTitle', 'undefined')
    navigation.navigate('AddCard', { deckTitle: deckTitle })
  }

  // Head to quiz screen
  handleQuiz = () => {
    const { navigation } = this.props
    const deckTitle = navigation.getParam('deckTitle', 'undefined')
    navigation.navigate('Quiz', { deckTitle: deckTitle })
  }

  // Delete a deck
  handleDelete = () => {
    const { deck, navigation } = this.props

    // Are you sure?
    Alert.alert(
      'Delete Deck',
      `Are you absolutely sure you want to delete ${deck.title}?`,
      [{ text: 'Cancel' },
        {
          text: 'Yes',
          onPress: () => {
            const { dispatch } = this.props
            removeDeck(deck.title).then(
              dispatch(deleteDeck(deck.title)))
            navigation.navigate('Decks')
          }
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    const { deck } = this.props

    // Make sure deck wasn't deleted
    if (! deck) {
      return (
        <View>
          <Text>In flux...</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <Card containerStyle={styles.card}>
          <Text h3>{deck.title}</Text>
          <Text>
            {deck.questions.length} card(s)
          </Text>
        </Card>
        <View style={styles.view}>
          <Button
            onPress={this.handleAdd}
            title='Add Card'
            buttonStyle={{
              ...styles.button,
              backgroundColor: 'blue'
            }}
          />
          <Button
            onPress={this.handleQuiz}
            title='Start Quiz'
            buttonStyle={{
              ...styles.button,
              backgroundColor: 'green'
            }}
          />
          <Button
            onPress={this.handleDelete}
            title='Delete Deck'
            buttonStyle={{
              ...styles.button,
              backgroundColor: 'red'
            }}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (decks, ownProps) => {
  const deckTitle = ownProps.navigation.getParam('deckTitle', 'undefined')
  const deck = decks[deckTitle]
  return { deck }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginBottom: 20,
    width: 300,
  },
  card: {
    backgroundColor:'khaki',
    justifyContent: 'center',
    alignItems: 'center'
  }
})