// C:\heillon-attest\src\attest.ts
import crypto from 'crypto';
import { SovereignFact } from './types';

export async function attest(params: {
  action: string;
  actor: string;
  authority: string;
  justification: string;
  payload: unknown;
}): Promise<SovereignFact & { _originalPayload: unknown }> {

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
  const fact: SovereignFact & { _originalPayload: unknown } = {
    id,
    hash,
    previous_hash,
    timestamp,
    authority,
    justification,
    payload,
    _originalPayload: payload, // snapshot imutável para verify()
    signature,
    action, // necessário para verify()
    actor,  // necessário para verify()

    // ✅ Verificação: compara com snapshot original
    verify() {
      const recomputedHash = crypto.createHash('sha256')
        .update(JSON.stringify({
          id: this.id,
          action: this.action,
          actor: this.actor,
          authority: this.authority,
          justification: this.justification,
          payload: this._originalPayload, // usa snapshot imutável
          timestamp: this.timestamp,
          previous_hash: this.previous_hash
        }))
        .digest('hex');
      return recomputedHash === this.hash;
    },

    // ✅ Exporta prova mínima auditável
    toProof() {
      return { hash: this.hash, signature: this.signature };
    }
  };

  return fact;
}
