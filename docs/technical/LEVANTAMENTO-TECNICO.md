# Levantamento Técnico - Instituto Jardim

**Data**: 2026-02-07
**Documento**: LEVANTAMENTO-TECNICO
**Vinculado a**: TASK-0001, PRD-0001
**Status**: Concluído

---

## Sumário Executivo

Este documento apresenta o levantamento técnico completo do projeto Instituto Jardim, uma aplicação web single-page (SPA) desenvolvida com React 18, TypeScript e Vite. O projeto implementa uma interface de apresentação de profissionais de saúde com sistema de agendamento via WhatsApp.

**Principais Características:**
- Frontend moderno com React 18 e TypeScript
- CSS Modules para estilização isolada
- Build tool Vite para desenvolvimento rápido
- Arquitetura baseada em componentes funcionais
- Dados mockados localmente (sem backend)
- Design mobile-first com responsividade

---

## 1. Estrutura de Pastas

```
jardim-institute-project/
├── docs/                           # Documentação do projeto (gerenciada pelo sistema de agentes)
│   ├── backlog/                    # TASKs e atividades técnicas
│   │   └── TASK-0001.md
│   ├── intake/                     # Capturas validadas de pedidos
│   │   └── INTAKE-20260207-2338.md
│   ├── planning/                   # Product Requirements Documents
│   │   ├── PRD-0001.md
│   │   └── PRD-0001_validated.md
│   ├── status/                     # Estado atual do pipeline
│   │   └── CURRENT_STATE.md
│   └── technical/                  # Documentação técnica e ADRs
│       └── LEVANTAMENTO-TECNICO.md (este documento)
│
├── public/                         # Arquivos estáticos servidos diretamente
│   └── imagens/                    # Imagens e assets
│       ├── logo.svg
│       ├── favicon.png
│       └── profissionais/
│           ├── anabia.svg
│           ├── ana-laura.svg
│           └── denis-graciotto.svg
│
├── src/                            # Código-fonte da aplicação
│   ├── componentes/                # Componentes React
│   │   ├── Cabecalho/
│   │   │   ├── Cabecalho.tsx       # Componente funcional
│   │   │   ├── Cabecalho.module.css # Estilos isolados
│   │   │   └── index.ts            # Barrel export
│   │   ├── CalendarioAgendamento/
│   │   │   ├── CalendarioAgendamento.tsx
│   │   │   ├── CalendarioAgendamento.module.css
│   │   │   └── index.ts
│   │   ├── CardContato/
│   │   │   ├── CardContato.tsx
│   │   │   ├── CardContato.module.css
│   │   │   └── index.ts
│   │   ├── CardProfissional/
│   │   │   ├── CardProfissional.tsx
│   │   │   ├── CardProfissional.module.css
│   │   │   └── index.ts
│   │   ├── Logo/
│   │   │   ├── Logo.tsx
│   │   │   ├── Logo.module.css
│   │   │   └── index.ts
│   │   ├── PaginaProfissional/
│   │   │   ├── PaginaProfissional.tsx
│   │   │   ├── PaginaProfissional.module.css
│   │   │   └── index.ts
│   │   ├── Rodape/
│   │   │   ├── Rodape.tsx
│   │   │   ├── Rodape.module.css
│   │   │   └── index.ts
│   │   ├── SecaoContato/
│   │   │   ├── SecaoContato.tsx
│   │   │   ├── SecaoContato.module.css
│   │   │   └── index.ts
│   │   └── SecaoProfissionais/
│   │       ├── SecaoProfissionais.tsx
│   │       ├── SecaoProfissionais.module.css
│   │       └── index.ts
│   │
│   ├── dados/                      # Camada de dados (mockados)
│   │   ├── tipos.ts                # Definições de tipos TypeScript
│   │   ├── mockProfissionais.ts    # Dados dos profissionais
│   │   └── mockInstituto.ts        # Dados do instituto e contatos
│   │
│   ├── estilos/                    # Estilos globais e variáveis
│   │   ├── reset.css               # CSS reset customizado
│   │   ├── variaveis.css           # Variáveis CSS (design tokens)
│   │   └── globais.css             # Estilos globais e animações
│   │
│   ├── App.tsx                     # Componente raiz da aplicação
│   ├── App.module.css              # Estilos do componente App
│   ├── main.tsx                    # Entry point da aplicação
│   └── vite-env.d.ts               # Declarações de tipos do Vite
│
├── .eslintrc.cjs                   # Configuração do ESLint
├── index.html                      # Template HTML base
├── package.json                    # Dependências e scripts
├── package-lock.json               # Lock file do npm
├── tsconfig.json                   # Configuração do TypeScript (app)
├── tsconfig.node.json              # Configuração do TypeScript (build)
└── vite.config.ts                  # Configuração do Vite

```

### Convenções de Nomenclatura

#### Componentes
- **Padrão**: PascalCase em português brasileiro
- **Exemplos**: `Cabecalho`, `CardProfissional`, `SecaoProfissionais`
- **Estrutura**: Cada componente em sua própria pasta com três arquivos:
  - `NomeComponente.tsx` - Componente React
  - `NomeComponente.module.css` - Estilos isolados
  - `index.ts` - Barrel export para simplificar imports

#### Arquivos
- **Tipos TypeScript**: `.ts` para arquivos sem JSX, `.tsx` para componentes
- **CSS**: `.module.css` para CSS Modules, `.css` para estilos globais
- **Dados**: Prefixo `mock` para dados mockados (ex: `mockProfissionais.ts`)

