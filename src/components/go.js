import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NativeModules,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import TimePiece from './helpers/timePiece.js';

import MapView from 'react-native-maps';
import haversine from 'haversine';

const SpotifyAuth = NativeModules.SpotifyAuth;

const songList = ["spotify:track:2RttW7RAu5nOAfq6YFvApB","spotify:track:756CJtQRFSxEx9jV4P9hpA","spotify:track:7J9mBHG4J2eIfDAv5BehKA", "spotify:track:58s6EuEYJdlb0kO7awm3Vp", "spotify:track:2RttW7RAu5nOAfq6YFvApB", "spotify:track:1dNIEtp7AY3oDAKCGg2XkH"];

export default class Go extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.myProp.checkpoints,
      currentCheckpoint: 0,
      currentPlaylist: ['spotify:track:72Q0FQQo32KJloivv5xge2'],
      masterPlaylist: songList,
      currentSong: ''
    };
  }

  componentDidMount() {
    watchID = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
           (pos) => {
              let curPosition = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
              }
              if (haversine(this.state.markers[this.state.currentCheckpoint].latlng, curPosition, {threshold: 15, unit: 'meter'})) {
                alert('checkpoint reached');

                this.setState({
                  currentSong: this.state.masterPlaylist[this.state.currentCheckpoint],
                  currentCheckpoint: this.state.currentCheckpoint === this.state.markers.length ? 0 : this.state.currentCheckpoint + 1
                }, () => {
                  SpotifyAuth.queueURI(this.state.currentSong,(error)=>{console.log(error);});
                  if (this.state.currentCheckpoint === this.state.markers.length) {
                    clearInterval(watchID);
                    alert('Nice job. You\'ve finished your run!');
                  }
                })
              }
           },
           (error) => alert(error.message),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }, 1000);
  }

  render() {
    console.log('go', this.props);
    return (
      <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: this.props.myProp.initialRegion.latitude,
              longitude: this.props.myProp.initialRegion.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {this.state.markers.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={marker.latlng}
                title={marker.title}
              />
            ))}
          </MapView>

          <TimePiece />

          <View style={styles.text}>
           <TouchableHighlight onPress={()=>{
              SpotifyAuth.skipPrevious((error)=>{console.log(error);});
            }
            }>
              <Text style={styles.normalText}>
                Back
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{
              SpotifyAuth.isPlaying((res)=>{SpotifyAuth.setIsPlaying(!res, (err)=>{console.log(err)});});
            }
            }>
              <Text style={styles.normalText}>
                Play/Pause
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{
              SpotifyAuth.skipNext((error)=>{console.log(error);});
            }
            }>
              <Text style={styles.normalText}>
                Forward
              </Text>
            </TouchableHighlight>
          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  map: {
    flex: 12,
    backgroundColor: 'blue'
  },
  text: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  normalText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  },
});

AppRegistry.registerComponent('spotifyGo', () => Go);
