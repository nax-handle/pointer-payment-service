---
sidebar_position: 1
---

# Introduction

The Pointer Wallet API provides a seamless and secure way to integrate payment functionalities into your applications. This service is designed to enable developers to process transactions, manage wallets, and handle payments with ease while ensuring high security and performance standards.

```typescript title="Base URL"
https://api.pointer.io.vn/
```

:::note

The package needs a **secret key** to configure, which you can get at **[Pointer Wallet Dashboard](https://pointer.io.vn/)**

:::

```typescript title="Test API"
curl -X POST api/v1/test
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
```
