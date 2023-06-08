<template>
<main id="profile">
  <Header pageName="Profile"/>
</main>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
export default{
    name: "Profile",
    components: {Header}
}
</script>

<style lang="scss" scoped>
#profile{
  display: flex;
  width: 70%;
}
</style>