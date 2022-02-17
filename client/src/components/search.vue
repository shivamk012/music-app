<template>
    <div id="division">
        <div>
            <input
                type = "search"
                placeholder="search song"
                v-model="songName"
                @blur="print"
                @keyup.enter="print"
                id="searchField"
                @input="print"
                style="width:50%;border-radius:20px;    "
            >
        </div>
        <div style="margin-top:20px;">
            <div class="row">
                <div class="column">
                    <img v-if="imageUrl" :src="imageUrl" style="width:100%;height:100%;">
                </div>
                <div class="column giveScroll">
                    <div
                        v-for="song in songs"
                        :key = "song.index"
                        id="song-item"
                    >
                        <div class="songItem">
                            <div>
                                <button id="playNow" @click="play(`${song.link}`,`${song.title}`)">play</button>
                                <button id="addToQueue" @click="play(`${song.link}`,`${song.title}`)">add to queue</button>
                            </div>
                            <div style="display:inline-flex;"><img :src="song.url" :width="song.imageHeight">
                            <table>
                                <tr>
                                    <div style="font-size:25px;"><td>{{song.title}}</td></div>                
                                    <div style="font-size:25px;"><td>{{song.artist}}</td></div>
                                </tr>
                            </table></div>    
                            <div>{{song.lengthSong}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <musicplayer/>
    </div>    
    
</template>

<script>

import musicplayer from './Musicplayer.vue'
export default {
    data(){
        return{
            songName : '',
        }
    },
    methods :{
        async print(){
            await this.$store.dispatch('getSongs',{
                songName:this.songName,
                accessToken : this.$store.state.accessToken,
            });
        },
        play(songUri,songName){
            console.log("search.vue")
            console.log(songUri);
            console.log(songName);
            this.$store.commit('setCurSong',
                {
                    curSong : songName,
                    uri : songUri,   
                }
            );
            const songDetails = {
                accessToken : this.$store.getters.getAccessToken,
                uri : songUri,
            };
            this.$store.dispatch('play',songDetails);
        },
        addToQueue(songUri,songName){
            const songDetails = {
                accessToken : this.$store.getters.getAccessToken,
                uri : songUri,
                songTitle : songName,
            };
            this.$store.commit('addQueue',songDetails);
        }
    },
    computed:{
        songs(){
            return this.$store.getters.getSongList;
        },
        imageUrl(){
            return this.$store.getters.getImageURL;
        }
    },
    components:{
        musicplayer,
    },
}
</script>

<style scoped>

    .column {
        /* overflow-y:scroll; */
        float: left;
        width: 50%;
        padding: 10px;
        height: 400px; /* Should be removed. Only for demonstration */
    }

    .giveScroll{
        overflow-y:scroll;
    }

    /* Clear floats after the columns */
    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .songItem{
        display: flex;
        justify-content: space-between;
        width:inherit;
        font-size: 30px;
        margin-top : 10px;
        margin-bottom : 10px;
    }

    .songItem:hover{
        cursor:pointer;
    }

    #division{
        margin-top : 100px;
        width: 75vw;
        height : 75vh;
        margin-left : 12.5vw;
    }

    #searchField{
        width : inherit;
        height: 50px;
        text-align: left;
        font-size: 30px;
    }

    #song-item{
        margin : 10px 0px 10px 0px;
        /* display : -webkit-box */
        display:inline;
    }

    
</style>