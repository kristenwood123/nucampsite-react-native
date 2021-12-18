import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

function RenderCampsite({campsite}) {
  if(campsite){
    return (
      <Card>
      <Card.Title>{item.name}</Card.Title>
        {/* <Card.Image source={require('./images/react-lake.jpg')}></Card.Image> */}
        <Text style={{margin: 10}}>
          {campsite.description}
        </Text>
      </Card>
    )
  }
  return <View/>
}

class CampsiteInfoComponent extends Component {

  constructor(props) {
    super(props)
      this.state = {
        campsites: CAMPSITES
      }
  }

  static navigationOptions = {
    title: 'Campsite Information'
  }

  render() {
    const campsiteId = this.props.navigation.getParam('campsiteId')
    const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0]
    return <RenderCampsite campsite={campsite} />
  }  
}

export default CampsiteInfoComponent