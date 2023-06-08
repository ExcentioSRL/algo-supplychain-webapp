<template>
    <main id="layout">
        <Sidebar/>
        <router-view/>
    </main>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import router from "@/router";

export default {
    name: "Layout",
    components: { Sidebar },
    data() {
        return {}
    },
    beforeCreate() {
        router.push('/home')
    }
}
</script>

<style lang="scss">
#layout {
    display: flex;
    min-width: 100vw;
    width: 100vw;
    height: 100vh;
}
</style>