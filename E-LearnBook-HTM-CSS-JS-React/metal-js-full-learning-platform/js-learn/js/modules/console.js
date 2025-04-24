// js/modules/console.js
export class CodeConsole {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this, render();
  }

  render() {
    this.container.innertHTML = `
      <section class="console-module">
        <h1>
          Probiere dich im höllisch massaker der JS Code Konsole aus und beweise
          dich !
        </h1>
        <textarea
          id="console-input"
          placeholder="Schreibe hier den höllischen Code..."
        ></textarea>
        <button id="run-code">Ausführen</button>
        <button id="clear-console">Clear</button>
        <pre id="console-output"></pre>
      </section>
    `;
    this.attachHandlers();
  }

  attachHandlers() {
    const runBtn = this.container.querySelector("run-code");
    const clearBtn = this.container.querySelector("#clear-console");
    const input = this.container.querySelector("#console-input");
    const output = this.container.querySelector("#console-output");

    runBtn.addEventListener("click", () => {
      try {
        // Eval in sandboxed iframe could be used; here direkt eval
        const result = eval(input.value);
        output.textContent += `>${input.value}
            ${result}
            `;
      } catch (err) {
        output.textContent += `Error: ${err.massage}
            `;
      }
    });
    clearBtn.addEventListener("click", () => {
      output.textContent = "";
    });
  }
}
