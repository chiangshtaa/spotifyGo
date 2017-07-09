
// const express = require('express');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const Promise = require('bluebird');


// const app = express();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// app.post('/playlists', (req, res) => {
//   console.log('got into server: ', req.body);
//   let options = {
//     url: 'https://api.spotify.com/v1/me/playlists',
//     headers: {
//       Authorization: 'Bearer ' + req.body.token
//     }
//   };
//   let result = [];
//   axios(options)
//     .then(response => {
//       response.data.items.map(playlist => {
//         let refactor = {
//           id: playlist.owner.id,
//           name: playlist.name,
//           url: playlist.uri,
//           songs: []
//         };
//         result.push(refactor);
//       });
//     })
//     .then(() => {
//       return Promise.map(result, (songs, i) => {
//         let options2 = {
//           headers: {
//             Accept: 'application/json',
//             Authorization: options.headers.Authorization
//           }
//         };
//         return axios.get('https://api.spotify.com/v1/users/' + songs.id + '/playlists/' + songs.url.substr(-22) + '/tracks', options2).then(response => {
//           response.data.items.map(tracks => {
//             let refactor2 = {
//               name: tracks.track.name,
//               image: tracks.track.album.images[2].url,
//               uri: tracks.track.uri
//             }
//             result[i].songs.push(refactor2);
//           })
//         }).catch(error => {
//           console.log(error);
//         })
//       });
//     })
//     .then(() => {
//       console.log('result: ', JSON.stringify(result, null, 4));
//       res.send(result);
//     })
//     .catch(error => {
//       console.log('error from server: ', error.data);
//     })
// })

// app.listen(3000, function() {
//   console.log('Connection established.  Listening on port 3000!');
// });