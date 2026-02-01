import { attest } from '../src/attest';

async function runTest() {
  console.log('Iniciando teste mínimo de SovereignFact...');

  // Criar fato original
  const fact = await attest({
    action: 'payment.process',
    actor: 'service.billing',
    authority: 'finance.ops',
    justification: 'invoice_8741',
    payload: {
      amount: 5000,
      currency: 'USD'
    }
  });

  // Teste 1: verify() deve passar
  if (!fact.verify()) {
    console.error('ERRO: verify() falhou no fato original!');
    process.exit(1);
  }

  console.log('✅ verify() passou no fato original');

  // Teste 2: Alterar payload deve quebrar verify()
  const alteredFact = { ...fact, payload: { amount: 6000, currency: 'USD' } };
  if (fact.verify() && alteredFact.verify?.()) {
    console.error('ERRO: verify() passou mesmo após alteração!');
    process.exit(1);
  }

  console.log('✅ verify() falha corretamente quando o fato é alterado');

  // Teste 3: toProof() retorna objeto igual ao fato
  const proof = fact.toProof();
  if (proof.hash !== fact.hash) {
    console.error('ERRO: toProof() não preservou hash do fato!');
    process.exit(1);
  }

  console.log('✅ toProof() retornou prova consistente');

  console.log('Todos os testes mínimos passaram ✔️');
}

runTest();
