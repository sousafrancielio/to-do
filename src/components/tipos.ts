export type Dia =
  | 'segunda'
  | 'terca'
  | 'quarta'
  | 'quinta'
  | 'sexta'
  | 'sabado'
  | 'domingo';

export type Tarefa = {
  id: number;
  texto: string;
  hora: string;
  concluida: boolean;
  dia: Dia;
};

export type Filtro = 'todas' | 'pendentes' | 'concluidas';