#### Variáveis e Funções
- **Português**: Nomes de variáveis, funções, propriedades em português
- **Exemplos**: `profissionalSelecionado`, `handleVoltar`, `diasAtendimento`
- **CamelCase**: Para variáveis e funções
- **PascalCase**: Para componentes e tipos

---

## 2. Tecnologias e Dependências

### 2.1 Framework e Bibliotecas Principais

| Dependência | Versão | Propósito |
|-------------|--------|-----------|
| `react` | ^18.2.0 | Biblioteca JavaScript para construção de interfaces de usuário. Versão 18 com Concurrent Features. |
| `react-dom` | ^18.2.0 | Ponte entre React e o DOM do navegador. Responsável por renderizar componentes React na página. |

### 2.2 Build Tool e Configuração

| Dependência | Versão | Propósito |
|-------------|--------|-----------|
| `vite` | ^5.0.8 | Build tool moderno e extremamente rápido. Utiliza ESM nativo durante desenvolvimento e Rollup para produção. |
| `@vitejs/plugin-react` | ^4.2.1 | Plugin oficial do Vite para suporte a React com Fast Refresh (HMR). |

### 2.3 TypeScript

| Dependência | Versão | Propósito |
|-------------|--------|-----------|
| `typescript` | ^5.2.2 | Superset de JavaScript que adiciona tipagem estática. Melhora a segurança do código e a experiência de desenvolvimento. |
| `@types/react` | ^18.2.43 | Definições de tipos TypeScript para React. |
| `@types/react-dom` | ^18.2.17 | Definições de tipos TypeScript para ReactDOM. |

### 2.4 Ferramentas de Qualidade de Código

| Dependência | Versão | Propósito |
|-------------|--------|-----------|
| `eslint` | ^8.55.0 | Linter para JavaScript/TypeScript. Identifica e reporta padrões problemáticos no código. |
| `@typescript-eslint/eslint-plugin` | ^6.14.0 | Plugin ESLint com regras específicas para TypeScript. |
| `@typescript-eslint/parser` | ^6.14.0 | Parser que permite ao ESLint analisar código TypeScript. |
| `eslint-plugin-react-hooks` | ^4.6.0 | Valida as regras dos Hooks do React (Rules of Hooks). |
| `eslint-plugin-react-refresh` | ^0.4.5 | Valida que componentes são compatíveis com Fast Refresh do Vite. |

### 2.5 Scripts NPM

```json
{
  "dev": "vite",                    // Inicia servidor de desenvolvimento
  "build": "tsc && vite build",     // Compila TypeScript e gera build de produção
  "preview": "vite preview",        // Serve o build de produção localmente
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
}
```

**Análise dos Scripts:**
- `dev`: Inicia servidor local em `http://192.168.1.8:3000` (configurado em `vite.config.ts`)
- `build`: Verifica tipos TypeScript (`tsc`) antes de compilar para produção
- `preview`: Útil para testar o build de produção antes do deploy
- `lint`: Executa ESLint com warnings como erros (--max-warnings 0)

---

## 3. Arquitetura e Padrões

### 3.1 Padrão Arquitetural: Component-Based Architecture

O projeto adota uma arquitetura baseada em componentes React funcionais, seguindo os princípios:

- **Composição**: Componentes pequenos e reutilizáveis combinados para formar interfaces complexas
- **Unidirecionalidade de dados**: Fluxo de dados de cima para baixo (top-down)
- **Separação de responsabilidades**: UI separada da lógica de negócio
- **Colocation**: Estilos e testes vivem próximos aos componentes

### 3.2 Hierarquia de Componentes

```
App (root)
│
├─ VISUALIZAÇÃO PRINCIPAL (Home)
│  ├─ Cabecalho
│  │  └─ Logo
│  ├─ SecaoProfissionais
│  │  └─ CardProfissional (renderizado múltiplas vezes via .map)
│  ├─ SecaoContato
│  │  └─ CardContato (renderizado múltiplas vezes via .map)
│  └─ Rodape
│
└─ VISUALIZAÇÃO DETALHES (PaginaProfissional)
   └─ CalendarioAgendamento
```

**Navegação Condicional:**
O componente `App` gerencia o estado `profissionalSelecionado` e renderiza condicionalmente:
- Se `profissionalSelecionado === null`: renderiza visualização principal
- Se `profissionalSelecionado !== null`: renderiza `PaginaProfissional`

Não há roteamento (React Router) - navegação controlada por estado local.

### 3.3 Fluxo de Dados

#### Estado Global (App.tsx)
```typescript
const [profissionalSelecionado, setProfissionalSelecionado] = useState<Profissional | null>(null);
```

**Responsabilidades:**
- Armazena o profissional selecionado
- Controla qual visualização é renderizada
- Passa callbacks para componentes filhos

#### Fluxo de Seleção de Profissional
```
CardProfissional (onClick)
  → SecaoProfissionais (onProfissionalClick)
  → App (handleProfissionalClick)
  → setProfissionalSelecionado(profissional)
  → Renderiza PaginaProfissional
```

#### Fluxo de Voltar
```
PaginaProfissional (botão Voltar)
  → onVoltar callback
  → App (handleVoltar)
  → setProfissionalSelecionado(null)
  → Renderiza visualização principal
```

#### Estado Local nos Componentes

**PaginaProfissional.tsx:**
```typescript
const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
const [nomePaciente, setNomePaciente] = useState('');
```

