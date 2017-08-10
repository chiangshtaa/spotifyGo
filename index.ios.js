import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  NativeModules,
  TouchableHighlight,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import courseSelect from './src/components/courseSelect.js';
import playlistSelect from './src/components/playlistSelect.js';
import Go from './src/components/go.js'


const config = require('./server/config.js');

const config = require('./server/config.js');


const SpotifyAuth = NativeModules.SpotifyAuth;

class LogIn extends React.Component {
  static navigationOptions = {
    title: 'Log In',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={
                    ()=>{
                      //Start Auth process
                      SpotifyAuth.setClientID(config.clientID, config.callback, ['streaming', 'playlist-read-private'],
                        (res) => {
                          if ('error' in res) {
                            console.log('error: ', res.error);
                          } else {
                            console.log('token: ', res.token);
                            navigate('courseSelect', { token: res.token,
                              username: res.username
                            })
                          }
                      });
                    }
                  }>
            <Image resizeMode ={'contain'}
             style={styles.image}
             source={require('./assets/login-button-mobile.png')}
            />
          </TouchableHighlight>
        </View>
    )
  }
}

const SpotifyGo = StackNavigator({
  Login: { screen: LogIn },
  courseSelect: { screen: courseSelect },
  playlistSelect: { screen: playlistSelect },
  Go: { screen: Go }
});

AppRegistry.registerComponent('spotifyGo', () => SpotifyGo);


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
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },

});

