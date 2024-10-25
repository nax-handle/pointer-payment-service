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
curl -X POST api/v1/order/create
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
-d {
    "amount":"20000",
    "currency":"VND",
    "message":"Product's name",
    "userID":"668fd2abaa7b610a6e7089ee",
    "OrderID":"Order001"
    "return_url":"your.domain.com/order?id={orderID}",
}
```

# Response

```typescript title="Response"
{
    "url":"https://pointer.io.vn/payment-gateway?token={token}"
}
```

# HTTP Status

| Status  | OK            | Description |
| ------- | ------------- | ----------- |
| **200** | OK            |             |
| **401** | Unauthorized  |             |
| **500** | Server Errors |             |