**CalendarioAgendamento.tsx:**
```typescript
const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
const [nomePaciente, setNomePaciente] = useState('');
```

**Observação de Design:**
Há duplicação de estado entre `PaginaProfissional` e `CalendarioAgendamento`. O calendário propaga mudanças via callbacks para o componente pai.

### 3.4 Padrões de Código TypeScript

#### Interfaces de Props
```typescript
// Padrão consistente: Interface com sufixo Props
interface CardProfissionalProps {
  profissional: Profissional;
  onClick?: () => void;  // Callbacks opcionais com ?
}
```

#### Tipos de Dados (tipos.ts)
```typescript
export interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  registro: string;
  foto: string;
  telefone: string;
  horario: string;
  diasAtendimento: string[];
  horariosDisponiveis: string[];
  whatsapp: string;
  descricao?: string;  // Campo opcional
}

export interface Instituto {
  nome: string;
  subtitulo: string;
  tagline: string;
  logo: string;
}

export interface Contato {
  tipo: 'whatsapp' | 'localizacao';  // Union type para tipos permitidos
  titulo: string;
  descricao: string;
  url: string;
  icone: string;
}
```

#### Configuração TypeScript Strict

```json
{
  "strict": true,                          // Ativa todas as verificações estritas
  "noUnusedLocals": true,                  // Erro em variáveis não utilizadas
  "noUnusedParameters": true,              // Erro em parâmetros não utilizados
  "noFallthroughCasesInSwitch": true       // Erro em fallthrough de switch
}
```

### 3.5 Padrões de Estilização

#### CSS Modules
- **Isolamento de escopo**: Estilos não vazam entre componentes
- **Nomenclatura**: Classes em camelCase (`.cardProfissional`, `.botaoVoltar`)
- **Import**: `import estilos from './Componente.module.css'`
- **Uso**: `className={estilos.nomeClasse}`

#### Sistema de Design (Design Tokens)

**Arquivo:** `src/estilos/variaveis.css`

```css
:root {
  /* Cores */
  --cor-fundo: #F5F5F0;
  --cor-texto-principal: #3D2817;
  --cor-texto-secundario: #6B6B6B;
  --cor-branco: #FFFFFF;
  --cor-whatsapp: #25D366;
  --cor-localizacao: #4285F4;
  --cor-logo-bege: #E8DCC6;
  --cor-logo-bege-escuro: #D4C4A8;
  --cor-marrom-claro: #8B7355;

  /* Sombras */
  --sombra-card: 0 2px 8px rgba(0, 0, 0, 0.08);
  --sombra-card-hover: 0 4px 16px rgba(0, 0, 0, 0.12);

  /* Espaçamentos */
  --espacamento-xs: 0.5rem;
  --espacamento-sm: 1rem;
  --espacamento-md: 1.5rem;
  --espacamento-lg: 2rem;
  --espacamento-xl: 3rem;
  --espacamento-xxl: 4rem;

  /* Tipografia */
  --fonte-familia: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...;

  /* Transições */
  --transicao-rapida: 0.2s ease;
  --transicao-normal: 0.3s ease;
  --transicao-lenta: 0.5s ease;

  /* Larguras */
  --largura-maxima: 600px;
  --largura-maxima-desktop: 800px;

  /* Border radius */
  --raio-pequeno: 8px;
  --raio-medio: 12px;
  --raio-grande: 16px;
  --raio-circular: 50%;
}
```

**Benefícios:**
- Consistência visual em toda aplicação
- Manutenção centralizada de valores
- Facilita mudanças de tema no futuro

#### CSS Reset Customizado

**Arquivo:** `src/estilos/reset.css`

- Reset completo de margens e paddings (`* { margin: 0; padding: 0; }`)
- Box-sizing: border-box global
- Configurações de fonte suavizada (antialiased)
- Reset de estilos de botões, links e listas

#### Responsividade

**Breakpoints utilizados:**
- Mobile: < 320px (dispositivos muito pequenos)
- Tablet: < 768px
- Desktop: >= 1024px

**Abordagem:** Mobile-first (estilos base para mobile, media queries para telas maiores)

**Exemplo:**
```css
.nome {
  font-size: 1rem;  /* Base mobile */
}

@media (min-width: 768px) {
  .nome {
    font-size: 1.1rem;  /* Tablet+ */
  }
}

@media (min-width: 1024px) {
  .nome {
    font-size: 1.2rem;  /* Desktop */
  }
}
```

### 3.6 Padrões de Acessibilidade

#### ARIA e Semântica
- Uso de tags semânticas: `<header>`, `<footer>`, `<section>`, `<article>`
- `aria-label` em botões com ícones: `<button aria-label="Voltar">`
- `aria-disabled` em links desabilitados
- `role="button"` em elementos não-button clicáveis

#### Navegação por Teclado
```typescript
// CardProfissional.tsx - suporte a Enter e Espaço
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick?.();
  }
}}
```

#### Foco Visível
```css
/* globais.css */
*:focus-visible {
  outline: 2px solid var(--cor-texto-principal);
  outline-offset: 2px;
}
```

#### Lazy Loading de Imagens
```tsx
<img loading="lazy" />
```

---

## 4. Componentes Detalhados

### 4.1 App.tsx (Componente Raiz)

**Responsabilidades:**
- Gerenciar estado de navegação (`profissionalSelecionado`)
- Renderizar visualização principal ou detalhes do profissional
- Coordenar fluxo de dados entre componentes

**Props:** Nenhuma (componente raiz)

