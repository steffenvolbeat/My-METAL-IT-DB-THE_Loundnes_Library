// main.js
// SPA Navigation
const links = document.querySelectorAll('.metal-nav .menu li a');
const pages = document.querySelectorAll('.page');
links.forEach(l=>l.onclick=e=>{
  e.preventDefault(); links.forEach(x=>x.classList.remove('active')); l.classList.add('active');
  pages.forEach(p=>p.id===l.dataset.page? p.classList.add('active'):p.classList.remove('active'));
});
// Parallax
window.addEventListener('scroll',()=>{
  document.querySelector('.metal-header').style.backgroundPositionY = window.scrollY*0.7+'px';
});
document.addEventListener("DOMContentLoaded", () => {
  // Navigation (SPA)
  const menuLinks = document.querySelectorAll(".metal-nav .menu li a");
  const pages = document.querySelectorAll(".page");

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      menuLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const pageId = link.getAttribute("data-page");
      pages.forEach((page) => {
        page.classList.toggle("active", page.id === pageId);
      });
    });
  });

  // Weitere Funktionen wie Parallax-Scrolling
  document.addEventListener("scroll", () => {
    const header = document.querySelector(".metal-header");
    let offset = window.pageYOffset;
    header.style.backgroundPositionY = offset * 0.7 + "px";
  });

  // Klickevents für das Öffnen/Schließen des Live-Code-Editors werden in live-editor.js geregelt
  const openEditorBtn = document.getElementById("open-live-editor");
  const modal = document.getElementById("live-editor-modal");
  const closeModal = document.getElementById("close-modal");

  openEditorBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
