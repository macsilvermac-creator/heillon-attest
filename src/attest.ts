// ==============================
// HEILLON — Marco Zero
// attest(): Sovereign Fact Primitive
// ==============================

export type AttestationInput = {
  action: string
  actor: string
  authority: string
  justification: string
  payload: Record<string, unknown>
}

export type SovereignFact = {
  id: string
  action: string
  actor: string
  authority: string
  justification: string
  payload: Record<string, unknown>
  issuedAt: string
  hash: string
}

// --- Internal deterministic hash (placeholder, Marco Zero)
function hashFact(input: Omit<SovereignFact, 'hash'>): string {
  const serialized = JSON.stringify(input)
  let hash = 0
  for (let i = 0; i < serialized.length; i++) {
    hash = (hash << 5) - hash + serialized.charCodeAt(i)
    hash |= 0
  }
  return `HZ-${Math.abs(hash)}`
}

// --- THE FUNCTION
export async function attest(
  input: AttestationInput
): Promise<SovereignFact> {
  // Invariant 1: Authority is mandatory
  if (!input.authority) {
    throw new Error('HEILLON: authority is required')
  }

  // Invariant 2: Justification is mandatory
  if (!input.justification) {
    throw new Error('HEILLON: justification is required')
  }

  const issuedAt = new Date().toISOString()

  const factBase = {
    id: crypto.randomUUID(),
    action: input.action,
    actor: input.actor,
    authority: input.authority,
    justification: input.justification,
    payload: input.payload,
    issuedAt
  }

  const hash = hashFact(factBase)

  return {
    ...factBase,
    hash
  }
}
