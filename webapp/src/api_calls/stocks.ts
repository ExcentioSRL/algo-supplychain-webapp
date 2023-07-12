import * as sdk from "algosdk"
import axios from 'axios'
import * as pera from "@perawallet/connect";
import { useDataStore } from "../stores/store"
import appspec from '../dApp_schema/application.json'
import { intToArray, intToArrayv2 } from "@/utils/num_to_array";
import { type } from "os";

// ------ USA WEB SOCKETS ------ //

let algodClient : any;
const appID = 256007602;
const contract = new sdk.ABIContract(appspec.contract)
const addStockMethodSelector = sdk.getMethodByName(contract.methods,"add_stock")
const changeOwnerMethodSelector = sdk.getMethodByName(contract.methods,"change_owner")

const store = useDataStore()
const connectPera = new pera.PeraWalletConnect();

function createAlgodClient() {
    return new sdk.Algodv2('', 'https://testnet-api.algonode.cloud', '')
}

async function signTxns(unsignedTxns: Array<sdk.Transaction>) {
    const signerTransactions = unsignedTxns.map(txn => {
        return {
            txn,
            signers: [sdk.encodeAddress(txn.from.publicKey)]
        }
    })
    return await connectPera.signTransaction([signerTransactions])
}

async function signer(txns: sdk.Transaction[]) {
    return await signTxns(txns)
}

async function createAndSendTransaction(methodName: sdk.ABIMethod,id: number){
    if (algodClient === undefined) {
        algodClient = createAlgodClient();
    }
    try{
        let boxName : Uint8Array = new Uint8Array(8);
        boxName!.set(intToArray(id),1);
        console.log("BoxName: " + boxName!)
        const suggestedParams = await algodClient.getTransactionParams().do()
        const atc = new sdk.AtomicTransactionComposer();
        console.log("TIPO: " + typeof(id))
        atc.addMethodCall({
            suggestedParams,
            sender: store.data.wallet,
            signer: signer,
            appID: appID,
            method: methodName,
            methodArgs:[id,store.data.wallet],
            boxes: [{appIndex: appID,name: boxName!}]
            
        })
        await atc.execute(algodClient, 3)

    }catch(error){
        console.log("errore: " + error)
    }
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


