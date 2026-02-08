# Instituto Jardim

Aplicação web moderna para apresentação de profissionais de saúde e agendamento de consultas via WhatsApp.

> **Filosofia**: Conectar pacientes e profissionais de saúde com simplicidade, elegância e acessibilidade.

---

## Visão Geral

O **Instituto Jardim** é uma Single-Page Application (SPA) desenvolvida com React 18, TypeScript e Vite que permite aos usuários conhecer profissionais de saúde, visualizar horários de atendimento e agendar consultas de forma rápida através do WhatsApp.

**Para quem é este projeto:**
- Pacientes que buscam profissionais especializados em saúde bucal, harmonização facial e fisioterapia
- Desenvolvedores que desejam entender uma aplicação React moderna com TypeScript
- Times de saúde que precisam de uma solução simples de apresentação online

**Por que este projeto existe:**
Facilitar o contato inicial entre pacientes e profissionais de saúde, eliminando barreiras de agendamento e proporcionando uma experiência digital acessível e responsiva.

---

## Módulos / Funcionalidades

| Módulo | Descrição | Localização |
|--------|-----------|-------------|
| **Visualização Principal** | Lista de profissionais e informações de contato | `src/componentes/SecaoProfissionais/`, `src/componentes/SecaoContato/` |
| **Página de Profissional** | Detalhes do profissional e sistema de agendamento | `src/componentes/PaginaProfissional/` |
| **Calendário de Agendamento** | Seleção de data, horário e nome do paciente | `src/componentes/CalendarioAgendamento/` |
| **Camada de Dados** | Tipos TypeScript e dados mockados dos profissionais | `src/dados/` |
| **Sistema de Design** | Variáveis CSS, reset e estilos globais | `src/estilos/` |

---

## Estrutura do Projeto

```
jardim-institute-project/
├── docs/                           # Documentação técnica e planejamento
│   ├── backlog/                    # TASKs de desenvolvimento
│   ├── intake/                     # Capturas de requisitos
│   ├── planning/                   # PRDs e planejamento
│   ├── status/                     # Estado atual do projeto
│   └── technical/                  # Documentação técnica e ADRs
│
├── public/                         # Arquivos estáticos
│   └── imagens/                    # Imagens e SVGs
│       ├── logo.svg
│       ├── favicon.png
│       └── profissionais/          # Fotos dos profissionais
│
├── src/                            # Código-fonte da aplicação
│   ├── componentes/                # Componentes React
│   │   ├── Cabecalho/              # Cabeçalho com logo e título
│   │   ├── CalendarioAgendamento/  # Sistema de agendamento
│   │   ├── CardContato/            # Card de contato (WhatsApp/Localização)
│   │   ├── CardProfissional/       # Card de profissional na listagem
│   │   ├── Logo/                   # Logo do instituto
│   │   ├── PaginaProfissional/     # Página de detalhes do profissional
│   │   ├── Rodape/                 # Rodapé com copyright
│   │   ├── SecaoContato/           # Seção de contatos
│   │   └── SecaoProfissionais/     # Seção de listagem de profissionais
│   │
│   ├── dados/                      # Camada de dados
│   │   ├── tipos.ts                # Interfaces TypeScript
│   │   ├── mockProfissionais.ts    # Dados dos profissionais
│   │   └── mockInstituto.ts        # Dados do instituto
│   │
│   ├── estilos/                    # Estilos globais
│   │   ├── reset.css               # Reset CSS customizado
│   │   ├── variaveis.css           # Tokens de design (cores, espaçamentos)
│   │   └── globais.css             # Estilos globais e animações
│   │
│   ├── App.tsx                     # Componente raiz (gerencia navegação)
│   ├── App.module.css              # Estilos do App
│   ├── main.tsx                    # Entry point da aplicação
│   └── vite-env.d.ts               # Declarações de tipos do Vite
│
├── .eslintrc.cjs                   # Configuração do ESLint
├── index.html                      # Template HTML base
├── package.json                    # Dependências e scripts
├── tsconfig.json                   # Configuração TypeScript (app)
├── tsconfig.node.json              # Configuração TypeScript (build)
├── vite.config.ts                  # Configuração do Vite
└── README.md                       # Este arquivo
```

