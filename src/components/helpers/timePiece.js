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

import formatTime from 'minutes-seconds-milliseconds';

// const Realm = require('realm');
// const db = require('../../../database/schema.js');

// let runLog = new Realm({
//      schema: [{name: 'Log', properties: {username: 'string', time: 'int', course: 'string'}}]
//    });

   // db.write(() => {
   //   db.create('RunLog', {username: '124909928', time: 55835293, course: 'sample'});
   // });


export default class TimePiece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElasped: null,
      timerRunning: false,
      startTime: null,
    };
    this.onStartPress = this.onStartPress.bind(this);
    this.onResetPress = this.onResetPress.bind(this);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextProps.saveRun === true) {
  //     db.write(() => {
  //       alert('in componentWillUpdate');
  //       db.create('RunLog', {username: this.props.username, time: this.state.timeElasped, course: this.props.course});
  //     })
  //   this.props.resetSaveState();
  //   }
  // }

  // pressing start/stop button
  onStartPress() {
    // check if clock is running, then stop
    if (this.state.timerRunning) {
      clearInterval(this.interval);
      this.setState({
        timerRunning: false,
      });
      return;
    }

    this.setState({
      startTime: new Date(),
    });

    this.interval = setInterval(() => {
      this.setState({
        timeElasped: new Date() - this.state.startTime,
        timerRunning: true,
      });
    }, 30);
  }

  // pressing restart button
  onResetPress() {
    // Reset timer
    if (!this.state.timerRunning) {
      this.setState({
        timeElasped: new Date(),
      });
      return;
    }


    this.setState({
      startTime: new Date(),
    });

    this.interval = setInterval(() => {
      this.setState({
        timeElasped: new Date() - this.state.startTime,
        timerRunning: true,
      });
    }, 30);
  }

  // create start/stop buttons
  startStopButton() {
    const style = this.state.timerRunning ? styles.stopButton : styles.startButton;
    // console.log('db: ' , db.objects('RunLog'));
    return (
      <TouchableHighlight
        onPress={this.onStartPress}
        underlayColor="#e6e6fa"
        style={[styles.button, style]}
      >
        <Text style={styles.buttonText}>
          {this.state.timerRunning ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    );
  }

  // create the reset button
  resetButton() {
    return (
      <TouchableHighlight
        onPress={this.onResetPress}
        underlayColor="#e6e6fa"
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Reset
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.time}>{formatTime(this.state.timeElasped)}</Text>
          </View>

          <View style={styles.buttonWrapper}>
            {this.startStopButton()}
            {this.resetButton()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
  },
  timerWrapper: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginTop: 5
  },
  time: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('spotifyGo', () => TimePiece);
