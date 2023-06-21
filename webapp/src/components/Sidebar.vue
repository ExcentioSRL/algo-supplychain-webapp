<template>
    <aside class="primary">
        <div class="infos">
            <img src="" alt="image" />
            <div>
                <h5>Welcome back,</h5>
                <h3>Prova s.r.l</h3>
            </div>
        </div>
        <div class="menu">
            <router-link to="/home" class="button-top">
                <span class="material-icons">home</span>
                <span class="text">Home</span>
            </router-link>

            <div v-if="1 === 1"> <!-- Sostituire con una condizione di login-->
                <router-link to="/profile" class="button-top">
                    <span class="material-icons">person</span>
                    <span class="text">You</span>
                </router-link>
            </div>
            <div v-else>
                <router-link to="/login" class="button-top">
                    <span class="material-icons">person</span>
                    <span class="text">Login</span>
                </router-link>
            </div>
            <div class="bottom-part">
                <router-link to="/home" class="button-bottom" > <!-- cambiare il link -->
                    <span class="material-icons">anchor</span>
                    <span class="text">Support</span>
                </router-link>
                <router-link to="/" class="button-bottom" @click="logout"> 
                    <span class="material-icons">power_settings_new</span>
                    <span class="text">Logout</span>
                </router-link>
            </div>
        </div>
    </aside>
</template>

<script lang="ts">
import {store} from "@/stores/connected_wallet"
export default{
    name:'Sidebar',
    data(){
        return{
            store
        }
    },
    methods:{
        logout(){
            store.wallet = ""
        }
    }
}
</script>

<style lang="scss" scoped>
aside {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 40%;
    height: 100%;
    background: #3b5998;
    padding: 1.5rem;
    left: 0;
    @media(max-width: 1024px){
        width: 10rem;
    }
    //box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.15);
    .infos{
        display: flex;
        align-items: center;
        margin-top: 1.5rem;
        @media(max-width: 1024px){
            width: 10rem;

        }
        img{
            color: black;
            margin-right: 1.5rem;
        }
        h5{
            color: white;
        }
        h3{
            color: white;
        }
    }
    .menu {
        margin: 2rem -1.5rem;
        @media(max-width: 1024px){
            width: 10%;
            
        }
        .button-top {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding-left: 0.5rem;
            height: 4rem;
            margin-top: 2rem;
            .material-icons {
                font-size: 2rem;
                color: white;
            }
            .text {
                color: white;
                font-size: 1rem;
                padding-left: 1rem;
            }
            &:hover {
                background-color: var(--dark-alt);
                .material-icons,.text {
                    color: white;
                }
            }
            &.router-link-exact-active {
                background-color: var(--dark-alt);
                border-right: 5px solid black;
                .material-icons,.text {
                    color: black;
                }
            }
        }
        .bottom-part{
            position: absolute;
            bottom: 3rem;
            padding-left: 1.5rem;
            .button-bottom{
                display: flex;
                align-items: center;
                text-decoration: none;
                padding-left: 20%;
                height: 2rem;
                margin-top: 2rem;

                .material-icons {
                font-size: 1.5rem;
                color: white;
                }

                .text {
                    color: white;
                    font-size: 1rem;
                    padding-left: 1rem;
                }
                &:hover {
                    background-color: var(--dark-alt);

                  .material-icons,
                  .text {
                      color: white;
                  }
                }
            }
        }
    }

    @media (max-width: 1024px) {
        position: absolute;
        z-index: 99;
    }
}</style>