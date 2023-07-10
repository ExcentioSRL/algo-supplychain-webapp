import * as sdk from "algosdk"
import axios from 'axios'
import { PeraWalletConnect } from "@perawallet/connect";
import { useDataStore } from "../stores/store"
import appspec from '../dApp_schema/application.json'


// ------ USA WEB SOCKETS ------

let algodClient : any;
const appID = 255565680;
const contract = new sdk.ABIContract(appspec.contract)
const addStockMethodSelector = sdk.getMethodByName(contract.methods,"add_stock").getSelector()
const changeOwnerMethodSelector = sdk.getMethodByName(contract.methods,"change_owner").getSelector()

const store = useDataStore()
const pera = new PeraWalletConnect()

function createAlgodClient() {
    return new sdk.Algodv2('', 'https://testnet-api.algonode.cloud', '')
}

async function createAndSendTransaction(methodName: Uint8Array,id: number){
    if (algodClient === undefined) {
        algodClient = createAlgodClient();
    }
    const suggestedParameters = await algodClient.getTransactionParams().do();
    const transaction = sdk.makeApplicationCallTxnFromObject({
        from: store.data.wallet,
        suggestedParams: suggestedParameters,
        appIndex: appID,
        onComplete: sdk.OnApplicationComplete.NoOpOC,
        appArgs: [
            methodName,
            (new sdk.ABIUintType(64)).encode(id),
            (new sdk.ABIAddressType()).encode(store.data.wallet)
        ]
    })
    pera.signTransaction()
    //const signedTransaction = transaction.signTxn()

    //await algodClient.sendRawTransaction(signedTransaction).do()
    await sdk.waitForConfirmation(algodClient, transaction.txID(), 4)
}

export async function createStock(id: number) {
    return await createAndSendTransaction(addStockMethodSelector,id)
}

export async function changeOwner(id:number){
    return await createAndSendTransaction(changeOwnerMethodSelector,id)
}

export async function getStocks() {
    return await axios.get(
        "http://localhost:3000/stocks/getStocks&user=" + useDataStore().data.wallet
    )
}