---

## Início Rápido

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 18.x ou superior (testado com v20.20.0)
- **npm** versão 9.x ou superior (vem com Node.js)

Para verificar se você possui as versões corretas, execute:

```bash
node --version
npm --version
```

### Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd jardim-institute-project
```

2. **Instale as dependências**

```bash
npm install
```

Este comando instalará todas as dependências listadas no `package.json`, incluindo React, TypeScript, Vite e ferramentas de desenvolvimento.

3. **Verifique a instalação**

Para confirmar que tudo foi instalado corretamente, execute:

```bash
npm run lint
```

Se não houver erros, você está pronto para começar.

### Uso Básico

#### Modo Desenvolvimento

Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR):

```bash
npm run dev
```

**O que acontece:**
- Servidor iniciado em `http://192.168.1.8:3000` (configurável em `vite.config.ts`)
- Atualizações automáticas ao modificar arquivos
- Mensagens de erro em tempo real no navegador

Acesse a aplicação abrindo o navegador no endereço indicado no terminal.

#### Build de Produção

Compila o TypeScript e gera os arquivos otimizados para produção:

```bash
npm run build
```

**O que acontece:**
1. `tsc` verifica todos os tipos TypeScript
2. `vite build` compila e otimiza a aplicação
3. Arquivos gerados na pasta `dist/` prontos para deploy

**Saída esperada:**
```
dist/
├── index.html                   (~0.51 kB)
├── assets/
│   ├── index-[hash].css        (~15.44 kB, 3.16 kB gzipped)
│   └── index-[hash].js         (~157.69 kB, 50.84 kB gzipped)
└── imagens/
```

#### Preview do Build

Serve o build de produção localmente para testes antes do deploy:

```bash
npm run preview
```

**O que acontece:**
- Servidor HTTP estático iniciado (geralmente `http://localhost:4173`)
- Serve os arquivos da pasta `dist/` como em produção
- Útil para validar otimizações e comportamento final

#### Verificação de Qualidade

Executa o ESLint para verificar padrões de código:

```bash
npm run lint
```

**O que acontece:**
- Analisa todos os arquivos `.ts` e `.tsx`
- Reporta problemas de TypeScript, React Hooks e padrões gerais
- Falha se houver warnings (configurado com `--max-warnings 0`)

---

## Configuração

### Variáveis de Ambiente

Atualmente o projeto **não utiliza variáveis de ambiente**. Todos os dados estão mockados em arquivos TypeScript dentro de `src/dados/`.

**Para adicionar variáveis de ambiente no futuro:**

1. Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://api.example.com
VITE_WHATSAPP_DEFAULT=5544999999999
```

2. Acesse as variáveis no código usando:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

> **Nota**: Variáveis do Vite devem começar com o prefixo `VITE_` para serem expostas ao cliente.

### Configuração do Vite

O arquivo `vite.config.ts` contém as configurações do servidor e build:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.1.8',      // IP da rede local (modifique conforme necessário)
    strictPort: true,         // Erro se porta já estiver em uso
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Alias para imports absolutos
    },
  },
})
```

**Configurações personalizáveis:**

- **`server.host`**: Altere para `'localhost'` para acesso apenas local ou `'0.0.0.0'` para aceitar conexões externas
- **`server.port`**: Adicione `port: 5173` para definir porta específica
- **Alias de imports**: O alias `@` permite importar usando `@/componentes/Cabecalho` ao invés de `../../componentes/Cabecalho`

### Configuração do TypeScript

O projeto usa modo **strict** do TypeScript para máxima segurança de tipos:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Implicações:**
- Variáveis devem ter tipos explícitos ou inferidos
- `null` e `undefined` devem ser tratados explicitamente
- Callbacks devem ter tipos definidos

