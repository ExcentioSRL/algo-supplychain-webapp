<template>
    <header>
        <h1>{{ pageName }}</h1>
        <div class="searchBox">
            <input class="searchInput" type="text" name="" placeholder="Search here"/>
            <button class="searchButton" @click="searchAll">
                <i class="material-icons">search</i>
            </button>
        </div>
        <div v-if="accountAddress === ''">
            <button class="connectWallet" @click="connectWallet">
                <h4>Connect wallet</h4>
            </button>
        </div>
        <div v-else>
            <button class="connectWallet" @click="disconnectWallet">
                <h4>Disconnect wallet</h4>
            </button>
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
        },
        disconnectWallet(){
            //peraWallet.disconnect().then()
        },
        searchAll(){}
    }
}
</script>

<style lang="scss" scoped>
header{
    display: flex;
    min-width: 100%;
    padding: 2rem;
    width: 100%;
    height: 20%;
    h1{
        color: black;
        font-size: 40px;
        font-weight: 700;
    }
    .searchBox {
        position: absolute;
        left: 45%;
        margin-top: 0.5rem;
        background-color: #3b5998;
        width: 20%;
        height: 6%;
        border-radius: 40px;
        padding: 10px;
        .searchButton {
            color: white;
            float: right;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #3b5998;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover{
                background: white;
                color : #2f3640;
            }
        }
        .searchInput {
            border:none;
            background: none;
            outline:none;
            width: 20%;
            float:left;
            padding: 0;
            color: white;
            font-size: 16px;
            line-height: 40px;
            width: 85%;
            padding-left: 1rem;
            &::placeholder{
                color: white;
            }
        }
    }
    .connectWallet{
        font-weight: 600;
        padding: 1rem;
        position: absolute;
        right: 4.5%;
        height: 3rem;
        width: 10rem;
        border: 2px solid #3b5998;
        border-radius: 0.75rem;
        margin-top: 0.75rem;
        h4{
            color: #274268;
            font-weight: bold;
        }
        &:hover{
            background-color: #3b5998;
        }
        &:hover > h4{
            color: white;
        }
    }
}
</style>
