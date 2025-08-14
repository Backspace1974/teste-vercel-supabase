import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase usando as variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Componente da Página Principal
// Usamos 'async' para poder usar 'await' e buscar dados no servidor antes de renderizar a página
export default async function HomePage() {
  
  // Busca os dados da tabela 'tarefas'
  const { data: tarefas, error } = await supabase.from('tarefas').select('*');

  // Exibe uma mensagem de erro se a busca falhar
  if (error) {
    return <p>Ocorreu um erro ao buscar as tarefas: {error.message}</p>;
  }

  // Exibe uma mensagem se não houver tarefas
  if (!tarefas || tarefas.length === 0) {
    return <p>Nenhuma tarefa encontrada.</p>;
  }

  // Renderiza a página com os dados
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Teste de Conexão Vercel + Supabase</h1>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">Lista de Tarefas do Banco de Dados:</h2>
        <ul className="list-disc list-inside space-y-2">
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className="text-lg">
              {tarefa.nome_da_tarefa}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

// Revalidação a cada 60 segundos para buscar novos dados sem precisar de um novo deploy
export const revalidate = 60;