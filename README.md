# @heillon/attest  
**Marco Zero**

> **Este é o ponto onde a verdade começa.**

`attest()` é o primitivo soberano mínimo para gerar fatos criptograficamente verificáveis.

Este SDK **não decide**.  
**Não raciocina**.  
**Não otimiza**.

Ele **atesta**.

---

## O que é `attest()`?

`attest()` converte uma ação, seu contexto e uma autoridade declarada em um **fato soberano**.

Um fato que:

- não pode ser sobrescrito silenciosamente  
- não pode existir sem autoridade  
- não pode existir sem tempo  
- não pode existir sem justificativa  

Esse fato é criptograficamente verificável e projetado para ser **auditável por terceiros**.

---

## Nota Conceitual (Importante)

No HEILLON, **um fato não emerge de uma ação isolada**.

Um fato só existe quando uma **intenção explícita** é declarada **sob autoridade**, e é **ancorada no tempo e na continuidade causal**.

Campos como `action` ou `actor`, quando presentes, são **metadados descritivos**.  
Eles **não** são fontes de autoridade, verdade ou legitimidade.

A autoridade deve ser sempre explicitamente declarada.  
Tempo e causalidade são intrínsecos ao processo de atestação.

---

## Uso Canônico

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

