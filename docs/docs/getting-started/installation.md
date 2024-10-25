---
sidebar_position: 1
---

# Installation

# Pointer Wallet Node.js Library

```
npm install pointer-wallet
```

or

```
yarn add pointer-wallet
```

## Configure

:::note

The package needs a **secret key** to configure, which you can get at **[Pointer Wallet Dashboard](https://pointer.io.vn/)**

:::

```typescript title="Typescript"
import { Pointer } from "pointer-wallet";
const pointer = new Pointer(process.env.POINTER_SECRET_KEY);
```
or
```javascript title="Javascript"
const { Pointer } = require("pointer-wallet");
const pointer = new Pointer(process.env.POINTER_SECRET_KEY);
```
