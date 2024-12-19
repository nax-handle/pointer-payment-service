---
sidebar_position: 6 
---

# Quick Payment

```typescript title="Base URL"
https://api.pointer.io.vn
```
## Step 1: Obtain Your Partner ID
1. Log in to the **[Pointer Wallet Dashboard](https://pointer.io.vn/)**.
2. Navigate to the **Developer** section.
3. Copy your **Partner ID**.

---

## Step 2: Embed the Connection Link
Embed the following link into your user interface to allow users to connect their Pointer Wallet:
```typescript title=""
https://wallet.pointer.io.vn/connect-app?partnerId=${partnerId}&returnUrl={returnUrl}&userId={userId}
```

### Parameters
- `partnerId`: Your unique Partner ID from Step 1.
- `returnUrl`: The URL where users will be redirected after connecting their wallet.
- `userId`: The unique identifier for the user in your system.

## Step 3: Create a Webhook
Set up a webhook to receive the wallet connection signature after the user successfully connects their Pointer Wallet.

Webhook Details: **[View](https://nguynthuhigh.github.io/pointer-payment-service/docs/webhook/connect-wallet/)**

Event Type: connect-wallet

Payload:
```typescript
{
  "userId": "xyz456",
  "signature": "abc123def456ghi789"
}
```
# Quick Payment

```typescript title="Create Order"
curl -X POST /api/payment/connect-wallet/payment
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
-d {
    signature: string,
    amount: number,
    currency: "VND" | "USD" | "ETH";
    message: string,
    userID: string,
    orderID: string,
    returnUrl: string
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
