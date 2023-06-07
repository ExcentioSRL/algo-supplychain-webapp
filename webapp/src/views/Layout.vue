<template>
    <main id="layout">
        <Sidebar />
        <router-view />
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

<style lang="scss" scoped>
#layout {
    display: flex;
    height: 100%;
    width: 100%;
}
</style>