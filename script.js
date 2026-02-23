// ================================
// TEMA CLARO / ESCURO (localStorage)
// ================================
const themeBtn = document.querySelector("#themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "🌙";
  } else {
    document.body.classList.remove("dark");
    if (themeBtn) themeBtn.textContent = "☀️";
  }
}

function loadTheme() {
  const saved = localStorage.getItem("edutech_theme");
  if (saved) {
    applyTheme(saved);
  } else {
    applyTheme("light");
  }
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("edutech_theme", newTheme);
    applyTheme(newTheme);
  });
}

loadTheme();


// ================================
// FORMULÁRIO + VALIDAÇÃO
// ================================
const form = document.querySelector("#enrollForm");

// Inputs
const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const telefone = document.querySelector("#telefone");
const cpf = document.querySelector("#cpf");
const curso = document.querySelector("#curso");
const cep = document.querySelector("#cep");
const rua = document.querySelector("#rua");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");

// Erros
const errNome = document.querySelector("#errNome");
const errEmail = document.querySelector("#errEmail");
const errTelefone = document.querySelector("#errTelefone");
const errCpf = document.querySelector("#errCpf");
const errCurso = document.querySelector("#errCurso");
const errCep = document.querySelector("#errCep");
const errRua = document.querySelector("#errRua");
const errBairro = document.querySelector("#errBairro");
const errCidade = document.querySelector("#errCidade");
const errEstado = document.querySelector("#errEstado");

function setError(elSmall, msg) {
  if (!elSmall) return;
  elSmall.textContent = msg;
}

function clearErrors() {
  setError(errNome, "");
  setError(errEmail, "");
  setError(errTelefone, "");
  setError(errCpf, "");
  setError(errCurso, "");
  setError(errCep, "");
  setError(errRua, "");
  setError(errBairro, "");
  setError(errCidade, "");
  setError(errEstado, "");
}

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

function isCPFValid(value) {
  // Para a prova: validação simples (11 dígitos)
  // (Se quiser eu coloco validação real do CPF também)
  const digits = onlyDigits(value);
  return digits.length === 11;
}

function isCEPValid(value) {
  const digits = onlyDigits(value);
  return digits.length === 8;
}

function validateForm() {
  let ok = true;
  clearErrors();

  if (!nome.value.trim()) {
    setError(errNome, "Por favor, preencha o nome completo.");
    ok = false;
  }

  if (!isEmailValid(email.value.trim())) {
    setError(errEmail, "Informe um e-mail válido.");
    ok = false;
  }

  if (!telefone.value.trim()) {
    setError(errTelefone, "Informe o número de telefone.");
    ok = false;
  }

  if (!isCPFValid(cpf.value.trim())) {
    setError(errCpf, "Informe o CPF corretamente.");
    ok = false;
  }

  if (!curso.value) {
    setError(errCurso, "Selecione um curso.");
    ok = false;
  }

  if (!isCEPValid(cep.value.trim())) {
    setError(errCep, "Informe o CEP corretamente.");
    ok = false;
  }

  if (!rua.value.trim()) {
    setError(errRua, "Informe a rua.");
    ok = false;
  }

  if (!bairro.value.trim()) {
    setError(errBairro, "Informe o bairro.");
    ok = false;
  }

  if (!cidade.value.trim()) {
    setError(errCidade, "Informe a cidade.");
    ok = false;
  }

  if (!estado.value.trim()) {
    setError(errEstado, "Informe o estado.");
    ok = false;
  }

  return ok;
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("✅ Matrícula enviada com sucesso! Em breve entraremos em contato.");
      form.reset();
      clearErrors();
    }
  });
}


// ================================
// VIA CEP (Preenchimento Automático)
// ================================
async function buscarEnderecoPorCEP(cepValue) {
  const digits = onlyDigits(cepValue);

  if (digits.length !== 8) return;

  try {
    const url = `https://viacep.com.br/ws/${digits}/json/`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.erro) {
      setError(errCep, "Informe o CEP corretamente.");
      return;
    }

    // Preenche
    rua.value = data.logradouro || "";
    bairro.value = data.bairro || "";
    cidade.value = data.localidade || "";
    estado.value = data.uf || "";

  } catch (error) {
    setError(errCep, "Informe o CEP corretamente.");
  }
}

if (cep) {
  // Ao sair do campo CEP
  cep.addEventListener("blur", () => {
    buscarEnderecoPorCEP(cep.value);
  });

  // Ajuda: formata para aceitar só números
  cep.addEventListener("input", () => {
    cep.value = onlyDigits(cep.value);
  });
}

if (cpf) {
  cpf.addEventListener("input", () => {
    cpf.value = onlyDigits(cpf.value);
  });
}

if (telefone) {
  telefone.addEventListener("input", () => {
    // permite números e símbolos básicos, mas evita letras
    telefone.value = telefone.value.replace(/[^\d()\-\s+]/g, "");
  });
}
