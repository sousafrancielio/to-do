'use client';

import { useEffect, useState } from 'react';
import { Filtros } from '@/components/Filtros';
import { FormularioTarefa } from '@/components/FormularioTarefa';
import { ListaTarefas } from '@/components/ListaTarefas';
import { Resumo } from '@/components/Resumo';
import { Semana } from '@/components/Semana';
import { diaValido, horaValida, tarefasIniciais, textoDaSemana, textoDeHoje } from '@/components/datas';
import type { Dia, Filtro, Tarefa } from '@/components/tipos';

function lerTarefasSalvas(): Tarefa[] {
  const salvas = localStorage.getItem('rotina-semana-v3');
  if (!salvas) return tarefasIniciais;

  try {
    const dados = JSON.parse(salvas);
    if (!Array.isArray(dados)) return [];

    return dados.filter((item) => {
      return (
        item &&
        typeof item.id === 'number' &&
        typeof item.texto === 'string' &&
        horaValida(item.hora) &&
        typeof item.concluida === 'boolean' &&
        diaValido(item.dia)
      );
    });
  } catch {
    return [];
  }
}

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [carregou, setCarregou] = useState(false);

  useEffect(() => {
    setTarefas(lerTarefasSalvas());
    setCarregou(true);
  }, []);

  useEffect(() => {
    if (!carregou) return;
    localStorage.setItem('rotina-semana-v3', JSON.stringify(tarefas));
  }, [tarefas, carregou]);

  function adicionarTarefa(texto: string, dia: Dia, hora: string) {
    const maiorId = tarefas.reduce((maior, tarefa) => {
      return tarefa.id > maior ? tarefa.id : maior;
    }, 0);

    const nova: Tarefa = {
      id: maiorId + 1,
      texto,
      hora,
      dia,
      concluida: false,
    };

    setTarefas([...tarefas, nova]);
  }

  function alternarTarefa(id: number) {
    const atualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }

      return tarefa;
    });

    setTarefas(atualizadas);
  }

  function excluirTarefa(id: number) {
    const restantes = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(restantes);
  }

  function mudarFiltro(novo: Filtro) {
    setFiltro(novo);
  }

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === 'pendentes') {
      return tarefa.concluida === false;
    }

    if (filtro === 'concluidas') {
      return tarefa.concluida === true;
    }

    return true;
  });

  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = tarefas.length - concluidas;

  if (!carregou) {
    return (
      <main className='flex min-h-screen items-center justify-center'>
        <p className='text-sm text-stone-500'>Carregando...</p>
      </main>
    );
  }

  return (
    <main className='min-h-screen px-4 py-8 sm:px-6 sm:py-10'>
      <div className='mx-auto w-full max-w-5xl'>
        <section className='rounded-2xl border border-stone-200 bg-white p-5 sm:p-7'>
          <div>
            <p className='text-sm text-stone-500'>{textoDeHoje()}</p>
            <h1 className='fonte-titulo mt-1 text-4xl text-[#1e3a54]'>Minhas tarefas</h1>
            <p className='mt-1 text-sm text-stone-500'>{textoDaSemana()}</p>
          </div>

          <div className='mt-6'>
            <Resumo total={tarefas.length} pendentes={pendentes} concluidas={concluidas} />
          </div>

          <div className='mt-6'>
            <FormularioTarefa onAdicionar={adicionarTarefa} />
          </div>

          <div className='mt-4'>
            <Filtros
              filtro={filtro}
              onMudar={mudarFiltro}
              contagem={{ todas: tarefas.length, pendentes, concluidas }}
            />
          </div>
        </section>

        <div className='mt-4'>
          <Semana tarefas={tarefas} />
        </div>

        <div className='mt-4'>
          <ListaTarefas
            tarefas={tarefasVisiveis}
            filtro={filtro}
            onAlternar={alternarTarefa}
            onExcluir={excluirTarefa}
          />
        </div>
      </div>
    </main>
  );
}
