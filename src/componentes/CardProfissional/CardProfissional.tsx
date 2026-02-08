import { useRef, useEffect } from 'react';
import { Profissional } from '@/dados/tipos';
import estilos from './CardProfissional.module.css';

export interface CardProfissionalProps {
  profissional: Profissional;
  onClick?: () => void;
}

export function CardProfissional({ profissional, onClick }: CardProfissionalProps) {
  const prefetchedRef = useRef<Set<string>>(new Set());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (prefetchedRef.current.has(profissional.foto)) return;

    timerRef.current = setTimeout(() => {
      const img = new Image();
      img.src = profissional.foto;
      prefetchedRef.current.add(profissional.foto);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <article
      className={estilos.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <img
        src={profissional.foto}
        alt={`Foto de ${profissional.nome}`}
        className={estilos.foto}
        loading="lazy"
      />
      <div className={estilos.conteudo}>
        <h3 className={estilos.nome}>{profissional.nome}</h3>
        <p className={estilos.especialidade}>{profissional.especialidade}</p>
        <p className={estilos.registro}>{profissional.registro}</p>
      </div>
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
    </article>
  );
}

