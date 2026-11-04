/**
 * Ricardo Nelber — Portfólio
 * JS puro, sem dependências externas.
 * Responsável por: menu mobile, indicador de progresso (trilho)
 * e revelação no scroll. O efeito de hover dos botões e links
 * (preenchimento/inversão de cor, sublinhado) é resolvido
 * inteiramente em CSS — mais previsível e sem custo de JS.
 */
(() => {
  "use strict";

  /* ---------- Armazenamento seguro ---------- */
  const storage = {
    get(key) {
      try { return localStorage.getItem(key); } catch (_) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (_) { /* navegador sem armazenamento */ }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (_) { /* navegador sem armazenamento */ }
    }
  };

  /* ---------- Preferência de tema persistente ---------- */
  const themeKey = "portfolio-tema";
  const savedTheme = storage.get(themeKey) || "escuro";
  document.body.dataset.theme = savedTheme;

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const syncThemeButton = () => {
      const isLight = document.body.dataset.theme === "claro";
      button.setAttribute("aria-pressed", String(isLight));
      button.textContent = isLight ? "Tema escuro" : "Tema claro";
    };

    syncThemeButton();
    button.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "claro" ? "escuro" : "claro";
      document.body.dataset.theme = nextTheme;
      storage.set(themeKey, nextTheme);
      syncThemeButton();
    });
  });

  /* ---------- Ano no rodapé ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.querySelector(".sr-only").textContent = isOpen
        ? "Fechar menu"
        : "Abrir menu";
    });

    primaryNav.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.querySelector(".sr-only").textContent = "Abrir menu";
        navToggle.focus();
      }
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.querySelector(".sr-only").textContent = "Abrir menu";
      });
    });
  }

  /* ---------- Trilho lateral: destaca a seção ativa ---------- */
  const railNodes = document.querySelectorAll("[data-rail]");
  const sections = Array.from(railNodes)
    .map((node) => document.getElementById(node.dataset.rail))
    .filter(Boolean);

  if (railNodes.length && sections.length && "IntersectionObserver" in window) {
    const railObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const node = document.querySelector(
            `[data-rail="${entry.target.id}"]`
          );
          if (!node) return;
          if (entry.isIntersecting) {
            railNodes.forEach((n) => n.classList.remove("is-active"));
            node.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => railObserver.observe(section));
  }

  /* ---------- Revelação suave ao rolar ---------- */
  const revealTargets = document.querySelectorAll(
    ".project-card, .section-head, .stack__cloud, .contato__inner"
  );
  revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Formulário: rascunho, validação e feedback ---------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const draftKey = "portfolio-contato-rascunho";
    const feedback = document.getElementById("formFeedback");
    const clearButton = document.getElementById("clearDraft");
    const fields = Array.from(contactForm.querySelectorAll("input, select, textarea"));

    const fieldMessage = (field) => {
      if (field.required && !field.value.trim()) return "Este campo é obrigatório.";
      if (field.minLength > 0 && field.value.trim().length < field.minLength && field.value.length) return `Digite pelo menos ${field.minLength} caracteres.`;
      if (field.validity.valueMissing) return "Este campo é obrigatório.";
      if (field.validity.typeMismatch) return "Informe um endereço de e-mail válido.";
      if (field.validity.tooShort) return `Digite pelo menos ${field.minLength} caracteres.`;
      return "";
    };

    const validateField = (field) => {
      const message = fieldMessage(field);
      const error = document.getElementById(`erro-${field.id}`);
      field.setAttribute("aria-invalid", String(Boolean(message)));
      if (error) error.textContent = message;
      return !message;
    };

    const saveDraft = () => {
      const draft = Object.fromEntries(fields.map((field) => [field.name, field.value]));
      storage.set(draftKey, JSON.stringify(draft));
      feedback.textContent = "Rascunho salvo neste navegador.";
    };

    const rawDraft = storage.get(draftKey);
    if (rawDraft) {
      try {
        const draft = JSON.parse(rawDraft);
        fields.forEach((field) => {
          if (typeof draft[field.name] === "string") field.value = draft[field.name];
        });
        feedback.textContent = "Rascunho anterior restaurado.";
      } catch (_) {
        storage.remove(draftKey);
      }
    }

    fields.forEach((field) => {
      field.addEventListener("input", () => {
        validateField(field);
        saveDraft();
      });
      field.addEventListener("blur", () => validateField(field));
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const results = fields.filter((field) => field.required).map(validateField);
      if (results.includes(false)) {
        feedback.textContent = "Revise os campos destacados antes de continuar.";
        contactForm.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }

      storage.remove(draftKey);
      contactForm.reset();
      fields.forEach((field) => field.removeAttribute("aria-invalid"));
      feedback.textContent = "Mensagem validada com sucesso. Demonstração concluída sem envio externo.";
    });

    clearButton?.addEventListener("click", () => {
      contactForm.reset();
      storage.remove(draftKey);
      fields.forEach((field) => {
        field.removeAttribute("aria-invalid");
        const error = document.getElementById(`erro-${field.id}`);
        if (error) error.textContent = "";
      });
      feedback.textContent = "Rascunho removido.";
    });
  }
})();
