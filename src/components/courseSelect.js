import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  NativeModules,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native';
import PlaylistSelect from './playlistSelect.js';
import ImageSlider from 'react-native-image-slider';

import Swiper from 'react-native-swiper';

var courses = require('../Coordinates/mapData.js');

export default class courseSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        {key: require('../../assets/AppleCampus.png'), selected: false, coordinates: courses.easy, description: {level: 'Easy', length: 0.57, run: 'Fruit Loop Run'}},
        {key: require('../../assets/HackReactor.png'), selected: false, coordinates: courses.medium, description: {level: 'Medium', length:2.89, run: 'Hack Reactor Sprint'}},
        {key: require('../../assets/Sunset.png'), selected: false, coordinates: courses.difficult, description: {level: 'Difficult', length: 8.01, run: 'Sunset Challenge'}}
      ],
      selected: null,
      choice: null,
      next: {
        component: PlaylistSelect,
        title: 'Select Playlist',
        // passProps: { myProp: 'bar' }
      }
    }
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  _handleSelect(index) {
    if (this.state.selected !== null) {
      this.state.images[this.state.selected].selected = false;
    }
    this.state.images[index].selected = true;
    let level = this.state.images[index].coordinates;
    this.setState({
      images: this.state.images,
      selected: index,
      choice: level
    }, () => console.log('this.state' , this.state))

    this.props.navigator.push(this.state.next);
  }

  render() {
    return (
      <View style={{flex: 1, marginBottom: 50}}>
      <Swiper showsButtons={true}>
        {this.state.images.map((image, index) => {
          return (
            <View >
              <TouchableHighlight onPress={() => this._handleSelect(index)}>
                <Image source={image.key} key={index} style={image.selected ? styles.border : {borderRadius: 10, marginTop: 250, alignSelf: 'center'}} />
              </TouchableHighlight>
              <Text style={{marginTop: 10, alignSelf: 'center'}}>
                {`${image.description.run}`}
              </Text>
              <Text style={{alignSelf: 'center'}}>
                {`Difficulty: ${image.description.level}`}
              </Text>
              <Text style={{alignSelf: 'center'}}>
                {`Length: ${image.description.length} miles`}
              </Text>
              <Text style={{backgroundColor: 'red', color: 'white', alignSelf: 'center', marginTop: 20}}>
                Select a route!
              </Text>
            </View>
            )
        })}
      </Swiper>
        <Text style={styles.normalText}>
          Select a route!
        </Text>
{/*        <View >
          <Image source={require('../../assets/HackReactor.png')} style={{marginTop: 250, alignSelf: 'center'}}/>
        </View>
        <View >
          <Image source={require('../../assets/AppleCampus.png')} style={{marginTop: 250, alignSelf: 'center'}} />
        </View>
        <View >
          <Image source={require('../../assets/Sunset.png')} style={{marginTop: 250, alignSelf: 'center'}}/>
        </View>*/}
      {/*<ScrollView >
              {this.state.images.map((image, index) => {
                return (
                  <View>
                    <TouchableHighlight onPress={() => this._handleSelect(index)}>
                      <Image key={index} style={image.selected ? styles.border : {borderRadius: 10, marginTop: 50, alignSelf: 'center'}} source={image.key}/>
                    </TouchableHighlight>
                    <Text style={{marginTop: 10, alignSelf: 'center'}}>
                      {`${image.description.run}`}
                    </Text>
                    <Text style={{alignSelf: 'center'}}>
                      {`Difficulty: ${image.description.level}`}
                    </Text>
                    <Text style={{alignSelf: 'center'}}>
                      {`Length: ${image.description.length} miles`}
                    </Text>
                  </View>)
              })}
            </ScrollView>*/}
{/*      <TouchableHighlight onPress={() => this._handleNextPress(nextRoute)}>
        <Text style={styles.normalText}>
          Select a route!
        </Text>
      </TouchableHighlight>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 45,
    borderRadius: 64
  },
  image: {
    width: 250,
    height: 50
  },
  normalText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    backgroundColor: 'red'
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  border: {
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 10,
    marginTop: 250, 
    alignSelf: 'center'
  }

});

AppRegistry.registerComponent('spotifyGo', () => courseSelect);
