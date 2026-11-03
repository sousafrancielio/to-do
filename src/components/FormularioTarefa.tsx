'use client';

import { useState } from 'react';
import type { Dia } from './tipos';
import { diaDeHoje, dias } from './datas';

type FormularioTarefaProps = {
  onAdicionar: (texto: string, dia: Dia, hora: string) => void;
};

export function FormularioTarefa({ onAdicionar }: FormularioTarefaProps) {
  const [texto, setTexto] = useState('');
  const [hora, setHora] = useState('14:00');
  const [dia, setDia] = useState<Dia>(diaDeHoje());

  function enviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const limpo = texto.trim();
    if (limpo === '') return;

    onAdicionar(limpo, dia, hora || '14:00');
    setTexto('');
  }

  return (
    <form onSubmit={enviar} className='flex flex-col gap-2'>
      <input
        type='text'
        value={texto}
        onChange={(event) => setTexto(event.currentTarget.value)}
        placeholder='Nova tarefa'
        aria-label='Nova tarefa'
        className='w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-stone-800 outline-none placeholder:text-stone-400 focus:border-[#1e3a54]'
      />
      <div className='flex flex-col gap-2 sm:flex-row'>
        <input
          type='time'
          value={hora}
          onChange={(event) => setHora(event.currentTarget.value)}
          aria-label='Horário'
          className='w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-stone-700 outline-none focus:border-[#1e3a54] sm:max-w-36'
        />
        <select
          value={dia}
          onChange={(event) => setDia(event.currentTarget.value as Dia)}
          aria-label='Dia da semana'
          className='w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-stone-700 outline-none focus:border-[#1e3a54] sm:max-w-48'
        >
          {dias.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>
        <button
          type='submit'
          className='cursor-pointer rounded-md bg-[#1e3a54] px-5 py-2.5 font-medium text-white hover:bg-[#163044]'
        >
          Adicionar
        </button>
      </div>
    </form>
  );
}
