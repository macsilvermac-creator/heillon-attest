// C:\heillon-attest\src\types.ts
export interface Proof {
  hash: string;
  signature: string;
}

export interface SovereignFact {
  id: string;
  hash: string;
  previous_hash: string | null;
  timestamp: number;
  authority: string;
  justification: string;
  payload: unknown;
  signature: string;
  action: string;
  actor: string;

  verify(): boolean;
  toProof(): Proof;
}
