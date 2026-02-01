import crypto from 'crypto';
import { SovereignFact, Proof } from './types';

// Marco Zero: Nenhum hash anterior ainda
let lastHash: string | null = null;

export async function attest({
  action,
  actor,
  authority,
  justification,
  payload
}: {
  action: string;
  actor: string;
  authority: string;
  justification: string;
  payload: unknown;
}): Promise<SovereignFact> {

  const timestamp = Date.now();
  const id = crypto.randomUUID();

  // Gerar hash do fato
  const hashInput = JSON.stringify({ id, action, actor, authority, justification, payload, timestamp, previous_hash: lastHash });
  const hash = crypto.createHash('sha256').update(hashInput).digest('hex');

  const previous_hash = lastHash;

  // Assinatura placeholder (substituir por chave real depois)
  const signature = crypto.createSign('SHA256').update(hash).end().sign('dummy-private-key', 'hex');

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
      const recomputedHash = crypto.createHash('sha256').update(JSON.stringify({ id, action, actor, authority, justification, payload, timestamp, previous_hash })).digest('hex');
      return recomputedHash === this.hash;
    },
    toProof() {
      return { ...this };
    }
  };

  // Atualiza hash anterior para próximo fato
  lastHash = hash;

  return fact;
}
