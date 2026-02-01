// C:\heillon-attest\test\attest.test.ts

import { attest } from '../src/attest';
import { SovereignFact } from '../src/types';

(async () => {
  try {
    console.log('Iniciando teste mínimo de SovereignFact...');

    // Cria fato soberano
    const fact: SovereignFact = await attest({
      action: 'payment.process',
      actor: 'service.billing',
      authority: 'finance.ops',
      justification: 'invoice_8741',
      payload: { amount: 5000, currency: 'USD' }
    });

    // Teste verify() - deve passar
    if (!fact.verify()) {
      console.error('❌ verify() falhou no fato original');
      process.exit(1);
    }
    console.log('✅ verify() passou no fato original');

    // Teste verify() - alterar payload deve falhar
    const originalPayload = fact.payload;
    fact.payload = { amount: 9999, currency: 'USD' }; // alteração intencional
    if (fact.verify()) {
      console.error('❌ verify() não detectou alteração');
      process.exit(1);
    }
    // Restaurar payload original
    fact.payload = originalPayload;
    console.log('✅ verify() falha corretamente quando o fato é alterado');

    // Teste toProof()
    const proof = fact.toProof();
    if (!proof || proof.hash !== fact.hash) {
      console.error('❌ toProof() retornou prova inconsistente');
      process.exit(1);
    }
    console.log('✅ toProof() retornou prova consistente');

    console.log('Todos os testes mínimos passaram ✔️');

  } catch (err) {
    console.error('Erro ao rodar testes:', err);
    process.exit(1);
  }
})();