**Estado:**
```typescript
profissionalSelecionado: Profissional | null
```

**Fluxo:**
1. Usuário clica em CardProfissional
2. `handleProfissionalClick(id)` busca profissional no array
3. Atualiza estado com `setProfissionalSelecionado(profissional)`
4. Renderiza `PaginaProfissional`
5. Usuário clica em "Voltar"
6. `handleVoltar()` seta estado para `null`
7. Renderiza visualização principal

**Importações:**
- Componentes: Cabecalho, SecaoProfissionais, SecaoContato, Rodape, PaginaProfissional
- Dados: tipos.ts, mockProfissionais.ts
- Estilos: globais.css, App.module.css

---

### 4.2 Cabecalho

**Arquivo:** `src/componentes/Cabecalho/Cabecalho.tsx`

**Responsabilidades:**
- Exibir logo do instituto
- Exibir nome, subtítulo e tagline
- Apresentação visual do cabeçalho da aplicação

**Props:** Nenhuma

**Dados utilizados:**
```typescript
import { instituto } from '@/dados/mockInstituto';
// { nome, subtitulo, tagline }
```

**Estrutura:**
```tsx
<header>
  <Logo />
  <h1>{instituto.nome}</h1>
  <p>{instituto.subtitulo}</p>
  <div>
    <svg>★</svg>
    <span>{instituto.tagline}</span>
  </div>
</header>
```

**Estilos destacados:**
- Animação fadeIn ao carregar
- Tipografia grande e centralizada
- Ícone de estrela inline SVG

---

### 4.3 Logo

**Arquivo:** `src/componentes/Logo/Logo.tsx`

**Responsabilidades:**
- Renderizar logo visual do instituto
- Renderizar botão de favorito (coração) opcional

**Props:**
```typescript
interface LogoProps {
  mostrarFavorito?: boolean;  // Default: true
}
```

**Comportamento:**
- Logo renderizado via CSS (background-image ou cor)
- Botão de favorito com ícone de coração SVG
- Botão sem funcionalidade implementada (apenas visual)

**Observação de Design:**
O botão de favorito não tem handler implementado, apenas `type="button"` e `aria-label`.

---

### 4.4 SecaoProfissionais

**Arquivo:** `src/componentes/SecaoProfissionais/SecaoProfissionais.tsx`

**Responsabilidades:**
- Renderizar seção de profissionais
- Mapear array de profissionais em cards
- Propagar evento de clique para componente pai

**Props:**
```typescript
interface SecaoProfissionaisProps {
  onProfissionalClick: (id: string) => void;
}
```

**Dados utilizados:**
```typescript
import { profissionais } from '@/dados/mockProfissionais';
```

**Estrutura:**
```tsx
<section>
  <h2>Nossos Profissionais</h2>
  <div className="linha"></div>
  <div className="lista">
    {profissionais.map(prof => (
      <CardProfissional
        key={prof.id}
        profissional={prof}
        onClick={() => onProfissionalClick(prof.id)}
      />
    ))}
  </div>
</section>
```

---

### 4.5 CardProfissional

**Arquivo:** `src/componentes/CardProfissional/CardProfissional.tsx`

**Responsabilidades:**
- Exibir card de um profissional
- Mostrar foto, nome, especialidade, registro
- Ser clicável e acessível via teclado

**Props:**
```typescript
export interface CardProfissionalProps {
  profissional: Profissional;
  onClick?: () => void;
}
```

**Acessibilidade:**
- `role="button"` e `tabIndex={0}`
- Suporte a Enter e Espaço
- Hover e estados visuais

**Estrutura:**
```tsx
<article role="button" tabIndex={0}>
  <img src={foto} alt={`Foto de ${nome}`} loading="lazy" />
  <div>
    <h3>{nome}</h3>
    <p>{especialidade}</p>
    <p>{registro}</p>
  </div>
  <div>
    <svg>→</svg>  {/* Seta indicadora */}
  </div>
</article>
```

**Interações:**
- Hover: Sombra mais forte + translateY(-2px)
- Click/Enter: Chama `onClick()` callback
- Seta anima para direita no hover

---

### 4.6 SecaoContato

**Arquivo:** `src/componentes/SecaoContato/SecaoContato.tsx`

**Responsabilidades:**
- Renderizar seção de contatos
- Mapear array de contatos em cards

**Props:** Nenhuma

**Dados utilizados:**
```typescript
import { contatos } from '@/dados/mockInstituto';
// Array com WhatsApp e Localização
```

**Estrutura:**
```tsx
<section>
  <h2>Fale Conosco</h2>
  <div className="linha"></div>
  <div className="lista">
    {contatos.map((contato, index) => (
      <CardContato key={index} contato={contato} />
    ))}
  </div>
</section>
```

---

### 4.7 CardContato

**Arquivo:** `src/componentes/CardContato/CardContato.tsx`

**Responsabilidades:**
- Renderizar card de contato (WhatsApp ou Localização)
- Abrir link externo ao clicar
- Mostrar ícone apropriado baseado no tipo

**Props:**
```typescript
interface CardContatoProps {
  contato: Contato;
}
```

**Lógica de Renderização:**
```typescript
function obterCorIcone(tipo: Contato['tipo']): string {
  return tipo === 'whatsapp' ? estilos.iconeWhatsApp : estilos.iconeLocalizacao;
}

function obterIconeSVG(tipo: Contato['tipo']) {
  if (tipo === 'whatsapp') {
    return <svg>WhatsApp icon</svg>;
  }
  return <svg>Location icon</svg>;
}
```

