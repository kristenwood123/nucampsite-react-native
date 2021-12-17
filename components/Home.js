import React, { Component } from 'react';
import { View, Text } from 'react-native';


class Home extends Component {
  static navigationOptons = {
    title: 'Home'
  }
  render() {
    return (
      <View>
      <Text>Home Component</Text>  
      </View>
    );
  }
}
import { View, Text } from 'react-native'

export default Home;