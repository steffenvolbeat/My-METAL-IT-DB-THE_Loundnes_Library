// js/modules/console.js
export class CodeConsole {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.render();
  }
  render() {
    this.el.innerHTML = `
      <section class="console-module">
        <h2>JS Console</h2>
        <textarea id="console-input" placeholder="JS-Code…"></textarea>
        <button id="run">Ausführen</button>
        <button id="clear">Clear</button>
        <pre id="console-output"></pre>
      </section>`;
    this.attach();
  }
  attach() {
    const run = this.el.querySelector("#run");
    const clr = this.el.querySelector("#clear");
    const inp = this.el.querySelector("#console-input");
    const out = this.el.querySelector("#console-output");
    run.onclick = () => {
      try {
        out.textContent += ">" + eval(inp.value) + "\n";
      } catch (e) {
        out.textContent += "Error:" + e.message + "\n";
      }
    };
    clr.onclick = () => {
      out.textContent = "";
    };
  }
}
