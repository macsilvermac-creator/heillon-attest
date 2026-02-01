// C:\heillon-attest\src\attest.ts

import crypto from 'crypto';
import { SovereignFact, Proof } from './types';

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

  const hashInput = JSON.stringify({ id, action, actor, authority, justification, payload, timestamp, previous_hash: lastHash });
  const hash = crypto.createHash('sha256').update(hashInput).digest('hex');

  const previous_hash = lastHash;

  // Placeholder de assinatura (para Marco Zero)
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
      const recomputedHash = crypto.createHash('sha256')
        .update(JSON.stringify({ id, action, actor, authority, justification, payload, timestamp, previous_hash }))
        .digest('hex');
      return recomputedHash === this.hash;
    },
    toProof() {
      const proof: Proof = { ...this };
      return proof;
    }
  };

  lastHash = hash;

  return fact;
}
