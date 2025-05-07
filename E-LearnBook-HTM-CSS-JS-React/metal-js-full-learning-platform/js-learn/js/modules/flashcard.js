// js/modules/flashcard.js
export class Flashcard {
  constructor(url, sel) {
    this.container = document.querySelector(sel);
    this.idx = 0;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw r;
        return r.json();
      })
      .then((data) => {
        this.cards = data.cards;
        this.render();
      })
      .catch((e) => {
        this.container.innerHTML = `<p style="color:red;">${e}</p>`;
      });
  }

  render() {
    const c = this.cards[this.idx];
    this.container.innerHTML = `
      <div class="flashcard"><div class="card-inner">
        <div class="card-front">${c.question}</div>
        <div class="card-back">${c.answer}</div>
      </div></div>`;
    const inner = this.container.querySelector(".card-inner");
    inner.onclick = () => inner.classList.toggle("flipped");
    document.getElementById("next-card").onclick = () => {
      this.idx = (this.idx + 1) % this.cards.length;
      this.render();
    };
    document.getElementById("prev-card").onclick = () => {
      this.idx = (this.idx - 1 + this.cards.length) % this.cards.length;
      this.render();
    };
    document.getElementById("flip-card").onclick = () =>
      inner.classList.toggle("flipped");
  }
}
