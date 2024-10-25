---
sidebar_position: 1
---

# Introduction

Pointer provides some API to use our services

```typescript title="Base URL"
https://api-wallet.pointer.io.vn/
```

:::note

The package needs a **secret key** to configure, which you can get at **[Pointer Wallet Dashboard](https://pointer.io.vn/)**

:::

```typescript title="Test API"
curl -X POST api/v1/test
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' + secret_key \
```
