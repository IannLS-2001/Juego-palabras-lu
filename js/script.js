const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word"),
alertBox = document.querySelector(".alert");

let correctWord, timer;
let usedWords = []; // Almacena palabras ya utilizadas

// Inicializa el temporizador
const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime;
        } else {
            clearInterval(timer);
            showAlert(`¡Tiempo agotado! La palabra correcta era ${correctWord.toUpperCase()}`, "error");
            setTimeout(initGame, 2000);
        }
    }, 1000);
};

// Inicializa el juego
const initGame = () => {
    if (usedWords.length === words.length) {
        // Si todas las palabras se han usado, muestra el mensaje de finalización
        showFinalMessage();
        return;
    }

    let randomObj;
    do {
        randomObj = words[Math.floor(Math.random() * words.length)];
    } while (usedWords.includes(randomObj.word));

    usedWords.push(randomObj.word);

    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    inputField.focus();

    initTimer(30);
};

// Verificar la palabra ingresada
const checkWord = () => {
    let userWord = inputField.value.toLowerCase().trim();
    if (!userWord) return showAlert("¡Por favor, ingresa una palabra!", "error");
    if (userWord !== correctWord) return showAlert(`¡Oops! ${userWord} no es la palabra correcta`, "error");

    showAlert(`¡Felicidades! ${correctWord.toUpperCase()} es la palabra correcta`, "success");
    setTimeout(initGame, 2000);
};

// Mostrar el mensaje de alerta
const showAlert = (message, type) => {
    alertBox.innerText = message;
    alertBox.className = `alert show ${type}`;
    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 2000);
};

// Mostrar mensaje final al acabar todas las palabras
const showFinalMessage = () => {
    alertBox.innerText = "Te quiero, gracias por ser como eres!";
    alertBox.className = "alert show success"; // Usar el estilo de éxito para el mensaje
    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 5000); // Mostrar el mensaje durante 5 segundos
};

// Iniciar el juego al cargar la página
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") checkWord();
});

// Iniciar el juego al cargar la página
document.addEventListener("DOMContentLoaded", initGame);
