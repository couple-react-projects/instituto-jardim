# PRD-0002: Implementação dos Quick Wins Top 10

## 1. Problema do Usuário / Necessidade

O projeto Instituto Jardim foi completamente analisado e documentado através do PRD-0001, resultando em 74 melhorias identificadas e consolidadas na Matriz de Priorização. Destas, 10 melhorias foram classificadas como **Quick Wins** - mudanças de alto impacto que exigem baixo esforço de implementação (11.5-16 horas totais).

**Dores e frustrações identificadas:**

1. **Segurança comprometida**: Vulnerabilidades moderadas em dependências críticas (Vite e esbuild) expõem o projeto a riscos de segurança conhecidos

2. **Acessibilidade limitada**: Usuários que dependem de leitores de tela ou navegação por teclado encontram barreiras ao usar o calendário de agendamento, pois elementos de formulário não possuem labels adequados e não existe atalho para pular o cabeçalho

3. **SEO inexistente**: O site não aparece nos resultados de busca do Google porque falta configuração básica de meta tags essenciais (title, description, Open Graph)

4. **Performance aquém do potencial**: Imagens SVG dos profissionais não estão comprimidas, desperdiçando 40% de largura de banda desnecessariamente. Navegação entre telas poderia ser 75% mais rápida com prefetching

5. **Débitos técnicos acumulados**: Código usa `key={index}` em listas (anti-pattern React que causa bugs sutis) e contém código morto (botão favorito sem funcionalidade)

6. **UX confusa no calendário**: Datas indisponíveis aparecem apenas com opacidade reduzida, sem explicação clara do motivo da indisponibilidade, gerando frustração e tentativas de clique inúteis

7. **Contraste de cores insuficiente**: Textos secundários podem não atingir o critério mínimo WCAG AA (4.5:1), dificultando leitura para usuários com baixa visão

**Cenário real de impacto:**

Maria, 62 anos, usa leitor de tela para agendar consulta com fisioterapeuta. Ao tentar preencher o formulário de agendamento, o leitor não anuncia qual informação deve ser preenchida porque o campo de nome não possui `<label>` associado. Ela desiste frustrada.

João tenta encontrar o Instituto Jardim no Google para ver horários de atendimento, mas o site não aparece nos resultados porque faltam meta tags essenciais de SEO.

Ana navega pelo site em conexão 3G e espera 8 segundos para imagens carregarem porque os SVGs não estão otimizados, abandonando antes de agendar.

## 2. Objetivo da Solução

Implementar as **10 melhorias de maior ROI (Retorno sobre Investimento)** identificadas na Matriz de Priorização, entregando valor máximo ao usuário e ao negócio com investimento mínimo de tempo.

**Resultados esperados após implementação:**

- **Segurança**: Zero vulnerabilidades conhecidas em dependências
- **Acessibilidade**: Conformidade WCAG 2.1 Nível A aumentada de 44% (4/9 critérios) para 77% (7/9 critérios)
- **SEO**: Site indexável pelo Google com meta tags essenciais configuradas, permitindo descoberta via busca orgânica
- **Performance**: Redução de 40% no tamanho das imagens e navegação 75% mais rápida
- **Qualidade de código**: Eliminação de 2 anti-patterns críticos (key={index}, código morto)
- **UX**: Feedback visual de datas indisponíveis 15% mais claro
- **Contraste**: 100% dos textos atendem WCAG AA (4.5:1 mínimo)

**Benefícios mensuráveis:**

- Taxa de conversão de agendamento: +10% (estimativa)
- Descoberta via Google: De 0% para indexação básica ativa
- Taxa de abandono por usuários com deficiência: -30%
- Tempo de carregamento em 3G: -25%

## 3. Público-Alvo

**Primário:**
- **Pacientes em potencial**: Pessoas buscando agendamento de consultas com profissionais de saúde (fisioterapeuta, psicóloga, nutricionista)
- **Usuários com deficiência**: Pessoas que dependem de leitores de tela, navegação por teclado ou contraste elevado
- **Usuários mobile com conexão lenta**: 40% dos visitantes em redes 3G/4G limitadas

**Secundário:**
- **Motores de busca**: Google e outros buscadores que indexam o site
- **Desenvolvedores futuros**: Time técnico que dará manutenção ao código
- **Stakeholders de negócio**: Gestores que acompanham métricas de conversão e acessibilidade

**Personas principais:**

