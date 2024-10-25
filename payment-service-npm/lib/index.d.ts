import { Payment } from './types';
declare class Pointer {
    private apiKey;
    private req;
    constructor(apiKey: string);
    createPayment: (body: Payment) => Promise<void>;
    createRefund: () => Promise<void>;
}
export declare function pointer(apiKey: string): Pointer;
export {};
