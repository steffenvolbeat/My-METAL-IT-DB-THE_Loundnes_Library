// =============================EXAMPLE-1: TABLE - Section =====================
/* Research: function btnTable(tableId) {
   Hole das Tabellen-Element anhand der übergebenen ID
  const table = document.getElementById(tableId);
  if (!table) return;
  
  Finde den nächstgelegenen übergeordneten Container mit der Klasse "table-box"
  const container = table.closest('.table-box');
  if (!container) return;
  
  Toggle die Klasse "expanded" auf dem Container
  container.classList.toggle('expanded');
  
  Optional: Button-Text anpassen
  const btn = document.querySelector(`button[onclick="btnTable('${tableId}')"]`);
  if (btn) {
    if (container.classList.contains('expanded')) {
      btn.textContent = 'Hide Table';
    } else {
      btn.textContent = 'Show Table';
    }
  }
}*/
//

// ============================================================================
// Button E-Learnbook"HTML, CSS, JS, Java, Python " (Verlinkungung auf das "E-LearnBook")
// ============================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Button "E-LearnBook HTM"
  const btnElearnHtm = document.getElementById("btn-elearn-htm");
  if (btnElearnHtm) {
    btnElearnHtm.addEventListener("click", function () {
      console.log("E-LearnBook HTM Button wurde geclickt");
      window.location.href =
        "/E-LearnBook-HTM-CSS-JS-React/HTML/index-learn.html";
    });
  } /*else {
    console.error('Button mit ID "btn-elearn-htm" wurde nicht gefunden.');
  }*/

  // 2) Button "E-LearnBook CSS"
  const btnElearnCss = document.getElementById("btn-elearn-css");
  if (btnElearnCss) {
    btnElearnCss.addEventListener("click", function () {
      // Direkt zur "learn-style.css"
      window.location.href =
        "/E-LearnBook-HTM-CSS-JS-React/CSS/learn-style.css";
    });
  }

  // 3) Button "E-LearnBook JS"
  const btnElearnJs = document.getElementById("btn-learn-js");
  if (btnElearnJs) {
    btnElearnJs.addEventListener("click", function () {
      // Direkt zu "script-js.js":
      window.location.href = "/E-LearnBook-HTM-CSS-JS-React/JS/script-learn.js";
    });
  }
  
  // 4) Button "learn-java"
  // 5) Button "learn-python.py"
  // 6) Button "learn-react"
  
  // Weitere Buttons ... (analog prüfen)
});

/*Note-0: Versteckter Button Closed ===="btnTable"==
 */
// Button Table "btnTable"
//===================================================================================

//

// Idea: Tabelle "<table> id="tableId"" ========================================

function btnTable(tableId) {
  // Hole das Tabellen-Element anhand der übergebenen ID
  const table = document.getElementById(tableId);
  if (!table) return;

  // Klone die Tabelle (damit im Modal der volle Inhalt angezeigt wird)
  const tableClone = table.cloneNode(true);

  // Finde das Modal und den Bereich für den Inhalt
  const modal = document.getElementById("tableModal");
  const modalContent = modal.querySelector(".modal-content");

  // Leere den Modal-Inhalt und füge die geklonte Tabelle ein
  modalContent.innerHTML = "";
  modalContent.appendChild(tableClone);

  // Blende das Modal ein
  modal.style.display = "block";
}

function closeTableModal() {
  const modal = document.getElementById("tableModal");
  modal.style.display = "none";
}

// ===================================================================================
/* Note-: Search Field */
// Search Field

document.addEventListener("DOMContentLoaded", function () {
  // Selektiere alle Container mit Tabellen
  const tableBoxes = document.querySelectorAll(".table-box");

  tableBoxes.forEach((box) => {
    // Erstelle das Suchfeld
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Suche in Tabelle...";
    searchInput.classList.add("section-search");

    // Füge das Suchfeld als erstes Element im Container ein
    box.insertBefore(searchInput, box.firstChild);

    // Füge eine Event-Listener-Funktion hinzu, die bei jeder Eingabe die Tabellenzeilen filtert
    searchInput.addEventListener("input", function () {
      const filterText = searchInput.value.toLowerCase();
      // Selektiere alle Zeilen im Tabellenkörper der Tabelle in diesem Container
      const rows = box.querySelectorAll("table tbody tr");

      rows.forEach((row) => {
        // Zeige Zeilen, die den Suchbegriff enthalten, ansonsten verstecke sie
        if (row.textContent.toLowerCase().includes(filterText)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
});
// ====================================================================================

/* Note-:  -------------- Button Media Event   ---------------------------
 */

// Event-Listener für alle Buttons "Metal-IT Songs & Videos"
// ================================================================
document.querySelectorAll(".openSongsVideos").forEach((button) => {
  button.addEventListener("click", function () {
    window.open(
      "/HTML-Pages/metal-it-songs-video.html",
      "_blank",
      "width=800,height=600"
    );
    function showLanguages() {
      const container = document.getElementById("languages-list");
      container.innerHTML = "";

      programmingLanguages.forEach((lang) => {
        const langDiv = document.createElement("div");
        langDiv.classList.add("language-item");
        langDiv.innerHTML = `
        <h3>${lang.name}</h3>
        <p><strong>Task:</strong> ${lang.task}</p>
        <p><strong>Bedeutung:</strong> ${lang.meaning}</p>
        <p><strong>Beispiel:</strong> ${lang.example}</p>
      `;
        container.appendChild(langDiv);
      });
    } // Könnte keinen Abschluss benötigen ";= Abschluss"
  });
});

// ======================== EXAMPLE-5: DATENBANK ===================================

/*Note-: Datenbank*/

const programmingLanguages = [
  {
    name: "HTML",
    task: "Strukturierung von Webinhalten",
    meaning: "HyperText Markup Language",
    example: "<h1>Hello World</h1>",
  },
  {
    name: "CSS",
    task: "Design und Layout von Webseiten",
    meaning: "Cascading Style Sheets",
    example: "body { background-color: black; }",
  },
  {
    name: "JavaScript",
    task: "Interaktive und dynamische Webinhalte",
    meaning: "Skriptsprache für Browser & Server (Node.js)",
    example: "console.log('Hello World');",
  },
  // Weitere Einträge ...
];
// ===================================================================================
