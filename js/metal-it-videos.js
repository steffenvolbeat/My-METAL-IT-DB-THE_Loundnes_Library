// Array, das alle Videoobjekte enthält. Jedes Objekt besitzt eine Quell-URL (src) und einen Titel (title)
const videoFiles = [
  { src: "https://www.youtube.com/watch?v=Tf4M3adcYpY&t=1862s", title: "Volbeat (Let's Boogie! Live from Telia Parken)" },
  { src: "https://www.youtube.com/watch?v=cgLUopx9q68", title: "Weimar • Hexenjagd" },
  { src: "https://www.youtube.com/watch?v=3Sor0oQ44EI&list=RDMM&index=12", title: "Weimar • Manifest" },
  { src: "https://www.youtube.com/watch?v=Gns8PVcF-8Y", title: "Volbeat - In the Barn of the Goat Giving Birth to Satan’s Spawn in a Dying World of Doom" },
  { src: "https://www.youtube.com/watch?v=UTUPgEse6_A&list=RDGMEMJQXQAmqrnmK1SEjY_rKBGA&index=1", title: "Volbeat - By a Monster’s Hand" },
  { src: "https://www.youtube.com/watch?v=7iNbnineUCI&list=RDGMEMJQXQAmqrnmK1SEjY_rKBGA&index=2", title: "The Offspring - The Kids Aren't Alright" },
  { src: "https://www.youtube.com/watch?v=5abamRO41fE", title: "Slipknot - Psychosocial" },
  { src: "https://www.youtube.com/watch?v=9gsAz6S_zSw&list=RDGMEMJQXQAmqrnmK1SEjY_rKBGA&index=11", title: "Slipknot - Dead Memories" },
  { src: "https://www.youtube.com/watch?v=VRPxao3e_jY", title: "Korn - Right Now" },
  { src: "https://www.youtube.com/watch?v=1M4ADcMn3dA&list=RDMM&index=5", title: "Rammstein - Keine Lust" },
  { src: "https://www.youtube.com/watch?v=GukNjYQZW8s", title: "Rammstein - Haifisch " },
  { src: "https://www.youtube.com/watch?v=ql9-82oV2JE&list=RDMM&index=4", title: "The Offspring - You're Gonna Go Far, Kid" },
  { src: "https://www.youtube.com/watch?v=97Mj6pXYMd8", title: "Linkin Park -Up From The Bottom" },
  { src: "https://www.youtube.com/watch?v=SRXH9AbT280&list=RDMM&index=8", title: "Linkin Park The Emptiness Machine" },
  { src: "https://www.youtube.com/watch?v=9YICpjeGsbE&list=RDMM&index=3", title: "My Rock & Metal_Mix " },
  { src: "https://www.youtube.com/watch?v=jMlSvuFTC3k&list=RDMM&index=2", title: "Rammstein - Giftig"},
  // weitere Einträge …
];

// Globaler YouTube-Player (nur für YouTube-Videos)
// Hier wird später die Instanz des YouTube IFrame-Players gespeichert
let ytPlayer = null;

// Variable, die den Index des aktuell abgespielten Videos speichert
let currentVideoIndex = 0;

// DOM-Elemente aus der HTML
const videoPlayer = document.getElementById("videoPlayer");         // Video-Element für lokale Videos
const videoSource = document.getElementById("videoSource");         // <source>-Element innerhalb des Video-Elements
const youtubeContainer = document.getElementById("youtubeContainer"); // Container für den YouTube-IFrame
const videoProgress = document.getElementById("videoProgress");       // Fortschrittsanzeige
const videoPlaylist = document.getElementById("videoPlaylist");       // Playlist-Container

// ---------------------------------------------------------
// Hilfsfunktion: Extrahiert die YouTube Video-ID aus einer URL
// ---------------------------------------------------------
function extractVideoId(url) {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?\/]+)/;
  const match = url.match(regExp);
  return (match && match[1]) ? match[1] : null;
}

// ---------------------------------------------------------
// Funktion zur Aktualisierung der Fortschrittsanzeige
// ---------------------------------------------------------
function updateProgress() {
  if (videoPlayer.duration) {
    const percentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    videoProgress.value = percentage;
  }
}

// ---------------------------------------------------------
// Funktionen zur Navigation in der Playlist
// ---------------------------------------------------------
function nextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
  updateVideoSource();
}

