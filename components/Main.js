import React, { Component } from 'react'
import Constants from 'expo-constants';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators'

// Components
import DirectoryComponent from './DirectoryComponent'
import CampsiteInfo from './CampsiteInfoComponent';
import HomeComponent from './HomeComponent'
import About from './AboutComponent'
import ContactUs from './ContactUsComponent'

const mapDispatchToProps = {
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  fetchPartners
}

const DirectoryNavigator = createStackNavigator(
  {
    Directory: { 
      screen: DirectoryComponent, 
      navigationOptions: ({navigation}) => ({
      headerLeft: <Icon
        name='list'
        type='font-awesome'
        iconStyle={styles.stackIcon}
        onPress={() => navigation.toggleDrawer}
      /> 
    }) 
  },
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
    Home: { screen: HomeComponent },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
       headerLeft: <Icon
          name='home'
          type='font-awesome'
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
    })
  }
)

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
      defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
)

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: ContactUs },
  },
  {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
)

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    Home: { 
      screen: HomeNavigator,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon
            name='home'
            type='font-awesome'
            size={24}
            color={tintColor}
            />
        )
      }
     },
    Directory: { 
      screen: DirectoryNavigator,
      navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
    },
    About: { 
      screen: AboutNavigator,
      navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
    },
    Contact: { 
      screen: ContactNavigator,
      navigationOptions: {
      drawerLabel: 'Contact Us',
        drawerIcon: ({tintColor}) => (
            <Icon
                 name='address-card'
                 type='font-awesome'
                 size={24}
                 color={tintColor}
                  />
                )
            }
        }
  },
  {
    drawerBackgroundColor: '#CEC8FF'
  }
)

const styles = StyleSheet.create({
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24
  }
})

const AppNavigator = createAppContainer(MainNavigator)
// always wrap top level navigatory with 'createAppContainer'

class Main extends Component {

  componentDidMount() {
    this.props.fetchCampsites()
    this.props.fetchComments()
    this.props.fetchPromotions()
    this.props.fetchPartners()
  }
  
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

export default connect(null, mapDispatchToProps)(Main)