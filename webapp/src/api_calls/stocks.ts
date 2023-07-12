import * as sdk from "algosdk"
import axios from 'axios'
import * as pera from "@perawallet/connect";
import { useDataStore } from "../stores/store"
import appspec from '../dApp_schema/application.json'


// ------ USA WEB SOCKETS ------

let algodClient : any;
const appID = 256007602;
const contract = new sdk.ABIContract(appspec.contract)
const addStockMethodSelector = sdk.getMethodByName(contract.methods,"add_stock").getSelector()
const changeOwnerMethodSelector = sdk.getMethodByName(contract.methods,"change_owner").getSelector()

const store = useDataStore()
const connectPera = new pera.PeraWalletConnect();

function createAlgodClient() {
    return new sdk.Algodv2('', 'https://testnet-api.algonode.cloud', '')
}

function mapAndSignTransaction(transaction : sdk.Transaction){
    const transactionGroup = [{ txn: transaction, signers: [store.data.wallet] }]
    return connectPera.signTransaction([transactionGroup]);
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

    const signedTransaction = mapAndSignTransaction(transaction)
    await algodClient.sendRawTransaction(signedTransaction).do()
    await sdk.waitForConfirmation(algodClient, transaction.txID(), 4)
}

export async function addStock(id: number) {
    return await createAndSendTransaction(addStockMethodSelector,id)
}

export async function changeOwner(id:number){
    return await createAndSendTransaction(changeOwnerMethodSelector,id)
}

export async function getStocks() {
    return await axios.get(
        "http://localhost:3000/stocks/getStocks?user=" + useDataStore().data.wallet
    )
}