**Estrutura:**
```tsx
<a href={url} target="_blank" rel="noopener noreferrer">
  <div className={icone + corIcone}>
    {obterIconeSVG(tipo)}
  </div>
  <div>
    <h3>{titulo}</h3>
    <p>{descricao}</p>
  </div>
  <div>
    <svg>External link icon</svg>
  </div>
</a>
```

**Cores por Tipo:**
- WhatsApp: `#25D366` (verde)
- Localização: `#4285F4` (azul)

---

### 4.8 Rodape

**Arquivo:** `src/componentes/Rodape/Rodape.tsx`

**Responsabilidades:**
- Exibir copyright
- Exibir créditos de desenvolvimento

**Props:** Nenhuma

**Estrutura:**
```tsx
<footer>
  <p>© 2025 Instituto Jardim</p>
  <p>Desenvolvido por: Amanda Braga</p>
</footer>
```

---

### 4.9 PaginaProfissional

**Arquivo:** `src/componentes/PaginaProfissional/PaginaProfissional.tsx`

**Responsabilidades:**
- Renderizar página de detalhes do profissional
- Gerenciar estado do agendamento (data, horário, nome)
- Gerar mensagem de WhatsApp com dados do agendamento
- Validar preenchimento antes de habilitar envio

**Props:**
```typescript
interface PaginaProfissionalProps {
  profissional: Profissional;
  onVoltar: () => void;
}
```

**Estado:**
```typescript
const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
const [nomePaciente, setNomePaciente] = useState('');
```

**Lógica de Negócio:**

1. **Formatação de Data:**
```typescript
formatarDataParaMensagem(data: Date): string
// Saída: "Segunda-feira, 10 de fevereiro de 2026"
```

2. **Geração de Mensagem WhatsApp:**
```typescript
const mensagem = `Olá, ${profissional.nome.split(' ')}!

Gostaria de agendar uma consulta:

Data: ${dataFormatada}
Horário: ${horarioSelecionado}
Paciente: ${nomePaciente.trim()}.

Aguardo confirmação. Obrigado(a)!`;
```

3. **Validação:**
```typescript
const estaCompleto = dataSelecionada && horarioSelecionado && nomePaciente.trim().length > 0;
```

4. **URL WhatsApp:**
```typescript
const urlWhatsapp = estaCompleto
  ? `https://wa.me/${profissional.whatsapp}?text=${encodeURIComponent(mensagem)}`
  : '#';
```

**Estrutura:**
```tsx
<div>
  <button onClick={onVoltar}>← Voltar</button>

  <img src={foto} alt={nome} />
  <h1>{nome}</h1>
  <p>{especialidade}</p>
  <p>{registro}</p>
  {descricao && <p>{descricao}</p>}

  <CalendarioAgendamento
    horariosDisponiveis={profissional.horariosDisponiveis}
    diasAtendimento={profissional.diasAtendimento}
    onDataSelecionada={setDataSelecionada}
    onHorarioSelecionado={setHorarioSelecionado}
    onNomePacienteChange={setNomePaciente}
  />

  <a
    href={urlWhatsapp}
    className={!estaCompleto ? 'desabilitado' : ''}
    onClick={handleEnviarMensagem}
  >
    {estaCompleto
      ? `Confirmar Agendamento com ${nome.split(' ')[0]}`
      : 'Preencha todos os dados para agendar'
    }
  </a>
</div>
```

---

### 4.10 CalendarioAgendamento

**Arquivo:** `src/componentes/CalendarioAgendamento/CalendarioAgendamento.tsx`

**Responsabilidades:**
- Renderizar calendário dos próximos 30 dias
- Permitir seleção de data (filtrada por dias de atendimento)
- Permitir seleção de horário
- Capturar nome do paciente
- Propagar mudanças para componente pai

**Props:**
```typescript
interface CalendarioAgendamentoProps {
  horariosDisponiveis: string[];
  diasAtendimento: string[];
  onDataSelecionada: (data: Date | null) => void;
  onHorarioSelecionado: (horario: string | null) => void;
  onNomePacienteChange: (nome: string) => void;
}
```

**Estado:**
```typescript
const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
const [nomePaciente, setNomePaciente] = useState('');
```

**Lógica de Negócio:**

1. **Geração dos Próximos 30 Dias:**
```typescript
const hoje = new Date();
const proximos30Dias: Date[] = [];

for (let i = 1; i <= 30; i++) {
  const data = new Date(hoje);
  data.setDate(hoje.getDate() + i);
  proximos30Dias.push(data);
}
```

2. **Validação de Dia Disponível:**
```typescript
const isDiaDisponivel = (data: Date): boolean => {
  const diaSemana = obterNomeDiaSemana(data);
  return diasAtendimento.includes(diaSemana);
};
```

3. **Handlers:**
```typescript
handleDataClick(data: Date) {
  if (isDiaDisponivel(data)) {
    setDataSelecionada(data);
    setHorarioSelecionado(null);  // Reset horário ao trocar data
    onDataSelecionada(data);
    onHorarioSelecionado(null);
  }
}

handleHorarioClick(horario: string) {
  setHorarioSelecionado(horario);
  onHorarioSelecionado(horario);
}

