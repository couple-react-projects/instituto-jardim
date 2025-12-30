import { profissionais } from '@/dados/mockProfissionais';
import { CardProfissional } from '../CardProfissional';
import estilos from './SecaoProfissionais.module.css';

interface SecaoProfissionaisProps {
  onProfissionalClick: (id: string) => void;
}

export function SecaoProfissionais({ onProfissionalClick }: SecaoProfissionaisProps) {
  return (
    <section className={estilos.secao}>
      <h2 className={estilos.titulo}>Nossos Profissionais</h2>
      <div className={estilos.linha}></div>
      <div className={estilos.lista}>
        {profissionais.map((profissional) => (
          <CardProfissional
            key={profissional.id}
            profissional={profissional}
            onClick={() => onProfissionalClick(profissional.id)}
          />
        ))}
      </div>
    </section>
  );
}

