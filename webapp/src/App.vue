<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { PeraWalletConnect } from "@perawallet/connect";
const peraWallet = new PeraWalletConnect();
export default{
    name: 'App',
    data(){
      return{
        accountAddress: "",
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
    methods:{
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

<template>
  <button @click="connectWallet">Cliccami</button>
</template>

<style lang="scss" scoped>
#app{
  width: 100vw;
  height: 100wh;
  button{
    color: red;
  }
}
</style>
