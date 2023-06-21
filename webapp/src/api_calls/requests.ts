//crea richiesta
//elimina richiesta
//fetcha tutte le richieste per user

import axios from 'axios';

// my requests for other's stocks
export async function getMyRequests(requester: string){
    return await axios.get(
        'http:localhost:3000/requests/getRequestsByRequester?requester=' + requester
    )
}

//the requests for my stocks made by other people
export async function getOthersRequests(owner: string) {
    return await axios.get(
        'http:localhost:3000/requests/getRequestsByOwner?owner=' + owner
    )
}

export async function deleteRequest(id: string){
    return await axios.delete(
        'http://localhost:3000/requests/deleteRequest?id='+id
    )
}

export async function createRequest(id: string, owner: string, requester: string){
    return axios.post(
        'http://localhost:3000/requests/createRequest',{id,owner,requester}
    )
}