handleNomeChange(e: React.ChangeEvent<HTMLInputElement>) {
  const nome = e.target.value;
  setNomePaciente(nome);
  onNomePacienteChange(nome);
}
```

**Estrutura:**
```tsx
<div>
  <h2>Agendar Consulta</h2>

  {/* Calendário de Datas */}
  <h3>Selecione a Data</h3>
  <div className="calendario">
    {proximos30Dias.map(data => (
      <button
        className={selecionada ? 'selecionada' : ''}
        disabled={!disponivel}
        onClick={() => handleDataClick(data)}
      >
        <span>{data.getDate()}</span>
        <span>{diaSemana}</span>
      </button>
    ))}
  </div>

  {/* Horários (só renderiza se data selecionada) */}
  {dataSelecionada && (
    <div>
      <h3>Selecione o Horário</h3>
      <div>
        {horariosDisponiveis.map(horario => (
          <button
            className={horarioSelecionado === horario ? 'selecionado' : ''}
            onClick={() => handleHorarioClick(horario)}
          >
            {horario}
          </button>
        ))}
      </div>
    </div>
  )}

  {/* Input Nome */}
  <h3>Nome do Paciente</h3>
  <input
    type="text"
    placeholder="Digite seu nome completo"
    value={nomePaciente}
    onChange={handleNomeChange}
  />
</div>
```

**Observações:**
- Horários só aparecem após selecionar data
- Data inválida (fora dos dias de atendimento) fica desabilitada
- Reset de horário ao trocar data evita inconsistência

---

## 5. Camada de Dados

### 5.1 Tipos (tipos.ts)

**Arquivo:** `src/dados/tipos.ts`

Define três interfaces principais:

```typescript
export interface Profissional {
  id: string;                       // Identificador único
  nome: string;                     // Nome completo
  especialidade: string;            // Área de atuação
  registro: string;                 // CRO, Crefito, etc.
  foto: string;                     // Caminho da foto (SVG)
  telefone: string;                 // Telefone (atualmente vazio)
  horario: string;                  // Texto descritivo do horário
  diasAtendimento: string[];        // Ex: ['Segunda', 'Terça']
  horariosDisponiveis: string[];    // Ex: ['08:00', '08:30']
  whatsapp: string;                 // Número com DDI (55449999999)
  descricao?: string;               // Descrição opcional
}

export interface Instituto {
  nome: string;                     // Nome do instituto
  subtitulo: string;                // Descrição breve
  tagline: string;                  // Frase de destaque
  logo: string;                     // Caminho do logo
}

export interface Contato {
  tipo: 'whatsapp' | 'localizacao'; // Union type
  titulo: string;                   // Ex: "WhatsApp"
  descricao: string;                // Ex: "Fale conosco agora mesmo"
  url: string;                      // Link externo
  icone: string;                    // Identificador do ícone
}
```

### 5.2 Dados dos Profissionais (mockProfissionais.ts)

**Arquivo:** `src/dados/mockProfissionais.ts`

**Estrutura:**
```typescript
export const profissionais: Profissional[] = [...]
```

**Dados Reais:**

1. **Dra. Anabia Jardim**
   - Especialidade: Harmonização Orofacial
   - Registro: CRO: 30.757
   - Atendimento: Segunda a Sábado, 08:00 às 19:00
   - Horários: Intervalos de 30 minutos (exceto 11:30 e 12:00)
   - WhatsApp: 554499999999

2. **Dra. Ana Laura Jardim**
   - Especialidade: Estética e Reabilitação Oral
   - Registro: CRO: 36.818
   - Atendimento: Segunda a Sábado, 08:00 às 19:00
   - Horários: Intervalos de 30 minutos (exceto 11:30 e 12:00)
   - WhatsApp: 5544000000000

3. **Dr. Denis Graciotto**
   - Especialidade: Terapia Regenerativa e Tratamento da Dor
   - Registro: Crefito/8-63999-F
   - Atendimento: Segunda a Sexta, 08:00 às 18:00
   - Horários: Intervalos de 1 hora
   - WhatsApp: 55449999999999

**Observação:**
Os arrays de `horariosDisponiveis` são hardcoded. Para escalabilidade futura, seria ideal gerar dinamicamente baseado em `horario` e `diasAtendimento`.

### 5.3 Dados do Instituto (mockInstituto.ts)

**Arquivo:** `src/dados/mockInstituto.ts`

**Instituto:**
```typescript
export const instituto: Instituto = {
  nome: 'Instituto Jardim',
  subtitulo: 'Cuidados especializados em saúde e bem-estar para toda a família',
  tagline: 'Excelência em saúde',
  logo: '/imagens/logo.svg',
};
```

**Contatos:**
```typescript
export const contatos: Contato[] = [
  {
    tipo: 'whatsapp',
    titulo: 'WhatsApp',
    descricao: 'Fale conosco agora mesmo',
    url: 'https://wa.me/554499999999',
    icone: 'whatsapp',
  },
  {
    tipo: 'localizacao',
    titulo: 'Localização',
    descricao: 'Como chegar até nós',
    url: 'https://maps.app.goo.gl/3piTji8UeibTNbwU6',
    icone: 'localizacao',
  },
];
```

---

## 6. Configurações do Projeto

### 6.1 Vite (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.1.8',      // Servidor acessível na rede local
    strictPort: true,         // Erro se porta já estiver em uso
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Import alias: @/componentes
    },
  },
})
```

**Características:**
- Plugin React oficial com Fast Refresh (HMR)
- Servidor de desenvolvimento na rede local (192.168.1.8)
- Path alias `@` para imports absolutos

