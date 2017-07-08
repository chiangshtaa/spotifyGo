import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  Image,
  StyleSheet,
  NativeModules,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View,
  FlatList
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Go from './go.js';
import Swiper from 'react-native-swiper';

export default class PlaylistEntry extends Component {
  constructor(props) {
    super(props);
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  _handleSelect(index) {

  }

  render() {
    return (
      <View style={{marginLeft: 50, flexDirection: 'row'}}>
        {
          
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
    fontSize: 14,
    marginBottom: 18,
    marginTop: 18,
    textAlign: 'center',
    margin: 10
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },

});

AppRegistry.registerComponent('spotifyGo', () => playlistSelect);
