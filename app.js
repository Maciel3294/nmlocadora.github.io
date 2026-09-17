const menu = document.getElementById("menu");
const nav = document.getElementById("mainNav");
menu?.addEventListener("click", () => nav.classList.toggle("open"));
nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const lightbox = document.getElementById("lightbox");
const img = document.getElementById("lightboxImg");
const caption = document.getElementById("lightboxCaption");
let gallery = [];
let current = 0;

function renderGallery(){
  if(!gallery.length) return;
  img.src = gallery[current];
  caption.textContent = `${current + 1} de ${gallery.length}`;
}
function openGallery(images, title){
  gallery = images;
  current = 0;
  img.alt = title;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  renderGallery();
}
function closeGallery(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
}
document.querySelectorAll(".gallery").forEach(el => {
  el.addEventListener("click", () => openGallery(el.dataset.images.split("|"), el.dataset.gallery));
});
document.getElementById("lightboxClose").addEventListener("click", closeGallery);
document.getElementById("prev").addEventListener("click", () => { current = (current - 1 + gallery.length) % gallery.length; renderGallery(); });
document.getElementById("next").addEventListener("click", () => { current = (current + 1) % gallery.length; renderGallery(); });
lightbox.addEventListener("click", e => { if(e.target === lightbox) closeGallery(); });
document.addEventListener("keydown", e => {
  if(!lightbox.classList.contains("open")) return;
  if(e.key === "Escape") closeGallery();
  if(e.key === "ArrowLeft") document.getElementById("prev").click();
  if(e.key === "ArrowRight") document.getElementById("next").click();
});

document.querySelectorAll("[data-e]").forEach(link => {
  link.addEventListener("click", () => {
    const sel = document.getElementById("sel");
    if(sel) sel.value = link.dataset.e;
  });
});

document.getElementById("form")?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const text =
`Olá, vim pelo site da NM Locadora e gostaria de solicitar um orçamento.

Nome: ${data.get("nome")}
Empresa: ${data.get("empresa") || "-"}
Telefone/WhatsApp: ${data.get("telefone")}
E-mail: ${data.get("email") || "-"}
Equipamento: ${data.get("equipamento") || "-"}
Período: ${data.get("periodo") || "-"}
Obra / mensagem: ${data.get("mensagem") || "-"}`;
  window.open("https://wa.me/551123828562?text=" + encodeURIComponent(text), "_blank");
});
