import * as sdk from "algosdk"
import axios from 'axios'
import * as pera from "@perawallet/connect";
import { useDataStore } from "../stores/store"
import appspec from '../dApp_schema/application.json'

// ------ USA WEB SOCKETS ------ //

let algodClient : any;
const appID = 258591089;
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

async function createAndSendTransaction(methodName: sdk.ABIMethod,id: string){
    if (algodClient === undefined) {
        algodClient = createAlgodClient();
    }
    try{
        let boxName = new Uint8Array(Buffer.from(id));
        const suggestedParams = await algodClient.getTransactionParams().do()
        const atc = new sdk.AtomicTransactionComposer();
        atc.addMethodCall({
            suggestedParams,
            sender: store.data.wallet,
            signer: signer,
            appID: appID,
            method: methodName,
            methodArgs:[id,store.data.wallet],
            boxes: [{appIndex: appID,name: boxName}]
            
        })
        await atc.execute(algodClient, 3)

    }catch(error){
        console.log("errore: " + error)
    }
}

export async function addStock(id: string) {
    return await createAndSendTransaction(addStockMethodSelector,id)
}

export async function changeOwner(id: string){
    return await createAndSendTransaction(changeOwnerMethodSelector,id)
}

export async function searchStocks(data : any){
    return await axios.get(
        "http://localhost:3000/stocks/searchStocks?data=" + data
    )
}

