import React, { Component } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, TextInput, View, StyleSheet } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { connect } from 'react-redux'

import { insertCard } from '../utils/storage'
import { addCard } from '../actions'

class AddCard extends Component {
  state = { 
    question: '', 
    answer: '' 
  }

  onChangeQ = q => {
    this.setState({ question: q })
  }

  onChangeA = a => {
    this.setState({ answer: a })
  }

  // Add a card
  handleAdd = () => {
    const { dispatch, navigation } = this.props
    const { question, answer } = this.state
    const deckTitle = navigation.getParam('deckTitle', 'undefined')

    // Make sure there's both a question and answer
    if (! question || ! answer) {
      Alert.alert(
        'Need both question and answer',
        'Please enter both, thanks.',
        [{ text: 'Got it' }],
        { cancelable: false }
      )
      return
    }

    const newCard = { question, answer }

    // Insert into async storage and redux
    insertCard(newCard, deckTitle).then(
      dispatch(addCard(newCard, deckTitle)))

    // Head back to the deck
    navigation.goBack()
  }

  render() {
    const { navigation } = this.props
    const deckTitle = navigation.getParam('deckTitle', 'undefined')

    return (
      <ScrollView style={styles.view}>
        <KeyboardAvoidingView behavior='padding'>
          <Text h4>
            Add card to {deckTitle}
          </Text>
          <Input
            onChangeText={this.onChangeQ}
            placeholder='Please enter question'
            multiline={true}
            inputStyle={styles.question}
          />
          <Input
            onChangeText={this.onChangeA}
            placeholder='Please enter answer'
            multiline={true}
            inputStyle={styles.answer}
          />
          <View style={styles.view}>
            <Button
              onPress={this.handleAdd}
              title='Add'
              buttonStyle={styles.button}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

export default connect()(AddCard)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 300,
    backgroundColor: 'green',
  },
  question: {
    height: 50,
    textAlignVertical: 'top',
    marginTop: 20
  },
  answer: {
    height: 100,
    textAlignVertical: 'top',
    marginTop: 20
  }
})