### 6.2 TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",                     // JavaScript moderno
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",                     // Módulos ESM
    "skipLibCheck": true,                   // Performance de build

    "moduleResolution": "bundler",          // Resolução do Vite
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,                         // Vite cuida do build
    "jsx": "react-jsx",                     // Novo JSX transform

    "strict": true,                         // Modo estrito
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]                    // Path mapping
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Características:**
- Modo strict ativado (máxima segurança de tipos)
- JSX transform moderno (não precisa importar React)
- Configuração otimizada para Vite

### 6.3 ESLint (.eslintrc.cjs)

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}
```

**Regras Customizadas:**
- `react-refresh/only-export-components`: Garante compatibilidade com HMR
- `@typescript-eslint/no-unused-vars`: Permite parâmetros com prefixo `_`

### 6.4 HTML (index.html)

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="imagens/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Instituto Jardim - Cuidando da sua saúde com dedicação</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Características:**
- `lang="pt-BR"` para acessibilidade
- Viewport meta tag para responsividade
- Favicon PNG
- Script com `type="module"` (ESM nativo)

---

## 7. Análise de Padrões Consistentes e Inconsistentes

### 7.1 Padrões Consistentes (Boas Práticas)

#### Organização de Componentes
- Todos os componentes seguem estrutura de 3 arquivos (TSX, CSS, index.ts)
- Barrel exports em `index.ts` facilitam imports
- CSS Modules para isolamento de estilos

#### Nomenclatura
- Componentes em português (PascalCase)
- Variáveis e funções em português (camelCase)
- Classes CSS em camelCase

#### TypeScript
- Interfaces para todas as props
- Tipos exportados centralizadamente em `tipos.ts`
- Modo strict ativado

#### Acessibilidade
- Tags semânticas (`<header>`, `<footer>`, `<section>`, `<article>`)
- `aria-label` em botões
- Suporte a navegação por teclado

#### Estilização
- Design tokens centralizados (`variaveis.css`)
- Reset CSS customizado
- Mobile-first approach

### 7.2 Padrões Inconsistentes (Áreas de Melhoria)

#### Duplicação de Estado
**Problema:**
`PaginaProfissional` e `CalendarioAgendamento` mantêm estado duplicado:
```typescript
// PaginaProfissional.tsx
const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
const [nomePaciente, setNomePaciente] = useState('');

// CalendarioAgendamento.tsx - MESMOS estados
const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
const [nomePaciente, setNomePaciente] = useState('');
```

**Solução Recomendada:**
Manter estado apenas em `PaginaProfissional` e passar setters como props para `CalendarioAgendamento`.

#### Uso de `index` como Key
**Problema:**
```typescript
// SecaoContato.tsx
{contatos.map((contato, index) => (
  <CardContato key={index} contato={contato} />
))}
```

**Solução Recomendada:**
Usar propriedade única (ex: `key={contato.tipo}` ou adicionar `id` ao tipo `Contato`).

#### Hardcoded Arrays de Horários
**Problema:**
Arrays de `horariosDisponiveis` são longos e hardcoded:
```typescript
horariosDisponiveis: ['08:00', '08:30', '09:00', ..., '19:00']
```

**Solução Recomendada:**
Gerar dinamicamente baseado em `horario: "08:00 às 19:00"` e intervalo padrão.

#### Botão de Favorito sem Funcionalidade
**Problema:**
Componente `Logo` tem botão de favorito que não faz nada:
```typescript
<button className={estilos.favorito} aria-label="Marcar como favorito">
  <svg>...</svg>
</button>
```

**Solução Recomendada:**
Remover ou implementar funcionalidade (ex: localStorage).

#### Falta de Gerenciamento de Erro
**Problema:**
Nenhum tratamento de erro se:
- Profissional não encontrado no array
- Imagem falha ao carregar
- WhatsApp não abre

**Solução Recomendada:**
Adicionar Error Boundaries e fallbacks.

---

## 8. Análise de Build e Performance

### 8.1 Resultado do Build

```bash
npm run build

> instituto-jardim@1.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming...
✓ 61 modules transformed.
rendering chunks...
computing gzip size...

dist/index.html                   0.51 kB │ gzip:  0.34 kB
dist/assets/index-BxLyT-8I.css   15.44 kB │ gzip:  3.16 kB
dist/assets/index-DUDy7NMN.js   157.69 kB │ gzip: 50.84 kB

