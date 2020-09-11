import React, { Component } from 'react'
import { Alert, ScrollView, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Text, Button } from 'react-native-elements'

import { insertDeck } from '../utils/storage'
import { addDeck } from '../actions'

class AddDeck extends Component {
  state = { 
    deckTitle: '' 
  }

  // Update title
  onChange = d => {
    this.setState({ deckTitle: d })
  }

  // Add the deck
  handleAdd = () => {
    const { decks, dispatch } = this.props
    const { deckTitle } = this.state
    const { navigate } = this.props.navigation

    // Need a title
    if (! deckTitle) {
      Alert.alert(
        'Need deck title',
        'Please enter.  Thanks.',
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return
    }

    // Already have this deck
    if (decks[deckTitle]) {
      Alert.alert(
        'Duplicate deck',
        'Please choose another name.  Thanks.',
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return
    }

    // Construct empty deck
    const deck = {
      [deckTitle]: {
        title: deckTitle,
        questions: []
      }
    }

    // Insert in async storage and redux
    insertDeck(deck).then(
      dispatch(addDeck(deck)))

    this.setState({ deckTitle: '' })

    // Head to the new deck
    navigate('Deck', {deckTitle: deckTitle })
  }

  render() {
    return (
        <ScrollView behavior='padding' style={styles.view}>
          <Text h4 style={styles.title}>
            Please name your new deck
          </Text>
          <TextInput style={styles.input}
            placeholder='New deck'
            value={this.state.deckTitle}
            onChangeText={this.onChange}
          />
          <Button
            onPress={this.handleAdd}
            title='Add'
            buttonStyle={styles.button}
          />
        </ScrollView>
    )
  }
}

const mapStateToProps = decks => {
  return { decks }
}

export default connect(mapStateToProps)(AddDeck)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 40,
    backgroundColor: 'lightslategrey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 300,
    backgroundColor: 'green'
  },
  input: {
    backgroundColor:'white' , 
    height:40, 
    width:300, 
    marginBottom:40, 
    fontSize: '24px'
  },
  title: { 
    marginTop: 20, 
    marginBottom: 20, 
    color:'white' }
})