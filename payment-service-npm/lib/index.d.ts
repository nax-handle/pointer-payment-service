import { createOrderDto, resCancelOrderDto, resCreateOrderDto } from "./types";
export declare class Pointer {
    private apiKey;
    private instance;
    constructor(apiKey: string);
    createPayment: (body: createOrderDto) => Promise<resCreateOrderDto>;
    cancelOrder: (transactionID: string) => Promise<resCancelOrderDto>;
}
