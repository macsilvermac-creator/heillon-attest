// C:\heillon-attest\src\types.ts

export interface Proof {
  id: string;
  hash: string;
  previous_hash: string | null;
  timestamp: number;
  authority: string;
  justification: string;
  payload: unknown;
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

  // Métodos de verificação
  verify(): boolean;
  toProof(): Proof;
}
