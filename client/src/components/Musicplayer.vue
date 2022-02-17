<template>
    <div id="footer">
        <div id="buttons">
            <div id="songDetails">
                {{curSong}}
            </div>
            <div>
                <button id="previousSong">previous</button>
                <button id="togglePlay" @click="togglePlay">play</button>
                <button id="nextSong">next</button>
            </div>
        </div>
        <!-- <div id="song-track">
            <input type="range" min="0" max="100" name="range" id="progressBar">
        </div> -->
    </div>    
</template>

<script>
export default {
    name : 'music-player',
    data(){
        return{

        }
    },
    methods :{

    },
    computed:{
        curSong(){
            return this.$store.getters.getCurSong;
        },
        togglePlay(){
            this.$store.dispatch({
                accessToken : this.$store.getters.accessToken,
                uri : this.$store.curSongUri
            });
        }
    }
}
</script>

<style scoped>
    #foooter{
        background-color: black;
    }

    #progressBar{
        width : 80vw;
    }

    #buttons{
        display: flex;
        justify-content: left;
    }

    #songDetails{
        margin-right:45%;
    }
/* 
    #togglePlay{
        width: 40px;
        height: 40px;
        padding: 10px 16px;
        border-radius: 50%;
        font-size: 12px;
        text-align: center;

    } */

</style>