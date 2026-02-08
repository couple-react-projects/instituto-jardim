# MELHORIAS-A11Y-SEO-REFATORACAO

**Data**: 2026-02-08
**Vinculado a**: TASK-0005, PRD-0001
**Cobre**: RF-013 (Acessibilidade), RF-014 (SEO), RF-015 (Refatoracao)
**Status**: Concluido

---

## Sumario Executivo

Este documento apresenta propostas acionaveis e priorizadas de melhorias nas areas de acessibilidade (WCAG 2.1), SEO e refatoracao de codigo para o projeto Instituto Jardim. Todas as propostas sao especificas ao codigo real da aplicacao, referenciando arquivos, componentes e linhas concretas.

**Metricas Gerais:**
- **Acessibilidade**: 15 melhorias identificadas (6 criticas, 5 altas, 4 medias)
- **SEO**: 9 melhorias identificadas (2 criticas, 4 altas, 3 medias)
- **Refatoracao**: 12 melhorias identificadas (3 altas, 6 medias, 3 baixas)
- **Total**: 36 propostas acionaveis

---

## 1. MELHORIAS DE ACESSIBILIDADE (RF-013)

### Criterios WCAG 2.1 Relevantes
- **Nivel A**: Requisitos minimos de acessibilidade
- **Nivel AA**: Requisitos recomendados (padrao de conformidade)
- **Nivel AAA**: Requisitos avancados (opcional)

---

### MA-001: Adicionar skip link para navegacao rapida

**Criterio WCAG**: 2.4.1 Bypass Blocks (Nivel A)

**Situacao Atual:**
Nao existe mecanismo para usuarios de teclado pularem conteudo repetitivo (cabecalho) e irem direto ao conteudo principal.

**Codigo Atual (index.html):**
```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

**Proposta:**
Adicionar skip link visivel apenas ao receber foco:

```html
<!-- index.html -->
<body>
  <a href="#conteudo-principal" class="skip-link">Pular para o conteudo principal</a>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

```css
/* globais.css */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--cor-texto-principal);
  color: var(--cor-branco);
  padding: var(--espacamento-sm);
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

```tsx
// App.tsx - adicionar id ao main content
<div id="conteudo-principal" className={estilos.app}>
```

**Impacto**: ALTO - Melhora significativa para usuarios de teclado
**Esforco**: BAIXO - 15 minutos
**Componentes Afetados**: index.html, App.tsx, globais.css

---

### MA-002: Adicionar landmarks ARIA para estrutura da pagina

**Criterio WCAG**: 1.3.1 Info and Relationships (Nivel A), 2.4.1 Bypass Blocks (Nivel A)

**Situacao Atual:**
Componentes usam tags semanticas (`<header>`, `<footer>`, `<section>`) mas faltam `role` e `aria-label` descritivos para navegacao por landmarks.

**Codigo Atual (App.tsx linha 25-50):**
```tsx
return (
  <div className={estilos.app}>
    {profissionalSelecionado ? (
      <PaginaProfissional ... />
    ) : (
      <>
        <Cabecalho />
        <SecaoProfissionais ... />
        <SecaoContato />
        <Rodape />
      </>
    )}
  </div>
);
```

**Proposta:**
```tsx
return (
  <div className={estilos.app}>
    {profissionalSelecionado ? (
      <main role="main" aria-label="Detalhes do profissional">
        <PaginaProfissional ... />
      </main>
    ) : (
      <>
        <Cabecalho />
        <main role="main" aria-label="Conteudo principal">
          <SecaoProfissionais ... />
          <SecaoContato />
        </main>
        <Rodape />
      </>
    )}
  </div>
);
```

```tsx
// Cabecalho.tsx - adicionar aria-label
<header className={estilos.cabecalho} role="banner">
```

```tsx
// Rodape.tsx - adicionar aria-label
<footer className={estilos.rodape} role="contentinfo">
```

```tsx
// SecaoProfissionais.tsx - adicionar aria-label
<section className={estilos.secao} aria-labelledby="titulo-profissionais">
  <h2 id="titulo-profissionais" className={estilos.titulo}>Nossos Profissionais</h2>
```

**Impacto**: ALTO - Screen readers navegam por landmarks
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: App.tsx, Cabecalho.tsx, Rodape.tsx, SecaoProfissionais.tsx, SecaoContato.tsx

---

### MA-003: Adicionar live region para feedback de selecao

**Criterio WCAG**: 4.1.3 Status Messages (Nivel AA)

**Situacao Atual:**
CalendarioAgendamento.tsx nao anuncia mudancas de estado para screen readers (data/horario selecionados).

**Codigo Atual (CalendarioAgendamento.tsx linha 100-104):**
```tsx
{dataSelecionada && (
  <p className={estilos.dataSelecionadaTexto}>
    Data selecionada: <strong>{formatarData(dataSelecionada)}</strong>
  </p>
)}
```

**Proposta:**
```tsx
{dataSelecionada && (
  <p
    className={estilos.dataSelecionadaTexto}
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    Data selecionada: <strong>{formatarData(dataSelecionada)}</strong>
  </p>
)}

{horarioSelecionado && (
  <p
    className={estilos.horarioSelecionadoTexto}
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    Horario selecionado: <strong>{horarioSelecionado}</strong>
  </p>
)}
```

**Impacto**: MEDIO - Screen readers anunciam mudancas
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: CalendarioAgendamento.tsx

---

### MA-004: Melhorar labels de formulario

**Criterio WCAG**: 1.3.1 Info and Relationships (Nivel A), 3.3.2 Labels or Instructions (Nivel A)

**Situacao Atual:**
Input de nome usa apenas placeholder, sem `<label>` associado.

**Codigo Atual (CalendarioAgendamento.tsx linha 125-133):**
```tsx
<div className={estilos.secao}>
  <h3 className={estilos.subtitulo}>Nome do Paciente</h3>
  <input
    type="text"
    className={estilos.input}
    placeholder="Digite seu nome completo"
    value={nomePaciente}
    onChange={handleNomeChange}
  />
</div>
```

**Proposta:**
```tsx
<div className={estilos.secao}>
  <label htmlFor="nome-paciente" className={estilos.subtitulo}>
    Nome do Paciente <span aria-label="obrigatorio">*</span>
  </label>
  <input
    id="nome-paciente"
    type="text"
    className={estilos.input}
    placeholder="Digite seu nome completo"
    value={nomePaciente}
    onChange={handleNomeChange}
    required
    aria-required="true"
    aria-describedby="nome-instrucao"
  />
  <span id="nome-instrucao" className={estilos.instrucao}>
    Digite seu nome completo para o agendamento
  </span>
</div>
```

**Impacto**: ALTO - Fundamental para formularios acessiveis
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: CalendarioAgendamento.tsx

---

### MA-005: Adicionar aria-label descritivos em botoes de data/horario

**Criterio WCAG**: 2.4.6 Headings and Labels (Nivel AA), 4.1.2 Name, Role, Value (Nivel A)

**Situacao Atual:**
Botoes de calendario so tem numero do dia, sem contexto completo para screen readers.

**Codigo Atual (CalendarioAgendamento.tsx linha 87-97):**
```tsx
<button
  key={index}
  className={...}
  onClick={() => handleDataClick(data)}
  disabled={!disponivel}
  type="button"
>
  <span className={estilos.diaNumero}>{data.getDate()}</span>
  <span className={estilos.diaSemana}>{obterNomeDiaSemana(data).substring(0, 3)}</span>
</button>
```

**Proposta:**
```tsx
<button
  key={data.getTime()}  // Corrigir key (ver MR-001)
  className={...}
  onClick={() => handleDataClick(data)}
  disabled={!disponivel}
  type="button"
  aria-label={
    disponivel
      ? `${formatarData(data)}${selecionada ? ', selecionada' : ''}`
      : `${formatarData(data)}, indisponivel`
  }
  aria-pressed={selecionada}
>
  <span className={estilos.diaNumero} aria-hidden="true">{data.getDate()}</span>
  <span className={estilos.diaSemana} aria-hidden="true">{obterNomeDiaSemana(data).substring(0, 3)}</span>
</button>
```

```tsx
// Horarios tambem
<button
  key={horario}
  className={...}
  onClick={() => handleHorarioClick(horario)}
  type="button"
  aria-label={`Horario ${horario}${horarioSelecionado === horario ? ', selecionado' : ''}`}
  aria-pressed={horarioSelecionado === horario}
>
  {horario}
