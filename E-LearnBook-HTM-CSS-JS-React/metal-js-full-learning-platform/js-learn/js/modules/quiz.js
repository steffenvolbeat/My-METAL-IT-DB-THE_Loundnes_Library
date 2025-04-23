export class Quiz {
    constructor(jsonUrl, container) {
      this.container = container;
      fetch(jsonUrl)
        .then(r => r.json())
        .then(data => this.setup(data));
    }
  
    setup(data) {
      this.questions = data.questions;
      this.renderQuestion();
    }
  
    renderQuestion() {
      // semantische <article> mit <h2>, <ol><li><button>...
    }
  
    checkAnswer() {
      // Feedback geben, Punktestand verwalten
    }
  }