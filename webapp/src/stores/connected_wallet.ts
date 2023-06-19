import { defineStore } from 'pinia'


export const useConnectedWallet = defineStore('wallet', {
    state: () => ({ wallet: '' }),
    actions: {
        setWallet(new_value : string) {
            this.wallet = new_value
        },
    },
})