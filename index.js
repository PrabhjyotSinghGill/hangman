const word = document.getElementById("word");
const wrongLetters = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLettersArray = [];
const wrongLettersArray = [];

//Show hidden word
function displayWord() {
  word.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;

  const innerWord = word.innerText.replace(/[\n]/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";

    playable = false;
  }
}

//Update the wrong letters
function updateWrongLetters() {
  //Display wrong letters
  wrongLetters.innerHTML = `${
    wrongLetters.length > 0 ? "<p>Wrong</p>" : ""
  }${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  //Display Parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost!";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";

    playable = false;
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLetters();
        } else {
          showNotification();
        }
      }
    }
  }
});

//Restart game
playAgainBtn.addEventListener("click", () => {
  playable = true;

  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetters();

  popup.style.display = "none";
});

displayWord();
