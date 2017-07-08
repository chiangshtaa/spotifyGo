import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Card } from 'react-native-elements';

export default class PlaylistEntry extends Component {
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View style={{marginLeft: 7, marginRight: 7}} ref={component => this._root = component} {...this.props}>
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
