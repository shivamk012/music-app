const express = require('express');
const Spotifywebapi = require('spotify-web-api-node');
const cors = require('cors');
const ajfdslkfa = require('body-parser');
const app = express();
app.use(cors());
app.use(ajfdslkfa.json());

app.post('/login' , (req,res)=>{
    const code = req.body.code;
    console.log(code);

    // let scope = "streaming \
    //            user-read-email \
    //            user-read-private"


    const spotifyapi = new Spotifywebapi({
        clientId : 'f1ba9049c270470fadf6e4123897420e',
        clientSecret : '14973cd4c62b44028baf1b4c062f420d',
        redirectUri : 'http://localhost:8080/',
        // scope : "streaming user-read-birthdate user-read-email user-read-private web-playback"
        // scope: scope,
    });

    console.log(spotifyapi);

    spotifyapi.authorizationCodeGrant(code).then(data=>{
        // console.log(data);
        res.json(
            data
        );
    }).catch(err =>{
        console.log(err);
        res.sendStatus(400);
    })
});

app.post('/refresh' , (req,res)=>{
    const refreshToken = req.body.refreshToken;
    // console.log(refreshToken);
    if(!refreshToken) return;
    const spotifyapi = new Spotifywebapi({
        clientId : 'f1ba9049c270470fadf6e4123897420e',
        clientSecret : '14973cd4c62b44028baf1b4c062f420d',
        redirectUri : 'http://localhost:8080/',
        refreshToken,
    });

    spotifyapi.refreshAccessToken().then((data)=> {
        res.json(
            data,
        )}
    ).catch((err)=>{
        console.log(err);
    });
})

app.listen(3000);