### Configuração do ESLint

O ESLint está configurado para garantir qualidade e consistência:

**Regras principais:**
- `react-refresh/only-export-components`: Garante que componentes sejam compatíveis com Hot Module Replacement
- `@typescript-eslint/no-unused-vars`: Erro em variáveis não utilizadas (exceto com prefixo `_`)
- `react-hooks/recommended`: Valida as Rules of Hooks do React

**Para desabilitar uma regra específica:**

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
const dados: any = resposta;
/* eslint-enable @typescript-eslint/no-explicit-any */
```

---

## Exemplos

### Exemplo 1: Adicionando um Novo Profissional

Para adicionar um novo profissional ao sistema, edite o arquivo `src/dados/mockProfissionais.ts`:

```typescript
export const profissionais: Profissional[] = [
  // ... profissionais existentes
  {
    id: '4',
    nome: 'Dr. João Silva',
    especialidade: 'Ortopedia',
    registro: 'CRM: 12345',
    foto: '/imagens/profissionais/joao-silva.svg',
    telefone: '',
    horario: '09:00 às 17:00',
    diasAtendimento: ['Segunda', 'Quarta', 'Sexta'],
    horariosDisponiveis: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
    whatsapp: '5544988888888',
    descricao: 'Especialista em ortopedia com foco em cirurgia de joelho.',
  },
];
```

**Passos:**
1. Adicione a foto SVG em `public/imagens/profissionais/`
2. Gere um `id` único (incremental)
3. Preencha `diasAtendimento` com dias da semana em português
4. Liste `horariosDisponiveis` no formato `HH:MM`
5. Forneça número do WhatsApp no formato internacional (DDI + DDD + número)

### Exemplo 2: Modificando as Cores do Sistema de Design

As cores são definidas em `src/estilos/variaveis.css` usando CSS Custom Properties:

```css
:root {
  /* Cores principais */
  --cor-fundo: #F5F5F0;                      /* Fundo geral da aplicação */
  --cor-texto-principal: #3D2817;            /* Textos principais */
  --cor-texto-secundario: #6B6B6B;           /* Textos secundários */
  --cor-whatsapp: #25D366;                   /* Verde do WhatsApp */
  --cor-localizacao: #4285F4;                /* Azul do Google Maps */

  /* Sombras */
  --sombra-card: 0 2px 8px rgba(0, 0, 0, 0.08);
  --sombra-card-hover: 0 4px 16px rgba(0, 0, 0, 0.12);
}
```

**Para mudar a cor primária do projeto:**

1. Altere a variável `--cor-texto-principal`
2. As mudanças serão aplicadas automaticamente em toda a aplicação
3. Não é necessário modificar arquivos CSS individuais dos componentes

### Exemplo 3: Criando um Novo Componente

Siga o padrão estabelecido de 3 arquivos por componente:

**1. Crie a pasta do componente:**

```bash
mkdir src/componentes/MeuComponente
```

**2. Crie o arquivo TypeScript (`src/componentes/MeuComponente/MeuComponente.tsx`):**

```typescript
import estilos from './MeuComponente.module.css';

interface MeuComponenteProps {
  titulo: string;
  descricao?: string;
}

export function MeuComponente({ titulo, descricao }: MeuComponenteProps) {
  return (
    <div className={estilos.container}>
      <h2 className={estilos.titulo}>{titulo}</h2>
      {descricao && <p className={estilos.descricao}>{descricao}</p>}
    </div>
  );
}
```

**3. Crie o arquivo de estilos (`src/componentes/MeuComponente/MeuComponente.module.css`):**

```css
.container {
  padding: var(--espacamento-md);
  background-color: var(--cor-branco);
  border-radius: var(--raio-medio);
  box-shadow: var(--sombra-card);
}

