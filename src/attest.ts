// src/attest.ts
// HEILLON — Marco Zero
// This is where truth begins.

export type AttestationInput = {
  action: string
  actor: string
  authority: string
  justification: string
  payload: Record<string, unknown>
}

export type SovereignFact = {
  id: string
  hash: string
  issuedAt: string
  action: string
  actor: string
  authority: string
  justification: string
  payload: Record<string, unknown>
}

/**
 * attest()
 *
 * The minimal sovereign primitive.
 * Converts an intention into an immutable, verifiable fact.
 *
 * This function does NOT decide.
 * It does NOT optimize.
 * It does NOT reason.
 *
 * It attests.
 */
export function attest(input: AttestationInput): SovereignFact {
  // Basic invariant checks (Marco Zero)
  if (!input.action) throw new Error('Action is required')
  if (!input.actor) throw new Error('Actor is required')
  if (!input.authority) throw new Error('Authority is required')
  if (!input.justification) throw new Error('Justification is required')

  const issuedAt = new Date().toISOString()

  // Deterministic materialization of the fact
  const materialized = {
    action: input.action,
    actor: input.actor,
    authority: input.authority,
    justification: input.justification,
    payload: input.payload,
    issuedAt
  }

  // Deterministic hash (Marco Zero – no crypto lib yet)
  const hash = JSON.stringify(materialized)

  return {
    id: `fact_${Date.now()}`,
    hash,
    issuedAt,
    action: input.action,
    actor: input.actor,
    authority: input.authority,
    justification: input.justification,
    payload: input.payload
  }
}
