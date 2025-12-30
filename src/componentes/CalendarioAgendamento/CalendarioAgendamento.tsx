import { useState } from 'react';
import estilos from './CalendarioAgendamento.module.css';

interface CalendarioAgendamentoProps {
  horariosDisponiveis: string[];
  diasAtendimento: string[];
  onDataSelecionada: (data: Date | null) => void;
  onHorarioSelecionado: (horario: string | null) => void;
  onNomePacienteChange: (nome: string) => void;
}

export function CalendarioAgendamento({
  horariosDisponiveis,
  diasAtendimento,
  onDataSelecionada,
  onHorarioSelecionado,
  onNomePacienteChange,
}: CalendarioAgendamentoProps) {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [nomePaciente, setNomePaciente] = useState('');

  const hoje = new Date();
  const proximos30Dias: Date[] = [];
  
  for (let i = 1; i <= 30; i++) {
    const data = new Date(hoje);
    data.setDate(hoje.getDate() + i);
    proximos30Dias.push(data);
  }

  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const formatarData = (data: Date): string => {
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    const diaSemana = diasSemana[data.getDay()];
    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  };

  const obterNomeDiaSemana = (data: Date): string => {
    return diasSemana[data.getDay()];
  };

  const isDiaDisponivel = (data: Date): boolean => {
    const diaSemana = obterNomeDiaSemana(data);
    return diasAtendimento.includes(diaSemana);
  };

  const handleDataClick = (data: Date) => {
    if (isDiaDisponivel(data)) {
      setDataSelecionada(data);
      setHorarioSelecionado(null);
      onDataSelecionada(data);
      onHorarioSelecionado(null);
    }
  };

  const handleHorarioClick = (horario: string) => {
    setHorarioSelecionado(horario);
    onHorarioSelecionado(horario);
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nome = e.target.value;
    setNomePaciente(nome);
    onNomePacienteChange(nome);
  };

  return (
    <div className={estilos.container}>
      <h2 className={estilos.titulo}>Agendar Consulta</h2>

      <div className={estilos.secao}>
        <h3 className={estilos.subtitulo}>Selecione a Data</h3>
        <div className={estilos.calendario}>
          {proximos30Dias.map((data, index) => {
            const disponivel = isDiaDisponivel(data);
            const selecionada = dataSelecionada && data.toDateString() === dataSelecionada.toDateString();
            
            return (
              <button
                key={index}
                className={`${estilos.dia} ${selecionada ? estilos.diaSelecionada : ''} ${!disponivel ? estilos.diaIndisponivel : ''}`}
                onClick={() => handleDataClick(data)}
                disabled={!disponivel}
                type="button"
              >
                <span className={estilos.diaNumero}>{data.getDate()}</span>
                <span className={estilos.diaSemana}>{obterNomeDiaSemana(data).substring(0, 3)}</span>
              </button>
            );
          })}
        </div>
        {dataSelecionada && (
          <p className={estilos.dataSelecionadaTexto}>
            Data selecionada: <strong>{formatarData(dataSelecionada)}</strong>
          </p>
        )}
      </div>

      {dataSelecionada && (
        <div className={estilos.secao}>
          <h3 className={estilos.subtitulo}>Selecione o Horário</h3>
          <div className={estilos.horarios}>
            {horariosDisponiveis.map((horario) => (
              <button
                key={horario}
                className={`${estilos.horario} ${horarioSelecionado === horario ? estilos.horarioSelecionado : ''}`}
                onClick={() => handleHorarioClick(horario)}
                type="button"
              >
                {horario}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={estilos.secao}>
        <h3 className={estilos.subtitulo}>Nome do Paciente</h3>
        <input
          type="text"
          className={estilos.input}
          placeholder="Digite seu nome completo"
          value={nomePaciente}
          onChange={handleNomeChange}
        />
      </div>
    </div>
  );
}

