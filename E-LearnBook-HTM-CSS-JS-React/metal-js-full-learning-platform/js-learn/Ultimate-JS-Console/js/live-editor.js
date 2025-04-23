// Elemente holen
const openEditorBtn = document.getElementById("open-live-editor");
const modal = document.getElementById("live-editor-modal");
const closeModal = document.getElementById("close-modal");

// Tab-Elemente
const tabLinks = document.querySelectorAll(".tablinks");
const editorTabs = document.querySelectorAll(".editor-tab");

// Ursprüngliche Textareas für Fallback (werden von CodeMirror ersetzt)
const textHTML = document.getElementById("code-html");
const textCSS = document.getElementById("code-css");
const textJS = document.getElementById("code-js");

const codeOutput = document.getElementById("code-output");
const consoleOutput = document.getElementById("console-output");

// Steuerungsbuttons
const saveBtn = document.getElementById("save-code");
const clearBtn = document.getElementById("clear-code");
const resetBtn = document.getElementById("reset-code");
const toggleTheme = document.getElementById("toggle-theme");

// Audio-Feedback
const metalAudio = document.getElementById("metal-audio");

// CodeMirror-Editor-Instanzen (werden später initialisiert)
let editorHTML, editorCSS, editorJS;

// Funktion zum Initialisieren der CodeMirror-Editoren
function initEditors() {
  editorHTML = CodeMirror.fromTextArea(textHTML, {
    mode: "htmlmixed",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    viewportMargin: Infinity,
  });
  editorCSS = CodeMirror.fromTextArea(textCSS, {
    mode: "css",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    viewportMargin: Infinity,
  });
  editorJS = CodeMirror.fromTextArea(textJS, {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    viewportMargin: Infinity,
  });
}

// Theme-Wechsel: Rotiert zwischen den angegebenen CodeMirror-Themes
const themes = ["dracula", "monokai", "material-darker"];
function switchTheme() {
  // Wähle ein neues Theme für alle Editoren
  let currentTheme = editorHTML.getOption("theme");
  let nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
  let nextTheme = themes[nextIndex];
  editorHTML.setOption("theme", nextTheme);
  editorCSS.setOption("theme", nextTheme);
  editorJS.setOption("theme", nextTheme);
}

// Modal öffnen und laden
openEditorBtn.addEventListener("click", () => {
  modal.style.display = "block";
  playMetalSound();
  // Falls die Editor-Instanzen noch nicht initialisiert wurden, tue dies jetzt
  if (!editorHTML) {
    initEditors();
    // Füge bei jedem Änderungsevent der Editoren ein Update hinzu
    [editorHTML, editorCSS, editorJS].forEach((editor) =>
      editor.on("change", () => {
        runCode();
        playMetalSound();
      })
    );
  } else {
    // Falls bereits initialisiert, stelle sicher, dass alle Editoren ihre Werte aktualisieren
    editorHTML.refresh();
    editorCSS.refresh();
    editorJS.refresh();
  }
  loadCode();
  runCode();
});

// Modal schließen
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Tab-Wechsel
tabLinks.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    playMetalSound();
    // Alle Tabs deaktivieren
    tabLinks.forEach((t) => t.classList.remove("active"));
    editorTabs.forEach((et) => et.classList.remove("active"));
    // Aktiven Tab setzen
    e.currentTarget.classList.add("active");
    const editorId = "editor-" + e.currentTarget.getAttribute("data-editor");
    document.getElementById(editorId).classList.add("active");
    // Refresh CodeMirror, falls nötig
    if (editorId === "editor-html") editorHTML.refresh();
    if (editorId === "editor-css") editorCSS.refresh();
    if (editorId === "editor-js") editorJS.refresh();
  });
});

// Buttons: Save, Clear, Reset, Theme
saveBtn.addEventListener("click", () => {
  saveCode();
  playMetalSound();
});
clearBtn.addEventListener("click", () => {
  editorHTML.setValue("");
  editorCSS.setValue("");
  editorJS.setValue("");
  runCode();
  playMetalSound();
});
resetBtn.addEventListener("click", () => {
  editorHTML.setValue("<!-- Schreibe deinen HTML-Code hier... -->");
  editorCSS.setValue("/* Schreibe deinen CSS-Code hier... */");
  editorJS.setValue("// Schreibe deinen JS-Code hier...");
  runCode();
  playMetalSound();
});
toggleTheme.addEventListener("click", () => {
  switchTheme();
  playMetalSound();
});

// Funktionen zum Speichern und Laden aus LocalStorage
function saveCode() {
  const metalCode = {
    html: editorHTML.getValue(),
    css: editorCSS.getValue(),
    js: editorJS.getValue(),
  };
  localStorage.setItem("metal-code", JSON.stringify(metalCode));
}
function loadCode() {
  const saved = localStorage.getItem("metal-code");
  if (saved) {
    const metalCode = JSON.parse(saved);
    editorHTML.setValue(metalCode.html);
    editorCSS.setValue(metalCode.css);
    editorJS.setValue(metalCode.js);
  }
}

// Funktion: Code ausführen und Live-Vorschau rendern
function runCode() {
  const userHTML = editorHTML.getValue();
  const userCSS = editorCSS.getValue();
  const userJS = editorJS.getValue();

  const iframeDoc =
    codeOutput.contentDocument || codeOutput.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(`
    <!DOCTYPE html>
    <html lang="de">
      <head>
        <meta charset="UTF-8">
        <title>Live Vorschau</title>
        <style>
          ${userCSS}
        </style>
      </head>
      <body>
        ${userHTML}
        <script>
          // Konsole umleiten
          const oldLog = console.log;
          const oldErr = console.error;
          const oldClear = console.clear;
          parent.document.getElementById("console-output").innerText = "";
          console.log = function(...args) {
            parent.document.getElementById("console-output").innerText += "[LOG] " + args.join(" ") + "\\n";
            oldLog.apply(console, args);
          };
          console.error = function(...args) {
            parent.document.getElementById("console-output").innerText += "[ERROR] " + args.join(" ") + "\\n";
            oldErr.apply(console, args);
          };
          console.clear = function() {
            parent.document.getElementById("console-output").innerText = "";
            oldClear.apply(console);
          };
        <\/script>
        <script>
          try {
            ${userJS}
          } catch(e) {
            console.error(e);
          }
        <\/script>
      </body>
    </html>
  `);
  iframeDoc.close();
}

// Audio-Feedback abspielen
function playMetalSound() {
  metalAudio.currentTime = 0;
  metalAudio.play();
}

// Initiere Split.js für Drag'n'Drop Splitview
window.addEventListener("load", () => {
  Split([".editor-pane", ".output-pane"], {
    sizes: [50, 50],
    minSize: 300,
    gutterSize: 8,
    cursor: "col-resize",
  });
});

/*/ Öffne und schließe den Live-Code-Editor
  document.getElementById("open-live-editor").onclick = () => {
    document.getElementById("live-editor-modal").style.display = "block";
  };
  document.getElementById("close-modal").onclick = () => {
    document.getElementById("live-editor-modal").style.display = "none";
  };
});*/