function prevVideo() {
  currentVideoIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
  updateVideoSource();
}

// ---------------------------------------------------------
// Funktion zur Aktualisierung der Videoquelle, abhängig vom aktuellen Video
// ---------------------------------------------------------
function updateVideoSource() {
  const currentVideo = videoFiles[currentVideoIndex].src;

  // Prüfen, ob es sich um einen YouTube-Link handelt
  if (currentVideo.includes("youtube.com") || currentVideo.includes("youtu.be")) {
    // YouTube-Video: Lokales Videoelement ausblenden, YouTube-Container einblenden
    videoPlayer.style.display = "none";
    youtubeContainer.style.display = "block";
    const videoId = extractVideoId(currentVideo);
    if (!videoId) return console.error("Kein gültiger YouTube-Link:", currentVideo);

    // Nutze den bereits initialisierten YouTube-Player, sofern vorhanden
    if (ytPlayer && typeof ytPlayer.loadVideoById === "function") {
      ytPlayer.loadVideoById(videoId);
    } else {
      // Falls der Player noch nicht initialisiert wurde, wird er in onYouTubeIframeAPIReady() erstellt
      console.warn("YouTube-Player ist noch nicht bereit. Bitte warte einen Moment.");
    }
  } else {
    // Lokales Video: YouTube-Container ausblenden, lokales Videoelement anzeigen
    youtubeContainer.style.display = "none";
    youtubeContainer.innerHTML = "";
    videoPlayer.style.display = "block";
    videoSource.src = currentVideo;
    videoPlayer.load();
    videoPlayer.play();
  }
}

// ---------------------------------------------------------
// Funktion zum dynamischen Laden der Playlist in das entsprechende DOM-Element
// ---------------------------------------------------------
function loadPlaylist() {
  videoPlaylist.innerHTML = "";
  videoFiles.forEach((file, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = file.title;
    listItem.onclick = () => {
      currentVideoIndex = index;
      updateVideoSource();
    };
    videoPlaylist.appendChild(listItem);
  });
}

// ---------------------------------------------------------
// Funktion zum Laden und Anzeigen aller Medien (Mediathek-Ansicht)
// ---------------------------------------------------------
function loadMediaDB() {
  mediaList.innerHTML = "";
  videoFiles.forEach(item => {
    const div = document.createElement("div");
    if (item.src.includes("youtube.com") || item.src.includes("youtu.be")) {
      const embedUrl = item.src.replace("watch?v=", "embed/");
      div.innerHTML = `
        <h3 style="color:#ff0066;">${item.title}</h3>
        <iframe width="100%" height="400" src="${embedUrl}" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
      `;
    } else {
      div.innerHTML = `
        <h3 style="color:#ff0066;">${item.title}</h3>
        <video controls width="100%">
          <source src="${item.src}" type="video/mp4">
          Dein Browser unterstützt kein Video-Tag.
        </video>
      `;
    }
    mediaList.appendChild(div);
  });
}

// ---------------------------------------------------------
// Event Listener: Aktualisiert die Fortschrittsanzeige während der Wiedergabe des lokalen Videos
// ---------------------------------------------------------
videoPlayer.addEventListener("timeupdate", updateProgress);

// Initiale Aufrufe: Playlist laden und erstes Video starten
loadPlaylist();
updateVideoSource();

// ---------------------------------------------------------
// Einbindung der YouTube IFrame API
// ---------------------------------------------------------
function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
loadYouTubeAPI();

// ---------------------------------------------------------
// Globale Funktion, die von der YouTube API aufgerufen wird, sobald sie geladen ist
// ---------------------------------------------------------
function onYouTubeIframeAPIReady() {
  // Erstelle den YouTube-Player, wenn ein YouTube-Video das erste Mal geladen wird.
  // Wir initialisieren ihn mit einem leeren VideoId, damit updateVideoSource() später das richtige Video laden kann.
  ytPlayer = new YT.Player("youtubeContainer", {
    height: "400",
    width: "100%",
    videoId: "", // Initial leer – updateVideoSource() lädt das korrekte Video
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0
    },
    events: {
      // Optional: Event-Handler können hier hinzugefügt werden (z.B. onStateChange)
    }
  });
}
