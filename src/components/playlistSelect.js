import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  NativeModules,
  NavigatorIOS,
  Text,
  Icon,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native';
import axios from 'axios';
import Go from './go.js';
import PlaylistEntry from './playlistEntry.js';
import Swiper from 'react-native-swiper';
const Promise = require('bluebird');

export default class playlistSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
      // selectedPlaylist: null
    }
    this.fetchPlaylist = this.fetchPlaylist.bind(this);
  }

  componentWillMount() {
    this.fetchPlaylist();
  }

  fetchPlaylist() {
    let that = this;
    let options = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: 'Bearer ' + that.props.token
      }
    };
    let result = [];
    axios(options)
      .then(response => {
        response.data.items.map(playlist => {
          let refactor = {
            id: playlist.owner.id,
            name: playlist.name,
            url: playlist.uri,
            songs: []
          };
          result.push(refactor);
        });
      })
      .then(() => {
        return Promise.map(result, (songs, i) => {
          let options2 = {
            headers: {
              Accept: 'application/json',
              Authorization: options.headers.Authorization
            }
          };
          return axios.get('https://api.spotify.com/v1/users/' + songs.id + '/playlists/' + songs.url.substr(-22) + '/tracks', options2).then(response => {
            response.data.items.map(tracks => {
              let refactor2 = {
                name: tracks.track.name,
                image: tracks.track.album.images[2].url,
                uri: tracks.track.uri
              }
              result[i].songs.push(refactor2);
            })
          }).catch(error => {
            console.log(error);
          })
        });
      })
      .then(() => {
        that.setState({
          tracks: result
        }, () => {
          console.log('this.state.tracks: ', this.state.tracks);
        });
      })
      .catch(error => {
        console.log('error from client: ', error);
      });
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  _handleSelect(index) {
    let selected = this.state.tracks[index].songs.map(song => {
      return song.uri;
    })
    this.setState({
      next: {
        component: Go,
        title: 'Start Running',
        passProps: {
          myProp: this.props.myProp,
          selectedPlaylist: selected
        }
      }
    },()=> {
      this._handleNextPress(this.state.next);
    });
  }

  render() {
    console.log('playlistSelect page token: ', this.props.token);
    return(
      <View style={{flex: 1, backgroundColor: '#dce8e6'}}>
        <Swiper showsButtons={true} style={{marginTop: 50}}>
          {
            this.state.tracks.map((track, index) => {
              return (
                <ScrollView key={index}>
                  <Text style={{alignSelf: 'center', fontSize: 20, marginBottom: 10}}>
                    {track.name}
                  </Text>
                  <TouchableHighlight key={index} onPress={() => this._handleSelect(index)}>
                    <PlaylistEntry songs={track.songs} />
                  </TouchableHighlight>
                </ScrollView>
              )
            })
          }
        </Swiper>
      </View>
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
    marginTop: 100,
    color: 'white',
    backgroundColor: 'red'
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});
