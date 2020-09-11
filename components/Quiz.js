import React, { Component } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button, Card, Text } from 'react-native-elements'

import Flashcard from './Flashcard'
import { deleteNotification, createNotification } from '../utils/misc'

class Quiz extends Component {
  state = { 
    nextQ: 0, 
    showQ: true,
    numCorrect: 0, 
  }

  // Turn the card over by toggling the state
  handleTurn = () => {
    this.setState(prevState => {
      return { showQ: ! prevState.showQ }
    })
  }

  // Check the answer
  handleAns = ({ correct }) => {
    // Stop today's notification and setup tomorrow's
    deleteNotification()
    createNotification()
      
    // Add to number of correct answers
    if (correct === true) {
      this.setState(prevState => {
        return { numCorrect: prevState.numCorrect + 1 }
      })
    }

    // Go to next question
    this.setState(prevState => {
      return {
        nextQ: prevState.nextQ + 1,
        showQ: true
      }
    })
  }

  render() {
    const { deck, navigation } = this.props
    const { nextQ } = this.state

    // No cards yet
    if (deck.questions.length === 0) {
      return (
        <View style={styles.view}>
          <Text h3>
            No cards available yet.  Please add some first.  Thanks.
          </Text>
        </View>
      )
    }

    // End of quiz, show results
    if (this.state.nextQ === deck.questions.length) {
      let accuracy = 0
      if (deck.questions.length !== 0) {
        accuracy = Math.round((this.state.numCorrect / deck.questions.length) * 100) 
      }

      return (
        <ScrollView style={styles.view}>
          <Text h3>Quiz results for {deck.title}</Text>
          <Card>
            <Text h3>{accuracy}% accuracy</Text>
          </Card>
          <View style={styles.view}>
            <Button
              onPress={() => {
                this.setState({ numCorrect: 0, nextQ: 0 })
              }}
              title='Try Again'
              buttonStyle={styles.buttonTry}
            />
          </View>
        </ScrollView>
      )    
    }

    // Show in progress quiz
    return (
      <ScrollView style={styles.view}>
        <Text h3>Quiz for {deck.title}</Text>
        <Text h3>
          Question {nextQ + 1}/{deck.questions.length}
        </Text>
        <Card>
          <Flashcard
            card={deck.questions[nextQ]}
            showQ={this.state.showQ}
            handleTurn={this.handleTurn}
          />
        </Card>
        <View style={{...styles.view, flexDirection: 'row'}}>
          <Button
            onPress={() => {
              this.handleAns({ correct: true })
            }}
            title='Correct'
            buttonStyle={styles.buttonCorrect}
          />
          <Button
            onPress={() => {
              this.handleAns({ correct: false })
            }}
            title='Incorrect'
            buttonStyle={styles.buttonIncorrect}
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

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTry: {
    width: 300,
    backgroundColor: 'green'
  },
  buttonCorrect: {
    backgroundColor: 'green',
    width: 150
  },
  buttonIncorrect: {
    backgroundColor: 'red',
    width: 150,
    marginLeft: 40
  }
})