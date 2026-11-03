'use client';

import type { Filtro } from './tipos';

type FiltrosProps = {
  filtro: Filtro;
  onMudar: (filtro: Filtro) => void;
  contagem: Record<Filtro, number>;
};

const opcoes: { id: Filtro; nome: string }[] = [
  { id: 'todas', nome: 'Todas' },
  { id: 'pendentes', nome: 'Pendentes' },
  { id: 'concluidas', nome: 'Concluídas' },
];

export function Filtros({ filtro, onMudar, contagem }: FiltrosProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {opcoes.map((opcao) => {
        const ativo = filtro === opcao.id;

        return (
          <button
            key={opcao.id}
            type='button'
            onClick={() => onMudar(opcao.id)}
            className={
              ativo
                ? 'cursor-pointer rounded-full bg-[#1e3a54] px-3 py-1.5 text-sm text-white'
                : 'cursor-pointer rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-600 hover:border-stone-400'
            }
          >
            {opcao.nome}
            <span className={ativo ? 'ml-1 text-stone-300' : 'ml-1 text-stone-400'}>
              {contagem[opcao.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
