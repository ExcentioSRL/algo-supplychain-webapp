<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Layout from '@/views/Layout.vue'
export default{
    name: 'App',
    components:{Layout},
    data(){
      return{
      }
    },
    mounted() {
    },
    methods:{
    }
}

</script>

<template>
  <RouterView/>
</template>

<style lang="scss">
html{
  body{
    background-color: white;//rgba(0, 0, 0, 0.06);
    #app{
      min-width: 100vw;
      width: 100vw;
      height: 100vh;
      padding: 0;
      margin: 0;
      @media(max-width: 768px){
       justify-items: flex-start;
      }
    }
  }
}


*,*::after,*::before{
  margin:0;
  padding: 0;

}
button{
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

</style>
