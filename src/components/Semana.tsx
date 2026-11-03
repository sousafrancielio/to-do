'use client';

import type { Tarefa } from './tipos';
import { dataDoDia, diaDeHoje, dias } from './datas';

type SemanaProps = {
  tarefas: Tarefa[];
};

export function Semana({ tarefas }: SemanaProps) {
  const hoje = diaDeHoje();

  function irParaDia(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className='grid grid-cols-7 gap-1 sm:gap-2'>
      {dias.map((dia, indice) => {
        const doDia = tarefas.filter((tarefa) => tarefa.dia === dia.id);
        const feitas = doDia.filter((tarefa) => tarefa.concluida).length;
        const ativo = dia.id === hoje;

        return (
          <button
            key={dia.id}
            type='button'
            onClick={() => irParaDia(dia.id)}
            className={
              ativo
                ? 'cursor-pointer rounded-lg bg-[#1e3a54] px-1 py-2 text-white'
                : 'cursor-pointer rounded-lg border border-stone-200 bg-white px-1 py-2 text-stone-600 hover:border-stone-300'
            }
          >
            <span className='block text-[11px] sm:text-xs'>{dia.curto}</span>
            <span className='mt-0.5 block text-sm font-semibold'>{dataDoDia(indice).getDate()}</span>
            <span className={ativo ? 'mt-1 block text-[10px] text-stone-300' : 'mt-1 block text-[10px] text-stone-400'}>
              {doDia.length === 0 ? '-' : `${feitas}/${doDia.length}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
