const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/playlists', (req, res) => {
  console.log('got into server');
  let options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Authorization: 'Bearer ' + 'BQDHfcgHxlvsVAC7oHMZEkSX9qHtvm02c1nqBONJ38o6C4vyQuqePVHUZP3nDojnKF1DeD4LC92AZ6j4jUY05djEtfYA0jJ9pwyy-9jssNOeTJN3P-WN43VfEnIyTv7ua2nq7b94fEDQOsN_asEJh0mIouoYZraVMkDRfR7JdYD3nA0K-3pMoTd6_QOQO4RkKzo79izrOQNxubgwPDZJ_qu4O_CqipvIUuQzFRO5lKERE4K9mRHjPp7xFNwBQH_oE64UX1ppQKmd1KP5BBgNZfDTXHpsPNK2fannyLucgTUZtdPgStQVeCTxjpnzwkT5J84T25c'
    }
  };
  let result = [];
  axios(options)
    .then(response => {
      // console.log('response from server: ', JSON.stringify(response.data.items, null ,4));
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
      // return Promise.map(result, (songs, i) => {
      //   let options2 = {
      //     headers: {
      //       Accept: 'application/json',
      //       Authorization: options.headers.Authorization
      //     }
      //   };
      //   return axios.get('https://api.spotify.com/v1/users/' + songs.id + '/playlists/' + songs.url.substr(-22) + '/tracks', options2).then(response => {
      //     // console.log(response.data.items[0].track.album.images[1].url)
      //     response.data.items.map(tracks => {
      //       let refactor2 = {
      //         name: tracks.track.name,
      //         image: tracks.track.album.images[1].url,
      //         uri: tracks.track.uri
      //       }
      //       result[i].songs.push(refactor2);
      //     })
      //   }).catch(error => {
      //     console.log(error);
      //   })
      // });
        let exampleData = [
          {
              "id": "21lbq4daoktipzs2jimgjvqiq",
              "name": "New Playlist 3",
              "url": "spotify:user:21lbq4daoktipzs2jimgjvqiq:playlist:5Uz821DUaHU13dT8jijBUC",
              "songs": [
                  {
                      "name": "Night Riders",
                      "image": "https://i.scdn.co/image/8a2828a4d24fea5ce7d766de9e5e61eaa3279276",
                      "uri": "spotify:track:1JSDNoAlPpMnjOPqfsr3CV"
                  },
                  {
                      "name": "Fade Away",
                      "image": "https://i.scdn.co/image/b78af0a7415fc94b101b2f846f3224b28a037c22",
                      "uri": "spotify:track:5u2phwy67WgQtFuzC0wjcj"
                  },
                  {
                      "name": "Hung Up",
                      "image": "https://i.scdn.co/image/71b117694123255d11497960263503aea84aba6b",
                      "uri": "spotify:track:2ULg8Cw0Ckn5JDGUkCNXko"
                  },
                  {
                      "name": "No Promises (feat. Demi Lovato)",
                      "image": "https://i.scdn.co/image/924f0510710fb0d70cf345ac10756d4895ba7389",
                      "uri": "spotify:track:5lNuqFVMca4vPupY10cH0J"
                  },
                  {
                      "name": "Magic",
                      "image": "https://i.scdn.co/image/a174800da2ddb9b2a316ce1db698df630ff9612d",
                      "uri": "spotify:track:7GYLsGlCPqSkLBNDC5mVyl"
                  },
                  {
                      "name": "I Need You (feat. Olaf Blackwood)",
                      "image": "https://i.scdn.co/image/ca6381e2825a5e600514696ca242488f6b35816b",
                      "uri": "spotify:track:4cCpGAUlYDh88uuU7pcdN8"
                  },
                  {
                      "name": "Fashion Killa",
                      "image": "https://i.scdn.co/image/342fd8bf9219b2369394bc6adf57a69b3fecc0f7",
                      "uri": "spotify:track:40H5libEZWrbkc8HTlXGbt"
                  },
                  {
                      "name": "The Cure",
                      "image": "https://i.scdn.co/image/9c61071e8c11dc1ded0287d9f493b4eac4aae775",
                      "uri": "spotify:track:34oB5r0lcN3fYWCs2uA1k5"
                  },
                  {
                      "name": "Falling",
                      "image": "https://i.scdn.co/image/5d30eb76212ee8d86f15d6026bdd55db8c2f6447",
                      "uri": "spotify:track:43mNwDn0zOH2HKl5B4aqcx"
                  },
                  {
                      "name": "Jump (feat. Gizzle)",
                      "image": "https://i.scdn.co/image/869e0f78e63a97469271f84eab10ca7da407533b",
                      "uri": "spotify:track:51gbF0SxTmxgAguiWWUXPu"
                  },
                  {
                      "name": "Night Riders",
                      "image": "https://i.scdn.co/image/8a2828a4d24fea5ce7d766de9e5e61eaa3279276",
                      "uri": "spotify:track:1JSDNoAlPpMnjOPqfsr3CV"
                  },
                  {
                      "name": "Fade Away",
                      "image": "https://i.scdn.co/image/b78af0a7415fc94b101b2f846f3224b28a037c22",
                      "uri": "spotify:track:5u2phwy67WgQtFuzC0wjcj"
                  },
                  {
                      "name": "Hung Up",
                      "image": "https://i.scdn.co/image/71b117694123255d11497960263503aea84aba6b",
                      "uri": "spotify:track:2ULg8Cw0Ckn5JDGUkCNXko"
                  },
                  {
                      "name": "No Promises (feat. Demi Lovato)",
                      "image": "https://i.scdn.co/image/924f0510710fb0d70cf345ac10756d4895ba7389",
                      "uri": "spotify:track:5lNuqFVMca4vPupY10cH0J"
                  },
                  {
                      "name": "Magic",
                      "image": "https://i.scdn.co/image/a174800da2ddb9b2a316ce1db698df630ff9612d",
                      "uri": "spotify:track:7GYLsGlCPqSkLBNDC5mVyl"
                  },
                  {
                      "name": "I Need You (feat. Olaf Blackwood)",
                      "image": "https://i.scdn.co/image/ca6381e2825a5e600514696ca242488f6b35816b",
                      "uri": "spotify:track:4cCpGAUlYDh88uuU7pcdN8"
                  },
                  {
                      "name": "Fashion Killa",
                      "image": "https://i.scdn.co/image/342fd8bf9219b2369394bc6adf57a69b3fecc0f7",
                      "uri": "spotify:track:40H5libEZWrbkc8HTlXGbt"
                  },
                  {
                      "name": "The Cure",
                      "image": "https://i.scdn.co/image/9c61071e8c11dc1ded0287d9f493b4eac4aae775",
                      "uri": "spotify:track:34oB5r0lcN3fYWCs2uA1k5"
                  },
                  {
                      "name": "Falling",
                      "image": "https://i.scdn.co/image/5d30eb76212ee8d86f15d6026bdd55db8c2f6447",
                      "uri": "spotify:track:43mNwDn0zOH2HKl5B4aqcx"
                  },
                  {
                      "name": "Jump (feat. Gizzle)",
                      "image": "https://i.scdn.co/image/869e0f78e63a97469271f84eab10ca7da407533b",
                      "uri": "spotify:track:51gbF0SxTmxgAguiWWUXPu"
                  }
              ]
          },
          {
              "id": "21lbq4daoktipzs2jimgjvqiq",
              "name": "New Playlist 2",
              "url": "spotify:user:21lbq4daoktipzs2jimgjvqiq:playlist:6ObHERnFkdc4otTZ4CJflq",
              "songs": [
                  {
                      "name": "Walking In Memphis",
                      "image": "https://i.scdn.co/image/5b0a094b641c37a3913c79e45788b383ffa54bd7",
                      "uri": "spotify:track:51bGVHqAvMdethz8RNIBeF"
                  },
                  {
                      "name": "Lazy Love",
                      "image": "https://i.scdn.co/image/e909277c1bb7b250989119e022c2a5c07ca51ef1",
                      "uri": "spotify:track:36dFSVGORZsU4QmZgC43v9"
                  },
                  {
                      "name": "Mary Wanna",
                      "image": "https://i.scdn.co/image/bda3bb44cd87f2e0033eab16a3adc26bf7e08434",
                      "uri": "spotify:track:2M9jXURIaJAq028aIv9Eny"
                  },
                  {
                      "name": "Matchstick",
                      "image": "https://i.scdn.co/image/df164e7a385cd6b23141d06f320febbeabd97bcd",
                      "uri": "spotify:track:4oMtSxzrBLltPWPEbuHD2N"
                  },
                  {
                      "name": "Take It To Reality",
                      "image": "https://i.scdn.co/image/756ed3a965a9d19f3800c726f2bf0cf9153ee4d3",
                      "uri": "spotify:track:1xKAX82ulfphGaeZRlwmJN"
                  },
                  {
                      "name": "Waiting Around For Grace",
                      "image": "https://i.scdn.co/image/d16a138f7018b871ed8680d1aa8b71a5fa07e6a5",
                      "uri": "spotify:track:1S7rX5dnPYrlMCJ3DBvlJn"
                  },
                  {
                      "name": "Mr. Brightside",
                      "image": "https://i.scdn.co/image/3c2152236f041efcd27d757fb293f9b2d94d48be",
                      "uri": "spotify:track:3dho80fD9LVp471UuFHEEr"
                  },
                  {
                      "name": "Don't Kill My Vibe - Gryffin Remix",
                      "image": "https://i.scdn.co/image/85308527d3c3934403fde3c28bbafae8bf714970",
                      "uri": "spotify:track:6VEbv3jRYbOeo2UZ0mkN7h"
                  },
                  {
                      "name": "Fossils",
                      "image": "https://i.scdn.co/image/1fdb51cba7f956bd3ebe2aa605b4e66e092e62b4",
                      "uri": "spotify:track:3GmLkqLkDlBJED7RGz444K"
                  },
                  {
                      "name": "Step Up The Morphine",
                      "image": "https://i.scdn.co/image/7e744617e9b6d8c56cea5da10afc339f2582387a",
                      "uri": "spotify:track:6yIDqJhvfMW6uINscpXmWB"
                  }
              ]
          },
          {
              "id": "21lbq4daoktipzs2jimgjvqiq",
              "name": "New Playlist 1",
              "url": "spotify:user:21lbq4daoktipzs2jimgjvqiq:playlist:7xVx7cfIoV30E1JChqI9Ki",
              "songs": [
                  {
                      "name": "No Promises (feat. Demi Lovato)",
                      "image": "https://i.scdn.co/image/924f0510710fb0d70cf345ac10756d4895ba7389",
                      "uri": "spotify:track:5lNuqFVMca4vPupY10cH0J"
                  },
                  {
                      "name": "America's Sweetheart",
                      "image": "https://i.scdn.co/image/9094371a48d658b9047f83a82b60f9228bd01741",
                      "uri": "spotify:track:2NcstvY8H9PVQ0DMNGHckh"
                  },
                  {
                      "name": "Higher Love",
                      "image": "https://i.scdn.co/image/232812fc09d18bdd7fc8fd0e5dc836c7caedf5f6",
                      "uri": "spotify:track:3rocTBn0NsGrVAHGOZNzH5"
                  },
                  {
                      "name": "Atlas Hands",
                      "image": "https://i.scdn.co/image/2ed31434735919672503f8136517e4b3b67719cc",
                      "uri": "spotify:track:5BNxLlPzaAyGKj09vSbZC3"
                  },
                  {
                      "name": "Old Pine",
                      "image": "https://i.scdn.co/image/6601fbe7b5b6e3aa1ccf5083d6b34fad9e8252bd",
                      "uri": "spotify:track:3CAX47TnPqTujLIQTw8nwI"
                  },
                  {
                      "name": "High Hopes",
                      "image": "https://i.scdn.co/image/b4d3bb12d58d48277968924cd5b64c22bb13d871",
                      "uri": "spotify:track:5rZXBHUU2qz7huEckTwpqo"
                  },
                  {
                      "name": "Take Your Time",
                      "image": "https://i.scdn.co/image/52f4e81cdee58876deff5cf8a340c11aa2c151a1",
                      "uri": "spotify:track:6DEaND0SHv3sC11xobZLiy"
                  },
                  {
                      "name": "Don't Speak",
                      "image": "https://i.scdn.co/image/588905463d6a95a62986e95beacd5cc8f1183a3e",
                      "uri": "spotify:track:6urCAbunOQI4bLhmGpX7iS"
                  },
                  {
                      "name": "Dancing On My Own",
                      "image": "https://i.scdn.co/image/fb081788f8f7ba07a7320871008ad1d2baa07ce9",
                      "uri": "spotify:track:5dB00dkUFlruwbxVmdOPSE"
                  },
                  {
                      "name": "Slow Hands",
                      "image": "https://i.scdn.co/image/aa42adbdd526eee8b85837719c737551cc54d3d5",
                      "uri": "spotify:track:27vTihlWXiz9f9lJM3XGVU"
                  }
              ]
          }
      ];
      return exampleData;
    })
    .then((data) => {
      console.log('result: ', JSON.stringify(data, null, 4));
      res.send(data);
    })
    .catch(error => {
      console.log('error from server: ', error.data);
    })
})

app.listen(3000, function() {
  console.log('Connection established.  Listening on port 3000!');
});