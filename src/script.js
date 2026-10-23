// EDITABLE COPY: Replace each string to change the message revealed by its gift box.
const giftNotes = [
  "A little reminder: You are worthy of every good things in this world and you are never alone while i exists, Run to me whenever your world hurts you or feel heavy. I'm Always here for youu....",
  "May this Year brings you Gentle mornings, Happiness, and The door to your success, and lot of foods.",
  "A little cheer, just because: you’ve made it through every day that brought you here. I hope you pause today, feel proud, and let yourself be celebrated."
];

const welcome = document.querySelector("#welcome");
const openButton = document.querySelector("#open-letter");
const letterCard = document.querySelector("#letter-card");
openButton.addEventListener("click", () => {
  welcome.classList.add("is-opened");
  openButton.setAttribute("aria-expanded", "true");
  letterCard.hidden = false;
  requestAnimationFrame(() => letterCard.classList.add("is-revealed"));
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(
    () => document.querySelector("#letter").scrollIntoView({ behavior: motionPreference ? "auto" : "smooth" }),
    320
  );
});

const giftMessage = document.querySelector("#gift-message");
const giftMessageText = document.querySelector("#gift-message-text");
const giftButtons = [...document.querySelectorAll("[data-gift]")];
giftButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = Number(button.dataset.gift);
    giftButtons.forEach((gift) => gift.setAttribute("aria-expanded", String(gift === button)));
    giftMessageText.textContent = giftNotes[selected];
    giftMessage.hidden = false;
    giftMessage.classList.remove("message-in");
    requestAnimationFrame(() => giftMessage.classList.add("message-in"));
    giftMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
document.querySelector("#gift-close").addEventListener("click", () => {
  giftMessage.hidden = true;
  giftButtons.forEach((gift) => gift.setAttribute("aria-expanded", "false"));
});

// This gentle loop is created only after the visitor presses Play. No autoplay.
let audioContext;
let musicTimer;
let musicPlaying = false;
let noteIndex = 0;
const musicToggle = document.querySelector("#music-toggle");
const musicLabel = document.querySelector("#music-label");
const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 783.99, 698.46];

// EDITABLE CONTROL COPY: The music button's play, pause, and unavailable labels are below.
function playNote() {
  if (!audioContext || audioContext.state !== "running") return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = "sine";
  oscillator.frequency.value = melody[noteIndex % melody.length];
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.75);
  noteIndex += 1;
}

musicToggle.addEventListener("click", async () => {
  if (!musicPlaying) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      musicLabel.textContent = "Music isn’t available here";
      return;
    }
    audioContext ||= new AudioContextClass();
    await audioContext.resume();
    musicPlaying = true;
    playNote();
    musicTimer = window.setInterval(playNote, 760);
    musicLabel.textContent = "Pause the music";
    musicToggle.setAttribute("aria-label", "Pause gentle birthday music");
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.classList.add("is-playing");
  } else {
    musicPlaying = false;
    window.clearInterval(musicTimer);
    if (audioContext) await audioContext.suspend();
    musicLabel.textContent = "Play a little music";
    musicToggle.setAttribute("aria-label", "Play gentle birthday music");
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.classList.remove("is-playing");
  }
});

const heartField = document.querySelector("#heart-field");
document.querySelector("#celebrate-button").addEventListener("click", () => {
  const shapes = ["heart", "spark"];
  for (let index = 0; index < 18; index += 1) {
    const particle = document.createElement("span");
    particle.className = `particle ${shapes[index % shapes.length]}`;
    particle.style.setProperty("--x", `${20 + Math.random() * 60}%`);
    particle.style.setProperty("--drift", `${(Math.random() - 0.5) * 150}px`);
    particle.style.setProperty("--delay", `${Math.random() * 0.7}s`);
    particle.style.setProperty("--size", `${8 + Math.random() * 12}px`);
    heartField.append(particle);
    window.setTimeout(() => particle.remove(), 3300);
  }
  document.querySelector("#finale").focus({ preventScroll: true });
});
