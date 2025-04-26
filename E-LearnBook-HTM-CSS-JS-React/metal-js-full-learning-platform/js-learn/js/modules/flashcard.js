// js/modules/flashcard.js
export class Flashcard {
  constructor(jsonUrl, containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.current = 0;
    fetch(jsonUrl)
      .then((r) => r.json())
      .then((data) => {
        this.cards = data.cards;
        this.render();
      });
  }

  render() {
    const { front, back } = this.cards[this.current];
    this.container.innerHTML = `
      <section class="flashcard-module">
        <div class="card-container">
          <div class="card-face front">
            <p>${front}</p>
          </div>
          <div class="card-face back">
            <p>${back}</p>
          </div>
        </div>
        <div class="controls">
          <button id="prev-card">← Prev</button>
          <button id="flip-card">Flip</button>
          <button id="next-card">Next →</button>
        </div>
      </section>
    `;
    this.attachHandlers();
  }

  attachHandlers() {
    // Flip-Button toggles 'flipped' class on card-container
    this.container.querySelector("#flip-card").addEventListener("click", () => {
      const container = this.container.querySelector(".card-container");
      container.classList.toggle("flipped");
    });

    // Next-Button
    this.container.querySelector("#next-card").addEventListener("click", () => {
      this.current = (this.current + 1) % this.cards.length;
      // Reset flip state
      this.container
        .querySelector(".card-container")
        .classList.remove("flipped");
      this.render();
    });

    // Prev-Button
    this.container.querySelector("#prev-card").addEventListener("click", () => {
      this.current = (this.current - 1 + this.cards.length) % this.cards.length;
      this.container
        .querySelector(".card-container")
        .classList.remove("flipped");
      this.render();
    });
  }
}
