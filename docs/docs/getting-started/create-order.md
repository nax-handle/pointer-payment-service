---
sidebar_position: 2
---

# Create Order

After configure

:::tip

One **order** can have multiple products

:::

## Create your order

```typescript title="Create Order"
const { url } = await pointerPayment.createPayment({
  amount: 500000,
  currency: "VND",
  message: "Payment with Pointer",
  userID: "uuid-123",
  orderID: "uuid-123",
  returnUrl: "string",
  orders: [
    {
      name: "Apple",
      image: "https://www.youtube.com/watch?v=TD7sBUigDIU",
      description: "Apple apple",
      quantity: 10,
      price: 25000,
    },
    {
      name: "Coconut",
      image: "https://www.youtube.com/watch?v=TD7sBUigDIU",
      description: "Coconut coconut, i need it",
      quantity: 10,
      price: 25000,
    },
  ],
});
console.log(url);
```

:::tip

**3** Currencies available `VND`, `USD`, `ETH`.

:::
| Field | Type | Description |
| ------- | ------------- | ----------------------- |
| **amount** | OK | Order have been created |
| **currency** | | Secret key is invalid |
| **userID** | a | x |
| **orderID** | a | x |
| **partner** | a | x |
| **returnUrl** | a | x |