</button>
```

**Impacto**: ALTO - Contexto completo para screen readers
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: CalendarioAgendamento.tsx

---

### MA-006: Verificar contraste de cores

**Criterio WCAG**: 1.4.3 Contrast (Minimum) (Nivel AA) - ratio minimo 4.5:1 para texto normal

**Situacao Atual:**
Necessario verificar contraste real de cores do design system.

**Cores a Verificar (variaveis.css):**
```css
--cor-fundo: #F5F5F0;
--cor-texto-principal: #3D2817;  /* Contraste com fundo */
--cor-texto-secundario: #6B6B6B; /* Contraste com fundo */
--cor-logo-bege: #E8DCC6;        /* Usado em Logo */
--cor-marrom-claro: #8B7355;     /* Usado em alguns textos */
```

**Proposta:**
Realizar auditoria de contraste com ferramenta (ex: WebAIM Contrast Checker):

1. **#3D2817 em #F5F5F0**: Verificar ratio
2. **#6B6B6B em #F5F5F0**: Verificar ratio (provavel problema - cinza medio em bege claro)
3. **#8B7355 em #F5F5F0**: Verificar ratio

Se ratio < 4.5:1, ajustar cores:
```css
/* Exemplo de ajuste se necessario */
--cor-texto-secundario: #5A5A5A; /* Escurecer para melhor contraste */
```

**Acao Imediata:**
```bash
# Testar com Chrome DevTools Lighthouse
npm run build
npm run preview
# Abrir DevTools > Lighthouse > Accessibility audit
```

**Impacto**: CRITICO - WCAG AA obrigatorio
**Esforco**: MEDIO - 2 horas (audit + ajustes)
**Componentes Afetados**: variaveis.css, todos componentes com texto

---

### MA-007: Indicar estado desabilitado de forma nao visual

**Criterio WCAG**: 1.4.1 Use of Color (Nivel A)

**Situacao Atual:**
Botoes desabilitados no calendario dependem apenas de cor/opacidade.

**Codigo Atual (CalendarioAgendamento.module.css):**
```css
.diaIndisponivel {
  opacity: 0.4;
  cursor: not-allowed;
}
```

**Proposta:**
Adicionar padrão visual alem de cor:

```css
.diaIndisponivel {
  opacity: 0.4;
  cursor: not-allowed;
  text-decoration: line-through;
  position: relative;
}

.diaIndisponivel::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.1) 10px,
    rgba(0, 0, 0, 0.1) 20px
  );
  pointer-events: none;
}
```

**Impacto**: MEDIO - Usuarios com daltonismo identificam estado
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: CalendarioAgendamento.module.css

---

### MA-008: Garantir tamanho minimo de alvo de toque (44x44px)

**Criterio WCAG**: 2.5.5 Target Size (Nivel AAA) - recomendado 44x44px

**Situacao Atual:**
Verificar se botoes atendem tamanho minimo em mobile.

**Codigo a Verificar:**
```css
/* CardProfissional.module.css - seta */
.seta {
  /* Verificar tamanho */
}

/* CalendarioAgendamento.module.css - botoes de dia */
.dia {
  /* Verificar tamanho minimo */
}

/* CalendarioAgendamento.module.css - botoes de horario */
.horario {
  /* Verificar tamanho minimo */
}
```

**Proposta:**
```css
/* CalendarioAgendamento.module.css */
.dia {
  min-width: 44px;
  min-height: 44px;
  padding: var(--espacamento-xs);
}

.horario {
  min-width: 44px;
  min-height: 44px;
  padding: var(--espacamento-sm);
}

/* CardProfissional.module.css */
.card {
  /* Garantir que area clicavel inteira seja >= 44px altura */
  min-height: 80px; /* Ja atende, verificar em mobile */
}
```

**Impacto**: MEDIO - Importante para usuarios mobile/deficiencia motora
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: CalendarioAgendamento.module.css, CardProfissional.module.css

---

### MA-009: Adicionar focus management ao navegar entre telas

**Criterio WCAG**: 2.4.3 Focus Order (Nivel A), 3.2.1 On Focus (Nivel A)

**Situacao Atual:**
Ao clicar em profissional, foco nao e gerenciado programaticamente.

**Codigo Atual (App.tsx):**
```tsx
const handleProfissionalClick = (id: string) => {
  const profissional = profissionais.find((p) => p.id === id);
  if (profissional) {
    setProfissionalSelecionado(profissional);
  }
};
```

**Proposta:**
```tsx
import { useRef, useEffect } from 'react';

function App() {
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profissionalSelecionado && mainContentRef.current) {
      mainContentRef.current.focus();
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [profissionalSelecionado]);

  return (
    <div className={estilos.app}>
      {profissionalSelecionado ? (
        <div ref={mainContentRef} tabIndex={-1}>
          <PaginaProfissional ... />
        </div>
      ) : (
        // ...
      )}
    </div>
  );
}
```

```tsx
// PaginaProfissional.tsx - focar botao Voltar ao montar
import { useRef, useEffect } from 'react';

export function PaginaProfissional({ profissional, onVoltar }: Props) {
  const voltarBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    voltarBtnRef.current?.focus();
  }, []);

  return (
    <div>
      <button ref={voltarBtnRef} onClick={onVoltar} ...>
        Voltar
      </button>
      {/* ... */}
    </div>
  );
}
```

**Impacto**: ALTO - Usuarios de teclado sabem onde estao
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: App.tsx, PaginaProfissional.tsx

---

### MA-010: Adicionar texto alternativo ao SVG da seta

**Criterio WCAG**: 1.1.1 Non-text Content (Nivel A)

**Situacao Atual:**
SVG decorativo nao esta marcado como `aria-hidden`.

**Codigo Atual (CardProfissional.tsx linha 28-41):**
```tsx
<div className={estilos.seta}>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</div>
```

**Proposta:**
Como SVG e decorativo (card inteiro e clicavel):
```tsx
<div className={estilos.seta} aria-hidden="true">
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    focusable="false"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</div>
```

Se quiser ser descritivo:
```tsx
<div className={estilos.seta}>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Ver detalhes"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</div>
```

**Impacto**: BAIXO - Card ja tem aria-label completo
**Esforco**: BAIXO - 15 minutos
**Componentes Afetados**: CardProfissional.tsx, Cabecalho.tsx (estrela), CardContato.tsx (icones)

---

### MA-011: Adicionar indicador visual de campo obrigatorio

**Criterio WCAG**: 3.3.2 Labels or Instructions (Nivel A)

**Situacao Atual:**
Nome do paciente e obrigatorio mas nao ha indicacao visual.

**Proposta (ja incluida em MA-004):**
```tsx
<label htmlFor="nome-paciente" className={estilos.subtitulo}>
  Nome do Paciente <span className={estilos.obrigatorio} aria-label="obrigatorio">*</span>
</label>
```

```css
.obrigatorio {
  color: #D32F2F; /* Vermelho para destaque */
  font-weight: bold;
}
```

**Impacto**: MEDIO - Clareza visual de obrigatoriedade
**Esforco**: BAIXO - 15 minutos (parte de MA-004)
**Componentes Afetados**: CalendarioAgendamento.tsx

---

### MA-012: Documentar estrutura de cabecalhos (heading hierarchy)

**Criterio WCAG**: 1.3.1 Info and Relationships (Nivel A)

**Situacao Atual:**
Verificar se hierarquia de headings esta correta:

```
Cabecalho.tsx:
  <h1>Instituto Jardim</h1>

SecaoProfissionais.tsx:
  <h2>Nossos Profissionais</h2>
    CardProfissional:
      <h3>Nome do profissional</h3>

SecaoContato.tsx:
  <h2>Fale Conosco</h2>
    CardContato:
      <h3>WhatsApp / Localizacao</h3>

PaginaProfissional.tsx:
  <h1>Nome do profissional</h1>  <- PROBLEMA: Segundo H1

CalendarioAgendamento.tsx:
  <h2>Agendar Consulta</h2>
  <h3>Selecione a Data</h3>
  <h3>Selecione o Horario</h3>
  <h3>Nome do Paciente</h3>
```

**Proposta:**
Corrigir PaginaProfissional para nao ter segundo H1:

```tsx
// PaginaProfissional.tsx - trocar H1 por H2
<h2 className={estilos.nome}>{profissional.nome}</h2>

