// js/sections/beginner.js
export function sectionInit() {
  const container = document.getElementById("content");
  container.innerHTML = `
      <section>
      <h1>🧠 JavaScript Grundlagen</h1>
      <article>
        <h2>Was ist JavaScript?</h2>
        <p>JavaScript ist eine Skriptsprache, die Webseiten Leben einhaucht. Du kannst mit ihr Inhalte dynamisch ändern, Nutzerinteraktion ermöglichen und APIs ansprechen.</p>
      </article>
      <article>
        <h2>Variablen & Datentypen</h2>
        <pre><code>// Deklaration mit let, const
let user = "Metalhead";
const year = 2025;
let isDark = true; // Boolean
let skills = ["JS", "HTML", "CSS"];
let profile = { name: "Dev", level: 1 };</code></pre>
      </article>

      <article>
        <h2>Operatoren & Ausdrücke</h2>
        <pre><code>// Rechnen & Vergleichen
let xp = 100 + 50;
let bonus = xp > 120 ? "Level Up" : "Keep Going";</code></pre>
      </article>
      <article>
        <h2>Funktionen & Scopes</h2>
        <pre><code>// Standardfunktion
function greet(name) {
  return Willkommen, ${name}!;          
}

// Arrow Function
const add = (a, b) => a + b;</code></pre>
      </article>
      <article>
        <h2>Kontrollstrukturen (if, switch)</h2>
        <pre><code>if (xp >= 150) {
  console.log("🔥 Highscore!");
} else {
  console.log("Train harder!");
}</code></pre>
      </article>

      <article>
        <h2>Schleifen (for, while, forEach)</h2>
        <pre><code>for (let i = 0; i < 3; i++) {
  console.log("Bang your head!", i);
}

let index = 0;
while (index < 2) {
  console.log("Keep banging!");
  index++;
}</code></pre>
      </article>
      <article>
        <h2>Arrays & Objekte</h2>
        <pre><code>// Array-Methoden
skills.push("React");
skills.forEach(skill => console.log(skill));

// Objektzugriff
console.log(profile.name);
profile.level++;</code></pre>
      </article>
      <article>
        <h2>DOM-Manipulation</h2>
        <pre><code>// Element erstellen und anhängen
const msg = document.createElement("p");
msg.textContent = "Metal regiert das Web!";
document.body.appendChild(msg);</code></pre>
      </article>
      <article>
        <h2>Events & Event Listener</h2>
        <pre><code>document.addEventListener("click", () => {
  console.log("🤘 Klick erkannt!");
});</code></pre>
      </article>
      <article>
        <h2>Moderne Features (ES6+)</h2>
        <pre><code>// Destructuring
const { name, level } = profile;

// Template Literals

console.log(Name: ${name}; Level: ${level});   

// Spread Operator
const newSkills = [...skills, "Node.js"];</code></pre>

<h2>Was ist JavaScript?</h2>
        <p>JavaScript ist eine Skriptsprache, die Webseiten Leben einhaucht. Du kannst mit ihr Inhalte dynamisch ändern, Nutzerinteraktion ermöglichen und APIs ansprechen.</p>
      </article>
      <article>
        <h2>Variablen & Datentypen</h2>
        <pre><code>// Deklaration mit let, const
let user = "Metalhead";
const year = 2025;
let isDark = true; // Boolean
let skills = ["JS", "HTML", "CSS"];
let profile = { name: "Dev", level: 1 };</code></pre>
      </article>
      <article>
        <h2>Operatoren & Ausdrücke</h2>
        <pre><code>// Rechnen & Vergleichen
let xp = 100 + 50;
let bonus = xp > 120 ? "Level Up" : "Keep Going";</code></pre>
      </article>
      <article>
        <h2>Funktionen & Scopes</h2>
        <pre><code>// Standardfunktion
function greet(name) {
  return Willkommen, ${name}!;                  

// Arrow Function
const add = (a, b) => a + b;</code></pre>
      </article>
      <article>
        <h2>Kontrollstrukturen (if, switch)</h2>
        <pre><code>if (xp >= 150) {
  console.log("🔥 Highscore!");
} else {
  console.log("Train harder!");
}</code></pre>
      </article>
      <article>
        <h2>Schleifen (for, while, forEach)</h2>
        <pre><code>for (let i = 0; i < 3; i++) {
  console.log("Bang your head!", i);
}

let index = 0;
while (index < 2) {
  console.log("Keep banging!");
  index++;
}</code></pre>
      </article>
      <article>
        <h2>Arrays & Objekte</h2>
        <pre><code>// Array-Methoden
skills.push("React");
skills.forEach(skill => console.log(skill));

// Objektzugriff
console.log(profile.name);
profile.level++;</code></pre>
      </article>
      <article>
        <h2>DOM-Manipulation</h2>
        <pre><code>// Element erstellen und anhängen
const msg = document.createElement("p");
msg.textContent = "Metal regiert das Web!";
document.body.appendChild(msg);</code></pre>
      </article>
      <article>
        <h2>Events & Event Listener</h2>
        <pre><code>document.addEventListener("click", () => {
  console.log("🤘 Klick erkannt!");
});</code></pre>
      </article>
      <article>
        <h2>Moderne Features (ES6+)</h2>
        <pre><code>// Destructuring
const { name, level } = profile;

// Template Literals
console.log(Name: ${name}, Level: ${level});           

// Spread Operator
const newSkills = [...skills, "Node.js"];</code></pre>
      </article>
      <article>
        <h2>Fetch & API</h2>
        <pre><code>// API Call mit Fetch
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fehler:', error));</code></pre>
      </article>
      <article>
        <h2>Promises</h2>
        <pre><code>function getXP() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(100), 1000);
  });
}

getXP().then(xp => console.log("XP erhalten:", xp));</code></pre>
      </article>
      <article>
        <h2>Async / Await</h2>
        <pre><code>async function loadData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }
}

loadData();</code></pre>
      </article>
      <article>
        <h2>Closures</h2>
        <pre><code>function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  }
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>
      </article>
      <article>
        <h2>Execution Context & Call Stack</h2>
        <pre><code>function a() {
  console.log("a aufgerufen");
  b();
}

function b() {
  console.log("b aufgerufen");
}

a();
// Call Stack: a -> b -> zurück</code></pre>
      </article>
      <article>
        <h2>Event Loop</h2>
        <pre><code>console.log("Start");

setTimeout(() => {
  console.log("Timeout Callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise Callback");
});

console.log("Ende");
// Reihenfolge: Start → Ende → Promise → Timeout</code></pre>

     <h2>Modul-System</h2>
        <pre><code>// Modul Export/Import
export function sayHello() {
  console.log("Hello Metal World");
}

// In anderer Datei
import { sayHello } from './module.js';
sayHello();</code></pre>
      </article>
      <article>
        <h2>Error Handling & Debugging</h2>
        <pre><code>try {
  throw new Error("Etwas ist schiefgelaufen!");
} catch (err) {
  console.error(err.message);
} finally {
  console.log("Fehlerbehandlung abgeschlossen");
}</code></pre>
      </article>
      <article>
        <h2>this-Kontext</h2>                       
        <pre><code>const hero = {
  name: "Metalhead",
  shout() {
    console.log(this.name + " schreit!");
  }
};
hero.shout();</code></pre>
      </article>
      <article>
        <h2>Klassen</h2>
        <pre><code>class Monster {
  constructor(name) {
    this.name = name;
  }

  roar() {
    console.log(this.name + " ROAAAAAR!");
  }
}

const beast = new Monster("Behemoth");
beast.roar();</code></pre>
      </article>
      <article>
        <h2>Events im Detail</h2>
        <pre><code>document.addEventListener("keydown", event => {
  console.log("Taste gedrückt:", event.key);
});

const btn = document.querySelector("button");
btn.addEventListener("mouseenter", () => {
  btn.style.background = "purple";
});</code></pre>
      </article>
      <article>
        <h2>Speicher & Garbage Collection</h2>
        <pre><code>let ref = { name: "Dämon" };
let alias = ref;
ref = null;
// 'alias' hält die Referenz, also wird Objekt nicht gelöscht</code></pre>
      </article>
      <article>
        <h2>Design Patterns & Best Practices</h2>
        <pre><code>// Singleton Pattern
const Settings = (() => {
  let instance;
  function create() {
    return { volume: 11 };
  }
  return {
    getInstance() {
      if (!instance) instance = create();
      return instance;
    }
  };
})();
const s1 = Settings.getInstance();</code></pre>
      </article>
    </section
    `;
}