1. **Maria (62 anos, aposentada, usa leitor de tela)**
   - Precisa de labels de formulário para preencher agendamento
   - Beneficiada por: MA-001 (skip link), MA-004 (labels)

2. **João (35 anos, empresário, pesquisa no Google)**
   - Busca "fisioterapeuta região" no Google
   - Beneficiado por: MSEO-001 (meta tags SEO)

3. **Ana (28 anos, usa celular em ônibus, 3G lento)**
   - Frustra-se com carregamento lento de imagens
   - Beneficiada por: MPF-005 (SVG comprimido), MPF-006 (prefetching)

4. **Carlos (desenvolvedor, manterá código futuramente)**
   - Precisa de código limpo e sem débitos
   - Beneficiado por: DT-003 (corrigir key), MR-010 (remover código morto)

## 4. Critérios de Aceitação de Negócio

A solução é considerada bem-sucedida quando:

1. **Segurança verificável**: Executar `npm audit` retorna zero vulnerabilidades de severidade moderada ou alta

2. **Acessibilidade mensurável**: Lighthouse Accessibility score aumenta de 70 (baseline) para no mínimo 85/100

3. **SEO validável**: Google Search Console confirma que meta tags essenciais (title, description, Open Graph) foram detectadas e o site está indexável

4. **Performance quantificável**:
   - Tamanho total de imagens SVG reduz de ~30 kB para ~15-18 kB (40-50% de redução)
   - Tempo de navegação ao clicar em profissional reduz de 200ms para 50ms (75% mais rápido)

5. **Contraste WCAG AA**: Ferramenta WebAIM Contrast Checker valida que todos os textos atingem ratio mínimo de 4.5:1

6. **Código limpo verificável**:
   - Zero ocorrências de `key={index}` em arrays renderizados (busca via `grep -r "key={index}" src/`)
   - Botão favorito removido de `Logo.tsx` (arquivo não contém mais código relacionado)

7. **Build funcional**: Após todas mudanças, `npm run build` executa sem erros e `npm run preview` renderiza aplicação funcionando corretamente

8. **UX de calendário melhorada**: Datas indisponíveis possuem tooltip ou indicador visual claro do motivo (ex: "Profissional não atende aos domingos")

## 5. Requisitos Funcionais

### 5.1 Segurança e Dependências

#### RF-001: Atualizar dependências vulneráveis (DT-001)
**Problema**: 2 vulnerabilidades moderadas detectadas em `esbuild` e `vite`

**Solução**: O sistema deve atualizar as seguintes dependências para versões sem vulnerabilidades conhecidas:
- `vite`: da versão 5.x para 7.x (ou última versão estável sem vulnerabilidades)
- `esbuild`: atualizar para versão compatível sem vulnerabilidades

**Critério de aceitação mensurável**:
- Executar `npm audit` e obter saída: "found 0 vulnerabilities"
- `npm run build` executa sem warnings de deprecação
- Aplicação continua funcionando após atualização (validado com `npm run preview`)

**Componentes afetados**: `package.json`, `package-lock.json`

**Tempo estimado**: 2-3 horas

---

#### RF-002: Corrigir uso de `key={index}` em listas (DT-003)
**Problema**: Uso de índice de array como key em listas React causa bugs sutis quando ordem muda

**Solução**: O sistema deve substituir `key={index}` por identificadores únicos estáveis:

1. **Em `SecaoContato.tsx` (links de contato)**:
   - Usar `key={metodo.tipo}` ao invés de `key={index}`
   - Justificativa: Tipo de contato (telefone, email, whatsapp) é único

2. **Em `CalendarioAgendamento.tsx` (botões de data)**:
   - Usar `key={data.getTime()}` ao invés de `key={index}`
   - Justificativa: Timestamp é único por data

**Critério de aceitação mensurável**:
- Executar `grep -r "key={index}" src/componentes/` retorna zero ocorrências
- Aplicação renderiza calendário corretamente após mudança
- Não há warnings no console do navegador sobre keys duplicadas

**Componentes afetados**: `SecaoContato.tsx`, `CalendarioAgendamento.tsx`

**Tempo estimado**: 0.5 hora

---

### 5.2 Acessibilidade (WCAG 2.1)

#### RF-003: Adicionar skip link para navegação rápida (MA-001)
**Critério WCAG**: 2.4.1 Bypass Blocks (Nível A)

