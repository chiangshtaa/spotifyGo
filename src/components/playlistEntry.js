import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Card } from 'react-native-elements';

export default class PlaylistEntry extends Component {
  render() {
    return (
      <View style={{marginLeft: 7, marginRight: 7}}>
        <Card containerStyle={{padding: 3}}>
          {
            this.props.songs.map((song, index) => {
              return (
                <ListItem
                    key={index}
                    roundAvatar
                    title={song.name}
                    avatar={{uri:song.image}} />
              )
            })
          }
        </Card>
      </View>
    );
  };
};
