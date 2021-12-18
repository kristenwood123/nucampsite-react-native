import React, { Component } from 'react'
import Constants from 'expo-constants';
import { View, Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'

// Components
import DirectoryComponent from './DirectoryComponent'
import CampsiteInfoComponent from './CampsiteInfoComponent';
import HomeComponent from './HomeComponent'
import AboutComponent from './AboutComponent'
import ContactUsComponent from './ContactUsComponent'

const DirectoryNavigator = createStackNavigator(
  {
    Directory: { screen: DirectoryComponent },
    CampsiteInfo: { screen: CampsiteInfoComponent }
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
    Home: { screen: HomeComponent },
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

const AboutNavigator = createStackNavigator(
  {
    About: { screen: AboutComponent },
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

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: ContactUsComponent },
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
    Directory: { screen: DirectoryNavigator },
    About: { screen: AboutNavigator },
    Contact: { screen: ContactNavigator }
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