import { Proof } from './types'; // placeholder se precisar importar outras interfaces
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

export interface SovereignFact extends Proof {
  verify(): boolean;
  toProof(): Proof;
}
