function getTimeOfDay(hour) {
  if (hour >= 5 && hour <= 11) return { label: "Morning", emoji: "🌅" };
  if (hour >= 12 && hour <= 16) return { label: "Afternoon", emoji: "🌞" };
  if (hour >= 17 && hour <= 20) return { label: "Evening", emoji: "🌇" };
  return { label: "Night", emoji: "🌙" };
}

function displayGreeting() {
  const name = document.getElementById("nameInput").value.trim();
  const hourInput = document.getElementById("hourInput").value;
  const greetingOutput = document.getElementById("greetingOutput");

  const currentHour = hourInput !== "" ? parseInt(hourInput) : new Date().getHours();

  if (!name || isNaN(currentHour) || currentHour < 0 || currentHour > 23) {
    showToast("⛔ Enter a valid name and hour (0-23)!");
    return;
  }

  const { label, emoji } = getTimeOfDay(currentHour);
  const greeting = `Good ${label}, ${name}! ${emoji}`;

  greetingOutput.textContent = greeting;
  greetingOutput.classList.remove("show");
  void greetingOutput.offsetWidth; // force reflow
  greetingOutput.classList.add("show");

  updateBackground(label);
  speakGreeting(greeting);
  displayQuote();
}

function updateBackground(timeOfDay) {
  const body = document.body;
  let bg;

  switch (timeOfDay) {
    case "Morning":
      bg = "linear-gradient(to right, #FFEFBA, #FFFFFF)";
      break;
    case "Afternoon":
      bg = "linear-gradient(to right, #fbd3e9, #bb377d)";
      break;
    case "Evening":
      bg = "linear-gradient(to right, #2c3e50, #fd746c)";
      break;
    case "Night":
      bg = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
      break;
  }

  body.style.background = bg;
}

// Real-time Clock
function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  clock.textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// Dark/Light Mode
function toggleMode() {
  const body = document.body;
  const modeLabel = document.getElementById("modeLabel");
  body.classList.toggle("dark-mode");
  modeLabel.textContent = body.classList.contains("dark-mode") ? "🌙 Dark Mode" : "🌞 Light Mode";
}

// Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 3000);
}

// Speak greeting (Web Speech API)
function speakGreeting(text) {
  if ("speechSynthesis" in window) {
    // Strip out emojis before speaking
    const plainText = text.replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F700}-\u{1F77F}\u{2600}-\u{26FF}]/gu, "");
    const utterance = new SpeechSynthesisUtterance(plainText.trim());
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
}


// Motivational Quotes
const quotes = [
  "Believe in yourself and all that you are. 💪",
  "Every moment is a fresh beginning. 🌱",
  "Do something today that your future self will thank you for. 🚀",
  "You are capable of amazing things. ✨",
  "Success is not for the lazy. 🔥",
];

function displayQuote() {
  const quoteBox = document.getElementById("quote");
  const random = Math.floor(Math.random() * quotes.length);
  quoteBox.textContent = quotes[random];
}
