// C:\heillon-attest\src\types.ts

export interface SovereignFact {
  id: string;
  hash: string;
  previous_hash: string | null;
  timestamp: number;
  authority: string;
  justification: string;
  payload: unknown;
  signature: string;

  // Métodos
  verify(): boolean;
  toProof(): { hash: string; signature: string };
}
