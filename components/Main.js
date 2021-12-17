import React, { Component } from 'react'
import Constants from 'expo-constants';
import { View, Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'

// Components
import Directory from './Directory'
import CampsiteInfo from './CampsiteInfo';
import Home from './Home'

const DirectoryNavigator = createStackNavigator(
  {
    Directory: { screen: Directory },
    CampsiteInfo: { screen: CampsiteInfo }
  },
  {
    initialRouteName: 'Directory',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
)
const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
)

const MainNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeNavigator },
    Directory: { screen: DirectoryNavigator }
  },
  {
    drawerBackgroundColor: '#CEC8FF'
  }
)

const AppNavigator = createAppContainer(MainNavigator)
// always wrap top level navigatory with 'createAppContainer'

class Main extends Component {
  render() {
    return (
       <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}>
          <AppNavigator />
      </View>
    )
  }
}

export default Main
