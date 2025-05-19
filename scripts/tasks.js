const token = localStorage.getItem('token');
let tasks = [];

async function loadTasks() {
  const res = await fetch('http://localhost:8080/tasks', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    alert('Erro ao carregar tarefas.');
    return;
  }

  tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(lista) {
  const container = document.getElementById('taskList');
  container.innerHTML = '';

  lista.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task-item';
    div.innerHTML = `
      <p><strong>${task.title}</strong> - ${task.completed ? '✅' : '❌'}</p>
      <div class="task-actions">
        <button onclick="completeTask(${task.id})">Concluir</button>
        <button class="delete" onclick="deleteTask(${task.id})">Excluir</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function addTask() {
  const title = document.getElementById('newTask').value.trim();
  if (!title) return alert('Digite um título válido.');

  const res = await fetch('http://localhost:8080/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, description: '' })
  });

  if (!res.ok) return alert('Erro ao adicionar tarefa.');

  document.getElementById('newTask').value = '';
  loadTasks();
}

async function completeTask(id) {
  const res = await fetch(`http://localhost:8080/tasks/${id}/complete`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) return alert('Erro ao concluir tarefa.');
  loadTasks();
}

async function deleteTask(id) {
  const res = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) return alert('Erro ao excluir tarefa.');
  loadTasks();
}

function filterTasks() {
  const filter = document.getElementById('filter').value;
  let filtered = tasks;

  if (filter === 'completed') {
    filtered = tasks.filter(t => t.completed);
  } else if (filter === 'pending') {
    filtered = tasks.filter(t => !t.completed);
  }

  renderTasks(filtered);
}

function sortTasks() {
  const sort = document.getElementById('sort').value;
  const sorted = [...tasks].sort((a, b) => {
    if (sort === 'asc') return a.title.localeCompare(b.title);
    return b.title.localeCompare(a.title);
  });

  renderTasks(sorted);
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

loadTasks();
