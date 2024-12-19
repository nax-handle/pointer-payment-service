---
sidebar_position: 4
---

# Refund

```typescript title="Base URL"
https://api.pointer.io.vn/
```

# Refund
### Webhook Requirements

1. The webhook endpoint must accept `POST` requests.
2. Ensure the endpoint is secured (e.g., via authentication or IP whitelisting).
3. The webhook should process and store the received payload (`orderID` and `status`).

### Webhook Payload

Pointer Wallet will send the following payload for `Payment` events:

```json
{
  "orderID": string,
  "status": 200
}
```
# API

```typescript title="Refund"
curl -X POST /api/payment/refund
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
-d {
    orderID:string
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
