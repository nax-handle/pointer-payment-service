# Pointer Payment Service Documentation
## Overview
   Pointer is a comprehensive payment service that allows you to integrate secure payment solutions into your applications.


## Documentation
Docs: https://pointer.io.vn

## Pointer Wallet API Overview

Payment API: https://api.pointer.io.vn

## Payment Service Library

Npm: https://www.npmjs.com/package/pointer-wallet

## Usage

> [!NOTE]
> The package needs a secret key to configure, which you can get at **[Pointer Wallet Dashboard](https://pointer.io.vn/)**

```typescript
import { Pointer } from "pointer-wallet";
const pointerPayment = new Pointer(process.env.POINTER_SECRET_KEY);

class PointerServices {
  static async createOrder() {
    await pointerPayment.createPayment({
      amount: 500000,
      currency: "VND",
      message: "Payment with Pointer",
      userID: "uuid-123",
      orderID: "uuid-123",
      returnUrl: "string",
      orders: [
        {
          name: "Apple",
          image: "url",
          description: "Apple apple",
          quantity: 10,
          price: 25000,
        },
        {
          name: "Coconut",
          image: "url",
          description: "Coconut coconut, i need it",
          quantity: 10,
          price: 25000,
        },
      ],
    });
  }
}
```

# Contact Us


