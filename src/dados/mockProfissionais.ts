import { Profissional } from './tipos';

export const profissionais: Profissional[] = [
  {
    id: '1',
    nome: 'Anabia',
    especialidade: 'Harmonização Orofacial',
    registro: 'CRO: 30.757',
    foto: '/imagens/profissionais/anabia.svg',
    telefone: '(11) 98765-4321',
    horario: '08:00 às 18:00',
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horariosDisponiveis: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
    whatsapp: '5511987654321',
    descricao: 'Especialista em harmonização orofacial com foco em estética facial e bem-estar.',
  },
  {
    id: '2',
    nome: 'Ana Laura',
    especialidade: 'Estética e Reabilitação Oral',
    registro: 'CRO: 36.818',
    foto: '/imagens/profissionais/ana-laura.svg',
    telefone: '(11) 97654-3210',
    horario: '09:00 às 19:00',
    diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta'],
    horariosDisponiveis: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    whatsapp: '5511976543210',
    descricao: 'Dedica-se à estética e reabilitação oral, proporcionando sorrisos saudáveis e harmoniosos.',
  },
  {
    id: '3',
    nome: 'Dr. Denis R. Graciotto',
    especialidade: 'Terapia Regenerativa e Tratamento da Dor',
    registro: 'Crefito/8-63999-F',
    foto: '/imagens/profissionais/denis-graciotto.svg',
    telefone: '(11) 96543-2109',
    horario: '07:00 às 17:00',
    diasAtendimento: ['Segunda', 'Quarta', 'Sexta'],
    horariosDisponiveis: ['07:00', '08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
    whatsapp: '5511965432109',
    descricao: 'Especialista em terapia regenerativa e tratamento da dor, com foco em técnicas avançadas de reabilitação.',
  },
];