**Problema**: Usuários de teclado/leitores de tela precisam navegar pelo cabeçalho inteiro antes de acessar conteúdo principal

**Solução**: O sistema deve adicionar link "Pular para conteúdo principal" visível apenas ao receber foco de teclado:

1. Adicionar link em `index.html` antes do `<div id="root">`
2. Estilizar link para aparecer apenas quando focado (position: absolute com top: -40px, focus traz para top: 0)
3. Link deve direcionar para id `#conteudo-principal` no elemento main

**Critério de aceitação mensurável**:
- Ao pressionar Tab no carregamento da página, primeiro elemento focado é o skip link
- Link é visível apenas quando focado (invisível por padrão)
- Clicar no link ou pressionar Enter move foco para conteúdo principal
- Lighthouse Accessibility detecta presença de skip link

**Componentes afetados**: `index.html`, `App.tsx`, `globais.css`

**Tempo estimado**: 0.25 hora

---

#### RF-004: Adicionar labels de formulário (MA-004)
**Critério WCAG**: 1.3.1 Info and Relationships (Nível A), 3.3.2 Labels or Instructions (Nível A)

**Problema**: Input de nome do paciente usa apenas placeholder, sem `<label>` associado, impossibilitando uso por leitores de tela

**Solução**: O sistema deve substituir `<h3>` por `<label>` adequado no campo de nome:

1. Substituir heading por `<label htmlFor="nome-paciente">`
2. Adicionar `id="nome-paciente"` ao input
3. Adicionar atributos `required` e `aria-required="true"`
4. Adicionar span com id `nome-instrucao` e `aria-describedby` no input

**Critério de aceitação mensurável**:
- Leitor de tela (NVDA/JAWS) anuncia "Nome do Paciente, campo obrigatório, digite seu nome completo para o agendamento" ao focar input
- Clicar no label foca automaticamente o input
- Lighthouse Accessibility valida que input possui label associado

**Componentes afetados**: `CalendarioAgendamento.tsx`, `CalendarioAgendamento.module.css`

**Tempo estimado**: 0.5 hora

---

#### RF-005: Verificar e corrigir contraste de cores WCAG AA (MA-006)
**Critério WCAG**: 1.4.3 Contrast (Minimum) (Nível AA) - ratio mínimo 4.5:1

**Problema**: Cor de texto secundário (`--cor-texto-secundario: #6B6B6B`) sobre fundo bege (`--cor-fundo: #F5F5F0`) pode não atingir contraste mínimo

**Solução**: O sistema deve auditar e corrigir contraste de cores:

1. Executar auditoria com WebAIM Contrast Checker em todas as combinações de cores
2. Se ratio < 4.5:1, ajustar variável CSS para cor mais escura
3. Validar que todas as combinações texto/fundo atendem WCAG AA

**Critério de aceitação mensurável**:
- Lighthouse Accessibility não reporta erros de contraste
- WebAIM Contrast Checker valida ratio >= 4.5:1 para:
  - `--cor-texto-principal` sobre `--cor-fundo`
  - `--cor-texto-secundario` sobre `--cor-fundo` (ajustar se necessário)
  - `--cor-marrom-claro` sobre `--cor-fundo` (ajustar se necessário)
- Todos os textos do site são legíveis para usuários com baixa visão

**Componentes afetados**: `variaveis.css`, todos componentes com texto

**Tempo estimado**: 2 horas

---

### 5.3 SEO e Descoberta

#### RF-006: Adicionar meta tags essenciais (MSEO-001)
**Problema**: Site não possui meta tags básicas, impossibilitando indexação pelo Google e compartilhamento em redes sociais

**Solução**: O sistema deve adicionar meta tags essenciais em `index.html`:

