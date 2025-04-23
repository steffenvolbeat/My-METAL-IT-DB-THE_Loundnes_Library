// Warte, bis der DOM vollständig geladen ist, bevor der Code ausgeführt wird.
document.addEventListener("DOMContentLoaded", function () {
  // ========================
  // Globale DOM-Elemente abrufen
  // ========================
  // Video-Element für lokale Videos (wird eingeblendet, wenn kein YouTube-Video aktiv ist)
  const videoPlayer = document.getElementById("videoPlayer");
  // <source>-Element innerhalb des Video-Elements (wird gesetzt, wenn ein lokales Video abgespielt wird)
  const videoSource = document.getElementById("videoSource");
  // Container, in den der YouTube-Player (IFrame) geladen wird
  const youtubeContainer = document.getElementById("youtubePlayerContainer");
  // Button, um zum nächsten Video in der Playlist zu wechseln
  const nextButton = document.getElementById("nextTrack");
  // Button, um ein zufälliges Video aus der Playlist abzuspielen
  const randomButton = document.getElementById("randomPlay");
  // Container, in dem die dynamisch erzeugte Playlist angezeigt wird
  const videoPlaylist = document.getElementById("videoPlaylist");
  // Das Loginmodal, das als Overlay angezeigt wird
  const loginModal = document.getElementById("loginModal");
  // Der Login-Button im Loginmodal, der die Eingaben überprüft
  const loginBtn = document.getElementById("loginBtn");
  // Button zum Aktivieren des Tons, falls das Video stummgeschaltet ist
  const enableSoundBtn = document.getElementById("enableSound");

  // ========================
  // Globale Variablen
  // ========================
  // Speichert den Index des aktuell abgespielten Videos aus der Playlist
  let currentVideoIndex = 0;
  // Variable für den YouTube-Player; wird per YouTube IFrame API erstellt, wenn ein YouTube-Video geladen wird
  let ytPlayer = null;

  // ========================
  // Playlist-Array: Enthält Objekte mit Video-URLs und Titeln.
  // Es können sowohl YouTube-Videos als auch lokale Videos enthalten sein.
  // ========================
  const videoFiles = [
    { src: "https://www.youtube.com/watch?v=9YICpjeGsbE", title: "Disturbed - I Will Not Break" },
    { src: "https://www.youtube.com/watch?v=jMlSvuFTC3k", title: "Ramstein Giftig" },
    { src: "assets/videos/AC⧸DC - Thunderstruck (Official Video).mp4", title: "Thunderstruck" },
    { src: "assets/videos/video2.mp4", title: "Video 2" },
    { src: "assets/videos/video3.mp4", title: "Video 3" },
    { src: "https://www.youtube.com/watch?v=EbHGS_bVkXY", title: "Ramstein" },
    { src: "https://www.youtube.com/watch?v=Tf4M3adcYpY&t=1862s", title: "Volbeat (Let's Boogie! Live)" },
    { src: "https://www.youtube.com/watch?v=cgLUopx9q68", title: "Weimar • Hexenjagd" },
    { src: "https://www.youtube.com/watch?v=3Sor0oQ44EI&list=RDMM&index=12", title: "Weimar • Manifest" },
    { src: "https://www.youtube.com/watch?v=Gns8PVcF-8Y", title: "Volbeat - In the Barn..." },
    { src: "https://www.youtube.com/watch?v=UTUPgEse6_A&list=RDGMEMJQXQAmqrnmK1SEjY_rKBGA&index=1", title: "Volbeat - By a Monster’s Hand" },
    // Weitere Einträge können hier ergänzt werden…
  ];

  // ========================
  // Hilfsfunktion: Extrahiert die YouTube Video-ID aus einer URL
  // Nutzt einen regulären Ausdruck, der verschiedene YouTube-URL-Formate abdeckt.
  // ========================
  function extractYouTubeID(url) {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?\/\s]+)/;
    const match = url.match(regExp);
    // Gibt die gefundene Video-ID zurück oder null, falls keine ID gefunden wurde.
    return (match && match[1]) ? match[1] : null;
  }

  // ========================
  // Funktion: Aktualisiert die Videoquelle basierend auf dem aktuellen Index.
  // ========================
  function updateVideoSource() {
    // Hole die URL des aktuellen Videos aus dem Array.
    const currentVideo = videoFiles[currentVideoIndex].src;
    // Überprüfung, ob es sich um einen YouTube-Link handelt.
    if (currentVideo.includes("youtube.com") || currentVideo.includes("youtu.be")) {
      // Wenn es ein YouTube-Video ist:
      // 1. Blende das lokale Videoelement aus.
      videoPlayer.style.display = "none";
      // 2. Zeige den Container für den YouTube-Player an.
      youtubeContainer.style.display = "block";
      // 3. Extrahiere die Video-ID aus der URL.
      const videoId = extractYouTubeID(currentVideo);
      if (!videoId) return console.error("Kein gültiger YouTube-Link:", currentVideo);
      // 4. Wenn der YouTube-Player bereits existiert, lägt das neue Video.
      if (ytPlayer) {
        ytPlayer.loadVideoById(videoId);
      } else {
        // Andernfalls erstelle einen neuen YouTube-Player.
        ytPlayer = new YT.Player("youtubePlayerContainer", {
          height: "400",   // Höhe des YouTube-Players
          width: "100%",   // Breite des YouTube-Players
          videoId: videoId, // Die extrahierte Video-ID
          // Spieler-Parameter (playerVars) definieren, wie das Video abgespielt werden soll.
          playerVars: { autoplay: 1, mute: 1, controls: 1, modestbranding: 1, rel: 0 },
          // Event-Handler für den YouTube-Player:
          events: {
            onReady: onPlayerReady,           // Wird aufgerufen, wenn der Player bereit ist.
            onStateChange: onPlayerStateChange  // Wird aufgerufen, wenn sich der Zustand des Players ändert (z.B. Video endet).
          }
        });
      }
    } else {
      // Wenn es sich um ein lokales Video handelt:
      // 1. Blende den YouTube-Container aus.
      youtubeContainer.style.display = "none";
      // 2. Falls ein YouTube-Player existiert, zerstöre ihn, um Ressourcen freizugeben.
      if (ytPlayer) {
        ytPlayer.destroy();
        ytPlayer = null;
      }
      // 3. Zeige das lokale Videoelement an.
      videoPlayer.style.display = "block";
      // 4. Setze die Quelle des lokalen Videos.
      videoSource.src = currentVideo;
      // 5. Lade und starte das Video.
      videoPlayer.load();
      videoPlayer.play();
    }
  }

  // ========================
  // Event-Callback "target": Wird aufgerufen, wenn der YouTube-Player bereit ist.
  // ========================
  function onPlayerReady(event) {
    // Starten eines Videos, sobald der Player bereit ist.
    event.target.playVideo();
  }

  // ========================
  // Event-Callback: Wird aufgerufen, wenn sich der Zustand des YouTube-Players ändert.
  // Zum Beispiel: Wenn das Video endet, rufe die nextVideo()-Funktion auf.
  // ========================
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      nextVideo();
    }
  }

  // ========================
  // Funktion: Nächstes Video in der Playlist abspielen.
  // Erhöht den Index und aktualisiert die Videoquelle.
  // ========================
  function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
    updateVideoSource();
  }

  // ========================
  // Funktion: Spielt ein zufälliges Video aus der Playlist.
  // ========================
  function randomVideo() {
    currentVideoIndex = Math.floor(Math.random() * videoFiles.length);
    updateVideoSource();
  }

  // ========================
  // Funktion: Baut die Playlist im DOM auf.
  // Fügt jedem einzelen Video wein <li>-Element hinzu, das beim Klicken das entsprechende Video lädt.
  // ========================
  function loadPlaylist() {
    videoPlaylist.innerHTML = ""; // Leere den Playlist-Container.
    videoFiles.forEach((file, index) => {
      const li = document.createElement("li");
      li.textContent = file.title;
      // Beim Klicken wird der Index aktualisiert und updateVideoSource() aufgerufen.
      li.addEventListener("click", () => {
        currentVideoIndex = index;
        updateVideoSource();
      });
      videoPlaylist.appendChild(li);
    });
  }
  // Playlist initial laden
  loadPlaylist();

  // ========================
  // Event-Listener für die Steuerungsknöpfe
  // ========================
  nextButton.addEventListener("click", nextVideo);
  randomButton.addEventListener("click", randomVideo);

  // Ein Button, um den Ton zu aktivieren: Schaltet Stummschaltung ab (lokales Video oder YouTube)
  enableSoundBtn.addEventListener("click", () => {
    if (videoPlayer.style.display !== "none") {
      videoPlayer.muted = false;
      videoPlayer.play();
    } else if (youtubeContainer.style.display !== "none" && ytPlayer) {
      ytPlayer.unMute();
    }
  });

  // ========================
  // Login-Button-Event: Überprüft die eingegebenen Zugangsdaten.
  // Bei einen erfolgreichem Login wird das Loginmodal ausgeblendet und der Loginstatus in sessionStorage gespeichert.
  // ========================
  loginBtn.addEventListener("click", () => {
    // Holt die eingegebenen Werte aus den Input-Feldern.
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Überprüfe die Zugangsdaten (hier fest "admin"/"1234")
    if (username === "admin" && password === "1234") {
      alert("Login erfolgreich!");
      // Speichert den Loginstatus in sessionStorage
      sessionStorage.setItem("loggedIn", "true");
      // Blendt das Loginmodal aus
      loginModal.classList.remove("show");
      // Fügt nach einer kurzen Verzögerung die Klasse "hidden" hinzu
      setTimeout(() => loginModal.classList.add("hidden"), 500);
    } else {
      alert("Falsche Zugangsdaten!");
    }
  });

  // ========================
  // YouTube IFrame API laden:
  //  Funktion fügt asynchron das Script-Element der YouTube IFrame API in den DOM ein.
  // ========================
  function loadYouTubeAPI() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  loadYouTubeAPI();

  // Initialisiert die Videoquelle (startet das erste Video)
  updateVideoSource();

  // Fügt optional eine Animation zum Player-Container hinzu 
  const playerContainer = document.getElementById("player-container");
  setTimeout(() => playerContainer.classList.add("animate"), 500);
  
  // ========================
  // Loginmodal sofort sichtbar machen 
  // Entfernt das "hidden" und füge "show" hinzu, sodass das Modal beim Laden sichtbar ist.
  // ========================
  loginModal.classList.remove("hidden");
  loginModal.classList.add("show");
});

// ========================
// Funktion für Steuerung der Sidebar
// Funktion öffnet die Sidebar nur, wenn der Benutzer eingeloggt ist.
// ========================
function toggleSidebar() {
  if (!sessionStorage.getItem("loggedIn")) {
    alert("Bitte logge dich zuerst ein!");
    return;
  }
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}
