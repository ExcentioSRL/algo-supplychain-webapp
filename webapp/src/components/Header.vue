<template>
    <header>
        <h1>{{ pageName }}</h1>
        <input type="text" placeholder="Search item"/>
        <div v-if="accountAddress === ''">
            <button @click="connectWallet">Connect wallet</button>
        </div>
        <div v-else>

        </div>
    </header>
</template>

<script lang="ts">
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();
export default{
    name:'Header',
    props: {
        pageName: String
    },
    data(){
        return{
            accountAddress: ''
        }
    },
    mounted() {
        peraWallet
            .reconnectSession()
            .then((accounts) => {
                peraWallet.connector?.on("disconnect", this.disconnectWallet);
                if (accounts.length) {
                    this.accountAddress = accounts[0];
                }
            })
            .catch((error) => {
                if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                    console.log(error);
                }
            });
    },
    methods: {
        connectWallet() {
            peraWallet
                .connect()
                .then((accounts) => {
                    peraWallet.connector?.on("disconnect", this.disconnectWallet);

                    this.accountAddress = accounts[0];
                })
                .catch((e) => console.log(e));
        }
    }
}
</script>

<style lang="scss" scoped>
header{
    display: flex;
    min-width: 100vw;
    padding: 2rem;
    width: 100vw;
    h1{
        color: black;
        font-weight: 700;
    }
    input{
        position: absolute;
        right: 35%;
        border-radius: 0.5rem;
        height: 3rem;
        font-size: 2rem;
        &::placeholder{
            font-size: 2rem;
        }
    }
    button{
        padding: 1rem;
        position: absolute;
        right: 5rem;
        color: darkblue;
        height: 3rem;
        border: 1px solid black;
        border-radius: 1rem;
    }
}
</style>