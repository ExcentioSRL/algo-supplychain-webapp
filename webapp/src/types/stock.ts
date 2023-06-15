export enum Status{
    owned = "owned",
    requested = "requested"
}

export class StockClass {
    uuid: number;
    producer: string;
    status: Status;

    constructor(uuid: number, producer: string, status: Status){
        this.uuid = uuid;
        this.producer = producer;
        this.status = status;
    }
}
