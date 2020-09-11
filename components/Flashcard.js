import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements'

class Flashcard extends Component {
  // Show the question
  showQ(handleTurn) {
    const { card } = this.props
    return (
      <View>
        <Text h3>{card.question}</Text>
        <Button
          onPress={handleTurn}
          title='See Answer'
          buttonStyle={style.button}
        />
      </View>
    )
  }

  // Show the answer
  showA(handleTurn) {
    const { card } = this.props
    return (
      <View>
        <Text h3>{card.answer}</Text>
        <Button
          onPress={handleTurn}
          title='See Question'
          buttonStyle={style.button}
        />
      </View>
    )
  }

  render() {
    const { showQ, handleTurn } = this.props

    // Show the question or answer
    return showQ
      ? this.showQ(handleTurn)
      : this.showA(handleTurn)
  }
}

export default Flashcard

const style = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: 'darkcyan', 
  }
})