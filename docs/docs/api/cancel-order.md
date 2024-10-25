---
sidebar_position: 3
---

# Cancel Order

With this api you can create new order and get status after payment with webhook

```typescript title="Base URL"
https://api-wallet.pointer.io.vn/
```


```typescript title="Cancel Order"
curl -X POST api/v1/order/cancel/:id
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
```

# Response

```typescript title="Response"
{
    "url":"https://pointer.io.vn/payment-gateway?token={token}"
    "status":200
}
```

# HTTP Status

| Status  | OK            | Description |
| ------- | ------------- | ----------- |
| **200** | OK            |             |
| **401** | Unauthorized  |             |
| **500** | Server Errors |             |
