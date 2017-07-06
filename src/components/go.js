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
import MapView from 'react-native-maps';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
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
        latitude: 37.330691,
        longitude: -122.030618
      },
      title: 'checkpoint 5'
    }
  ]


export default class Go extends Component {

  // _handleBackPress() {
  //   this.props.navigator.pop();
  // }

  // _handleNextPress(nextRoute) {
  //   this.props.navigator.push(nextRoute);
  // }

  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      totalDuration: 90000,
      stopwatchReset: false,
      markers: checkpoints,
      currentCheckpoint: 1
    };

    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  componentDidMount() {
    SpotifyAuth.loggedIn((res)=>{alert(res);});
    SpotifyAuth.playURIs(["spotify:track:6HxIUB3fLRS8W3LfYPE8tP", "spotify:track:58s6EuEYJdlb0kO7awm3Vp"], {trackIndex :0, startTime:0},(error)=>{console.log('error',error)});
    let watchID = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
           (pos) => {
              let curPosition = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
              }
              if (haversine(checkpoints[this.state.currentCheckpoint].latlng, curPosition, {threshold: 15, unit: 'meter'})) {
                alert('checkpoint reached');
                this.setState({
                  currentCheckpoint: this.state.currentCheckpoint + 1
                })
              }
              if (this.state.currentCheckpoint === checkpoints.length) {
                navigator.geolocation.clearWatch(id);
              }
              //if inital position is the same as ending position cancel watchID
           },
           (error) => alert(error.message),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }, 1000);
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }

  getFormattedTime(time) {
      this.currentTime = time;
  };

  // saveTime(time) {
  //   console.log('time: ', time)
  // }

  render() {
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
          <View style={styles.stopwatch}>
            <Stopwatch laps msecs start={this.state.stopwatchStart}
              reset={this.state.stopwatchReset}
              options={options}
              getTime={this.getFormattedTime} />
            <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 20, flexDirection: 'row'}}>
              <TouchableHighlight onPress={this.toggleStopwatch}>
                <Text style={{padding: 10, fontWeight: 'bold', fontSize: 20}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.resetStopwatch}>
                <Text style={{padding: 10, fontWeight: 'bold', fontSize: 20}}>Reset</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.text}>
            <TouchableHighlight onPress={()=>{
              SpotifyAuth.isPlaying((res)=>{SpotifyAuth.setIsPlaying(!res, (err)=>{console.log(err)});});
            }
            }>
              <Text style={styles.normalText}>
                Play/Pause
              </Text>
            </TouchableHighlight>
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
  stopwatch: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // margin: 20
  },
  text: {
    flex: 2,
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

AppRegistry.registerComponent('spotifyGo', () => go);
