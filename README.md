# @heillon/attest

> **Marco Zero**
>
> This is where truth begins.

`attest()` is the minimal sovereign primitive for generating
cryptographically verifiable facts.

This SDK does not decide.
It does not reason.
It does not optimize.

It **attests**.

---

## What is `attest()`?

`attest()` converts an action, its context, and its authority
into a **sovereign fact**.

A fact that:
- cannot be silently overwritten
- cannot exist without authority
- cannot exist without time
- cannot exist without justification

---

## Canonical Usage

```ts
import { attest } from '@heillon/attest';

const fact = await attest({
  action: 'payment.process',
  actor: 'service.billing',
  authority: 'finance.ops',
  justification: 'invoice_8741',
  payload: {
    amount: 5000,
    currency: 'USD'
  }
});

console.log(fact);

