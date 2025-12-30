import { useState } from 'react';
import { Profissional } from '@/dados/tipos';
import { CalendarioAgendamento } from '../CalendarioAgendamento';
import estilos from './PaginaProfissional.module.css';

interface PaginaProfissionalProps {
  profissional: Profissional;
  onVoltar: () => void;
}

export function PaginaProfissional({ profissional, onVoltar }: PaginaProfissionalProps) {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [nomePaciente, setNomePaciente] = useState('');

  const formatarDataParaMensagem = (data: Date): string => {
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const diaSemana = diasSemana[data.getDay()];
    
    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  };

  const gerarMensagemWhatsApp = (): string => {
    if (!dataSelecionada || !horarioSelecionado || !nomePaciente.trim()) {
      return '';
    }

    const dataFormatada = formatarDataParaMensagem(dataSelecionada);
    const mensagem = `Olá, ${profissional.nome.split(' ')[0]}! 👋

Gostaria de agendar uma consulta:

📅 *Data:* ${dataFormatada}
🕐 *Horário:* ${horarioSelecionado}
👤 *Paciente:* ${nomePaciente.trim()}

Aguardo confirmação. Obrigado(a)! 😊`;

    return encodeURIComponent(mensagem);
  };

  const estaCompleto = dataSelecionada && horarioSelecionado && nomePaciente.trim().length > 0;
  const urlWhatsapp = estaCompleto
    ? `https://wa.me/${profissional.whatsapp}?text=${gerarMensagemWhatsApp()}`
    : '#';

  const handleEnviarMensagem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!estaCompleto) {
      e.preventDefault();
    }
  };

  return (
    <div className={estilos.pagina}>
      <button className={estilos.botaoVoltar} onClick={onVoltar} aria-label="Voltar">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Voltar</span>
      </button>

      <div className={estilos.conteudo}>
        <div className={estilos.fotoContainer}>
          <img
            src={profissional.foto}
            alt={`Foto de ${profissional.nome}`}
            className={estilos.foto}
          />
        </div>

        <h1 className={estilos.nome}>{profissional.nome}</h1>
        <p className={estilos.especialidade}>{profissional.especialidade}</p>
        <p className={estilos.registro}>{profissional.registro}</p>

        {profissional.descricao && (
          <p className={estilos.descricao}>{profissional.descricao}</p>
        )}

        <CalendarioAgendamento
          horariosDisponiveis={profissional.horariosDisponiveis}
          diasAtendimento={profissional.diasAtendimento}
          onDataSelecionada={setDataSelecionada}
          onHorarioSelecionado={setHorarioSelecionado}
          onNomePacienteChange={setNomePaciente}
        />

        <a
          href={urlWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`${estilos.botaoWhatsapp} ${!estaCompleto ? estilos.botaoWhatsappDesabilitado : ''}`}
          aria-label={`Enviar agendamento para ${profissional.nome} no WhatsApp`}
          onClick={handleEnviarMensagem}
          aria-disabled={!estaCompleto}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span>
            {estaCompleto
              ? `Confirmar Agendamento com ${profissional.nome.split(' ')[0]}`
              : 'Preencha todos os dados para agendar'}
          </span>
        </a>
      </div>
    </div>
  );
}
