import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, Modal, StyleSheet} from 'react-native';
import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};

function RenderCampsite(props) {

  const { campsite } = props;

  if(campsite){
    return (
      <Card
        featuredTitle={campsite.name}
        image={{uri : baseUrl + campsite.image}}>
        <Text style={{margin: 10}}>
          {campsite.description}
        </Text>
        <View style={styles.cardRow}>
          <Icon
            name={props.favorite ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#FC9483'
            raised
            reverse
            onPress={() => props.favorite? console.log('Already set as  favorite') : props.markFavorite()}        
          />
          <Icon
          type='font-awesome'
          color='#5637DD'
          name='pencil'
          raised
          reverse
          onPress={() => props.onShowModal()}/>
        </View>
      </Card>
    )
  }
  return <View/>
}

function RenderComments({comments}) {

  const renderCommentItem = ({item}) => {
    return (
      <View style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.text}</Text>
        <Text style={{fontSize: 12}}>{item.rating}</Text>
        <Text style={{fontSize: 12}}>{`${item.author}, ${item.date}`}</Text>
      </View>
    )
  }
  return (
    <Card title='Comments'>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  )
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
       showModal: false,
       rating: 5, 
       author: '',
       text: ''
    }
  }
   toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(campsiteId) {
      console.log(JSON.stringify(this.state));
      this.toggleModal()
    }

    resetForm() {
      this.setState({
        showModal: false, 
        rating: 5,
        author: '',
        text: ''
      })
    }

    markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId)
  }  

  static navigationOptions = {
    title: 'Campsite Information'
  }

  render() {
    const campsiteId = this.props.navigation.getParam('campsiteId')
    const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0]
    const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId)

    return (
      <ScrollView>
        <RenderCampsite 
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
          onShowModal={() => this.toggleModal()} 
          />
        <RenderComments comments={comments} />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}>
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={rating => this.setState({rating})}
              style={{paddingVertical: 10}}
            />
            <Input
              placeholder='Author'
              leftIcon={{type: 'font-awesome', name: 'user-o'}}
              leftIconContainerStyle={{paddingRight: 10}}
              onChangeText={rating => this.setState({rating})}
              value={this.state.author}
              />
            <Input
              placeholder='Comment'
              leftIcon={{type: 'font-awesome', name: 'comment-o'}}
              leftIconContainerStyle={{paddingRight: 10}}
              onChangeText={rating => this.setState({rating})}
              value={this.state.text}
              />
            <View style={{margin: 10}}>
               <Button
               style={styles.button}
                onPress={() => this.toggleModal()}
                color='red'
                title='Submit'>
              </Button>
              <Button
              style={styles.button}
              onPress={() => this.resetForm()}
              color='#5637DD'
              title='Cancel'>
              </Button>
            </View>
          </View>
        </Modal>
      </ScrollView>
      )
  }  
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  button: {
    color: 'red'
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo)