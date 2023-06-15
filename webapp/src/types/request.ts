export class StockRequest{
    id_stock: number
    new_owner: string

    constructor(id_stock : number, new_owner : string){
        this.id_stock = id_stock;
        this.new_owner = new_owner;
    }
}