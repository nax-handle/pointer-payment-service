---
sidebar_position: 2
---

# Create Order

After configure

:::tip

One **order** can have multiple products

:::

## Create your order

```typescript title="typescript"
const response = await pointer.createPayment({
  amount: 5000,
});
```

## Response

```typescript title="typescript"
const response = await pointer.createPayment({
  "amount":"20000",
  "currency":"VND",
  "message":"Product's name",
  "userID":"{userID}",
  "orderID":"{orderID}"
  "returnUrl":"your.domain.com/order?id={orderID}",
  "":""
});
```
:::tip

**3** Currencies available `VND`, `USD`, `ETH`.

:::