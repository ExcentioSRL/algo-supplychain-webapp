<script lang="ts">
export default{
    name:'Sidebar',
    data(){
        return{
            
        }
    }
}
</script>

<template>
    <aside class="primary">
        <h3>Menu</h3>
        <div class="menu">
            <router-link to="/home" class="button">
                <span class="material-icons">home</span>
                <span class="text">Home</span>
            </router-link>
            <div v-if="1 === 1"> <!-- Sostituire con una condizione di login-->
                <router-link to="/profile" class="button">
                    <span class="material-icons">person</span>
                    <span class="text">You</span>
                </router-link>
            </div>
            <div v-else>
                <router-link to="/" class="button">
                    <span class="material-icons">person</span>
                    <span class="text">Login</span>
                </router-link>
            </div>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
aside {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: auto;
    color: white;
    width: 20vw;
    min-height: 100%;
    background: #F1F2F6;
    padding: 1rem;
    left: 0;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.15);

    h2 {
        color: #757D8A;
        font-weight: bold;
        padding-bottom: 3rem;
    }

    h3 {
        color: #757D8A;
        font-weight: bold;
        font-size: 1.5rem;
        align-self: center;
        margin-bottom: 2rem;
        text-transform: uppercase;
        margin-top: 2rem;
    }

    .menu {
        margin: 0 -1rem;
        .button {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding-left: 0.5rem;
            height: 4rem;
            margin-top: 2rem;
            .material-icons {
                font-size: 2rem;
                color: #757D8A;
            }

            .text {
                color: #757D8A;
                font-size: 1rem;
                padding-left: 1rem;
            }

            &:hover {
                background-color: var(--dark-alt);

                .material-icons,
                .text {
                    color: #404D61;
                }
            }

            &.router-link-exact-active {
                background-color: var(--dark-alt);
                border-right: 5px solid black;

                .material-icons,
                .text {
                    color: black;
                }
            }
        }
    }

    @media (max-width: 1024px) {
        position: absolute;
        z-index: 99;
    }
}</style>