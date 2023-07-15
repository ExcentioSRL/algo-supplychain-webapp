import axios from 'axios';

// my requests for other's stocks
export async function getMyRequests(requester: string){
    const result = await axios.get(
        'http:localhost:3000/requests/getRequestsByRequester?requester=' + requester
    )
    return result.data;
}

//the requests made by other people for my stocks
export async function getOthersRequests(owner: string) {
    const result = await axios.get(
        'http:localhost:3000/requests/getRequestsByOwner?owner=' + owner
    )
    return result.data;
}

export async function deleteRequest(id: string){
    return await axios.delete(
        'http://localhost:3000/requests/deleteRequest?id='+id
    )
}

export async function createRequest(id: number, owner: string, requester: string){
    return axios.post(
        'http://localhost:3000/requests/createRequest',{id,owner,requester}
    )
}