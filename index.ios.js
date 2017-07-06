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
import courseSelect from './src/components/courseSelect.js';


const SpotifyAuth = NativeModules.SpotifyAuth;

class logIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={
                  ()=>{
                    //Start Auth process
                    SpotifyAuth.setClientID('5ba49a1c5e344e2bb5ddc424e380fd49','spotify-go-login://callback',['streaming'],(error)=>{
                      if(!error){
                        this.props.navigator.replace({component: courseSelect, title: 'Courses '});
                      } else {
                        console.log('error:',error);
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
    );
  }
}

// class logInSuccess extends Component {

//   render() {

//     return (
//       <View style={styles.container}>
//         <Text style={styles.normalText}>
//           LogIn Success!
//         </Text>
//         <Text style={styles.normalText}>
//           Some music should be playing now!
//         </Text>
//         <TouchableHighlight style={styles.button} onPress={()=>{
//           SpotifyAuth.isPlaying((res)=>{SpotifyAuth.setIsPlaying(!res, (err)=>{console.log(err)});});
//         }
//         }>
//           <Text style={styles.btnText}>
//             Play/Pause
//           </Text>
//         </TouchableHighlight>
//       </View>
//       );

//   }
//   componentDidMount() {
//       SpotifyAuth.playURIs(["spotify:track:6HxIUB3fLRS8W3LfYPE8tP", "spotify:track:58s6EuEYJdlb0kO7awm3Vp"], {trackIndex :0, startTime:0},(error)=>{console.log('error',error)});
//   }
// }
//Used to navigate between other components
class spotifyModule extends Component {
  render(){
    return (
      <NavigatorIOS
        initialRoute={{
          component: logIn,
          title: 'Log In'
        }}
        style={{flex: 1}}
      />
    );
  }
}

// class spotifyGo extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.normalText}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.normalText}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.normalText}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>

//     );
//   }
// }

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

AppRegistry.registerComponent('spotifyGo', () => spotifyModule);
