import estilos from './Logo.module.css';

export function Logo() {
  return (
    <div className={estilos.container}>
      <div className={estilos.logo}></div>
    </div>
  );
}

