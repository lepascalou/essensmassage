const menuToggle = document.getElementById("main-nav-a"),
  navLinks = menuToggle.querySelectorAll(".nav-item"),
  bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: !1 });
navLinks.forEach((l) => {
  l.addEventListener("click", () => {
    window.innerWidth < 768 && bsCollapse.toggle();
  });
});
const nav = document.getElementById("main-nav");
(window.addEventListener("scroll", () => {
  window.scrollY > 0
    ? (nav.style.display = "block")
    : (nav.style.display = "none");
}),
  0 === window.scrollY && (nav.style.display = "none"));
