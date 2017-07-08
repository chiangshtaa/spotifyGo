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
      Authorization: 'Bearer ' + 'BQDbiqzu8O2_wZJ7jPWnBrdsVXTaICGRNOWApuyc_f7xkJ9-wE6XQW3_hth9yboDMlLWuHEl2gMTsa1W0S9XR4yntlR5mkE9TpSli5Ppwu4atmANS46RlxjRwDFCmqILBvr5ALtqv6zatLW7-2SOdcnv5cyqlwj3VisSlBxJdI7QQ4xjRSGDOWkaK4tz44WbbGGT2mN7e5yP97XX8crPg0IJ5KMJviIkVZ676DjxX3vFgq71G9hv2IGJoWhIHQvKeWXndvkrDDOf6oo6Pu2vfyX0u5WrGq2wsjrofKuvxqnPmvr14jS9XUWc9A3wHVLrSmadu7w'
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
      console.log('result: ', JSON.stringify(result, null, 4));
      res.send(result);
    })
    .catch(error => {
      console.log('error from server: ', error.data);
    })
})

app.listen(3000, function() {
  console.log('Connection established.  Listening on port 3000!');
});