---
sidebar_position: 5
---
# Withdrawal


```typescript title="Base URL"
https://api.pointer.io.vn
```

# Withdrawal

```typescript title="Create Order"
curl -X POST /api/payment/withdraw
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
-d {
    email:string,
    currency:string,
    amount:number
}
```

# Response

```typescript title="Response"
{
    "message":"Success",
    "status":200
}
```

# HTTP Status

| Status  | OK            | Description             |
| ------- | ------------- | ----------------------- |
| **200** | OK            | Order have been created |
| **401** | Unauthorized  | Secret key is invalid   |
| **500** | Server Errors | Something went wrong!   |
