---
sidebar_position: 3
---

# Cancel Order

```typescript title="Base URL"
https://api.pointer.io.vn
```

```typescript title="Cancel Order"
curl -X POST api/v1/order/cancel/:orderID
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
```

# Response

```typescript title="Response"
{
    "status":200
}
```

# HTTP Status

| Status  | OK            | Description |
| ------- | ------------- | ----------- |
| **200** | OK            |             |
| **401** | Unauthorized  |             |
| **500** | Server Errors |             |
