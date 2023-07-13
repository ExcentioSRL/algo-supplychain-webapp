export enum Status{
    owned = "owned",
    requested = "requested",
    requested_by = "requested by"
}

export class StockClass {
    id: number;
    producer: string;
    status: Status;
    requester? : string;

    constructor(id: number, producer: string, status: Status, requester?: string){
        this.id = id;
        this.producer = producer;
        this.status = status;
        this.requester = requester;
    }
}

//this is class which define the style of the stock component

export class StockStyle{
    color_writing: string;
    color_button: string;

    constructor(color_writing: string, color_button: string){
        this.color_writing = color_writing;
        this.color_button = color_button;
    }
}