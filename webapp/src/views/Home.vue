<template>
<main id="home">
  <Header pageName="Homepage"/>
</main>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
export default{
  name:'Home',
  components: {Header},
}
</script>

<style lang="scss" scoped>
#home{
  display: flex;
  width: 70%;
}
</style>