import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NativeModules,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
import { Button } from 'native-base';
import TimePiece from './helpers/timePiece.js';
import { StackNavigation } from 'react-navigation';

import MapView from 'react-native-maps';
import haversine from 'haversine';

const SpotifyAuth = NativeModules.SpotifyAuth;

const songList = ["spotify:track:2RttW7RAu5nOAfq6YFvApB","spotify:track:756CJtQRFSxEx9jV4P9hpA","spotify:track:7J9mBHG4J2eIfDAv5BehKA", "spotify:track:58s6EuEYJdlb0kO7awm3Vp", "spotify:track:2RttW7RAu5nOAfq6YFvApB", "spotify:track:1dNIEtp7AY3oDAKCGg2XkH"];


export default class Go extends Component {
  static navigationOptions = {
    title: 'Start Running',
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      markers: params.course.checkpoints,
      currentCheckpoint: 0,
      masterPlaylist: params.songs,
      currentSong: '',
      saveRun: false
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
                    this.setState({
                      saveRun: true
                    })
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

  resetSaveState() {
    this.setState({
      saveRun: false
    })
  }

  render() {
    const { params } = this.props.navigation.state;
    console.log('go', this.props);
    return (
      <View style={styles.container}>
          <MapView style={styles.map}
            initialRegion={{
              latitude: params.course.initialRegion.latitude,
              longitude: params.course.initialRegion.longitude,
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

          <TimePiece course={this.props.course} username={this.props.username} saveRun={this.state.saveRun} resetSaveState={this.resetSaveState}/>

          <View style={styles.text}>
            <Button style={{paddingTop: 40}} transparent onPress={()=>{
              SpotifyAuth.isPlaying((res)=>{SpotifyAuth.setIsPlaying(!res, (err)=>{console.log(err)});});
            }
            }>
              <Image style={{width: 50, height: 50}}source={require('../../assets/playPause.png')}>
              </Image>
            </Button>
            <Button style={{paddingTop: 40}} transparent onPress={()=>{
              SpotifyAuth.skipNext((error)=>{console.log(error);});
            }
            }>
              <Image style={{width: 50, height: 50}}source={require('../../assets/nextTrack.png')}>
              </Image>
            </Button>
          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    flexDirection: 'column'
  },
  map: {
    flex: 12,
    backgroundColor: 'black'
  },
  text: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 0,
  },
  normalText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});

AppRegistry.registerComponent('spotifyGo', () => Go);
