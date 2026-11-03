'use client';

import type { Tarefa } from './tipos';
import { textoHora } from './datas';

type ItemTarefaProps = {
  tarefa: Tarefa;
  onAlternar: (id: number) => void;
  onExcluir: (id: number) => void;
};

export function ItemTarefa({ tarefa, onAlternar, onExcluir }: ItemTarefaProps) {
  return (
    <li className='flex items-start justify-between gap-3 py-2.5'>
      <label className='flex min-w-0 flex-1 cursor-pointer items-start gap-3'>
        <input
          type='checkbox'
          checked={tarefa.concluida}
          onChange={() => onAlternar(tarefa.id)}
          className='mt-1 h-4 w-4 shrink-0 accent-[#1e3a54]'
          aria-label={
            tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída'
          }
        />
        <span className='flex min-w-0 flex-1 gap-3'>
          <span
            className={
              tarefa.concluida
                ? 'w-[4.6rem] shrink-0 text-xs text-stone-400'
                : 'w-[4.6rem] shrink-0 text-xs font-medium text-[#1e3a54]'
            }
          >
            {textoHora(tarefa.hora)}
          </span>
          <span
            className={
              tarefa.concluida
                ? 'texto-tarefa text-stone-400 line-through'
                : 'texto-tarefa text-stone-800'
            }
          >
            {tarefa.texto}
          </span>
        </span>
      </label>
      <button
        type='button'
        onClick={() => onExcluir(tarefa.id)}
        className='shrink-0 cursor-pointer text-xs text-stone-400 hover:text-red-600'
      >
        Excluir
      </button>
    </li>
  );
}
