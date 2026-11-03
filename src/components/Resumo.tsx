type ResumoProps = {
  total: number;
  pendentes: number;
  concluidas: number;
};

export function Resumo({ total, pendentes, concluidas }: ResumoProps) {
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  return (
    <div>
      <div className='grid grid-cols-3 gap-2'>
        <div className='rounded-lg bg-[#eef3f8] px-3 py-3 text-center'>
          <p className='text-2xl font-semibold text-[#1e3a54]'>{total}</p>
          <p className='mt-0.5 text-xs text-stone-500'>cadastradas</p>
        </div>
        <div className='rounded-lg bg-[#f8f1e8] px-3 py-3 text-center'>
          <p className='text-2xl font-semibold text-[#9a5b1c]'>{pendentes}</p>
          <p className='mt-0.5 text-xs text-stone-500'>pendentes</p>
        </div>
        <div className='rounded-lg bg-[#e8f2ec] px-3 py-3 text-center'>
          <p className='text-2xl font-semibold text-[#2f6b4f]'>{concluidas}</p>
          <p className='mt-0.5 text-xs text-stone-500'>concluídas</p>
        </div>
      </div>

      <div className='mt-4'>
        <div className='mb-1 flex justify-between text-xs text-stone-500'>
          <span>da semana</span>
          <span>{porcentagem}%</span>
        </div>
        <div className='h-1.5 overflow-hidden rounded-full bg-stone-200'>
          <div
            className='h-full rounded-full bg-[#1e3a54]'
            style={{ width: `${porcentagem}%` }}
          />
        </div>
      </div>
    </div>
  );
}
