import { useState } from 'react';
import { Profissional } from './dados/tipos';
import { profissionais } from './dados/mockProfissionais';
import { Cabecalho } from './componentes/Cabecalho';
import { SecaoProfissionais } from './componentes/SecaoProfissionais';
import { SecaoContato } from './componentes/SecaoContato';
import { Rodape } from './componentes/Rodape';
import { PaginaProfissional } from './componentes/PaginaProfissional';
import './estilos/globais.css';
import estilos from './App.module.css';

function App() {
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<Profissional | null>(null);

  const handleProfissionalClick = (id: string) => {
    const profissional = profissionais.find((p) => p.id === id);
    if (profissional) {
      setProfissionalSelecionado(profissional);
    }
  };

  const handleVoltar = () => {
    setProfissionalSelecionado(null);
  };

  if (profissionalSelecionado) {
    return (
      <div className={estilos.container}>
        <PaginaProfissional
          profissional={profissionalSelecionado}
          onVoltar={handleVoltar}
        />
      </div>
    );
  }

  return (
    <div className={estilos.container}>
      <Cabecalho />
      <SecaoProfissionais onProfissionalClick={handleProfissionalClick} />
      <SecaoContato />
      <Rodape />
    </div>
  );
}

export default App;

