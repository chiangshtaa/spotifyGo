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
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


export default class TimePiece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      totalDuration: 90000,
      stopwatchReset: false
    };

    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false}, () => {
      // if (this.state.stopwatchStart) {
      //   SpotifyAuth.playURIs(this.state.masterPlaylist, {trackIndex :0, startTime:0},(error)=>{console.log('error',error)});
    });
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }

  getFormattedTime(time) {
      this.currentTime = time;
  };

  render() {
    return (
      <View style={styles.stopwatch}>
        <Stopwatch laps msecs start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime}
        />
        <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 20, flexDirection: 'row'}}>
          <TouchableHighlight onPress={this.toggleStopwatch}>
            <Text style={{padding: 10, fontWeight: 'bold', fontSize: 20}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetStopwatch}>
            <Text style={{padding: 10, fontWeight: 'bold', fontSize: 20}}>Reset</Text>
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
  stopwatch: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    // margin: 20
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }

});

AppRegistry.registerComponent('spotifyGo', () => TimePiece);
