import { StockClass } from "@/types/stock";

function compareUuid(a: StockClass, b: StockClass): number{
    if (a.uuid < b.uuid) {
        return -1;
    }
    if (a.uuid > b.uuid) {
        return 1;
    }
    return 0;
}

function compareName(a: StockClass, b: StockClass): number{
    if (a.producer < b.producer) {
        return -1;
    }
    if (a.producer > b.producer) {
        return 1;
    }

    if (a.uuid < b.uuid) {
        return -1;
    }
    if (a.uuid > b.uuid) {
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

    if (a.uuid < b.uuid) {
        return -1;
    }
    if (a.uuid > b.uuid) {
        return 1;
    }
    return 0;
}

function compareRequesters(a: StockClass, b: StockClass) : number{
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

export{compareName,compareRequesters,compareStatus,compareUuid}