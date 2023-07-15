export enum Status{
    owned = "owned",
    requested = "requested",
    requested_by = "requested by",
    unavailable = "unavailable"
}

export class StockClass {
    id: number;
    producer: string;
    status: Status;
    requester? : string;
    owner? : string;

    constructor(id: number, producer: string, status: Status, requester?: string, owner?:string){
        this.id = id;
        this.producer = producer;
        this.status = status;
        this.requester = requester;
        this.owner = owner
    }
}
