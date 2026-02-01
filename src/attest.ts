// C:\heillon-attest\src\attest.ts
import crypto from 'crypto';
import { SovereignFact } from './types';

export async function attest(params: {
  action: string;
  actor: string;
  authority: string;
  justification: string;
  payload: unknown;
}): Promise<SovereignFact> {

  const { action, actor, authority, justification, payload } = params;

  const id = crypto.randomUUID();
  const timestamp = Date.now();
  const previous_hash = null; // Marco Zero, sem histórico ainda

  // 1️⃣ Criar hash do fato
  const hashInput = JSON.stringify({ id, action, actor, authority, justification, payload, timestamp, previous_hash });
  const hash = crypto.createHash('sha256').update(hashInput).digest('hex');

  // 2️⃣ Criar assinatura dummy usando o hash
  const signature = crypto.createHash('sha256').update(hash + 'dummy-signature').digest('hex');

  // 3️⃣ Retornar o fato soberano
  const fact: SovereignFact = {
    id,
    hash,
    previous_hash,
    timestamp,
    authority,
    justification,
    payload,
    signature,
    verify() {
      const recomputedHash = crypto.createHash('sha256')
        .update(JSON.stringify({ id, action, actor, authority, justification, payload, timestamp, previous_hash }))
        .digest('hex');
      return recomputedHash === this.hash;
    },
    toProof() {
      return { hash: this.hash, signature: this.signature };
    }
  };

  return fact;
}
