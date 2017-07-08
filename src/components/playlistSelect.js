import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  NativeModules,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Go from './go.js';

export default class playlistSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: {
        component: Go,
        title: 'Start Running',
        passProps: {
          myProp: this.props.myProp,
          token: this.props.token
        }
      }
    }
  }
  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  render() {
    console.log('playlistSelect page token: ', this.props.token);
    return(
      <TouchableHighlight onPress={() => this._handleNextPress(this.state.next)}>
        <Text style={{marginTop: 200, alignSelf: 'center'}}>
          go to Go page!
        </Text>
      </TouchableHighlight>
    );
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
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
