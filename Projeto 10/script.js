// Ativo o modo 'restrito' do JavaScript para evitar erros comuns.
'use strict';

// --- SELEÇÃO DE ELEMENTOS ---
// Primeiro, pego todos os elementos do HTML que vou precisar manipular.
// Guardo eles em constantes pra usar depois.
const form = document.querySelector('#new-task-form');
const taskInput = document.querySelector('#task-input');
const tasksContainer = document.querySelector('#tasks-container');

// --- LÓGICA PRINCIPAL ---

// Crio o "chefe" que fica de olho no formulário. Ele espera pelo evento 'submit'.
form.addEventListener('submit', function(event) {
    // Essa é a linha MÁGICA. Impede que o formulário recarregue a página, que é o comportamento padrão.
    event.preventDefault();

    // Pego o texto que o usuário digitou no campo.
    const taskText = taskInput.value;

    // Faço uma verificação pra não adicionar tarefas vazias.
    // O .trim() tira os espaços do começo e do fim.
    if (taskText.trim() === '') {
        alert("Por favor, digite uma tarefa antes de adicionar.");
        return; // O 'return' para a execução da função aqui.
    }

    // Chamo minha "fábrica" de tarefas pra construir o elemento HTML.
    const taskElement = createTaskElement(taskText);

    // Pego a tarefa pronta (o <li>) e "colo" ela na minha lista na tela.
    tasksContainer.appendChild(taskElement);

    // Limpo o campo de input pra poder digitar a próxima tarefa.
    taskInput.value = '';
});

// Crio o "vigia" da lista. Ele fica de olho em QUALQUER clique que aconteça dentro da lista.
// Isso é mais eficiente do que colocar um "vigia" em cada botão. (Delegação de Eventos)
tasksContainer.addEventListener('click', function(event) {
    // Descubro qual elemento EXATO foi clicado.
    const clickedElement = event.target;

    // Verifico se o que cliquei foi um botão de deletar.
    if (clickedElement.classList.contains('delete-btn')) {
        // Se foi, eu preciso achar o `<li>` que é o "pai" desse botão.
        const taskItem = clickedElement.closest('.task-item');
        // E simplesmente removo ele da página.
        taskItem.remove();
    } 
    // Se não foi o botão de deletar, verifico se foi o texto da tarefa.
    else if (clickedElement.classList.contains('text')) {
        // Se foi, acho o `<li>` que é o "pai" desse texto.
        const taskItem = clickedElement.closest('.task-item');
        // Uso o .toggle() como um interruptor. Se a classe 'completed' não existe, ele adiciona. Se existe, ele remove.
        taskItem.classList.toggle('completed');
    }
});


// --- FUNÇÕES AUXILIARES ---

// Minha "fábrica" de HTML. Recebe um texto e devolve um `<li>` prontinho.
function createTaskElement(taskText) {
    // 1. Crio o elemento <li>
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item'); // Dou a ele a classe do CSS.

    // 2. Crio o <span> pro texto
    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('text');
    taskTextElement.innerText = taskText; // Coloco o texto da tarefa aqui.

    // 3. Crio a <div> para os botões
    const taskActions = document.createElement('div');
    taskActions.classList.add('actions');

    // 4. Crio o botão de "Excluir"
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerText = 'Excluir';

    // 5. Agora eu monto o quebra-cabeça, colocando um dentro do outro.
    taskActions.appendChild(deleteButton); // Botão vai dentro da div de ações.
    taskItem.appendChild(taskTextElement);   // O span do texto vai dentro do li.
    taskItem.appendChild(taskActions);       // A div de ações vai dentro do li.

    // 6. Devolvo o <li> montado.
    return taskItem;
}