export type AttestationInput = {
  action: string
  actor: string
  authority: string
  justification: string
  payload?: Record<string, unknown>
}

export type SovereignFact = {
  id: string
  hash: string
  timestamp: string
  authority: string
  action: string
}

export async function attest(
  input: AttestationInput
): Promise<SovereignFact> {
  throw new Error('Not implemented')
}
