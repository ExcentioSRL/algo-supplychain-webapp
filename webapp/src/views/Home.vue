<template>
<main id="home">
  <button @click="connectWallet">Cliccami please</button>
</main>
</template>

<script lang="ts">
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();
export default{
  name:'Home',
  data() {
    return {
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
#home{
  display: flex;
  height: 100%;
  width: 100%;
  button{
    align-self: center;
    margin-left: 45rem;
    padding: 1rem;

    color: red;
    border: 2px solid black;
  }
}
</style>