// OU: Remover H1 do Cabecalho quando em pagina de detalhes
// App.tsx
{profissionalSelecionado ? (
  <PaginaProfissional ... />  // Sem Cabecalho
) : (
  <>
    <Cabecalho />  // Com H1
    <SecaoProfissionais ... />
  </>
)}
```

**Impacto**: MEDIO - Screen readers dependem de hierarquia
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: PaginaProfissional.tsx ou App.tsx

---

### MA-013: Adicionar prefers-reduced-motion para animacoes

**Criterio WCAG**: 2.3.3 Animation from Interactions (Nivel AAA)

**Situacao Atual:**
Animacoes nao respeitam preferencia do usuario por movimento reduzido.

**Codigo Atual (globais.css linha 19-28):**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Proposta:**
```css
/* globais.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Alternativa mais elegante */
@media (prefers-reduced-motion: no-preference) {
  .cabecalho {
    animation: fadeIn var(--transicao-lenta);
  }

  .card {
    transition: all var(--transicao-normal);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cabecalho {
    animation: none;
  }

  .card {
    transition: none;
  }
}
```

**Impacto**: MEDIO - Acessibilidade para usuarios com problemas vestibulares
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: globais.css, todos componentes com transitions/animations

---

### MA-014: Adicionar mensagem de erro acessivel

**Criterio WCAG**: 3.3.1 Error Identification (Nivel A), 3.3.3 Error Suggestion (Nivel AA)

**Situacao Atual:**
Link de agendamento so muda texto quando incompleto, sem anuncio para screen readers.

**Codigo Atual (PaginaProfissional.tsx):**
```tsx
<a
  href={urlWhatsapp}
  className={!estaCompleto ? estilos.desabilitado : estilos.botaoAgendar}
  aria-disabled={!estaCompleto}
>
  {estaCompleto
    ? `Confirmar Agendamento com ${profissional.nome.split(' ')[0]}`
    : 'Preencha todos os dados para agendar'
  }
</a>
```

**Proposta:**
```tsx
{!estaCompleto && (
  <div
    role="alert"
    aria-live="assertive"
    className={estilos.mensagemErro}
  >
    Para agendar, preencha:
    <ul>
      {!dataSelecionada && <li>Data da consulta</li>}
      {!horarioSelecionado && <li>Horario da consulta</li>}
      {!nomePaciente.trim() && <li>Nome do paciente</li>}
    </ul>
  </div>
)}

<a
  href={urlWhatsapp}
  className={!estaCompleto ? estilos.desabilitado : estilos.botaoAgendar}
  aria-disabled={!estaCompleto}
  aria-describedby={!estaCompleto ? "mensagem-erro-agendamento" : undefined}
>
  {/* ... */}
</a>
```

**Impacto**: ALTO - Usuarios sabem exatamente o que falta
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: PaginaProfissional.tsx

---

### MA-015: Adicionar lang em trechos de codigo/nomes proprios

**Criterio WCAG**: 3.1.2 Language of Parts (Nivel AA)

**Situacao Atual:**
Pagina em pt-BR mas nao marca trechos em outros idiomas.

**Proposta:**
Se houver nomes proprios estrangeiros ou termos tecnicos:

```tsx
// Exemplo se houvesse termo tecnico em ingles
<p>
  Utilizamos a tecnologia <span lang="en">React</span> para desenvolvimento
</p>
```

**Observacao:** Projeto atual totalmente em portugues, nao aplicavel no momento. Documentar para futuro.

**Impacto**: BAIXO - Nao aplicavel atualmente
**Esforco**: N/A
**Componentes Afetados**: N/A

---

## 2. MELHORIAS DE SEO (RF-014)

### Consideracoes Iniciais sobre SPAs e SEO

**Limitacao Arquitetural:**
Instituto Jardim e uma SPA React sem SSR (Server-Side Rendering) ou SSG (Static Site Generation). Isso impacta significativamente o SEO:

- Crawlers antigos podem nao executar JavaScript
- Conteudo e renderizado client-side
- Meta tags dinamicas requerem biblioteca (react-helmet)
- Sem pre-rendering, conteudo pode nao ser indexado

**Solucoes Futuras (fora do escopo atual):**
- Migrar para Next.js (SSR/SSG)
- Implementar pre-rendering (ex: react-snap)
- Usar Google Search Console para validar indexacao

---

### MSEO-001: Adicionar meta tags essenciais no index.html

**Categoria**: Meta Tags Basicas
**Impacto SEO**: CRITICO

**Situacao Atual (index.html linha 3-8):**
```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="imagens/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Instituto Jardim - Cuidando da sua saúde com dedicação </title>
</head>
```

**Problemas:**
- Sem `<meta name="description">`
- Sem `<meta name="keywords">`
- Sem canonical URL
- Sem author
- Sem theme-color

**Proposta:**
```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO Basico -->
    <title>Instituto Jardim - Harmonização Orofacial, Estética Dental e Fisioterapia</title>
    <meta name="description" content="Instituto Jardim oferece serviços de harmonização orofacial, estética dental, reabilitação oral e terapia regenerativa. Agende sua consulta com profissionais qualificados em nossa clínica." />
    <meta name="keywords" content="harmonização orofacial, estética dental, fisioterapia, instituto jardim, dra anabia jardim, dra ana laura jardim, dr denis graciotto, clínica odontológica, reabilitação oral" />
    <meta name="author" content="Instituto Jardim" />
    <meta name="robots" content="index, follow" />

    <!-- Geo Tags (se aplicavel) -->
    <meta name="geo.region" content="BR-PR" />
    <meta name="geo.placename" content="Paraná" />

    <!-- Theme Color (mobile) -->
    <meta name="theme-color" content="#E8DCC6" />

    <!-- Canonical URL -->
    <link rel="canonical" href="https://institutojardim.com.br/" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/imagens/favicon.png" />
    <link rel="apple-touch-icon" href="/imagens/apple-touch-icon.png" />

    <!-- Preconnect (otimizacao) -->
    <link rel="preconnect" href="https://wa.me" />
    <link rel="preconnect" href="https://maps.app.goo.gl" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Observacoes:**
- Description ideal: 150-160 caracteres
- Keywords: Menos importante hoje, mas nao prejudica
- Canonical previne conteudo duplicado

**Impacto**: CRITICO - Base para indexacao Google
**Esforco**: BAIXO - 30 minutos
**Arquivos Afetados**: index.html

---

### MSEO-002: Adicionar Open Graph e Twitter Cards

**Categoria**: Social Sharing
**Impacto SEO**: ALTO (compartilhamento em redes sociais)

**Situacao Atual:**
Sem meta tags de Open Graph. Ao compartilhar no Facebook/WhatsApp, nao ha preview.

**Proposta:**
```html
<!-- index.html - adicionar apos meta tags basicas -->

<!-- Open Graph (Facebook, LinkedIn, WhatsApp) -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Instituto Jardim" />
<meta property="og:title" content="Instituto Jardim - Cuidando da sua saúde com dedicação" />
<meta property="og:description" content="Serviços especializados em harmonização orofacial, estética dental, reabilitação oral e terapia regenerativa. Agende sua consulta!" />
<meta property="og:image" content="https://institutojardim.com.br/imagens/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://institutojardim.com.br" />
<meta property="og:locale" content="pt_BR" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@institutojardim" />
<meta name="twitter:title" content="Instituto Jardim - Cuidando da sua saúde" />
<meta name="twitter:description" content="Harmonização orofacial, estética dental e fisioterapia com profissionais qualificados" />
<meta name="twitter:image" content="https://institutojardim.com.br/imagens/twitter-card.jpg" />
```

**Acao Adicional:**
Criar imagens otimizadas:
- `og-image.jpg`: 1200x630px (padrao Open Graph)
- `twitter-card.jpg`: 1200x600px (Twitter)

**Validacao:**
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

**Impacto**: ALTO - Aumenta CTR de compartilhamentos
**Esforco**: MEDIO - 1 hora (incluindo criacao de imagens)
**Arquivos Afetados**: index.html, criacao de imagens

---

### MSEO-003: Implementar Structured Data (Schema.org)

**Categoria**: Rich Snippets
**Impacto SEO**: ALTO

**Situacao Atual:**
Sem structured data. Google nao exibe rich snippets (rating, horarios, localizacao).

**Proposta:**
Adicionar JSON-LD no index.html:

```html
<!-- index.html - antes de </head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Instituto Jardim",
  "description": "Clínica especializada em harmonização orofacial, estética dental, reabilitação oral e terapia regenerativa",
  "url": "https://institutojardim.com.br",
  "logo": "https://institutojardim.com.br/imagens/logo.svg",
  "image": "https://institutojardim.com.br/imagens/og-image.jpg",
  "telephone": "+55-44-99999-9999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Exemplo, 123",
    "addressLocality": "Cidade",
    "addressRegion": "PR",
    "postalCode": "00000-000",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-23.000000",
    "longitude": "-51.000000"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "19:00"
    }
  ],
  "priceRange": "$$",
  "sameAs": [
    "https://www.facebook.com/institutojardim",
    "https://www.instagram.com/institutojardim"
  ]
}
</script>

<!-- Profissionais como HealthAndBeautyBusiness -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Person",
      "name": "Dra. Anabia Jardim",
      "jobTitle": "Cirurgiã-Dentista - Harmonização Orofacial",
      "worksFor": {
        "@type": "MedicalBusiness",
        "name": "Instituto Jardim"
      },
      "image": "https://institutojardim.com.br/imagens/profissionais/anabia.svg",
      "description": "Especialista em harmonização orofacial e estética dental"
    },
    {
      "@type": "Person",
      "name": "Dra. Ana Laura Jardim",
      "jobTitle": "Cirurgiã-Dentista - Estética e Reabilitação Oral",
      "worksFor": {
        "@type": "MedicalBusiness",
        "name": "Instituto Jardim"
      },
      "image": "https://institutojardim.com.br/imagens/profissionais/ana-laura.svg"
    },
    {
      "@type": "Person",
      "name": "Dr. Denis Graciotto",
      "jobTitle": "Fisioterapeuta - Terapia Regenerativa",
      "worksFor": {
        "@type": "MedicalBusiness",
        "name": "Instituto Jardim"
      },
      "image": "https://institutojardim.com.br/imagens/profissionais/denis-graciotto.svg"
    }
  ]
}
</script>
```

**Validacao:**
Google Rich Results Test: https://search.google.com/test/rich-results

**Impacto**: ALTO - Rich snippets melhoram CTR em 20-30%
**Esforco**: MEDIO - 2 horas
**Arquivos Afetados**: index.html

---

### MSEO-004: Melhorar semantica HTML

**Categoria**: On-Page SEO
**Impacto SEO**: MEDIO

**Situacao Atual:**
HTML usa tags semanticas mas pode melhorar estrutura.

**Propostas:**

1. **Adicionar `<article>` em CardProfissional** (ja existe, OK)

2. **Usar `<address>` para informacoes de contato:**
```tsx
// Rodape.tsx
<footer className={estilos.rodape}>
  <address>
    <p>Instituto Jardim</p>
    <p>Rua Exemplo, 123 - Cidade/PR</p>
    <p>Telefone: (44) 9999-9999</p>
  </address>
  <p>© 2025 Instituto Jardim. Desenvolvido por Amanda Braga</p>
</footer>
```

3. **Adicionar `<time>` para horarios:**
```tsx
// CardProfissional.tsx
<p className={estilos.horario}>
  Horário:
  <time dateTime="08:00/19:00">08:00 às 19:00</time>
</p>
```

4. **Estruturar breadcrumbs (futuro com React Router):**
```tsx
<nav aria-label="Breadcrumb">
  <ol itemScope itemType="https://schema.org/BreadcrumbList">
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <a itemProp="item" href="/">
        <span itemProp="name">Início</span>
      </a>
      <meta itemProp="position" content="1" />
    </li>
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <span itemProp="name">Profissional</span>
      <meta itemProp="position" content="2" />
    </li>
  </ol>
</nav>
```

**Impacto**: MEDIO - Melhora compreensao do crawler
**Esforco**: MEDIO - 1-2 horas
**Componentes Afetados**: Rodape.tsx, CardProfissional.tsx

---

### MSEO-005: Criar sitemap.xml e robots.txt

**Categoria**: Crawling
**Impacto SEO**: ALTO

**Situacao Atual:**
Sem sitemap.xml nem robots.txt.

**Proposta:**

**1. robots.txt (public/robots.txt):**
```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://institutojardim.com.br/sitemap.xml

# Crawl-delay para bots agressivos
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10
```

**2. sitemap.xml (public/sitemap.xml):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://institutojardim.com.br/</loc>
    <lastmod>2026-02-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Futuro: URLs de profissionais quando houver routing -->
  <url>
    <loc>https://institutojardim.com.br/profissional/anabia-jardim</loc>
    <lastmod>2026-02-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://institutojardim.com.br/profissional/ana-laura-jardim</loc>
    <lastmod>2026-02-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://institutojardim.com.br/profissional/denis-graciotto</loc>
    <lastmod>2026-02-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Observacao:** SPA sem routing tem sitemap simples. Quando implementar React Router, gerar dinamicamente.

**Impacto**: ALTO - Facilita indexacao
**Esforco**: BAIXO - 30 minutos
**Arquivos Afetados**: Criar public/robots.txt, public/sitemap.xml

---

### MSEO-006: Otimizar title e headings para palavras-chave

**Categoria**: On-Page SEO
**Impacto SEO**: ALTO

**Situacao Atual:**
Title generico: "Instituto Jardim - Cuidando da sua saúde com dedicação"

**Proposta:**
Titulos otimizados com palavras-chave de cauda longa:

```html
<!-- index.html -->
<title>Instituto Jardim - Harmonização Orofacial e Estética Dental em [Cidade/PR]</title>
```

**Estrutura de Headings Otimizada:**
```tsx
// Cabecalho.tsx
<h1>Instituto Jardim - Harmonização Orofacial e Estética Dental</h1>
<p>Cuidados especializados em saúde e bem-estar para toda a família</p>
```

**Palavras-chave alvo:**
- Primarias: "harmonização orofacial", "estética dental", "fisioterapia"
- Secundarias: "reabilitação oral", "terapia regenerativa", "clínica odontológica"
- Long-tail: "harmonização orofacial [cidade]", "dentista estética [cidade]"

**Densidade de palavras-chave:**
- Title: 1-2 palavras-chave primarias
- H1: Palavra-chave principal
- H2/H3: Variacoes e sinonimos
- Corpo: Natural, sem keyword stuffing (densidade 1-2%)

**Impacto**: ALTO - Melhora ranking para queries especificas
**Esforco**: BAIXO - 30 minutos
**Arquivos Afetados**: index.html, Cabecalho.tsx

---

### MSEO-007: Adicionar alt text descritivo e otimizado

**Categoria**: Image SEO
**Impacto SEO**: MEDIO

**Situacao Atual (CardProfissional.tsx linha 19):**
```tsx
<img
  src={profissional.foto}
  alt={`Foto de ${profissional.nome}`}
  loading="lazy"
/>
```

**Proposta:**
Alt text mais descritivo com palavras-chave:

```tsx
<img
  src={profissional.foto}
  alt={`${profissional.nome} - ${profissional.especialidade} no Instituto Jardim`}
  title={profissional.nome}
  loading="lazy"
  width="80"
  height="80"
/>
```

Exemplos reais:
- "Dra. Anabia Jardim - Cirurgiã-Dentista Harmonização Orofacial no Instituto Jardim"
- "Dra. Ana Laura Jardim - Estética Dental e Reabilitação Oral no Instituto Jardim"
- "Dr. Denis Graciotto - Fisioterapeuta Terapia Regenerativa no Instituto Jardim"

**Adicionar dimensoes:**
```tsx
// Melhora CLS (Cumulative Layout Shift)
<img
  src={profissional.foto}
  alt={...}
  width="80"
  height="80"
  loading="lazy"
/>
```

**Impacto**: MEDIO - Google Images e ranking de imagens
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: CardProfissional.tsx, PaginaProfissional.tsx, Logo.tsx

---

### MSEO-008: Implementar pre-rendering para SPAs

**Categoria**: Indexacao
**Impacto SEO**: CRITICO (solucao longo prazo)

**Situacao Atual:**
SPA sem pre-rendering. Crawlers antigos podem nao indexar conteudo JavaScript.

**Proposta (fora do escopo imediato - PRD futuro):**

**Opcao 1 - react-snap (pre-rendering estatico):**
```bash
npm install --save-dev react-snap
```

```json
// package.json
{
  "scripts": {
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "inlineCss": true,
    "minifyHtml": true
  }
}
```

**Opcao 2 - Migrar para Next.js (SSR/SSG completo):**
- Pro: SEO perfeito, performance superior
- Contra: Reescrita significativa da aplicacao

**Opcao 3 - Prerender.io (servico pago):**
- Pre-renderiza dinamicamente para crawlers
- Sem mudancas no codigo

**Recomendacao:**
Documentar como PRD futuro (fora do escopo de TASK-0005).

**Impacto**: CRITICO - Resolve limitacao fundamental de SPAs
**Esforco**: ALTO - 8-16 horas (react-snap) ou 40+ horas (Next.js)
**Arquivos Afetados**: Toda a aplicacao

---

### MSEO-009: Adicionar meta tags de verificacao de ferramentas

**Categoria**: Configuracao
**Impacto SEO**: BAIXO (mas necessario)

**Situacao Atual:**
Sem meta tags de verificacao para Google Search Console, Bing Webmaster, etc.

**Proposta:**
```html
<!-- index.html - adicionar quando configurar ferramentas -->

<!-- Google Search Console -->
<meta name="google-site-verification" content="CODIGO_AQUI" />

<!-- Bing Webmaster Tools -->
<meta name="msvalidate.01" content="CODIGO_AQUI" />

<!-- Pinterest -->
<meta name="p:domain_verify" content="CODIGO_AQUI" />

<!-- Facebook Domain Verification -->
<meta name="facebook-domain-verification" content="CODIGO_AQUI" />
```

**Acao Necessaria:**
1. Cadastrar site no Google Search Console
2. Obter codigo de verificacao
3. Adicionar meta tag
4. Repetir para outras plataformas

**Impacto**: BAIXO - Nao afeta ranking, mas permite monitoramento
**Esforco**: BAIXO - 15 minutos (apos cadastro nas plataformas)
**Arquivos Afetados**: index.html

---

## 3. OPORTUNIDADES DE REFATORACAO (RF-015)

### Criterios de Avaliacao

- **DRY** (Don't Repeat Yourself): Reducao de codigo duplicado
- **SOLID**: Principios de design orientado a objetos
- **Legibilidade**: Codigo auto-explicativo
- **Manutencao**: Facilidade de mudancas futuras
- **Performance**: Reducao de re-renders desnecessarios

---

### MR-001: Extrair custom hook useCalendario

**Beneficio**: Separacao de responsabilidades, reutilizacao de logica

**Codigo Atual (CalendarioAgendamento.tsx linha 19-73):**
```tsx
export function CalendarioAgendamento({ ... }: Props) {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [nomePaciente, setNomePaciente] = useState('');

  const hoje = new Date();
  const proximos30Dias: Date[] = [];

  for (let i = 1; i <= 30; i++) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + i);
    proximos30Dias.push(data);
  }

  // ... resto da logica
}
```

**Proposta:**
Criar custom hook em `src/hooks/useCalendario.ts`:

```tsx
// src/hooks/useCalendario.ts
import { useState, useMemo } from 'react';

interface UseCalendarioParams {
  diasAtendimento: string[];
  onDataSelecionada: (data: Date | null) => void;
  onHorarioSelecionado: (horario: string | null) => void;
}

export function useCalendario({
  diasAtendimento,
  onDataSelecionada,
  onHorarioSelecionado,
}: UseCalendarioParams) {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);

  const proximos30Dias = useMemo(() => {
    const hoje = new Date();
    const dias: Date[] = [];

    for (let i = 1; i <= 30; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      dias.push(data);
    }

    return dias;
  }, []);

  const isDiaDisponivel = (data: Date): boolean => {
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const diaSemana = diasSemana[data.getDay()];
    return diasAtendimento.includes(diaSemana);
  };

  const handleDataClick = (data: Date) => {
    if (isDiaDisponivel(data)) {
      setDataSelecionada(data);
      setHorarioSelecionado(null);
      onDataSelecionada(data);
      onHorarioSelecionado(null);
    }
  };

  const handleHorarioClick = (horario: string) => {
    setHorarioSelecionado(horario);
    onHorarioSelecionado(horario);
  };

  return {
    dataSelecionada,
    horarioSelecionado,
    proximos30Dias,
    isDiaDisponivel,
    handleDataClick,
    handleHorarioClick,
  };
}
```

```tsx
// CalendarioAgendamento.tsx - REFATORADO
export function CalendarioAgendamento({ ... }: Props) {
  const [nomePaciente, setNomePaciente] = useState('');

  const {
    dataSelecionada,
    horarioSelecionado,
    proximos30Dias,
    isDiaDisponivel,
    handleDataClick,
    handleHorarioClick,
  } = useCalendario({
    diasAtendimento,
    onDataSelecionada,
    onHorarioSelecionado,
  });

  // Componente so cuida de renderizacao
  return (
    <div className={estilos.container}>
      {/* ... JSX */}
    </div>
  );
}
```

**Beneficios:**
- Logica de calendario reutilizavel
- Componente mais simples (foca em UI)
- Testabilidade: Hook pode ser testado isoladamente
- Reducao de ~50 linhas no componente

**Impacto**: ALTO - Melhora arquitetura
**Esforco**: MEDIO - 2 horas
**Componentes Afetados**: CalendarioAgendamento.tsx, criar src/hooks/useCalendario.ts

---

### MR-002: Centralizar constantes de datas

**Beneficio**: DRY, manutencao

**Codigo Atual (duplicacao):**

CalendarioAgendamento.tsx linha 32-36:
```tsx
const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
```

PaginaProfissional.tsx linha 17-21:
```tsx
const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', ...]; // DIFERENTE!
const meses = ['janeiro', 'fevereiro', 'março', ...]; // Minusculas!
```

**Proposta:**
Criar `src/utils/constantes.ts`:

```tsx
// src/utils/constantes.ts
export const DIAS_SEMANA = {
  COMPLETOS: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  ABREVIADOS: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  CURTOS: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
} as const;

export const MESES = {
  CAPITALIZADOS: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  MINUSCULOS: [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ],
} as const;
```

```tsx
// Uso
import { DIAS_SEMANA, MESES } from '@/utils/constantes';

const formatarData = (data: Date): string => {
  const dia = data.getDate();
  const mes = MESES.MINUSCULOS[data.getMonth()];
  const ano = data.getFullYear();
  const diaSemana = DIAS_SEMANA.COMPLETOS[data.getDay()];
  return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
};
```

**Beneficios:**
- Eliminacao de duplicacao
- Unica fonte de verdade
- Facil internacionalizacao futura (i18n)

**Impacto**: MEDIO - Manutencao futura mais facil
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: CalendarioAgendamento.tsx, PaginaProfissional.tsx, criar src/utils/constantes.ts

---

### MR-003: Extrair funcao gerarHorarios

**Beneficio**: DRY, eliminacao de hardcoding

**Codigo Atual (mockProfissionais.ts):**
```tsx
// Anabia Jardim
horariosDisponiveis: [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
  '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
], // 21 elementos hardcoded

// Ana Laura Jardim
horariosDisponiveis: [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
  '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
], // DUPLICADO!

// Denis Graciotto
horariosDisponiveis: [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
], // Diferente, mas tambem hardcoded
```

**Proposta:**
Criar `src/utils/gerarHorarios.ts`:

```tsx
// src/utils/gerarHorarios.ts
export interface ConfigHorarios {
  inicio: string;      // "08:00"
  fim: string;         // "19:00"
  intervalo: number;   // 30 (minutos) ou 60
  pausas?: string[];   // ["11:30", "12:00"] (horarios de pausa)
}

export function gerarHorarios({
  inicio,
  fim,
  intervalo,
  pausas = [],
}: ConfigHorarios): string[] {
  const horarios: string[] = [];

  const [hInicio, mInicio] = inicio.split(':').map(Number);
  const [hFim, mFim] = fim.split(':').map(Number);

  let minutoAtual = hInicio * 60 + mInicio;
  const minutoFinal = hFim * 60 + mFim;

  while (minutoAtual <= minutoFinal) {
    const h = Math.floor(minutoAtual / 60)
      .toString()
      .padStart(2, '0');
    const m = (minutoAtual % 60).toString().padStart(2, '0');
    const horarioStr = `${h}:${m}`;

    if (!pausas.includes(horarioStr)) {
      horarios.push(horarioStr);
    }

    minutoAtual += intervalo;
  }

  return horarios;
}
```

```tsx
// mockProfissionais.ts - REFATORADO
import { gerarHorarios } from '@/utils/gerarHorarios';

export const profissionais: Profissional[] = [
  {
    id: '1',
    nome: 'Dra. Anabia Jardim',
    // ...
    horariosDisponiveis: gerarHorarios({
      inicio: '08:00',
      fim: '19:00',
      intervalo: 30,
      pausas: ['11:30', '12:00'], // Almoco
    }),
  },
  {
    id: '2',
    nome: 'Dra. Ana Laura Jardim',
    // ...
    horariosDisponiveis: gerarHorarios({
      inicio: '08:00',
      fim: '19:00',
      intervalo: 30,
      pausas: ['11:30', '12:00'],
    }),
  },
  {
    id: '3',
    nome: 'Dr. Denis Graciotto',
    // ...
    horariosDisponiveis: gerarHorarios({
      inicio: '08:00',
      fim: '18:00',
      intervalo: 60, // 1 hora
    }),
  },
];
```

**Beneficios:**
- Reducao de ~60 linhas de codigo
- Mudanca de horarios em 1 linha
- Logica documentada e testavel
- Facil adicionar excecoes (feriados, pausas)

**Impacto**: ALTO - Manutencao dramaticamente mais facil
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: mockProfissionais.ts, criar src/utils/gerarHorarios.ts

---

### MR-004: Extrair componente BotaoData

**Beneficio**: Reutilizacao, simplicidade

**Codigo Atual (CalendarioAgendamento.tsx linha 87-97):**
```tsx
<button
  key={index}
  className={`${estilos.dia} ${selecionada ? estilos.diaSelecionada : ''} ${!disponivel ? estilos.diaIndisponivel : ''}`}
  onClick={() => handleDataClick(data)}
  disabled={!disponivel}
  type="button"
>
  <span className={estilos.diaNumero}>{data.getDate()}</span>
  <span className={estilos.diaSemana}>{obterNomeDiaSemana(data).substring(0, 3)}</span>
</button>
```

**Proposta:**
Criar `src/componentes/BotaoData/BotaoData.tsx`:

```tsx
// src/componentes/BotaoData/BotaoData.tsx
interface BotaoDataProps {
  data: Date;
  disponivel: boolean;
  selecionada: boolean;
  onClick: (data: Date) => void;
  formatarData: (data: Date) => string;
  obterNomeDiaSemana: (data: Date) => string;
}

export function BotaoData({
  data,
  disponivel,
  selecionada,
  onClick,
  formatarData,
  obterNomeDiaSemana,
}: BotaoDataProps) {
  return (
    <button
      className={`${estilos.dia} ${selecionada ? estilos.diaSelecionada : ''} ${!disponivel ? estilos.diaIndisponivel : ''}`}
      onClick={() => onClick(data)}
      disabled={!disponivel}
      type="button"
      aria-label={
        disponivel
          ? `${formatarData(data)}${selecionada ? ', selecionada' : ''}`
          : `${formatarData(data)}, indisponivel`
      }
      aria-pressed={selecionada}
    >
      <span className={estilos.diaNumero} aria-hidden="true">
        {data.getDate()}
      </span>
      <span className={estilos.diaSemana} aria-hidden="true">
        {obterNomeDiaSemana(data).substring(0, 3)}
      </span>
    </button>
  );
}
```

```tsx
// CalendarioAgendamento.tsx - REFATORADO
{proximos30Dias.map((data) => (
  <BotaoData
    key={data.getTime()}
    data={data}
    disponivel={isDiaDisponivel(data)}
    selecionada={dataSelecionada?.toDateString() === data.toDateString()}
    onClick={handleDataClick}
    formatarData={formatarData}
    obterNomeDiaSemana={obterNomeDiaSemana}
  />
))}
```

**Beneficios:**
- Componente reutilizavel
- Logica de acessibilidade centralizada (ver MA-005)
- Reducao de complexidade em CalendarioAgendamento

**Impacto**: MEDIO - Melhora organizacao
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: CalendarioAgendamento.tsx, criar src/componentes/BotaoData/

---

### MR-005: Refatorar duplicacao de estado (controlled component)

**Beneficio**: Single Source of Truth, menos bugs

**Codigo Atual (DT-002 da AVALIACAO-QUALIDADE.md):**

PaginaProfissional.tsx linha 12-14:
```tsx
const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
const [nomePaciente, setNomePaciente] = useState('');
```

CalendarioAgendamento.tsx linha 19-21:
```tsx
const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null); // DUPLICADO
const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null); // DUPLICADO
const [nomePaciente, setNomePaciente] = useState(''); // DUPLICADO
```

**Proposta:**
Transformar CalendarioAgendamento em controlled component:

```tsx
// CalendarioAgendamento.tsx - REFATORADO
interface CalendarioAgendamentoProps {
  horariosDisponiveis: string[];
  diasAtendimento: string[];
  // RECEBE valores via props (controlled)
  dataSelecionada: Date | null;
  horarioSelecionado: string | null;
  nomePaciente: string;
  // Callbacks para atualizar
  onDataSelecionada: (data: Date | null) => void;
  onHorarioSelecionado: (horario: string | null) => void;
  onNomePacienteChange: (nome: string) => void;
}

export function CalendarioAgendamento({
  horariosDisponiveis,
  diasAtendimento,
  dataSelecionada,
  horarioSelecionado,
  nomePaciente,
  onDataSelecionada,
  onHorarioSelecionado,
  onNomePacienteChange,
}: CalendarioAgendamentoProps) {
  // SEM estados locais - usa props diretamente

  const handleDataClick = (data: Date) => {
    if (isDiaDisponivel(data)) {
      onDataSelecionada(data);
      onHorarioSelecionado(null); // Reset horario
    }
  };

  const handleHorarioClick = (horario: string) => {
    onHorarioSelecionado(horario);
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNomePacienteChange(e.target.value);
  };

  return (
    <div className={estilos.container}>
      {/* Usa dataSelecionada de props */}
      {dataSelecionada && (
        <p>Data: {formatarData(dataSelecionada)}</p>
      )}

      {/* Input controlado */}
      <input
        value={nomePaciente}
        onChange={handleNomeChange}
      />
    </div>
  );
}
```

```tsx
// PaginaProfissional.tsx - MANTEM estado (unica fonte de verdade)
export function PaginaProfissional({ profissional, onVoltar }: Props) {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [nomePaciente, setNomePaciente] = useState('');

  return (
    <div>
      <CalendarioAgendamento
        horariosDisponiveis={profissional.horariosDisponiveis}
        diasAtendimento={profissional.diasAtendimento}
        dataSelecionada={dataSelecionada}
        horarioSelecionado={horarioSelecionado}
        nomePaciente={nomePaciente}
        onDataSelecionada={setDataSelecionada}
        onHorarioSelecionado={setHorarioSelecionado}
        onNomePacienteChange={setNomePaciente}
      />
    </div>
  );
}
```

**Beneficios:**
- Elimina duplicacao de estado (DT-002)
- Fonte unica de verdade
- Menos bugs de sincronizacao
- Padrao React recomendado

**Impacto**: ALTO - Resolve debito tecnico critico
**Esforco**: MEDIO - 2 horas
**Componentes Afetados**: CalendarioAgendamento.tsx, PaginaProfissional.tsx

---

### MR-006: Simplificar logica de classe CSS

**Beneficio**: Legibilidade

**Codigo Atual (CalendarioAgendamento.tsx linha 89):**
```tsx
className={`${estilos.dia} ${selecionada ? estilos.diaSelecionada : ''} ${!disponivel ? estilos.diaIndisponivel : ''}`}
```

**Proposta:**
Criar funcao helper:

```tsx
// src/utils/classNames.ts
export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

```tsx
// Uso
import { classNames } from '@/utils/classNames';

className={classNames(
  estilos.dia,
  selecionada && estilos.diaSelecionada,
  !disponivel && estilos.diaIndisponivel
)}
```

**Alternativa (biblioteca):**
```bash
npm install clsx
```

```tsx
import clsx from 'clsx';

className={clsx(estilos.dia, {
  [estilos.diaSelecionada]: selecionada,
  [estilos.diaIndisponivel]: !disponivel,
})}
```

**Beneficios:**
- Legibilidade
- Menos propenso a erros
- Padrao bem estabelecido

**Impacto**: BAIXO - Melhora legibilidade
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: CalendarioAgendamento.tsx, outros com classes condicionais

---

### MR-007: Extrair formatacao de data para utils

**Beneficio**: Reutilizacao, testabilidade

**Codigo Atual:**
Funcoes de formatacao duplicadas/espalhadas.

**Proposta:**
Criar `src/utils/formatadores.ts`:

```tsx
// src/utils/formatadores.ts
import { DIAS_SEMANA, MESES } from './constantes';

export function formatarDataCompleta(data: Date): string {
  const dia = data.getDate();
  const mes = MESES.MINUSCULOS[data.getMonth()];
  const ano = data.getFullYear();
  const diaSemana = DIAS_SEMANA.COMPLETOS[data.getDay()];
  return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
}

export function formatarDataCurta(data: Date): string {
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function obterNomeDiaSemana(data: Date, formato: 'completo' | 'abreviado' | 'curto' = 'abreviado'): string {
  const formatos = {
    completo: DIAS_SEMANA.COMPLETOS,
    abreviado: DIAS_SEMANA.ABREVIADOS,
    curto: DIAS_SEMANA.CURTOS,
  };
  return formatos[formato][data.getDay()];
}

export function formatarTelefone(telefone: string): string {
  // Remove caracteres nao numericos
  const nums = telefone.replace(/\D/g, '');

  // Formata (XX) XXXXX-XXXX
  if (nums.length === 11) {
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  }

  // Formata (XX) XXXX-XXXX
  if (nums.length === 10) {
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`;
  }

  return telefone; // Retorna original se nao conseguir formatar
}
```

**Uso:**
```tsx
import { formatarDataCompleta, obterNomeDiaSemana } from '@/utils/formatadores';

const dataFormatada = formatarDataCompleta(dataSelecionada);
const dia = obterNomeDiaSemana(data, 'curto');
```

**Beneficios:**
- Centralizacao de logica
- Facil testar
- Consistencia de formatacao

**Impacto**: MEDIO - Manutencao futura
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: CalendarioAgendamento.tsx, PaginaProfissional.tsx, criar src/utils/formatadores.ts

---

### MR-008: Adicionar prop types com TypeScript strict

**Beneficio**: Type safety

**Codigo Atual:**
Algumas props sem readonly, alguns arrays mutaveis.

**Proposta:**
```tsx
// Antes
interface CalendarioAgendamentoProps {
  horariosDisponiveis: string[];
  diasAtendimento: string[];
}

// Depois (imutavel)
interface CalendarioAgendamentoProps {
  readonly horariosDisponiveis: readonly string[];
  readonly diasAtendimento: readonly string[];
}
```

```tsx
// tipos.ts - tornar interfaces readonly
export interface Profissional {
  readonly id: string;
  readonly nome: string;
  readonly especialidade: string;
  readonly registro: string;
  readonly foto: string;
  readonly telefone: string;
  readonly horario: string;
  readonly diasAtendimento: readonly string[];
  readonly horariosDisponiveis: readonly string[];
  readonly whatsapp: string;
  readonly descricao?: string;
}
```

**Beneficios:**
- Previne mutacao acidental
- Type safety mais rigoroso
- Documenta intencao

**Impacto**: BAIXO - Seguranca de tipos
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: tipos.ts, todas interfaces de Props

---

### MR-009: Extrair logica de validacao

**Beneficio**: Reutilizacao, testabilidade

**Codigo Atual (PaginaProfissional.tsx):**
```tsx
const estaCompleto = dataSelecionada && horarioSelecionado && nomePaciente.trim().length > 0;
```

**Proposta:**
Criar `src/utils/validacoes.ts`:

```tsx
// src/utils/validacoes.ts
export function validarNome(nome: string): boolean {
  const nomeTrim = nome.trim();
  return nomeTrim.length >= 3 && /^[a-zA-ZÀ-ÿ\s]+$/.test(nomeTrim);
}

export function validarAgendamento(
  data: Date | null,
  horario: string | null,
  nome: string
): boolean {
  return Boolean(data && horario && validarNome(nome));
}

export interface ErrosAgendamento {
  data?: string;
  horario?: string;
  nome?: string;
}

export function obterErrosAgendamento(
  data: Date | null,
  horario: string | null,
  nome: string
): ErrosAgendamento | null {
  const erros: ErrosAgendamento = {};

  if (!data) {
    erros.data = 'Selecione uma data';
  }

  if (!horario) {
    erros.horario = 'Selecione um horario';
  }

  if (!validarNome(nome)) {
    if (nome.trim().length === 0) {
      erros.nome = 'Digite seu nome';
    } else if (nome.trim().length < 3) {
      erros.nome = 'Nome deve ter pelo menos 3 caracteres';
    } else {
      erros.nome = 'Nome deve conter apenas letras';
    }
  }

  return Object.keys(erros).length > 0 ? erros : null;
}
```

**Uso:**
```tsx
import { validarAgendamento, obterErrosAgendamento } from '@/utils/validacoes';

const estaCompleto = validarAgendamento(dataSelecionada, horarioSelecionado, nomePaciente);
const erros = obterErrosAgendamento(dataSelecionada, horarioSelecionado, nomePaciente);
```

**Beneficios:**
- Logica de validacao testavel isoladamente
- Mensagens de erro centralizadas
- Reutilizavel em outros componentes

**Impacto**: MEDIO - Qualidade e manutencao
**Esforco**: MEDIO - 1 hora
**Componentes Afetados**: PaginaProfissional.tsx, CalendarioAgendamento.tsx, criar src/utils/validacoes.ts

---

### MR-010: Remover codigo morto (botao favorito)

**Beneficio**: Limpeza, clareza

**Codigo Atual (Logo.tsx linha 12-26):**
```tsx
<button
  className={estilos.favorito}
  aria-label="Marcar como favorito"
  type="button"
>
  {/* SVG coracao */}
</button>
```

**Problema:**
Botao sem funcionalidade (DT-007).

**Proposta:**

**Opcao 1 - Remover:**
```tsx
export function Logo() {
  return (
    <div className={estilos.logo}>
      {/* Apenas logo, sem botao favorito */}
    </div>
  );
}
```

**Opcao 2 - Implementar funcionalidade basica:**
```tsx
export function Logo() {
  const [favoritado, setFavoritado] = useState(() => {
    return localStorage.getItem('instituto-jardim-favorito') === 'true';
  });

  const toggleFavorito = () => {
    const novoEstado = !favoritado;
    setFavoritado(novoEstado);
    localStorage.setItem('instituto-jardim-favorito', String(novoEstado));
  };

  return (
    <div className={estilos.logo}>
      <button
        className={estilos.favorito}
        aria-label={favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        onClick={toggleFavorito}
        type="button"
      >
        <svg fill={favoritado ? 'currentColor' : 'none'} ...>
          {/* Coracao */}
        </svg>
      </button>
    </div>
  );
}
```

**Recomendacao:** Remover (Opcao 1) se nao houver plano de uso.

**Impacto**: BAIXO - Limpeza de codigo
**Esforco**: BAIXO - 15 minutos (remover) ou 1 hora (implementar)
**Componentes Afetados**: Logo.tsx

---

### MR-011: Adicionar Error Boundary

**Beneficio**: Resiliencia, UX

**Codigo Atual:**
Sem tratamento de erros globais.

**Proposta:**
Criar `src/componentes/ErrorBoundary/ErrorBoundary.tsx`:

```tsx
// src/componentes/ErrorBoundary/ErrorBoundary.tsx
import { Component, ReactNode, ErrorInfo } from 'react';
import estilos from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);

    // Opcional: Enviar para servico de monitoramento (Sentry, etc.)
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={estilos.errorContainer}>
          <div className={estilos.errorCard}>
            <h1>Algo deu errado</h1>
            <p>Desculpe, ocorreu um erro inesperado.</p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={estilos.errorDetails}>
                <summary>Detalhes do erro (desenvolvimento)</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            )}

            <button onClick={this.handleReload} className={estilos.reloadButton}>
              Recarregar Pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

```tsx
// main.tsx - ENVOLVER App com ErrorBoundary
import { ErrorBoundary } from './componentes/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

**Beneficios:**
- Previne crash completo da aplicacao
- Feedback amigavel ao usuario
- Monitoramento de erros (futuro)

**Impacto**: ALTO - Resiliencia da aplicacao
**Esforco**: MEDIO - 1-2 horas
**Componentes Afetados**: main.tsx, criar src/componentes/ErrorBoundary/

---

### MR-012: Adicionar fallback para imagens quebradas

**Beneficio**: UX, resiliencia

**Codigo Atual (CardProfissional.tsx linha 17-22):**
```tsx
<img
  src={profissional.foto}
  alt={`Foto de ${profissional.nome}`}
  className={estilos.foto}
  loading="lazy"
/>
```

**Problema:**
Se imagem nao carregar, icone quebrado aparece.

**Proposta:**
```tsx
export function CardProfissional({ profissional, onClick }: Props) {
  const [imagemErro, setImagemErro] = useState(false);

  return (
    <article className={estilos.card} onClick={onClick}>
      <img
        src={imagemErro ? '/imagens/avatar-placeholder.svg' : profissional.foto}
        alt={`Foto de ${profissional.nome}`}
        className={estilos.foto}
        loading="lazy"
        onError={() => setImagemErro(true)}
      />
      {/* ... */}
    </article>
  );
}
```

**Criar placeholder:**
`public/imagens/avatar-placeholder.svg` - Avatar generico SVG.

**Beneficios:**
- UX melhor se imagem falhar
- Sem icone quebrado

**Impacto**: MEDIO - Melhora UX
**Esforco**: BAIXO - 30 minutos
**Componentes Afetados**: CardProfissional.tsx, PaginaProfissional.tsx, criar placeholder

---

## 4. MATRIZ DE PRIORIZACAO CONSOLIDADA

### Legenda
- **P0**: CRITICO - Implementar imediatamente
- **P1**: ALTO - Incluir em proxima sprint
- **P2**: MEDIO - Considerar em 2-3 meses
- **P3**: BAIXO - Backlog

---

### Acessibilidade (15 propostas)

| ID | Titulo | Criterio WCAG | Impacto | Esforco | Prioridade |
|----|--------|---------------|---------|---------|------------|
| MA-006 | Verificar contraste de cores | 1.4.3 (AA) | CRITICO | MEDIO (2h) | P0 |
| MA-002 | Landmarks ARIA | 1.3.1, 2.4.1 (A) | ALTO | MEDIO (1h) | P0 |
| MA-004 | Labels de formulario | 1.3.1, 3.3.2 (A) | ALTO | BAIXO (30min) | P0 |
| MA-009 | Focus management | 2.4.3, 3.2.1 (A) | ALTO | MEDIO (1h) | P1 |
| MA-014 | Mensagem de erro acessivel | 3.3.1 (A), 3.3.3 (AA) | ALTO | MEDIO (1h) | P1 |
| MA-005 | aria-label em botoes | 2.4.6, 4.1.2 (AA/A) | ALTO | MEDIO (1h) | P1 |
| MA-001 | Skip link | 2.4.1 (A) | ALTO | BAIXO (15min) | P1 |
| MA-003 | Live regions | 4.1.3 (AA) | MEDIO | BAIXO (30min) | P2 |
| MA-007 | Indicacao visual de desabilitado | 1.4.1 (A) | MEDIO | BAIXO (30min) | P2 |
| MA-008 | Tamanho minimo de toque | 2.5.5 (AAA) | MEDIO | BAIXO (30min) | P2 |
| MA-012 | Hierarquia de headings | 1.3.1 (A) | MEDIO | BAIXO (30min) | P2 |
| MA-013 | prefers-reduced-motion | 2.3.3 (AAA) | MEDIO | MEDIO (1h) | P2 |
| MA-011 | Indicador campo obrigatorio | 3.3.2 (A) | MEDIO | BAIXO (15min) | P2 |
| MA-010 | aria-hidden em SVG decorativo | 1.1.1 (A) | BAIXO | BAIXO (15min) | P3 |
| MA-015 | Lang em trechos estrangeiros | 3.1.2 (AA) | BAIXO | N/A | P3 |

**Resumo Acessibilidade:**
- P0: 3 itens (6 horas)
- P1: 4 itens (3.75 horas)
- P2: 6 itens (3.5 horas)
- P3: 2 itens (0.25 horas)

---

### SEO (9 propostas)

| ID | Titulo | Categoria | Impacto | Esforco | Prioridade |
|----|--------|-----------|---------|---------|------------|
| MSEO-001 | Meta tags essenciais | Meta Tags | CRITICO | BAIXO (30min) | P0 |
| MSEO-003 | Structured Data | Rich Snippets | ALTO | MEDIO (2h) | P0 |
| MSEO-002 | Open Graph e Twitter Cards | Social Sharing | ALTO | MEDIO (1h) | P1 |
| MSEO-005 | sitemap.xml e robots.txt | Crawling | ALTO | BAIXO (30min) | P1 |
| MSEO-006 | Otimizar title/headings | On-Page | ALTO | BAIXO (30min) | P1 |
| MSEO-007 | Alt text otimizado | Image SEO | MEDIO | BAIXO (30min) | P2 |
| MSEO-004 | Semantica HTML | On-Page | MEDIO | MEDIO (2h) | P2 |
| MSEO-009 | Meta tags de verificacao | Configuracao | BAIXO | BAIXO (15min) | P3 |
| MSEO-008 | Pre-rendering (SSR/SSG) | Indexacao | CRITICO* | ALTO (40h+) | PRD Futuro |

**Observacao:** MSEO-008 e critico mas requer PRD separado (reescrita arquitetural).

**Resumo SEO:**
- P0: 2 itens (2.5 horas)
- P1: 3 itens (1.5 horas)
- P2: 2 itens (2.5 horas)
- P3: 1 item (15 minutos)
- Futuro: 1 item (40+ horas - PRD separado)

---

### Refatoracao (12 propostas)

| ID | Titulo | Beneficio | Impacto | Esforco | Prioridade |
|----|--------|-----------|---------|---------|------------|
| MR-005 | Controlled component (eliminar duplicacao) | Single Source of Truth | ALTO | MEDIO (2h) | P0 |
| MR-003 | Funcao gerarHorarios | DRY, eliminacao hardcode | ALTO | MEDIO (1h) | P0 |
| MR-011 | Error Boundary | Resiliencia | ALTO | MEDIO (2h) | P1 |
| MR-001 | Custom hook useCalendario | Separacao de responsabilidades | ALTO | MEDIO (2h) | P1 |
| MR-007 | Utils formatadores | Reutilizacao | MEDIO | MEDIO (1h) | P2 |
| MR-009 | Utils validacoes | Testabilidade | MEDIO | MEDIO (1h) | P2 |
| MR-002 | Centralizar constantes de datas | DRY | MEDIO | BAIXO (30min) | P2 |
| MR-004 | Componente BotaoData | Reutilizacao | MEDIO | MEDIO (1h) | P2 |
| MR-012 | Fallback imagens quebradas | UX | MEDIO | BAIXO (30min) | P2 |
| MR-006 | Helper classNames | Legibilidade | BAIXO | BAIXO (30min) | P3 |
| MR-008 | Prop types readonly | Type safety | BAIXO | BAIXO (30min) | P3 |
| MR-010 | Remover botao favorito | Limpeza | BAIXO | BAIXO (15min) | P3 |

**Resumo Refatoracao:**
- P0: 2 itens (3 horas)
- P1: 2 itens (4 horas)
- P2: 5 itens (4 horas)
- P3: 3 itens (1.25 horas)

---

## 5. ROADMAP DE IMPLEMENTACAO SUGERIDO

### Sprint 1 (Critico - P0)

**Total estimado: 11.5 horas**

**Acessibilidade (6h):**
1. MA-006: Verificar contraste de cores (2h)
2. MA-002: Landmarks ARIA (1h)
3. MA-004: Labels de formulario (30min)

**SEO (2.5h):**
1. MSEO-001: Meta tags essenciais (30min)
2. MSEO-003: Structured Data (2h)

**Refatoracao (3h):**
1. MR-005: Controlled component (2h)
2. MR-003: gerarHorarios (1h)

---

### Sprint 2 (Alta Prioridade - P1)

**Total estimado: 10.25 horas**

**Acessibilidade (3.75h):**
1. MA-009: Focus management (1h)
2. MA-014: Mensagens de erro (1h)
3. MA-005: aria-label botoes (1h)
4. MA-001: Skip link (15min)

**SEO (1.5h):**
1. MSEO-002: Open Graph (1h)
2. MSEO-005: sitemap/robots (30min)
3. MSEO-006: Otimizar titles (30min)

**Refatoracao (4h):**
1. MR-011: Error Boundary (2h)
2. MR-001: useCalendario hook (2h)

---

### Sprint 3 (Media Prioridade - P2)

**Total estimado: 10 horas**

**Acessibilidade (3.5h):**
1. MA-003: Live regions (30min)
2. MA-007: Indicacao visual desabilitado (30min)
3. MA-008: Tamanho minimo toque (30min)
4. MA-012: Hierarquia headings (30min)
5. MA-013: prefers-reduced-motion (1h)
6. MA-011: Campo obrigatorio (15min)

**SEO (2.5h):**
1. MSEO-007: Alt text otimizado (30min)
2. MSEO-004: Semantica HTML (2h)

**Refatoracao (4h):**
1. MR-007: Utils formatadores (1h)
2. MR-009: Utils validacoes (1h)
3. MR-002: Constantes centralizadas (30min)
4. MR-004: BotaoData (1h)
5. MR-012: Fallback imagens (30min)

---

### Backlog (Baixa Prioridade - P3)

**Total estimado: 1.5 horas**

**Acessibilidade (0.25h):**
1. MA-010: aria-hidden SVG (15min)
2. MA-015: Lang attributes (N/A)

**SEO (0.25h):**
1. MSEO-009: Meta tags verificacao (15min)

**Refatoracao (1.25h):**
1. MR-006: classNames helper (30min)
2. MR-008: Readonly props (30min)
3. MR-010: Remover favorito (15min)

---

## 6. CONSIDERACOES FINAIS

### Limitacoes Arquiteturais Identificadas

1. **SPA sem SSR/SSG:**
   - Impacto SEO significativo
   - Solucao: PRD futuro para migrar Next.js ou implementar pre-rendering

2. **Sem roteamento:**
   - URLs nao semanticas
   - Solucao: Implementar React Router (PRD futuro)

3. **Dados mockados:**
   - Sem integracao backend
   - Solucao: API REST ou GraphQL (PRD futuro)

### Proximos Passos Apos Implementacao

1. **Auditoria automatizada:**
   - Lighthouse (Accessibility, SEO, Performance)
   - axe DevTools (Acessibilidade)
   - Google Search Console (SEO)

2. **Testes:**
   - Testes unitarios de utils criados
   - Testes de acessibilidade (jest-axe)
   - Testes de integracao do fluxo

3. **Monitoramento:**
   - Sentry ou similar para erros
   - Google Analytics para comportamento
   - Search Console para indexacao

---

**Fim do Documento**

**Data**: 2026-02-08
**Autor**: dev-implementer
**Status**: Concluido - Aguardando Code Review
**Proxima Etapa**: tech-lead (CODE_REVIEW)
