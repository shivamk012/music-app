<template>
    <div class="scrollList"> 
        <div>
            <seachField/>
            <button @click="print">playlist</button>
        </div> 
    </div>
</template>

<script>
import seachField from '../components/search.vue'
export default {
    name : 'Db',
    data(){
        return {
        }
    },
    components :{
        seachField,
    },
    methods : {
        print(){
            let aT = this.$store.getters.getAccessToken;
            this.$store.dispatch('getPlay' , aT);
        }
    },
    computed :{
        getToken(){
            return this.$store.getters.getAccessToken;
        },
    },
    created(){
        const code = this.$store.getters.getCode;
        const out = this.$store.dispatch('getTokens',code);
    }
    // mounted: function () {
    //     const output = setInterval(() => {
    //         console.log(this.$store.state.expireIn-60);
    //         const rt = this.$store.state.refreshToken;
    //         const output = this.$store.dispatch('refreshApp',rt);
    //     },((this.$store.state.expireIn-60)*1000));  
    //     if(this.$store.getters.hasChanged){
    //         console.log(this.$store.getters.hasChanged);
    //         clearInterval(output);
    //     }
    // }
}
</script>

<style scoped>

    .scrollList{
        text-align:justify;
    }

</style>