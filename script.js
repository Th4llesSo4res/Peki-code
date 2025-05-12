document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!usuario || !senha) {
    alert('Por favor, preencha todos os campos!');
  } else {
    alert(Login realizado com sucesso!\nUsuário: ${usuario});
  }
});

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = taskText;

  li.appendChild(checkbox);
  li.appendChild(span);
  document.getElementById('taskList').appendChild(li);

  input.value = '';
}