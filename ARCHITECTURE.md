# Arquitetura

O projeto segue um **monólito modular** para Next.js App Router. A organização evita acoplamento entre tela, regra de negócio e infraestrutura, sem exigir uma migração de uma vez.

```
src/
  app/          # rotas, layouts e composição de página
  features/     # domínio e casos de uso por capacidade de negócio
  core/         # infraestrutura compartilhada (HTTP, erros, configurações)
  components/   # UI reutilizável enquanto a migração para features é gradual
```

## Regras de dependência

- `app` pode depender de `features` e `components`.
- `features` contém tipos e regras puras; não depende de React, Next ou HTTP.
- `core` encapsula detalhes técnicos compartilhados.
- Componentes não conhecem `fetch` nem a URL da API: chamam serviços/casos de uso tipados.

## Aplicado nesta etapa

- `features/menu/domain`: contrato de produto do cardápio.
- `features/cart/domain`: reducer e cálculo de total puros, com uma única fonte de verdade no `CartProvider`.
- `core/http`: cliente de API e erro padronizado.
- Serviços de produto e categoria usam o cliente HTTP compartilhado e payloads explícitos.

## Próximas migrações recomendadas

1. Mover `CardapioComponents` e seus componentes para `features/menu/presentation` e separar montagem de pedido (WhatsApp) em um caso de uso.
2. Substituir `any` em perfil da loja e formulários por DTOs e validação de entrada (por exemplo, Zod).
3. Consolidar `authClient`, `authAdmin` e `logoutService` em `features/auth`, com um contrato de sessão por papel.
4. Adicionar testes unitários aos módulos puros de `features/cart/domain` e testes de integração aos serviços HTTP.
