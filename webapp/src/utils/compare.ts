import { StockClass } from "@/types/stock";

function compareUuid(a: StockClass, b: StockClass): number{
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

function compareProducer(a: StockClass, b: StockClass): number{
    if (a.producer < b.producer) {
        return -1;
    }
    if (a.producer > b.producer) {
        return 1;
    }

    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

function compareStatus(a: StockClass, b: StockClass): number{
    if (a.status < b.status) {
        return -1;
    }
    if (a.status > b.status) {
        return 1;
    }

    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

function compareRequester(a: StockClass, b: StockClass) : number{
    if (a.requester !== undefined && b.requester === undefined) {
        return -1;
    }
    if (a.requester === undefined && b.requester !== undefined) {
        return 1;
    }
    if (a.requester !== undefined && b.requester !== undefined) {
        if (a.requester < b.requester) {
            return -1;
        }
        if (a.requester > b.requester) {
            return 1;
        }
    }
    return 0;
}

function compareOwner(a: StockClass, b:StockClass){
    if (a.owner !== undefined && b.owner === undefined) {
        return -1;
    }
    if (a.owner === undefined && b.owner !== undefined) {
        return 1;
    }
    if (a.owner !== undefined && b.owner !== undefined) {
        if (a.owner < b.owner) {
            return -1;
        }
        if (a.owner > b.owner) {
            return 1;
        }
    }
    return 0;
}

export { compareProducer, compareRequester, compareStatus, compareUuid, compareOwner}