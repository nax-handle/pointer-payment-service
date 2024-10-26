---
sidebar_position: 2
---

# Create Order

With this api you can create new order and get status after payment with webhook

```typescript title="Base URL"
https://api-wallet.pointer.io.vn/
```

# Create Order

```typescript title="Create Order"
curl -X POST /api/payment/create-order
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
-d {
  amount: number;
  currency: "VND" | "USD" | "ETH";
  message: string;
  userID: string;
  orderID: string;
  returnUrl: string;
  orders?: {
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
  }[];
}
```

# Response

```typescript title="Response"
{
    "url":"https://pointer.io.vn/payment-gateway?token={token}"
}
```

# HTTP Status

| Status  | OK            | Description             |
| ------- | ------------- | ----------------------- |
| **200** | OK            | Order have been created |
| **401** | Unauthorized  | Secret key is invalid   |
| **500** | Server Errors | Something went wrong!   |
