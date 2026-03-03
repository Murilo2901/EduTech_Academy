document.addEventListener("DOMContentLoaded", () => {
  // === TEMA CLARO/ESCURO ===
  const themeToggleBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if(themeToggleBtn) themeToggleBtn.textContent = "☀️";
  }

  if(themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
          let theme = document.documentElement.getAttribute("data-theme");
          if (theme === "dark") {
              document.documentElement.removeAttribute("data-theme");
              localStorage.setItem("theme", "light");
              themeToggleBtn.textContent = "🌙";
          } else {
              document.documentElement.setAttribute("data-theme", "dark");
              localStorage.setItem("theme", "dark");
              themeToggleBtn.textContent = "☀️";
          }
      });
  }

  // === API VIACEP ===
  const cepInput = document.getElementById("cep");
  if (cepInput) {
      cepInput.addEventListener("blur", async (e) => {
          let cep = e.target.value.replace(/\D/g, '');
          if (cep.length === 8) {
              try {
                  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                  const data = await response.json();
                  
                  if (!data.erro) {
                      document.getElementById("rua").value = data.logradouro;
                      document.getElementById("bairro").value = data.bairro;
                      document.getElementById("cidade").value = data.localidade;
                      document.getElementById("estado").value = data.uf;
                  } else {
                      showError("cep", "Informe o CEP corretamente.");
                  }
              } catch (error) {
                  console.error("Erro ao buscar CEP:", error);
              }
          }
      });
  }

  // === VALIDAÇÃO DE FORMULÁRIO ===
  const form = document.getElementById("matricula-form");
  
  if (form) {
      form.addEventListener("submit", (e) => {
          e.preventDefault();
          let isValid = true;

          // Limpa erros anteriores
          document.querySelectorAll(".error-msg").forEach(el => el.style.display = "none");

          // Validações
          if (!document.getElementById("nome").value.trim()) {
              showError("nome", "Por favor, preencha o nome completo.");
              isValid = false;
          }

          const email = document.getElementById("email").value.trim();
          if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
              showError("email", "Informe um e-mail válido.");
              isValid = false;
          }

          if (!document.getElementById("telefone").value.trim()) {
              showError("telefone", "Informe o número de telefone.");
              isValid = false;
          }

          if (!document.getElementById("cpf").value.trim()) {
              showError("cpf", "Informe o CPF corretamente.");
              isValid = false;
          }

          if (document.getElementById("curso").value === "") {
              showError("curso", "Selecione um curso.");
              isValid = false;
          }

          if (!document.getElementById("cep").value.trim()) {
              showError("cep", "Informe o CEP corretamente.");
              isValid = false;
          }

          if (!document.getElementById("rua").value.trim()) {
              showError("rua", "Informe a rua.");
              isValid = false;
          }

          if (!document.getElementById("bairro").value.trim()) {
              showError("bairro", "Informe o bairro.");
              isValid = false;
          }

          if (!document.getElementById("cidade").value.trim()) {
              showError("cidade", "Informe a cidade.");
              isValid = false;
          }

          if (!document.getElementById("estado").value.trim()) {
              showError("estado", "Informe o estado.");
              isValid = false;
          }

          if (isValid) {
              alert("Matrícula enviada com sucesso!");
              form.reset();
          }
      });
  }

  function showError(fieldId, message) {
      const errorEl = document.getElementById(`${fieldId}-error`);
      if (errorEl) {
          errorEl.textContent = `🔴 ${message}`;
          errorEl.style.display = "block";
      }
  }
});