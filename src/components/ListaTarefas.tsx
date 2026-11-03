'use client';

import type { Filtro, Tarefa } from './tipos';
import { ItemTarefa } from './ItemTarefa';
import { dataCurta, dataDoDia, diaDeHoje, dias } from './datas';

type ListaTarefasProps = {
  tarefas: Tarefa[];
  filtro: Filtro;
  onAlternar: (id: number) => void;
  onExcluir: (id: number) => void;
};

export function ListaTarefas({
  tarefas,
  filtro,
  onAlternar,
  onExcluir,
}: ListaTarefasProps) {
  const hoje = diaDeHoje();
  const temAlguma = tarefas.length > 0;

  if (!temAlguma) {
    let mensagem = 'Nenhuma tarefa cadastrada';

    if (filtro === 'pendentes') {
      mensagem = 'Nenhuma tarefa pendente';
    }

    if (filtro === 'concluidas') {
      mensagem = 'Nenhuma tarefa concluída';
    }

    return (
      <p className='rounded-xl border border-dashed border-stone-300 bg-white py-12 text-center text-sm text-stone-500'>
        {mensagem}
      </p>
    );
  }

  return (
    <div className='grid gap-4 lg:grid-cols-2'>
      {dias.map((dia, indice) => {
        const doDia = tarefas
          .filter((tarefa) => tarefa.dia === dia.id)
          .slice()
          .sort((a, b) => a.hora.localeCompare(b.hora));
        const ehHoje = dia.id === hoje;
        const feitas = doDia.filter((tarefa) => tarefa.concluida).length;

        return (
          <section
            key={dia.id}
            id={dia.id}
            className={
              ehHoje
                ? 'scroll-mt-4 rounded-xl border border-[#1e3a54] bg-white p-4'
                : 'scroll-mt-4 rounded-xl border border-stone-200 bg-white p-4'
            }
          >
            <div className='mb-1 flex items-center justify-between gap-2'>
              <h2 className='fonte-titulo text-lg text-[#1e3a54]'>{dia.nome}</h2>
              {ehHoje ? (
                <span className='rounded-full bg-[#1e3a54] px-2 py-0.5 text-[11px] text-white'>
                  Hoje
                </span>
              ) : (
                <span className='text-xs text-stone-400'>{dataCurta(dataDoDia(indice))}</span>
              )}
            </div>
            <p className='mb-3 text-xs text-stone-400'>
              {doDia.length === 0
                ? 'sem tarefas'
                : `${feitas} de ${doDia.length}`}
            </p>
            {doDia.length === 0 ? (
              <p className='border-t border-stone-100 pt-3 text-sm text-stone-400'>
                Nada neste dia
              </p>
            ) : (
              <ul className='divide-y divide-stone-100 border-t border-stone-100'>
                {doDia.map((tarefa) => (
                  <ItemTarefa
                    key={tarefa.id}
                    tarefa={tarefa}
                    onAlternar={onAlternar}
                    onExcluir={onExcluir}
                  />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
