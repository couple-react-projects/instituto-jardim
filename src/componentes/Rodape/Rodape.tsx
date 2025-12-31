import estilos from './Rodape.module.css';

export function Rodape() {
  return (
    <footer className={estilos.rodape}>
      <p className={estilos.copyright}>© 2025 Instituto Jardim</p>
      <p className={estilos.slogan}>Desenvolvido por: Amanda Braga</p>
    </footer>
  );
}

