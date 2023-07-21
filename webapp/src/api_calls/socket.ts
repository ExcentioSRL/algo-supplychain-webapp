import { io } from "socket.io-client";
import type { Stock } from "@/types/stock";

export const socket = io("http://localhost:3000");

export async function walletConnectionSocket(wallet : string) : Promise<Stock[]>{
    socket.connect()
    const response = await socket.timeout(5000).emitWithAck("wallet_login", wallet)
    return response
}

export function walletDisconnectionSocket(){
    socket.timeout(5000).emit("wallet_logout")
    socket.disconnect()
}

export async function createStockSocket(id: string): Promise<Stock[]>{
    const response = await socket.timeout(5000).emitWithAck("stock_creation",id)
    return response
}

export async function changeStockOwnerSocket(id: string): Promise<Stock[]>{
    const response = await socket.timeout(5000).emitWithAck("stock_change_ownership",id)
    return response
}

export async function createRequestSocket(id: string, oldOwner: string, requester: string): Promise<Stock[]>{
    const response = await socket.timeout(5000).emitWithAck("create_request",id,oldOwner,requester)
    return response
}

export async function approveRequestSocket(id: string){
    const response = await socket.timeout(5000).emitWithAck("approve_request",id)
    return response;
}

export async function deleteRequestSocket(id: string): Promise<Stock[]>{
    const response = await socket.timeout(5000).emitWithAck("delete_request",id)
    return response
}

export async function searchStocksSocket(data: string,walletAddress: string) : Promise<Stock[]>{
    const response = await socket.timeout(10000).emitWithAck("search_stocks",data,walletAddress)
    return response 
}

export async function getStocksSocket() : Promise<Stock[]>{
    const response = await socket.timeout(5000).emitWithAck("get_stocks")
    return response
}

export async function generateQRSocket(){
    const response = await socket.timeout(5000).emitWithAck('generate_qr')
    return response;
}