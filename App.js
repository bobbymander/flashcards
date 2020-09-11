import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Platform, StatusBar, View, Text } from 'react-native'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import { Icon } from 'react-native-elements'

import Decks from './components/Decks'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import reducer from './reducers'
import { deleteNotification, createNotification } from './utils/misc'

const store = createStore(reducer)

const routes = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: (<Icon name='collections' type='material' iconStyle={{ color: 'white' }} />)
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: (<Icon name='add' type='material' iconStyle={{ color: 'white' }} />)
    }
  }
}

const tabNavProps = {
  navigationOptions: { header: null },
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveBackgroundColor: 'lightgrey',
    activeBackgroundColor: 'cadetblue',
    style: {
      backgroundColor: 'lightslategrey'
    }
  }
}

const stackNavProps = {
  headerStyle: {
    backgroundColor: 'lightslategrey'
  }
}

const MainNavigator = createStackNavigator({
  Home: {
    screen:
      Platform.OS === 'ios' ? createBottomTabNavigator(routes, tabNavProps) : 
        createMaterialTopTabNavigator(routes, tabNavProps)
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation, screenProps }) => ({
      ...stackNavProps,
      title: 'Deck',
      headerLeft: (
        <HeaderBackButton
          onPress={() => {navigation.navigate('Decks')}}
          tintColor='white'
        />
      )
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      ...stackNavProps,
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      ...stackNavProps,
      title: 'Quiz'
    }
  }
})

const AppContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  async componentDidMount() {
    // create a notification for the next day
    deleteNotification()
    createNotification()
  }

  render() {
    console.log(new Date())
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor:'lightslategrey', height: 50 }}>
            <StatusBar translucent barStyle='light-content' />
          </View>
            <AppContainer />
        </View>
      </Provider>
    )
  }
}          

