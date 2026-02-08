import { Instituto, Contato } from "./tipos";

export const instituto: Instituto = {
  nome: "Instituto Jardim",
  subtitulo: "Cuidados especializados em saúde e bem-estar para toda a família",
  tagline: "Excelência em saúde",
  logo: "/imagens/logo.svg",
};

export const contatos: Contato[] = [
  {
    tipo: "whatsapp",
    titulo: "WhatsApp",
    descricao: "Fale conosco agora mesmo",
    url: "https://wa.me/5544998065522",
    icone: "whatsapp",
  },
  {
    tipo: "localizacao",
    titulo: "Localização",
    descricao: "Como chegar até nós",
    url: "https://maps.app.goo.gl/6Z7feaw27x4fPCgK9",
    icone: "localizacao",
  },
];
