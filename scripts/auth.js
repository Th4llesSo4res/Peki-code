const api = 'http://localhost:8080/auth';

async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  if (!email || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  const res = await fetch(`${api}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const result = await res.text();

  if (res.ok && result.startsWith("Token gerado: ")) {
    const token = result.replace("Token gerado: ", "").trim();
    localStorage.setItem("token", token);
    alert("Login realizado com sucesso!");
    window.location.href = "home.html"; // redireciona após login
  } else {
    alert("Credenciais inválidas.");
  }
}

async function register() {
  const username = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!username || !email || !password || !confirmarSenha) {
    alert("Preencha todos os campos.");
    return;
  }

  if (password !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const res = await fetch(`${api}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  if (res.ok) {
    alert('Usuário cadastrado com sucesso!');
    window.location.href = 'index.html';
  } else {
    alert('Erro ao cadastrar usuário.');
  }
  function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  console.log(email, password);

  login(email, password);
}

}
