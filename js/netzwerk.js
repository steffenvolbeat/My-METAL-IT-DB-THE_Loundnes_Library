function showInfo(tropic) {
  const modal = document.getElementById("infoModal");
  const modalText = document.getElementById("modalText");

  if (tropic === "netwerk") {
    modalText.innerText = "Ausfühliche Info zu Netzwerken ...";
  } else if (tropic === "ip") {
    modalText.innerText = "Ausführung Info zu IP-Adressen ...";
  }
  // Weieter Themen

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("infoModal").style.display = "none";
}
