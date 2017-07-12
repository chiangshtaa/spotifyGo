import React, { Component } from 'react';
import { View, Image } from 'react-native';
// import { ListItem, Card } from 'react-native-elements';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class PlaylistEntry extends Component {
  // setNativeProps = (nativeProps) => {
  //   this._root.setNativeProps(nativeProps);
  // }

  render() {
    return (
        <Content>
          {
            this.props.songs.map((song, index) => {
              return (
                <Container>
                  <Thumbnail square source={{uri: song.image}} />
                  <Title style={{fontWeight: 'bold'}}>song.name</Title>
                  <Title>song.artist</Title>
                </Container>
              )
            })
          }
        </Content>
    )
  };
}

