import type { Dia, Tarefa } from './tipos';

export const dias: { id: Dia; nome: string; curto: string }[] = [
  { id: 'segunda', nome: 'Segunda', curto: 'Seg' },
  { id: 'terca', nome: 'Terça', curto: 'Ter' },
  { id: 'quarta', nome: 'Quarta', curto: 'Qua' },
  { id: 'quinta', nome: 'Quinta', curto: 'Qui' },
  { id: 'sexta', nome: 'Sexta', curto: 'Sex' },
  { id: 'sabado', nome: 'Sábado', curto: 'Sáb' },
  { id: 'domingo', nome: 'Domingo', curto: 'Dom' },
];

const ordem: Dia[] = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

export function diaDeHoje(base = new Date()): Dia {
  return ordem[base.getDay()];
}

export function dataDoDia(indice: number, base = new Date()) {
  const data = new Date(base);
  data.setHours(12, 0, 0, 0);

  const dia = data.getDay();
  const voltar = dia === 0 ? 6 : dia - 1;
  data.setDate(data.getDate() - voltar + indice);

  return data;
}

export function textoDaSemana(base = new Date()) {
  const inicio = dataDoDia(0, base);
  const fim = dataDoDia(6, base);
  const mes = (data: Date) => data.toLocaleDateString('pt-BR', { month: 'long' });

  if (inicio.getMonth() === fim.getMonth()) {
    return `${inicio.getDate()} a ${fim.getDate()} de ${mes(fim)}`;
  }

  return `${inicio.getDate()} de ${mes(inicio)} a ${fim.getDate()} de ${mes(fim)}`;
}