✓ built in 489ms
```

**Análise:**
- **HTML**: 0.51 kB (excelente)
- **CSS**: 15.44 kB (3.16 kB gzipped) - tamanho aceitável
- **JavaScript**: 157.69 kB (50.84 kB gzipped) - dominado pelo React (~140 kB)
- **Tempo de build**: 489ms (muito rápido)

### 8.2 Otimizações Aplicadas

- **Lazy loading** de imagens (`loading="lazy"`)
- **CSS Modules** reduz CSS não utilizado
- **Tree shaking** automático do Vite
- **Minificação** automática

### 8.3 Oportunidades de Melhoria

1. **Code splitting**: Separar `PaginaProfissional` em chunk lazy
2. **Imagens otimizadas**: SVGs podem ser inline via SVGR
3. **Preload de fontes**: Se usar fontes customizadas
4. **Service Worker**: PWA para offline-first

---

## 9. Mapeamento de Rotas e Navegação

### 9.1 Navegação Atual (Client-Side State)

**Não há roteamento**. A navegação é controlada por estado:

```typescript
// App.tsx
if (profissionalSelecionado) {
  return <PaginaProfissional ... />;
}
return <VisualizacaoPrincipal />;
```

**URLs:**
- `/` - Única URL (não muda ao navegar)

### 9.2 Recomendação Futura

Implementar React Router para:
- URLs semânticas: `/profissional/1`, `/contato`
- Deep linking
- Histórico do navegador (botão voltar)
- SEO (com SSR/SSG futuro)

---

## 10. Integrações Externas

### 10.1 WhatsApp API (Deep Link)

**Formato:**
```
https://wa.me/{numero}?text={mensagem_encodada}
```

**Exemplo:**
```
https://wa.me/554499999999?text=Ol%C3%A1%2C%20gostaria%20de%20agendar...
```

**Limitações:**
- Não confirma se mensagem foi enviada
- Depende de WhatsApp instalado
- Experiência varia por dispositivo

### 10.2 Google Maps

**Formato:**
```
https://maps.app.goo.gl/3piTji8UeibTNbwU6
```

**Comportamento:**
- Abre Google Maps em nova aba
- Funciona em desktop e mobile

---

## 11. Segurança e Vulnerabilidades

### 11.1 Análise de Segurança

**Vulnerabilidades Conhecidas (npm audit):**
```
2 moderate severity vulnerabilities
```

**Ação Recomendada:**
```bash
npm audit fix
```

### 11.2 Boas Práticas Aplicadas

- `rel="noopener noreferrer"` em links externos
- Sanitização implícita do React (previne XSS)
- HTTPS recomendado para produção

### 11.3 Riscos Potenciais

- **Dados Sensíveis**: Números de WhatsApp expostos no código
- **CORS**: Sem backend, não há riscos de CORS
- **Injeção**: React previne por padrão

---

## 12. Considerações de Deploy

### 12.1 Build de Produção

**Comando:**
```bash
npm run build
```

**Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── imagens/  (se copiadas)
```

### 12.2 Plataformas Recomendadas

1. **Vercel** (recomendado)
   - Zero config para Vite
   - Deploy automático do Git
   - Preview URLs

2. **Netlify**
   - Configuração simples
   - CDN global

3. **GitHub Pages**
   - Gratuito
   - Requer configuração de base path

### 12.3 Variáveis de Ambiente

**Não utilizadas atualmente**, mas recomendado para:
- URLs de API (futuro)
- Chaves de integração
- Feature flags

**Padrão Vite:**
```typescript
// .env
VITE_API_URL=https://api.example.com

// Uso
import.meta.env.VITE_API_URL
```

---

## 13. Conclusões e Recomendações

### 13.1 Pontos Fortes

1. **Arquitetura Sólida**: Componentes bem separados e reutilizáveis
2. **TypeScript Estrito**: Segurança de tipos em toda aplicação
3. **Acessibilidade**: Boas práticas aplicadas (semântica, ARIA, teclado)
4. **Performance**: Build leve e rápido
5. **DX (Developer Experience)**: Vite + TypeScript + ESLint = produtividade

### 13.2 Áreas de Melhoria Prioritárias

1. **Gerenciamento de Estado**: Eliminar duplicação entre componentes
2. **Roteamento**: Implementar React Router para URLs semânticas
3. **Error Handling**: Adicionar Error Boundaries e tratamento de falhas
4. **Testes**: Criar suite de testes (Jest + React Testing Library)
5. **Geração Dinâmica de Horários**: Substituir arrays hardcoded

### 13.3 Próximos Passos (Roadmap Técnico)

**Curto Prazo:**
- Refatorar estado duplicado
- Adicionar testes unitários
- Implementar Error Boundaries
- Corrigir uso de `index` como key

**Médio Prazo:**
- Implementar React Router
- Adicionar backend (API REST ou GraphQL)
- Sistema de autenticação para profissionais
- Dashboard administrativo

**Longo Prazo:**
- PWA (Progressive Web App)
- Notificações push
- Sistema de confirmação de agendamentos
- Integração com calendário (Google Calendar)

---

## 14. Anexos

### 14.1 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Instalar dependências
npm install

# Audit de segurança
npm audit
npm audit fix
```

### 14.2 Path Aliases

```typescript
// Ao invés de:
import { Cabecalho } from '../../componentes/Cabecalho';

// Use:
import { Cabecalho } from '@/componentes/Cabecalho';
```

### 14.3 Estrutura de Import

**Ordem Recomendada:**
```typescript
// 1. React e bibliotecas externas
import { useState } from 'react';

// 2. Tipos e interfaces
import { Profissional } from '@/dados/tipos';

// 3. Componentes
import { Cabecalho } from '@/componentes/Cabecalho';

// 4. Dados
import { profissionais } from '@/dados/mockProfissionais';

// 5. Estilos
import estilos from './Componente.module.css';
```

---

## 15. Glossário Técnico

| Termo | Definição |
|-------|-----------|
| **SPA** | Single-Page Application - aplicação que carrega uma única página HTML e atualiza dinamicamente |
| **HMR** | Hot Module Replacement - atualização de módulos sem reload completo |
| **CSS Modules** | Sistema de escopo de CSS que gera nomes únicos de classes |
| **Barrel Export** | Arquivo `index.ts` que re-exporta outros módulos para simplificar imports |
| **Design Tokens** | Variáveis CSS que armazenam valores de design (cores, espaçamentos, etc.) |
| **Tree Shaking** | Eliminação de código não utilizado durante o build |
| **Deep Link** | URL que abre aplicativo nativo (ex: WhatsApp) |

---

**Fim do Documento**

**Última Atualização**: 2026-02-07
**Autor**: dev-implementer
**Versão**: 1.0
**Status**: Concluído
