import React, { Component } from 'react';
import {
  StyleSheet,
  NativeModules,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Image
} from 'react-native';
import { Container, Title, Content, Button } from 'native-base';
import axios from 'axios';
import Go from './go.js';
import PlaylistEntry from './playlistEntry.js';
import Swiper from 'react-native-swiper';
import { StackNavigation } from 'react-navigation';
const Promise = require('bluebird');

export default class playlistSelect extends Component {
  static navigationOptions = {
    title: 'Select A Playlist',
  }

  constructor(props) {
    super(props);
    this.state = {
      tracks: []
      // selectedPlaylist: null
    }
    this.fetchPlaylist = this.fetchPlaylist.bind(this);
  }

  componentDidMount() {
    this.fetchPlaylist();
  }

  // componentWillUnmount() {
  //   this.fetchPlaylist();
  // }

  fetchPlaylist() {
    const { params } = this.props.navigation.state;
    let that = this;
    let options = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: 'Bearer ' + params.token
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
                artist: tracks.track.artist,
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

  // _handleBackPress() {
  //   this.props.navigator.pop();
  // }

  // _handleNextPress(nextRoute) {
  //   this.props.navigator.push(nextRoute);
  // }

  _handleSelect(track) {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    let songs = track.songs.map(song => {
      return song.uri;
    });
    navigate('Go', { songs: songs,
                     username: params.username,
                     course: params.course,
                     courseName: params.courseName});
    // this.setState({
    //   next: {
    //     component: Go,
    //     title: 'Start Running',
    //     passProps: {
    //       myProp: this.props.myProp,
    //       course: this.props.course,
    //       selectedPlaylist: selected,
    //       username: this.props.username
    //     }
    //   }
    // },()=> {
    //   this._handleNextPress(this.state.next);
    // });
  }

  render() {
    return(
      <ScrollView style={{backgroundColor: 'black'}}>
        {
          this.state.tracks.map((track, index) => {
            return (
              <Content key={index}>
                <Title style={{fontWeight: 'bold', fontSize: 16, padding: 10, color: 'white'}}>
                    {track.name}
                </Title>
                <ScrollView horizontal={true} key={index}>
                  {
                    track.songs.map((song, index) => {
                      return (
                        <View key={index} style={{ marginLeft: 15 }} >
                          <Image source={{uri: song.image}} style={{height: 160, width: 160, alignSelf: 'center' }}/>
                          <Title style={{fontWeight: 'bold', fontSize: 12, color: 'white'}}>{song.name}</Title>
                        </View>
                      )
                    })
                  }
                </ScrollView>
                <TouchableHighlight style={{alignSelf: 'center', marginBottom: 15}} onPress={() => {this._handleSelect(track)}}>
                  <Text style={{fontWeight: 'bold', color: 'grey', margin: 10}}>Select Playlist</Text>
                </TouchableHighlight>
              </Content>
            )
          })
        }
      </ScrollView>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 250,
//     height: 45,
//     borderRadius: 64
//   },
//   image: {
//     width: 250,
//     height: 50
//   },
//   normalText: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     marginTop: 100,
//     color: 'white',
//     backgroundColor: 'red'
//   },
//   btnText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     margin: 10,
//     color: 'white'
//   },
//   actionButtonIcon: {
//     fontSize: 20,
//     height: 22,
//     color: 'white',
//   }
// });
