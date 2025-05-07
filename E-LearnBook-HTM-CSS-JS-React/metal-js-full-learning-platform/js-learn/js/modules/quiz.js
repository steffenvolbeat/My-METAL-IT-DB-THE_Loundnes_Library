export class Quiz {
  /**
   * @param {string} jsonUrl URL zur JSON-Datei (relativ zu index.html)
   * @param {string} containerSel CSS-Selector für das Quiz-Container-Element
   * @param {string} resultAsideSel CSS-Selector für das <aside> mit der Ergebnis-Box
   */
  constructor(jsonUrl, containerSel, resultAsideSel) {
    this.container = document.querySelector(containerSel);
    this.resultAside = document.querySelector(resultAsideSel);
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
        this.container.innerHTML = `<p style="color:red;">Fehler: ${err.message}</p>`;
        console.error(err);
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
            .map((opt, i) => `<li><button data-i="${i}">${opt}</button></li>`)
            .join("")}
        </ul>
      </article>
    `;
    this.attachHandlers();
  }

  attachHandlers() {
    this.container
      .querySelectorAll("button")
      .forEach((btn) =>
        btn.addEventListener("click", (e) => this.checkAnswer(e))
      );
  }

  checkAnswer(e) {
    const selected = +e.currentTarget.dataset.i;
    const correct = this.questions[this.idx].answer;

    const fb = document.createElement("div");
    fb.className = selected === correct ? "correct" : "incorrect";
    fb.textContent =
      selected === correct
        ? "👍 Richtig!"
        : `❌ Falsch! Richtig wäre: ${
            this.questions[this.idx].options[correct]
          }`;
    this.container.appendChild(fb);

    if (selected === correct) this.score++;

    setTimeout(() => {
      this.idx++;
      if (this.idx < this.questions.length) {
        this.render();
      } else {
        this.finish();
      }
    }, 1000);
  }

  finish() {
    // Ergebnis-Box anzeigen
    this.resultAside.hidden = false;
    this.container.innerHTML = `
      <section class="quiz-result">
        <h2>Quiz abgeschlossen!</h2>
        <p id="quiz-score">${this.score} / ${this.questions.length} richtig</p>
        <button id="restart-button" class="metal-btn">Nochmal</button>
      </section>
    `;
    document.getElementById("restart-button").addEventListener("click", () => {
      this.idx = 0;
      this.score = 0;
      this.resultAside.hidden = true;
      this.render();
    });
  }
}
