// js/modules/quiz.js
export class Quiz {
  constructor(jsonUrl, containerSel) {
    this.container = document.querySelector(containerSel);
    this.idx = 0;
    this.score = 0;

    fetch(jsonUrl)
      .then((r) => {
        if (!r.ok)
          throw new Error(`HTTP ${r.status} beim Laden von ${jsonUrl}`);
        return r.json();
      })
      .then((data) => {
        this.questions = data.questions;
        this.render();
      })
      .catch((err) => {
        this.container.innerHTML = `<p style="color: red;">Fehler: ${err.message}</p>`;
      });
  }

  render() {
    const q = this.questions[this.idx];
    this.container.innerHTML = `
      <article class="quiz-item">
        <h2>Frage ${this.idx + 1} / ${this.questions.length}</h2>
        <p class="quiz-question">${q.question}</p>
        <ul class="quiz-options">
          ${q.options
            .map(
              (opt, i) => `
            <li><button data-i="${i}">${opt}</button></li>
          `
            )
            .join("")}
        </ul>
      </article>
    `;
    this.attach();
  }

  attach() {
    this.container
      .querySelectorAll("button")
      .forEach((btn) => btn.addEventListener("click", (e) => this.check(e)));
  }

  check(e) {
    const sel = +e.currentTarget.dataset.i;
    const corr = this.questions[this.idx].answer;
    const feedback = document.createElement("div");
    feedback.className = sel === corr ? "correct" : "incorrect";
    feedback.textContent =
      sel === corr
        ? "👍 Richtig!"
        : `❌ Falsch! Richtig wäre: ${this.questions[this.idx].options[corr]}`;
    this.container.appendChild(feedback);
    if (sel === corr) this.score++;

    setTimeout(() => {
      this.idx++;
      if (this.idx < this.questions.length) this.render();
      else this.finish();
    }, 1000);
  }

  finish() {
    // Ergebnis‑Anzeige aktivieren
    const aside = document.getElementById("quiz-result");
    aside.hidden = false;
    this.container.innerHTML = `
      <section class="quiz-result">
        <h2>Quiz abgeschlossen!</h2>
        <p id="quiz-score">${this.score} von ${this.questions.length} richtig</p>
        <button id="restart-button">Nochmal</button>
      </section>
    `;
    document.getElementById("restart-button").addEventListener("click", () => {
      this.idx = 0;
      this.score = 0;
      aside.hidden = true;
      this.render();
    });
  }
}
