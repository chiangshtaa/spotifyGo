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
import TimePiece from './helpers/timePiece.js';

import MapView from 'react-native-maps';
import haversine from 'haversine';

const SpotifyAuth = NativeModules.SpotifyAuth;

const checkpoints = [
    {
      latlng: {
        latitude: 37.33177,
        longitude: -122.03078
      },
      title: 'checkpoint 1'
    },
    {
      latlng: {
        latitude: 37.331092,
        longitude: -122.030757
      },
      title: 'checkpoint 2'
    },
    {
      latlng: {
        latitude: 37.330691,
        longitude: -122.030618
      },
      title: 'checkpoint 3'
    },
    {
      latlng: {
        latitude: 37.330637,
        longitude:  -122.029786
      },
      title: 'checkpoint 4'
    },
    {
      latlng: {
        latitude: 37.330537,
        longitude: -122.028886
      },
      title: 'checkpoint 5'
    }
  ]

const songList = ["spotify:track:2RttW7RAu5nOAfq6YFvApB","spotify:track:756CJtQRFSxEx9jV4P9hpA","spotify:track:7J9mBHG4J2eIfDAv5BehKA", "spotify:track:58s6EuEYJdlb0kO7awm3Vp", "spotify:track:2RttW7RAu5nOAfq6YFvApB", "spotify:track:1dNIEtp7AY3oDAKCGg2XkH"];



export default class Go extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: checkpoints,
      currentCheckpoint: 0,
      currentPlaylist: ['spotify:track:72Q0FQQo32KJloivv5xge2'],
      masterPlaylist: songList,
      currentSong: ''
    };
  }

  componentDidMount() {
    let watchID = setInterval(() => {
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
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
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
          <View style={styles.text}>
            <Text>
              currentTrackURI: {JSON.stringify(this.state.currentSong)}
            </Text>
          </View>
      </View>

    );
  }
}

const handleTimerComplete = () => alert("custom completion function");

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  map: {
    flex: 12,
    backgroundColor: 'blue'
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    color: 'black',
    borderColor: 'black',
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },

});

AppRegistry.registerComponent('spotifyGo', () => go);