export function textoDeHoje(base = new Date()) {
  const texto = base.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function dataCurta(data: Date) {
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${data.getDate()} ${meses[data.getMonth()]}`;
}

export function textoHora(hora: string) {
  const partes = hora.split(':');
  if (partes.length < 2) return hora;
  return `${Number(partes[0])}:${partes[1]} Hrs`;
}

export function horaValida(valor: unknown): valor is string {
  return typeof valor === 'string' && /^\d{2}:\d{2}$/.test(valor);
}

export function diaValido(valor: unknown): valor is Dia {
  return dias.some((dia) => dia.id === valor);
}

function item(
  id: number,
  dia: Dia,
  hora: string,
  texto: string,
  concluida: boolean,
): Tarefa {
  return { id, dia, hora, texto, concluida };
}

export const tarefasIniciais: Tarefa[] = [
  item(1, 'domingo', '06:10', 'Trabalho', true),
  item(2, 'domingo', '12:00', 'Almoço', true),
  item(3, 'domingo', '13:00', 'Descanso', true),
  item(4, 'domingo', '14:00', 'Mentoria Lifeados', true),
  item(5, 'domingo', '16:00', 'Revisar assunto da mentoria', true),
  item(6, 'domingo', '18:00', 'Janta', true),
  item(7, 'domingo', '19:00', 'Lazer com minha namorada ou estudo', true),
  item(8, 'domingo', '22:30', 'Duolingo', true),
  item(9, 'domingo', '23:00', 'Dormir', true),

  item(10, 'segunda', '06:10', 'Trabalho', true),
  item(11, 'segunda', '07:30', 'Café da manhã', true),
  item(12, 'segunda', '08:00', 'Meditação', true),
  item(13, 'segunda', '08:30', 'Limpar corredor do residencial', true),
  item(14, 'segunda', '11:30', 'Almoço', true),
  item(15, 'segunda', '12:20', 'Descanso', true),
  item(16, 'segunda', '14:00', 'Estudar JavaScript e fazer atividades', true),
  item(17, 'segunda', '16:00', 'Banho', false),
  item(18, 'segunda', '16:40', 'Me arrumar para a faculdade', false),
  item(19, 'segunda', '17:30', 'Janta', false),
  item(20, 'segunda', '19:30', 'Aula', false),
  item(21, 'segunda', '21:00', 'Intervalo', false),
  item(22, 'segunda', '21:10', 'Voltar para a aula', false),
  item(23, 'segunda', '22:40', 'Término da aula e Duolingo', false),
  item(24, 'segunda', '23:00', 'Descanso', false),

  item(25, 'terca', '06:10', 'Trabalho', false),
  item(26, 'terca', '07:30', 'Café da manhã', false),
  item(27, 'terca', '08:00', 'Meditação', false),
  item(28, 'terca', '08:30', 'Limpar corredor do residencial', false),
  item(29, 'terca', '12:00', 'Almoço', false),
  item(30, 'terca', '12:50', 'Descanso', false),
  item(31, 'terca', '14:00', 'Revisar Packet Tracer', false),
  item(32, 'terca', '16:15', 'Banho', false),
  item(33, 'terca', '16:50', 'Me arrumar para a faculdade', false),
  item(34, 'terca', '17:30', 'Janta', false),
  item(35, 'terca', '19:00', 'Aula online', false),
  item(36, 'terca', '19:40', 'Desafios e quiz', false),
  item(37, 'terca', '20:20', 'Assistir aula e ler PDFs', false),
  item(38, 'terca', '21:00', 'Intervalo', false),
  item(39, 'terca', '21:10', 'Voltar para a aula', false),
  item(40, 'terca', '22:40', 'Término da aula e Duolingo', false),
  item(41, 'terca', '23:00', 'Descanso', false),

  item(42, 'quarta', '06:10', 'Trabalho', false),
  item(43, 'quarta', '07:30', 'Café da manhã', false),
  item(44, 'quarta', '08:00', 'Meditação', false),
  item(45, 'quarta', '08:30', 'Limpar corredor do residencial', false),
  item(46, 'quarta', '11:30', 'Almoço', false),
  item(47, 'quarta', '12:20', 'Descanso', false),
  item(48, 'quarta', '14:00', 'Revisar React e Next', false),
  item(49, 'quarta', '16:20', 'Banho', false),
  item(50, 'quarta', '16:55', 'Me arrumar para a faculdade', false),
  item(51, 'quarta', '17:30', 'Janta', false),
  item(52, 'quarta', '18:45', 'Aula', false),
  item(53, 'quarta', '21:00', 'Intervalo', false),
  item(54, 'quarta', '21:10', 'Voltar para a aula', false),
  item(55, 'quarta', '21:55', 'Término da aula e Duolingo', false),
  item(56, 'quarta', '23:00', 'Descanso', false),

  item(57, 'quinta', '06:10', 'Trabalho', false),
  item(58, 'quinta', '07:30', 'Café da manhã', false),
  item(59, 'quinta', '08:00', 'Meditação', false),
  item(60, 'quinta', '08:30', 'Limpar corredor do residencial', false),
  item(61, 'quinta', '12:00', 'Almoço', false),
  item(62, 'quinta', '12:50', 'Descanso', false),
  item(63, 'quinta', '14:00', 'Trabalho e atividades', false),
  item(64, 'quinta', '16:10', 'Banho', false),
  item(65, 'quinta', '16:45', 'Me arrumar para a faculdade', false),
  item(66, 'quinta', '17:30', 'Janta', false),
  item(67, 'quinta', '18:45', 'Aula', false),
  item(68, 'quinta', '20:55', 'Intervalo', false),
  item(69, 'quinta', '21:15', 'Voltar para a aula', false),
  item(70, 'quinta', '22:05', 'Término da aula e Duolingo', false),
  item(71, 'quinta', '23:00', 'Descanso', false),

  item(72, 'sexta', '06:10', 'Trabalho', false),
  item(73, 'sexta', '07:30', 'Café da manhã', false),
  item(74, 'sexta', '08:00', 'Meditação', false),
  item(75, 'sexta', '08:30', 'Limpar corredor do residencial', false),
  item(76, 'sexta', '11:30', 'Almoço', false),
  item(77, 'sexta', '12:20', 'Descanso', false),
  item(78, 'sexta', '14:00', 'Arrumar o guarda-roupa', false),
  item(79, 'sexta', '15:30', 'Limpar o tênis', false),
  item(80, 'sexta', '17:30', 'Janta', false),
  item(81, 'sexta', '18:20', 'Banho', false),
  item(82, 'sexta', '20:00', 'Culto', false),
  item(83, 'sexta', '22:00', 'Chegar em casa', false),
  item(84, 'sexta', '22:10', 'Estudo bíblico', false),
  item(85, 'sexta', '22:40', 'Duolingo', false),
  item(86, 'sexta', '23:00', 'Dormir', false),

  item(87, 'sabado', '07:00', 'Café da manhã', false),
  item(88, 'sabado', '08:00', 'Banho para o culto', false),
  item(89, 'sabado', '09:00', 'Culto', false),
  item(90, 'sabado', '12:00', 'Almoço', false),
  item(91, 'sabado', '13:00', 'Descanso', false),
  item(92, 'sabado', '17:00', 'Encontro com amigos ou com minha namorada', false),
  item(93, 'sabado', '18:00', 'Janta', false),
  item(94, 'sabado', '19:00', 'Lanche, sair ou conversar com minha namorada', false),
  item(95, 'sabado', '22:30', 'Duolingo', false),
  item(96, 'sabado', '23:30', 'Dormir', false),
];
