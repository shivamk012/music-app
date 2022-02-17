<template>
    <div id="main-screen">
        <div id="changeBgcolor">
            <div class="top-nav d-flex flex-row justify-center align-stretch">
                <div>
                    <h2 class="text-white">
                        <i class="fa fa-headphones"></i>
                        <span class="changeColor">Music Player</span>
                    </h2>
                </div>
                
                <v-spacer></v-spacer>
                    <v-btn
                        icon="fa fa-bars"
                        @click = "toggle"
                        style = "background-color : rgba(0,0,0,0.001) !important"
                        flat
                    >
                    </v-btn>
                    <v-navigation-drawer
                        v-model="drawer"
                        absolute
                    >
                
                    </v-navigation-drawer>
            </div>
        </div>
        <div>
            <div class="player-content">
                <div class="container">
                    <div class="d-flex align-start"> <h1>Pick a song</h1> </div>
                    <div class="d-flex align-start"><p>This is a music streaming player for the channels provided by SomaFM.com. 
                    Just pick a station from the sidebar to the right to start listening.</p>
                    </div>
                </div>
            </div>
        </div>
    <!-- <div id="dash">
                                                
        <div v-if="code">
        <button @click="authenticate">login</button>
        <label></label>
        </div>
        <div v-if="!code">
        <Db/>
        </div>
        </div>
        <musicplayer/> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            drawer : false,
            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard' },
                { title: 'Photos', icon: 'mdi-image' },
                { title: 'About', icon: 'mdi-help-box' },
            ],
        }
    },
    methods :{
        toggle(){
            this.drawer = !this.drawer;
        }
    }
}
</script>

<style scoped>
    #main-screen{
        height : 700px;
        width : 75vw;
        margin: 0 2em;
        max-width: 1080px;
        height: calc( 100vh- ( 1em* 4 ) );
        /* max-height: 700px; */
        border-radius: 6px;
        box-shadow: 0 1px 30px rgb(0 0 0 / 80%);
        overflow: hidden;
        position: relative;
        /* background-image: url(https://raw.githubusercontent.com/rainner/soma-fm-player/master/public/img/bg.jpg);
        background-position: bottom right;
        background-repeat: no-repeat;
        background-size: cover; */
    }

    .top-nav{
        padding: 0 1em !important;
        height: 3.5em !important;
        min-height: 3.5em !important;
    }

    #changeBgcolor{
        background-color: rgba(0, 0, 0, 0.18);
    }

    .player-content{
        padding : 1em 2em !important;
        height : 100% !important;
    }

    .container{
        margin-top : 20%;
    }
</style>