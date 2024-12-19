---
sidebar_position: 6
---

# Quick Payment

## Quick Payment

:::tip
Required: Webhook event succeeded
You must configure
Connect Wallet: https://pointer.io.vn/connect-app?partnerId=${partnerId}&returnUrl={returnUrl}&userId={userId}
:::

### Syntax

```typescript
await pointerPayment.connectedPayment({
  signature: "ecacfe1ff1f4ccc2cd27b0102e382dfb827c7493sasd4b4e636979d0",
  amount: 1000,
  currency: "VND",
  message: "Payment for order #12345",
  userID: "user_12345",
  orderID: "order_67890",
  providerID: "provider_ABC", // Optional
  returnUrl: "https://example.com/return",
});
```

:::tip

**3** Currencies available `VND`, `USD`, `ETH`.

:::
| Field | Type | Description |
| ------- | ------------- | ----------------------- |
| **signature** | string | |
| **amount** | number | |
| **currency** | string | |
| **message** | string | |
| **userID** | string | |
| **orderID** | string | |
| **providerID** | string | |
| **returnUrl** | string | |
