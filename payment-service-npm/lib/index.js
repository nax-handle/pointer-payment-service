"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointer = pointer;
const axios_1 = require("axios");
class Pointer {
    constructor(apiKey) {
        this.createPayment = (body) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(body);
                const response = yield this.req.get('/api/v1/user/get-users?page=1&page_limit=1');
                console.log(JSON.stringify(response.data));
            }
            catch (error) {
                console.error('Error creating payment:', error);
            }
        });
        this.createRefund = () => __awaiter(this, void 0, void 0, function* () {
        });
        console.log(apiKey);
        this.apiKey = apiKey;
        this.req = axios_1.default.create({
            baseURL: 'https://api-presspay.azurewebsites.net',
            timeout: 10000,
            headers: {
                'x-api-key': this.apiKey
            }
        });
    }
}
function pointer(apiKey) {
    return new Pointer(apiKey);
}
