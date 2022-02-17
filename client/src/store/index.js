import { createStore } from 'vuex'
import axios from 'axios'
import $, { queue } from 'jquery'
import SpotifyApi from 'spotify-web-api-node'

export default createStore({
  state: {
    accessToken : null,
    refreshToken : null,
    expireIn : null,
    dummyExpireIn : null,
    curSong : '',
    curSongUri : '',
    songs : [],
    queue : [],
    firstImageUrl : null,
  },
  getters :{
    getCode(){
      return new URLSearchParams(window.location.search).get('code');
    },  
    getAccessToken(state){
      return state.accessToken;
    },
    hasChanged(state){
      if(state.dummyExpireIn != state.expireIn){
        state.dummyExpireIn = state.expireIn;
        return true;
      }
    },
    getCurSong(state){
      return state.currentSong;
    },
    getSongList(state){
      return state.songs;
    },
    getImageURL(state){ 
      return state.firstImageUrl;
    }
  },
  mutations: {
    setTokens(state,tokens){
      // console.log(tokens);
      state.accessToken = tokens.data.body.access_token;
      state.refreshToken = tokens.data.body.refresh_token;
      state.expireIn = tokens.data.body.expires_in;
      // state.dummyExpireIn = tokens.data.body.expires_in;
    },
    setRefresh(state,tokens){
      state.accessToken = tokens.data.body.access_token;
      // state.refreshToken = tokens.data.body.refresh_token;
      state.expireIn = tokens.data.body.expires_in;
      // state.dummyExpireIn = tokens.data.body.expires_in;
    },
    setSongs(state,songList){
      state.songs = songList.sl;
      state.firstImageUrl = songList.firstImage; 
    },
    setCurSong(state,curSongDetails){
      state.curSongUri = curSongDetails.uri;
      state.curSong = curSongDetails.curSong;
    },
    addQueue(state,songDetails){
      state.queue.push({
        accessToken : songDetails.accessToken,
        uri : songDetails.uri,
        songName : songTitle,
      });
    }
  },
  actions: {
    async getTokens(context,code){
      const tokens = await axios.post('http://localhost:3000/login',{
        code,
      }).catch(() => {
        window.location = '/';
      })
      context.commit('setTokens',tokens);
    },
    async refreshApp(context,rt){
      const output = await axios.post('http://localhost:3000/refresh' , {
        refreshToken : rt,
      }).catch((err)=>{
        console.log(err);
      })
      context.commit('setRefresh',output);
    },
    async getSongs(context,reqSong){
      const spotifyApi = new SpotifyApi({
        clientId : 'f1ba9049c270470fadf6e4123897420e',
        clientSecret : '14973cd4c62b44028baf1b4c062f420d',
        redirectUri : 'http://localhost:8080/'
      });
      let flag = false;
      let firstimageurl = '';
      if(!reqSong.accessToken || reqSong.songName === '') return;
      spotifyApi.setAccessToken(reqSong.accessToken);
      const songList = [];
      await spotifyApi.searchTracks(reqSong.songName)
      .then((res)=>{
        const list = res.body.tracks.items;
        // console.log(res);
        list.forEach(track =>{
          let imageUrl = '';
          let size = Number.MAX_VALUE;
          track.album.images.forEach(img =>{
            if(img.height < size) {
              size = img.height;
              imageUrl = img.url;
            }
          });
          if(flag === false) {
            flag = true;
            firstimageurl = imageUrl;
          }
          // console.log(size);
          songList.push({
            artist : track.artists[0].name,
            title : track.name.charAt(0).toUpperCase() + track.name.slice(1),
            link : track.uri,
            url : imageUrl,
            imgageHeight : size, 
            lengthSong : (Math.floor(track.duration_ms/60000)+((track.duration_ms/1000)%60)/100).toFixed(2),
          });
        })
      }, function(err) {
        console.error(err);
      });
      context.commit('setSongs',{
        sl : songList,
        firstImage : firstimageurl,
      });
    },
    async play(context , songDetails){
      console.log("index.js");
      console.log(songDetails);
      // console.log(context.state);
      var imported = document.createElement('script');
      imported.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(imported);
      // console.log(songDetails);   
      window.onSpotifyWebPlaybackSDKReady  = () => {
          const player = new Spotify.Player({
              name: 'Web Playback SDK Template',
              getOAuthToken: cb => { cb(songDetails.accessToken); }
          });
      
          // Error handling
          player.on('initialization_error', e => console.error(e));
          player.on('authentication_error', e => console.error(e));
          player.on('account_error'   , e => console.error(e));
          player.on('playback_error', e => console.error(e));
      
          // Playback status updates
          // player.on('player_state_changed', state => {
          //   console.log(state)
          //   $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
          //   $('#current-track-name').text(state.track_window.current_track.name);
          // });
      
          // Ready
          player.on('ready', data => {
            console.log('Ready with Device ID', data.device_id);
          
          // Play a track using our new device ID
          play(data.device_id);
          });

          // function play(device_id) {
          

          // }
          function play(device_id){
          const url = "https://api.spotify.com/v1/me/player/play?device_id=" + device_id;
              
          $.ajax({
              url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
              type: "PUT",
              data: JSON.stringify({ uris: [`${songDetails.uri}`] }),
              beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + songDetails.accessToken );},
              success: function(data) { 
                  console.log(data)
              }
          }).catch(err=>{
              console.log(err);
          })
        }
          
          // document.getElementById('previousSong').onclick = function() {
          //   player.previousTrack().then(() => {
          //     console.log('Set to previous track!');
          //   });
          // };

          // document.getElementById('playNow').onclick = function() {
          //   player.disconnect();
          // };


          document.getElementById('togglePlay').onclick = function() {
            player.togglePlay();
          };

          // document.getElementById('nextSong').onclick = function() {
          //   player.nextTrack().then(() => {
          //     console.log('Set to next track!');
          //   });
          // };
      
          // Connect to the player!
          player.connect();
          player.disconnect();
      }
    },
    getPlay(context , aT){
      // console.log(`${aT}`);
      try{
        let obj = {
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `${aT}`
          }
        }
        console.log(obj);
        axios.get("https://api.spotify.com/v1/users/314dsraie63j7gqakh6rtujzglwq/playlists", null , {
            params:{
              obj
            }
        }).then((res)=>{
            console.log(res);
        })
      }
      catch(err){
        context.dispatch.refreshApp(context.state.refreshToken);
        console.log(err);
      }
    }
  },
  modules: {

  }
})
