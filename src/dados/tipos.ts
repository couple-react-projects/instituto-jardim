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
  descricao?: string;
}

export interface Instituto {
  nome: string;
  subtitulo: string;
  tagline: string;
  logo: string;
}

export interface Contato {
  tipo: 'whatsapp' | 'localizacao';
  titulo: string;
  descricao: string;
  url: string;
  icone: string;
}

