<template>
  <v-app>
    <div id="realapp">
      <!-- <mainscreen/> -->
      <button @click.prevent="authenticate" v-if="!code">Login</button>
      <dashboard v-if="code"></dashboard>
      <musicplayer/>
    </div>
  </v-app>
</template>

<script>
import dashboard from './components/dashboard'
import mainscreen from './components/music-component.vue'

export default({
  data(){
    return{
      flag : false,
    }
  },
  methods:{
    authenticate(){
      const url = "https://accounts.spotify.com/authorize?client_id=f1ba9049c270470fadf6e4123897420e&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&response_type=code&redirect_uri=http://localhost:8080/";
      console.log(url);
      window.location.href = `${url}`;
    }
  },
  // mounted(){
  //     const url = "https://accounts.spotify.com/authorize?client_id=f1ba9049c270470fadf6e4123897420e&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&response_type=code&redirect_uri=http://localhost:8080/";
  //     console.log(url);
  //     window.location.href = `${url}`;
  // },
  computed : {
    code() {
      return (this.$store.getters.getCode != null);
    }
  },
  components :{
    dashboard,
    mainscreen,
  }
})
</script>


<style>
#realapp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
    /* background-size: cover; */
  /* background-image: 
    linear-gradient(217deg, rgba(220, 20, 60, 0.8), rgba(220, 20, 60, 0) 70.71%), 
    linear-gradient(127deg, #8086a0, rgba(128, 134, 160, 0) 70.71%), 
    linear-gradient(336deg, rgba(100, 149, 237, 0.8), rgba(100, 149, 237, 0) 70.71%); */

  /* display: flex;
  justify-content: center;
  align-items: center; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
