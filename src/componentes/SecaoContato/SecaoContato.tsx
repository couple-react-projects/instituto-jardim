import { contatos } from '@/dados/mockInstituto';
import { CardContato } from '../CardContato';
import estilos from './SecaoContato.module.css';

export function SecaoContato() {
  return (
    <section className={estilos.secao}>
      <h2 className={estilos.titulo}>Fale Conosco</h2>
      <div className={estilos.linha}></div>
      <div className={estilos.lista}>
        {contatos.map((contato) => (
          <CardContato key={contato.tipo} contato={contato} />
        ))}
      </div>
    </section>
  );
}