1. **Meta description**: Texto de 150-160 caracteres descrevendo o Instituto
2. **Open Graph** (compartilhamento Facebook/WhatsApp):
   - `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
3. **Twitter Card**: `twitter:card`, `twitter:title`, `twitter:description`
4. **Meta viewport** (já existe, validar)
5. **Meta charset** (já existe, validar)

**Critério de aceitação mensurável**:
- Google Search Console detecta meta tags após indexação
- Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/) valida Open Graph tags
- Twitter Card Validator valida Twitter meta tags
- Lighthouse SEO score aumenta para >= 90/100

**Componentes afetados**: `index.html`

**Tempo estimado**: 0.5 hora

---

### 5.4 Performance

#### RF-007: Comprimir imagens SVG dos profissionais (MPF-005)
**Problema**: SVGs em `/public/imagens/profissionais/` não estão otimizados, contendo metadados desnecessários

**Solução**: O sistema deve comprimir SVGs usando SVGO:

1. Instalar SVGO: `npm install -D svgo`
2. Executar otimização: `npx svgo -f public/imagens/profissionais -o public/imagens/profissionais`
3. Configurar SVGO para:
   - Remover metadados XML (comments, prolog)
   - Minimizar precisão de floats para 2 casas decimais
   - Remover IDs não utilizadas
   - Converter cores para hexadecimal curto

**Critério de aceitação mensurável**:
- Tamanho médio por SVG reduz de ~10 kB para ~5-6 kB (40-50% de redução)
- Total de imagens (3 profissionais) reduz de ~30 kB para ~15-18 kB
- Imagens renderizam visualmente idênticas após compressão
- Lighthouse Performance detecta redução no tamanho de assets

**Componentes afetados**: Arquivos em `/public/imagens/profissionais/`

**Tempo estimado**: 1 hora

---

#### RF-008: Implementar prefetching ao hover no card (MPF-006)
**Problema**: Navegação para página de profissional tem delay perceptível porque recursos são carregados apenas ao clicar

**Solução**: O sistema deve implementar prefetching de recursos ao passar mouse sobre card:

1. Adicionar handler `onMouseEnter` em `CardProfissional.tsx`
2. Ao hover, precarregar imagem do profissional:
   ```typescript
   const img = new Image();
   img.src = profissional.foto;
   ```
3. Apenas prefetch se hover > 300ms (evitar fetches desnecessários em hover acidental)
4. Considerar prefetch do componente `PaginaProfissional` se code splitting implementado futuramente

**Critério de aceitação mensurável**:
- Tempo de navegação ao clicar em card reduz de ~200ms para ~50ms (75% mais rápido)
- Network tab do DevTools mostra imagem sendo carregada ao hover
- Prefetch não ocorre em hovers rápidos (< 300ms)

**Componentes afetados**: `CardProfissional.tsx`, `App.tsx`

**Tempo estimado**: 2-3 horas

---

### 5.5 UX e Feedback Visual

#### RF-009: Melhorar visualização de datas indisponíveis (MUX-005)
**Problema**: Datas indisponíveis no calendário aparecem apenas com opacidade reduzida, sem explicação do motivo

**Solução**: O sistema deve adicionar indicadores visuais e textuais para datas indisponíveis:

1. Adicionar ícone de "X" ou slash em dias indisponíveis usando CSS `::after`
2. Adicionar tooltip ao hover explicando motivo:
   - "Profissional não atende neste dia da semana"
   - "Profissional não atende aos domingos"
3. Adicionar legenda abaixo do calendário:
   - Quadrado verde: Disponível
   - Quadrado cinza com X: Indisponível
4. Melhorar contraste visual (opacity 0.3 ao invés de 0.4)

**Critério de aceitação mensurável**:
- Ao passar mouse sobre data indisponível, tooltip aparece com explicação clara
- Legenda do calendário está visível e descreve corretamente os estados
- Taxa de cliques em datas indisponíveis reduz em 30% (se analytics disponível)
- Feedback de usuários reporta maior clareza (se teste de usabilidade realizado)

**Componentes afetados**: `CalendarioAgendamento.tsx`, `CalendarioAgendamento.module.css`

**Tempo estimado**: 2-3 horas

---

### 5.6 Refatoração e Limpeza

#### RF-010: Remover código morto (botão favorito) (MR-010)
**Problema**: Botão favorito no `Logo.tsx` não possui funcionalidade real, apenas `aria-label` sem handler

**Solução**: O sistema deve remover completamente o botão favorito:

1. Remover JSX do botão em `Logo.tsx` (linhas com SVG de coração)
2. Remover estilos associados em `Logo.module.css` (classe `.botaoFavorito`)
3. Validar que logo continua renderizando corretamente sem o botão

**Critério de aceitação mensurável**:
- Buscar por "favorito" em `Logo.tsx` retorna zero ocorrências
- Buscar por "botaoFavorito" em `Logo.module.css` retorna zero ocorrências
- Logo renderiza sem botão fantasma
- Bundle JS reduz marginalmente (~0.2-0.5 kB)

**Componentes afetados**: `Logo.tsx`, `Logo.module.css`

**Tempo estimado**: 0.25 hora

---

## 6. Fora do Escopo

Para manter foco nos Quick Wins, as seguintes melhorias identificadas na Matriz de Priorização **NÃO** fazem parte deste PRD:

### 6.1 Melhorias P1 (Alto Impacto, Alto Esforço)
- Dark mode / tema alternativo (MUX-010) - 8-10 horas
- Service worker para cache (MPF-007) - 8-10 horas
- Otimizar SVGs e criar sprite sheet (MPF-002) - 6-8 horas
- Code splitting e lazy loading (MPF-001) - 3-4 horas
- Modal de confirmação WhatsApp (MUX-004) - 6-8 horas
- Structured Data Schema.org (MSEO-003) - 2-3 horas

### 6.2 Melhorias de Acessibilidade Avançadas
- Landmarks ARIA completos (MA-002) - Incluído em backlog P1
- Focus management na navegação (MA-009) - Incluído em backlog P1
- `prefers-reduced-motion` (MA-013) - Incluído em backlog P2

### 6.3 Melhorias de Performance Avançadas
- React.memo e useMemo (MPF-004) - Incluído em backlog P1
- Critical CSS inline (MPF-009) - Incluído em backlog P2
- Virtual scrolling no calendário (MPF-003) - Incluído em backlog P3

### 6.4 Funcionalidades Novas
- Sistema de testes unitários (MR-012) - Requer PRD separado
- Backend real (atualmente usa dados mockados) - Requer PRD separado
- SSR/SSG com Next.js (MSEO-008) - Requer PRD separado e mudança arquitetural

### 6.5 Exclusões Explícitas
- Mudanças em design visual (cores, tipografia) além de ajustes de contraste WCAG
- Adição de novas páginas ou rotas
- Integração com APIs externas
- Sistema de autenticação/autorização
- Analytics ou tracking de usuários
- Testes end-to-end ou integração

## 7. Métricas de Sucesso

### 7.1 Métricas Técnicas (Mensuráveis Imediatamente)

| Métrica | Baseline (Antes) | Meta (Depois) | Como Medir |
|---------|------------------|---------------|------------|
| Vulnerabilidades npm | 2 moderadas | 0 | `npm audit` |
| Lighthouse Accessibility | ~70/100 | >= 85/100 | Chrome DevTools > Lighthouse |
| Lighthouse SEO | ~50/100 | >= 90/100 | Chrome DevTools > Lighthouse |
| Ocorrências `key={index}` | 2 | 0 | `grep -r "key={index}" src/` |
| Tamanho imagens SVG | ~30 kB | ~15-18 kB | Soma dos arquivos em `/public/imagens/profissionais/` |
| Bundle JS gzipped | 50.84 kB | ~50.5 kB | `npm run build` output |
| Contraste WCAG AA | Desconhecido | 100% atendem | WebAIM Contrast Checker |
| Código morto (favorito) | 1 botão | 0 | Inspeção visual `Logo.tsx` |

### 7.2 Métricas de Negócio (Mensuráveis em 30 dias)

| Métrica | Baseline | Meta | Como Medir |
|---------|----------|------|------------|
| Taxa de conversão agendamento | 100% (baseline) | +10-15% | Google Analytics events (se configurado) |
| Taxa de abandono usuários a11y | Desconhecido | -30% | Feedback direto ou analytics |
| Descoberta via Google | 0 visitas orgânicas | > 0 indexação ativa | Google Search Console |
| Tempo médio de carregamento (3G) | ~3-4s | ~2.5-3s | WebPageTest.org |
| NPS de usuários com deficiência | Desconhecido | Estabelecer baseline | Pesquisa de satisfação |

### 7.3 Critérios de Sucesso por Quick Win

1. **MSEO-001 (Meta tags)**: Google Search Console detecta meta tags válidas
2. **MA-001 (Skip link)**: Tab no carregamento foca skip link imediatamente
3. **MA-004 (Labels)**: NVDA/JAWS anuncia label corretamente ao focar input
4. **DT-003 (key={index})**: Zero warnings de key no console do navegador
5. **DT-001 (Deps vulneráveis)**: `npm audit` retorna "found 0 vulnerabilities"
6. **MPF-005 (SVG)**: Total de SVGs < 20 kB (redução de 33%+)
7. **MA-006 (Contraste)**: Lighthouse não reporta erros de contraste
8. **MUX-005 (Datas indisponíveis)**: Tooltip aparece ao hover em data indisponível
9. **MPF-006 (Prefetching)**: Network tab mostra prefetch ao hover > 300ms
10. **MR-010 (Código morto)**: Zero ocorrências de "favorito" em `Logo.tsx`

### 7.4 Definição de Pronto (Definition of Done)

Um Quick Win é considerado **DONE** quando:

- [ ] Código implementado conforme especificação do RF correspondente
- [ ] `npm run build` executa sem erros ou warnings
- [ ] `npm run lint` passa sem erros
- [ ] Aplicação renderiza corretamente em `npm run preview`
- [ ] Critério de aceitação mensurável do RF foi validado
- [ ] Nenhuma regressão visual detectada (comparação antes/depois)
- [ ] Tech Lead aprovou em code review
- [ ] Tech Lead validou em QA

**Pipeline completo DONE quando:**
- Todos os 10 Quick Wins marcados como DONE
- Lighthouse Accessibility >= 85/100
- Lighthouse SEO >= 90/100
- `npm audit` = 0 vulnerabilidades
- Build de produção funcional

## 8. Requisitos Não-Funcionais

### 8.1 Compatibilidade
- Todas mudanças devem manter compatibilidade com navegadores suportados:
  - Chrome 90+ ✓
  - Firefox 88+ ✓
  - Safari 14+ ✓
  - Edge 90+ ✓
  - Mobile (iOS Safari 14+, Chrome Android) ✓

### 8.2 Performance
- Build time não deve aumentar mais de 10% (baseline: 504ms → máximo 554ms)
- Bundle JS gzipped não deve aumentar (máximo aceitável: +1 kB para 51.84 kB)
- Nenhum Quick Win deve degradar Core Web Vitals:
  - FCP (First Contentful Paint) deve melhorar ou manter
  - LCP (Largest Contentful Paint) deve melhorar com SVG comprimido
  - CLS (Cumulative Layout Shift) deve se manter < 0.1

### 8.3 Manutenibilidade
- Código adicionado deve seguir padrões existentes do projeto:
  - TypeScript strict mode
  - CSS Modules para estilos
  - Imports usando path alias `@/`
  - ESLint sem warnings
- Decisões arquiteturais significativas devem ser documentadas em ADRs (Architecture Decision Records)

### 8.4 Acessibilidade
- Após implementação, projeto deve atingir conformidade WCAG 2.1 Nível A em 77% dos critérios (7/9)
- Conformidade WCAG AA deve aumentar para 67% (4/6) com MA-006 implementado
- Todas mudanças devem ser testáveis com leitor de tela (NVDA ou JAWS)

### 8.5 Segurança
- Nenhuma vulnerabilidade conhecida deve permanecer após DT-001
- Atualizações de dependências devem passar por teste de build antes de merge
- Não introduzir novas dependências além de `svgo` (dev dependency)

### 8.6 Testes
- Build de produção (`npm run build`) deve executar sem erros
- Preview de produção (`npm run preview`) deve renderizar aplicação funcional
- Lighthouse audit não deve regredir em nenhuma categoria
- Testes manuais de navegação devem validar fluxo completo de agendamento

## 9. Dependências

### 9.1 Dependências Técnicas
- **PRD-0001**: DONE - Análise completa e matriz de priorização concluídas
- **MATRIZ-PRIORIZACAO.md**: Documento fonte dos Quick Wins Top 10
- **MELHORIAS-UX-PERFORMANCE.md**: Detalhes de MPF-005, MPF-006, MUX-005
- **MELHORIAS-A11Y-SEO-REFATORACAO.md**: Detalhes de MA-001, MA-004, MA-006, MSEO-001, MR-010
- **AVALIACAO-QUALIDADE.md**: Detalhes de DT-001, DT-003

### 9.2 Dependências de Ambiente
- Node.js >= 18.x (versão mínima para Vite 7)
- npm >= 9.x
- Navegadores modernos para testes (Chrome, Firefox, Safari)
- Acesso ao Google Search Console (para validação MSEO-001)
- Ferramenta de contraste WCAG (WebAIM Contrast Checker online)

### 9.3 Dependências Externas
- Nenhuma API externa necessária
- Nenhum serviço de terceiros além de ferramentas de validação gratuitas

### 9.4 Ordem de Implementação Recomendada

Por causa de dependências entre Quick Wins, sugere-se a seguinte ordem:

**Grupo 1 - Fundação (podem ser paralelos):**
1. DT-001 (Atualizar deps) - **CRÍTICO PRIMEIRO** - Afeta build de todos os outros
2. DT-003 (Corrigir key={index}) - Independente
3. MR-010 (Remover código morto) - Independente

**Grupo 2 - SEO e Acessibilidade básica (podem ser paralelos após Grupo 1):**
4. MSEO-001 (Meta tags) - Independente
5. MA-001 (Skip link) - Independente
6. MA-004 (Labels formulário) - Independente

**Grupo 3 - Performance (podem ser paralelos após Grupo 1):**
7. MPF-005 (Comprimir SVG) - Independente
8. MPF-006 (Prefetching) - Independente

**Grupo 4 - UX e Contraste (podem ser paralelos após Grupo 2):**
9. MUX-005 (Datas indisponíveis) - Independente
10. MA-006 (Contraste WCAG) - Pode afetar cores em MUX-005, fazer último

## 10. Riscos

### 10.1 Risco: Breaking Changes em Atualização de Dependências (DT-001)
**Probabilidade**: Alta
**Impacto**: Alto
**Severidade**: CRÍTICA

**Descrição**: Vite 5 → 7 é major version bump, pode quebrar build ou introduzir incompatibilidades.

**Mitigação**:
- Criar branch separado `chore/update-deps` antes de atualizar
- Fazer backup de `package-lock.json`
- Revisar changelog oficial: https://github.com/vitejs/vite/releases/tag/v7.0.0
- Testar build localmente antes de merge: `npm run build && npm run preview`
- Ter plano de rollback: reverter para versão anterior se build quebrar
- Executar audit antes e depois para comparar: `npm audit --json > audit-before.json`

**Contingência**: Se atualização quebrar build de forma irrecuperável, documentar incompatibilidade em ADR e manter versão atual até solução ser encontrada.

---

### 10.2 Risco: Contraste WCAG AA Requer Mudanças Visuais Significativas (MA-006)
**Probabilidade**: Média
**Impacto**: Médio
**Severidade**: MÉDIA

**Descrição**: Ajustar contraste de cores pode alterar identidade visual do design, gerando resistência de stakeholders.

**Mitigação**:
- Realizar auditoria de contraste ANTES de fazer mudanças
- Se ratio já atende WCAG AA (>= 4.5:1), documentar e marcar como DONE sem mudanças
- Se ajuste necessário, fazer mudanças incrementais (escurecer em 10% por vez)
- Apresentar comparação visual antes/depois para validação
- Justificar com requisito legal (WCAG AA é exigência de acessibilidade em muitos países)

**Contingência**: Se stakeholder rejeitar mudanças visuais, documentar em ADR e marcar contraste como débito técnico conhecido para resolução futura.

---

### 10.3 Risco: Tooltip de Datas Indisponíveis Não Funciona em Mobile (MUX-005)
**Probabilidade**: Média
**Impacto**: Baixo
**Severidade**: BAIXA

**Descrição**: Hover não existe em dispositivos touch, tooltip pode não aparecer.

**Mitigação**:
- Implementar tooltip responsivo: em mobile, usar `onClick` ou `onTouchStart` ao invés de `onMouseEnter`
- Adicionar legenda visual abaixo do calendário (funciona em todas plataformas)
- Testar em dispositivo mobile real ou emulador Chrome DevTools

**Contingência**: Se tooltip em mobile for complexo demais, implementar apenas legenda visual e marcar tooltip hover como enhancement futuro.

---

### 10.4 Risco: Prefetching Aumenta Uso de Largura de Banda (MPF-006)
**Probabilidade**: Baixa
**Impacto**: Baixo
**Severidade**: BAIXA

**Descrição**: Prefetch de imagens ao hover pode desperdiçar banda se usuário não clicar.

**Mitigação**:
- Implementar delay de 300ms: só prefetch se hover persistir por 300ms+
- Imagens SVG são pequenas (~5-6 kB após compressão), impacto mínimo
- Prefetch melhora UX significativamente, trade-off vale a pena
- Monitorar métricas de navegação: se taxa de clique após hover for > 40%, prefetch é benéfico

**Contingência**: Se analytics mostrarem taxa de clique < 20% após hover, considerar remover prefetching em release futura.

---

### 10.5 Risco: SVGO Corrompe SVGs (MPF-005)
**Probabilidade**: Muito Baixa
**Impacto**: Médio
**Severidade**: BAIXA

**Descrição**: SVGO pode, em casos raros, corromper SVGs complexos ao otimizar.

**Mitigação**:
- Fazer backup de `/public/imagens/profissionais/` antes de executar SVGO
- Comparação visual antes/depois: renderizar imagens no navegador e validar visualmente
- Se SVG corromper, usar configuração mais conservadora de SVGO (precision: 3 ao invés de 2)
- Testar SVGO em cópia local primeiro: `npx svgo -i original.svg -o otimizado.svg`

**Contingência**: Se SVGO corromper SVGs de forma irrecuperável, restaurar backup e marcar otimização como manual (usar ferramenta GUI como SVGOMG).

---

## 11. Cronograma Sugerido

### Dia 1 (4 horas)
**Manhã:**
- [ ] DT-001: Atualizar dependências vulneráveis (2-3h)
- [ ] DT-003: Corrigir key={index} (0.5h)

**Tarde:**
- [ ] MR-010: Remover código morto (0.25h)
- [ ] MSEO-001: Meta tags SEO (0.5h)
- [ ] MA-001: Skip link (0.25h)
- [ ] MA-004: Labels formulário (0.5h)

**Entregáveis Dia 1:** 6/10 Quick Wins concluídos, segurança e acessibilidade básica resolvidas

---

### Dia 2 (4 horas)
**Manhã:**
- [ ] MPF-005: Comprimir SVG (1h)
- [ ] MA-006: Contraste WCAG (2h)

**Tarde:**
- [ ] MUX-005: Datas indisponíveis (2-3h - início)

**Entregáveis Dia 2:** 8/10 Quick Wins concluídos, performance e contraste validados

---

### Dia 3 (4 horas)
**Manhã:**
- [ ] MUX-005: Datas indisponíveis (continuação/conclusão)

**Tarde:**
- [ ] MPF-006: Prefetching ao hover (2-3h)

**Entregáveis Dia 3:** 10/10 Quick Wins concluídos

---

### Dia 4 (2 horas - Buffer e Validação)
**Validação Final:**
- [ ] Executar `npm audit` (validar 0 vulnerabilidades)
- [ ] Executar Lighthouse (validar Accessibility >= 85, SEO >= 90)
- [ ] Executar WebAIM Contrast Checker (validar todos contrastes)
- [ ] Testar build de produção (`npm run build && npm run preview`)
- [ ] Validar todos critérios de aceitação de cada RF
- [ ] Documentar resultados em relatório de conclusão

**Total estimado: 14-16 horas (~2 dias de trabalho intenso)**

---

## 12. Referências

### Documentos Técnicos Internos
- **PRD-0001**: Product Requirements Document - Análise Completa do Projeto
- **INTAKE-20260208-0036.md**: Intake validado para implementação dos Quick Wins
- **MATRIZ-PRIORIZACAO.md**: Consolidação de 74 melhorias em matriz impacto/esforço
- **MELHORIAS-UX-PERFORMANCE.md**: Detalhamento de propostas UX e performance
- **MELHORIAS-A11Y-SEO-REFATORACAO.md**: Detalhamento de acessibilidade, SEO e refatoração
- **AVALIACAO-QUALIDADE.md**: Pontos fortes e débitos técnicos identificados
- **LEVANTAMENTO-TECNICO.md**: Arquitetura e estrutura do projeto

### Padrões e Diretrizes Externas
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Google Search Console**: https://search.google.com/search-console
- **Lighthouse Documentation**: https://developer.chrome.com/docs/lighthouse/
- **SVGO Documentation**: https://github.com/svg/svgo
- **Vite 7 Changelog**: https://github.com/vitejs/vite/releases
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

### Ferramentas de Validação
- Chrome DevTools > Lighthouse
- Chrome DevTools > Network tab (validar prefetching)
- `npm audit` (vulnerabilidades)
- WebPageTest.org (performance 3G)
- NVDA ou JAWS (leitor de tela para testes de acessibilidade)

---

**Fim do PRD-0002**

**Data de Criação**: 2026-02-08
**Autor**: business-analyst-prd
**Baseado em**: INTAKE-20260208-0036.md, MATRIZ-PRIORIZACAO.md
**Versão**: 1.0
**Status**: Aguardando Validação Humana
**Próxima Etapa**: Validação pelo stakeholder → tech-lead (modo: AVALIAR_PRD)
