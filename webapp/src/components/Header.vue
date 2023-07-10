<template>
    <header>
        <button class="createStock" @click="createStock">
            <h4>Create Stock</h4>
        </button>
        <div class="searchBox">
            <input class="searchInput" type="text" name="" placeholder="Search a stock or a user"/>
            <button class="searchButton" @click="searchAll">
                <i class="material-icons">search</i>
            </button>
        </div>
        <div v-if="store.data.wallet === ''">
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

<script lang="ts" setup>
import { PeraWalletConnect } from "@perawallet/connect";
import {useDataStore} from "@/stores/store";
import { onMounted } from "vue";
const peraWallet = new PeraWalletConnect();
const store = useDataStore();

function disconnectWallet() {
    store.changeWallet("")
    //peraWallet.disconnect().then()
}

function connectWallet() {
    peraWallet
        .connect()
        .then((accounts) => {
            peraWallet.connector?.on("disconnect", disconnectWallet);
            store.changeWallet(accounts[0])
        })
        .catch((e) => console.log(e));
}

function searchAll() {

}

function createStock() {

}

onMounted(() => {
    peraWallet
        .reconnectSession()
        .then((accounts) => {
            peraWallet.connector?.on("disconnect", disconnectWallet);
            if (accounts.length) {
                store.changeWallet(accounts[0])
            }
        })
        .catch((error) => {
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                console.log(error);
            }
        });
    console.log(store.data.wallet)
})
</script>

<style lang="scss" scoped>
header{
    display: flex;
    padding: 2rem;
    height: 20%;
    @media(max-width: 1450px){
        width: 60%;
    }
    .createStock{
        font-weight: 600;
        padding: 1rem;
        height: 3rem;
        width: 10rem;
        border: 2px solid #3b5998;
        border-radius: 0.75rem;
        margin-top: 0.85rem;
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
        width: 22%;
        border-radius: 1.5rem;
        padding: 0.5rem;
        .searchButton {
            color: white;
            float: right;
            width: fit-content;
            padding: 2%;
            border-radius: 50%;
            background-color: #3b5998;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover{
                background: white;
                color : #3b5998;
            }
            @media(max-width:1300px){
                
            }
        }
        .searchInput {
            border:none;
            background: none;
            outline:none;
            float:left;
            padding: 0;
            color: white;
            font-size: 16px;
            line-height: 40px;
            width: 85%;
            padding-left: 1rem;
            &::placeholder{
                color: #bebebe;

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
