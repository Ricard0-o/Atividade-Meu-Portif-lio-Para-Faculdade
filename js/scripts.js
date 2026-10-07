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
})();
