// js/modules/flashcard.js
export class Flashcard {
  constructor(dataUrl, containerSelector) {
    this.dataUrl = dataUrl;
    this.container = document.querySelector(containerSelector);
    this.cards = [];
    this.currentIndex = 0;
    this.loadData();
  }

  async loadData() {
    try {
      const res = await fetch(this.dataUrl);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      // Hier holen wir das eigentliche Array
      this.cards = data.cards;
      this.render();
    } catch (err) {
      console.error("Fehler beim Laden der Flashcards:", err);
      this.container.innerHTML = `<p style="color: #f44336;">Fehler beim Laden der Daten.</p>`;
    }
  }

  render() {
    if (!Array.isArray(this.cards) || this.cards.length === 0) {
      this.container.innerHTML = `<p>Keine Flashcards gefunden.</p>`;
      return;
    }

    const { question, answer } = this.cards[this.currentIndex];
    this.container.innerHTML = `
      <div class="flashcard-box">
        <div class="flashcard">
          <div class="card-inner">
            <div class="card-front">${question}</div>
            <div class="card-back">${answer}</div>
          </div>
        </div>
        <div class="flashcard-controls">
          <button id="prev-card">⏮️ Zurück</button>
          <button id="flip-card">🔀 Flip</button>
          <button id="next-card">⏭️ Weiter</button>
        </div>
      </div>
    `;

    this.attachControls();
  }

  attachControls() {
    const box = this.container.querySelector(".flashcard-box");
    const inner = box.querySelector(".card-inner");
    const btnPrev = box.querySelector("#prev-card");
    const btnFlip = box.querySelector("#flip-card");
    const btnNext = box.querySelector("#next-card");

    // Flip via Klick auf Karte oder Flip-Button
    inner.addEventListener("click", () => inner.classList.toggle("flipped"));
    btnFlip.addEventListener("click", () => inner.classList.toggle("flipped"));

    // Zurück
    btnPrev.addEventListener("click", () => {
      this.currentIndex =
        (this.currentIndex - 1 + this.cards.length) % this.cards.length;
      inner.classList.remove("flipped");
      this.render();
    });

    // Weiter
    btnNext.addEventListener("click", () => {
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
      inner.classList.remove("flipped");
      this.render();
    });
  }
}
