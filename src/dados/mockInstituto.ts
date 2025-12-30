import { Instituto, Contato } from './tipos';

export const instituto: Instituto = {
  nome: 'Instituto Jardim',
  subtitulo: 'Cuidados especializados em saúde e bem-estar para toda a família',
  tagline: 'Excelência em saúde',
  logo: '/imagens/logo.svg',
};

export const contatos: Contato[] = [
  {
    tipo: 'whatsapp',
    titulo: 'WhatsApp',
    descricao: 'Fale conosco agora mesmo',
    url: 'https://wa.me/5511999999999',
    icone: 'whatsapp',
  },
  {
    tipo: 'localizacao',
    titulo: 'Localização',
    descricao: 'Como chegar até nós',
    url: 'https://maps.google.com/?q=Instituto+Jardim',
    icone: 'localizacao',
  },
];

