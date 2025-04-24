// js/modules/quiz.js
export class Quiz {
  constructor(jsonUrl, containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.currentIndex = 0;
    this.score = 0;
    fetch(jsonUrl)
      .then((r) => r.json())
      .then((data) => this.setup(data.questions));
  }

  setup(questions) {
    this.questions = questions;
    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    this.container.innerHTML = `
      <article class="quiz-item">
        <h2>Frage ${this.currentIndex + 1} von ${this.questions.length}</h2>
        <p class="quiz-question">${q.question}</p>
        <ol class="quiz-options">
          ${q.options
            .map(
              (opt, i) => `<li><button data-index="${i}">${opt}</button></li>`
            )
            .join("")}
        </ol>
      </article>
    `;
    this.attachOptionHandlers();
  }

  attachOptionHandlers() {
    this.container.querySelectorAll(".quiz-options button").forEach((btn) => {
      btn.addEventListener("click", (e) => this.checkAnswer(e));
    });
  }

  checkAnswer(event) {
    const selected = Number(event.currentTarget.dataset.index);
    const correct = this.questions[this.currentIndex].answer;
    const feedback = document.createElement("div");
    feedback.className = selected === correct ? "correct" : "incorrect";
    feedback.textContent =
      selected === correct
        ? "Richtig!"
        : `Falsch! Richtige Antwort: ${
            this.questions[this.currentIndex].options[correct]
          }`;
    this.container.appendChild(feedback);

    // Punkte vergeben
    if (selected === correct) this.score++;

    // Nächste Frage nach kurzer Pause
    setTimeout(() => {
      this.currentIndex++;
      if (this.currentIndex < this.questions.length) {
        this.renderQuestion();
      } else {
        this.showResult();
      }
    }, 1500);
  }

  showResult() {
    this.container.innerHTML = `
      <section class="quiz-result">
        <h2>Quiz abgeschlossen!</h2>
        <p>Du hast ${this.score} von ${this.questions.length} Punkten erreicht.</p>
        <button id="retry-quiz">Nochmal versuchen</button>
      </section>
    `;
    document.getElementById("retry-quiz").addEventListener("click", () => {
      this.currentIndex = 0;
      this.score = 0;
      this.renderQuestion();
    });
  }
}
