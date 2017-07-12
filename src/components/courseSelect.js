import React, { Component } from 'react';
import { AppRegistry, Image, TouchableHighlight } from 'react-native';
import { Content, Title, Right, Container, View, DeckSwiper, Card, CardItem, Text, Left, Body, H2 } from 'native-base';
import { StackNavigator } from 'react-navigation';

const courses = require('../Coordinates/mapData.js');

export default class courseSelect extends Component {
  static navigationOptions = {
    title: 'Select A Course',
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [
        {key: require('../../assets/Sample.png'), selected: false, coordinates: courses.sample, description: {level: 'Sample', length: 760, run: 'Sample'}},
        {key: require('../../assets/AppleCampus.png'), selected: false, coordinates: courses.easy, description: {level: 'Easy', length: 0.57, run: 'Fruit Loop Run'}},
        {key: require('../../assets/HackReactor.png'), selected: false, coordinates: courses.medium, description: {level: 'Medium', length:2.89, run: 'Hack Reactor Sprint'}},
        {key: require('../../assets/Sunset.png'), selected: false, coordinates: courses.difficult, description: {level: 'Hard', length: 8.01, run: 'Sunset Challenge'}}
      ],
      selected: null
    }
  }

  _handleSelect(course) {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    // if (this.state.selected !== null) {
    //   this.state.images[this.state.selected].selected = false;
    // }
    // this.state.images[index].selected = true;
    let level = course.coordinates;
    let courseName = course.description.run;
    navigate('playlistSelect', { token: params.token,
                                 username: params.username,
                                 course: level,
                                 courseName: courseName});
    // let level = this.state.images[index].coordinates;
    // let courseName = this.state.images[index].description.level;
    // this.setState({
    //   images: this.state.images,
    //   selected: index,
    //   // choice: level,
    //   next: {
    //     component: PlaylistSelect,
    //     title: 'Select Playlist',
    //     passProps: {
    //       myProp: level,
    //       token: this.props.token,
    //       username: this.props.username,
    //       course: courseName
    //     }
    //   }
    // }, () => navigate('playlistSelect'));
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container style={{backgroundColor: 'black'}}>
          <View>
            <DeckSwiper
              dataSource={this.state.images}
              renderItem={course =>
                <Card >
                  <CardItem style={{backgroundColor: 'black'}}>
                    <Left>
                      <Body>
                        <Title style={{fontWeight: 'bold', color: 'white', fontSize: 25}}>{course.description.run}</Title>

                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                      <Image style={{ height: 300, flex: 1, alignSelf: 'center' }} source={course.key} style={course.selected ? {height: 300, flex: 1, borderColor: 'white', borderRadius: 10, borderWidth: 5,} : {height: 300, flex: 1}} />
                  </CardItem>
                  <CardItem style={{backgroundColor: 'black'}}>
                    <Left>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>{course.description.level}</Text>
                    </Left>
                    <Body>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>{course.description.length} miles</Text>
                    </Body>
                    <Right>
                      <TouchableHighlight onPress={() => {this._handleSelect(course)}}>
                        <Text style={{fontWeight: 'bold', color: 'grey'}}>Select Course</Text>
                      </TouchableHighlight>
                    </Right>


                  </CardItem>
                </Card>
              }
            />
        </View>
      </Container>
    );
  }
}




// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Image,
//   StyleSheet,
//   NativeModules,
//   NavigatorIOS,
//   Text,
//   TouchableHighlight,
//   View,
//   ScrollView,
//
// } from 'react-native';


// import PlaylistSelect from './playlistSelect.js';
// import ImageSlider from 'react-native-image-slider';

// import Swiper from 'react-native-swiper';

// const courses = require('../Coordinates/mapData.js');

// const SpotifyAuth = NativeModules.SpotifyAuth;

// // const db = require('../../database/schema.js');



// export default class courseSelect extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       images: [
//         {key: require('../../assets/Sample.png'), selected: false, coordinates: courses.sample, description: {level: 'Sample', length: 760, run: 'Sample'}},
//         {key: require('../../assets/AppleCampus.png'), selected: false, coordinates: courses.easy, description: {level: 'Easy', length: 0.57, run: 'Fruit Loop Run'}},
//         {key: require('../../assets/HackReactor.png'), selected: false, coordinates: courses.medium, description: {level: 'Medium', length:2.89, run: 'Hack Reactor Sprint'}},
//         {key: require('../../assets/Sunset.png'), selected: false, coordinates: courses.difficult, description: {level: 'Hard', length: 8.01, run: 'Sunset Challenge'}}
//       ],
//       selected: null
//     }
//   }

//   _handleBackPress() {
//     this.props.navigator.pop();
//   }

//   _handleNextPress(nextRoute) {
//     this.props.navigator.push(nextRoute);
//   }

//   _handleSelect(index) {
//     if (this.state.selected !== null) {
//       this.state.images[this.state.selected].selected = false;
//     }
//     this.state.images[index].selected = true;
//     let level = this.state.images[index].coordinates;
//     let courseName = this.state.images[index].description.level;
//     this.setState({
//       images: this.state.images,
//       selected: index,
//       // choice: level,
//       next: {
//         component: PlaylistSelect,
//         title: 'Select Playlist',
//         passProps: {
//           myProp: level,
//           token: this.props.token,
//           username: this.props.username,
//           course: courseName
//         }
//       }
//     }, () => this.props.navigator.push(this.state.next));
//   }

//   render() {
//     console.log('courseSelect username: ', this.props.username);
//     return (
//       <View style={{flex: 1, backgroundColor: '#dce8e6'}}>
//         <Text style={styles.normalText}>
//           Select a route!
//         </Text>
//         <Swiper showsButtons={true}>
//           {this.state.images.map((image, index) => {
//             return (
//               <View key={index} style={{flex: 1}}>
//                 <Text style={{marginBottom: 20, alignSelf: 'center', fontSize: 30, fontWeight: 'bold'}}>
//                   {`${image.description.run}`}
//                 </Text>
//                 <TouchableHighlight onPress={() => this._handleSelect(index)}>
//                   <Image source={image.key} key={index} style={image.selected ? styles.border : {height: 300, width: 400, borderRadius: 10, alignSelf: 'center'}} />
//                 </TouchableHighlight>
//                 <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 10}}>
//                   {`Difficulty: ${image.description.level}`}
//                 </Text>
//               </View>
//               )
//           })}
//         </Swiper>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: 'black'
//   },
// : {
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
//     fontFamily: 'Arial Rounded MT Bold',
//     fontSize: 40,
//     textAlign: 'center',
//     margin: 10,
//     marginLeft: 50,
//     marginRight: 50,
//     marginTop: 80,
//     marginBottom: 40
//   },
//   btnText: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     margin: 10,
//     color: 'white'
//   },
//   border: {
//     height: 290,
//     width: 390,
//     borderColor: 'green',
//     borderRadius: 10,
//     borderWidth: 10,
//     alignSelf: 'center'
//   }

// });

AppRegistry.registerComponent('spotifyGo', () => courseSelect);
