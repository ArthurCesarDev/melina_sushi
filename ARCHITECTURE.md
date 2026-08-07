# Arquitetura

O projeto usa um monólito modular com Next.js App Router. A estrutura separa regras de negócio, integração HTTP e componentes de interface.

```text
src/
  app/                  rotas, layouts e composição de páginas
  features/
    auth/               autenticação administrativa e do cliente
    cart/               regras e interface do carrinho
    catalog/            categorias e produtos administrativos
    menu/               cardápio público
    store/              perfil e horários da loja
  core/                 HTTP, upload e tratamento de erros compartilhados
  components/
    layout/             estrutura visual compartilhada
    feedback/           notificações
    ui/                 diálogos genéricos
  context/              providers globais do React
  config/               configuração estática do negócio
```

## Regras de dependência

- `app` compõe telas e depende de `features` e componentes compartilhados.
- Cada feature divide código em `domain`, `data` e `presentation` quando essas camadas são necessárias.
- `domain` contém somente tipos e regras puras; não depende de React, Next.js ou HTTP.
- `data` traduz chamadas externas para contratos do domínio.
- `presentation` trata estado e interação visual, delegando persistência aos serviços.
- `core` não depende de features ou componentes.
- Componentes compartilhados não fazem chamadas HTTP.

## Convenções

- Não usar `any`; erros capturados começam como `unknown`.
- Não duplicar componentes dentro de rotas. Componentes exclusivos de um domínio pertencem à feature correspondente.
- Páginas devem ser pequenas e responsáveis principalmente por composição.
- Toda chamada autenticada passa por `core/http`.
- Uploads de imagem passam por `core/files/image-upload-service`.
- Antes de entregar alterações, executar `npm run typecheck` e `npm run build`.
