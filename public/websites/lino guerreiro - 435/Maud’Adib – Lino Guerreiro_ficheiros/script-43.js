(function () {

  function initInfoHover() {
    const wrapper = document.getElementById("app-info-hover");
    if (!wrapper) return;

    /* ============================================================
       DESKTOP — hover real
    ============================================================ */
    wrapper.addEventListener("mouseenter", () => {
      wrapper.classList.add("open");
    });

    wrapper.addEventListener("mouseleave", () => {
      wrapper.classList.remove("open");
    });

    /* ============================================================
       MOBILE — tap abre / tap fora fecha
    ============================================================ */
    wrapper.addEventListener("touchstart", (e) => {
      e.stopPropagation();
      wrapper.classList.toggle("open");
    });

    document.addEventListener("touchstart", (e) => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove("open");
      }
    });

    /* ============================================================
       ACESSIBILIDADE — ESC fecha
    ============================================================ */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        wrapper.classList.remove("open");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInfoHover, { once: true });
  } else {
    initInfoHover();
  }

})();