.titulo {
  color: var(--cor-texto-principal);
  font-size: 1.5rem;
  margin-bottom: var(--espacamento-sm);
}

.descricao {
  color: var(--cor-texto-secundario);
  font-size: 1rem;
}
```

**4. Crie o barrel export (`src/componentes/MeuComponente/index.ts`):**

```typescript
export { MeuComponente } from './MeuComponente';
```

**5. Use o componente em outros arquivos:**

```typescript
import { MeuComponente } from '@/componentes/MeuComponente';

function App() {
  return (
    <MeuComponente
      titulo="Bem-vindo"
      descricao="Esta é uma descrição opcional"
    />
  );
}
```

### Exemplo 4: Integrando com uma API Real

Atualmente os dados são mockados. Para integrar com uma API real:

**1. Adicione a variável de ambiente (`.env`):**

```env
VITE_API_URL=https://api.institutojardim.com.br
```

**2. Crie um serviço de API (`src/servicos/api.ts`):**

```typescript
const API_URL = import.meta.env.VITE_API_URL;

export async function buscarProfissionais(): Promise<Profissional[]> {
  const resposta = await fetch(`${API_URL}/profissionais`);

  if (!resposta.ok) {
    throw new Error('Erro ao buscar profissionais');
  }

  return resposta.json();
}
```

**3. Use o serviço no componente com `useEffect`:**

```typescript
import { useState, useEffect } from 'react';
import { buscarProfissionais } from '@/servicos/api';
import { Profissional } from '@/dados/tipos';

export function SecaoProfissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    buscarProfissionais()
      .then(dados => {
        setProfissionais(dados);
        setCarregando(false);
      })
      .catch(erro => {
        setErro(erro.message);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    // ... renderização dos profissionais
  );
}
```

---

## Troubleshooting

### Problema: Porta já está em uso

**Sintoma:**
```
Error: Port 3000 is already in use
```

**Solução 1 - Matar o processo na porta:**

**Linux/macOS:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Windows (PowerShell):**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

**Solução 2 - Usar outra porta:**

Edite `vite.config.ts` e adicione:
```typescript
server: {
  port: 3001,
  strictPort: false,  // Tenta porta seguinte se ocupada
}
```

### Problema: Versão incompatível do Node.js

**Sintoma:**
```
Error: The engine "node" is incompatible with this module
```

**Solução:**

1. Verifique a versão instalada:
```bash
node --version
```

2. Se for inferior a v18, instale uma versão mais recente:
   - **Usando nvm (recomendado):**
     ```bash
     nvm install 20
     nvm use 20
     ```
   - **Download direto:** https://nodejs.org/

3. Reinstale as dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: Erros de compilação TypeScript

**Sintoma:**
```
TS2322: Type 'string' is not assignable to type 'number'
```

**Solução:**

1. Verifique o tipo esperado na definição da interface
2. Adicione type assertion se necessário:
```typescript
const id = '1' as unknown as number;  // Apenas se absolutamente necessário
```

3. Ou corrija o tipo de dados para corresponder à interface:
```typescript
// ❌ Errado
const profissional = { id: '1', nome: 'João' };

// ✅ Correto (se interface define id: string)
const profissional: Profissional = { id: '1', nome: 'João', ... };
```

### Problema: Build falha mas desenvolvimento funciona

**Sintoma:**
```
npm run build
> tsc && vite build
src/componentes/Exemplo.tsx:15:5 - error TS2322
```

**Solução:**

1. Execute apenas a verificação de tipos:
```bash
npx tsc --noEmit
```

2. Corrija todos os erros reportados
3. Verifique se há comentários `@ts-ignore` que mascaram erros
4. Execute o build novamente

### Problema: Hot Module Replacement não funciona

**Sintoma:**
Alterações no código não aparecem automaticamente no navegador.

**Solução:**

1. Certifique-se de que o componente exporta apenas componentes:
```typescript
// ❌ Evite exportar constantes não-componentes junto
export const CONSTANTE = 'valor';
export function Componente() { ... }

