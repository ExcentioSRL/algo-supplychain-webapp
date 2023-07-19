import { io } from "socket.io-client";
import type { StockRequest } from "@/types/request";
import type { Stock } from "@/types/stock";

export const socket = io("http://localhost:3000");


export function walletConnectionSocket(wallet : string){
    socket.connect()
    socket.timeout(5000).emit("wallet_connect", wallet, () => {

    })
}

export function walletDisconnectionSocket(){
    socket.timeout(5000).emit("wallet_disconnect")
    socket.disconnect()
}

export function createStockSocket(id: string) : Stock[]{
    socket.timeout(5000).emit("stock_creation",id,() => {
        //ricevo una nuova lista di stock
    })
}

export function changeStockOwnerSocket(id: string){
    socket.timeout(5000).emit("stock_change_ownership",id,() => {

    })
}

export function createRequestSocket(request: StockRequest){
    socket.timeout(5000).emit("create_request",request,() => {

    })
}

export function deleteRequestSocket(request: StockRequest){
    socket.timeout(5000).emit("delete_request",request,() => {

    })
}