// ✅ Mantenha exportações separadas
// Em constantes.ts
export const CONSTANTE = 'valor';

// Em Componente.tsx
export function Componente() { ... }
```

2. Verifique se há erros no console do navegador
3. Reinicie o servidor de desenvolvimento

### Problema: Imagens não carregam

**Sintoma:**
Imagens aparecem quebradas (404) no navegador.

**Solução:**

1. Verifique se o caminho começa com `/`:
```typescript
// ❌ Errado
foto: 'imagens/profissionais/foto.svg'

// ✅ Correto
foto: '/imagens/profissionais/foto.svg'
```

2. Confirme que o arquivo existe em `public/imagens/`
3. Limpe o cache do Vite:
```bash
rm -rf node_modules/.vite
npm run dev
```

### Problema: ESLint reporta muitos erros após clone

**Sintoma:**
```
npm run lint
✖ 45 problems (45 errors, 0 warnings)
```

**Solução:**

1. Alguns erros podem ser corrigidos automaticamente:
```bash
npx eslint . --ext ts,tsx --fix
```

2. Para erros persistentes, revise manualmente:
```bash
npm run lint
```

3. Se necessário, ajuste as regras em `.eslintrc.cjs` (não recomendado):
```javascript
rules: {
  '@typescript-eslint/no-unused-vars': 'warn',  // Muda de error para warning
}
```

### Problema: Dependências com vulnerabilidades

**Sintoma:**
```
npm install
found 2 moderate severity vulnerabilities
```

**Solução:**

1. Tente correção automática:
```bash
npm audit fix
```

2. Se vulnerabilidades persistirem, verifique detalhes:
```bash
npm audit
```

3. Atualize dependências manualmente se necessário:
```bash
npm update
```

4. Para vulnerabilidades em dependências de desenvolvimento (devDependencies), geralmente não são críticas

### Problema: WhatsApp não abre no mobile

**Sintoma:**
Ao clicar no botão de agendamento, nada acontece ou abre navegador.

**Solução:**

1. Certifique-se de que o número está no formato correto:
```typescript
// ✅ Correto: DDI (55) + DDD (44) + número (999999999)
whatsapp: '554499999999'
```

2. Verifique se o WhatsApp está instalado no dispositivo
3. Teste o link diretamente no navegador:
```
https://wa.me/554499999999?text=Teste
```

---

## Referências

### Documentação Oficial

- [React 18 Documentation](https://react.dev/) - Documentação oficial do React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guia completo de TypeScript
- [Vite Guide](https://vitejs.dev/guide/) - Documentação do Vite
- [ESLint Rules](https://eslint.org/docs/latest/rules/) - Regras do ESLint

### Guias e Tutoriais

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - Patterns e best practices
- [CSS Modules Documentation](https://github.com/css-modules/css-modules) - Como funcionam CSS Modules
- [WhatsApp API Deep Links](https://faq.whatsapp.com/5913398998672934/) - Documentação oficial dos deep links

### Ferramentas de Desenvolvimento

- [React DevTools](https://react.dev/learn/react-developer-tools) - Extensão para debug
- [TypeScript Playground](https://www.typescriptlang.org/play) - Testar TypeScript online
- [Can I Use](https://caniuse.com/) - Compatibilidade de navegadores

### Design e UX

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/) - Padrões de acessibilidade
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verificar contraste de cores

---

## Licença

Copyright © 2025 Instituto Jardim

Este projeto é de uso interno. Para informações sobre licenciamento, entre em contato através dos canais oficiais.

---

## Suporte

Para dúvidas, sugestões ou reportar problemas:

- **WhatsApp Institucional:** https://wa.me/554499999999
- **Localização:** https://maps.app.goo.gl/3piTji8UeibTNbwU6

---

**Desenvolvido por:** Amanda Braga
**Última Atualização:** 2026-02-07
**Versão:** 1.0.0
