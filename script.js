const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Mars" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"], correct: "Shakespeare" },
    { question: "What is the capital of France?", options: ["Madrid", "Berlin", "Paris", "Rome"], correct: "Paris" },
    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Carbon Dioxide" }
];

// Duplicate questions to make 50
while (questions.length < 50) {
    questions.push(...questions);
}
questions.length = 50;

let timerSeconds = 3600; // 1 hour
let quizLocked = false;
let userAnswers = new Array(50).fill(null);

function startTimer() {
    const timerDisplay = document.getElementById("timer");
    const timerInterval = setInterval(() => {
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerDisplay.innerText = "Time's up!";
            lockQuiz();
            return;
        }

        let minutes = Math.floor(timerSeconds / 60);
        let seconds = timerSeconds % 60;
        timerDisplay.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        timerSeconds--;
    }, 1000);
}

function lockQuiz() {
    quizLocked = true;
    document.querySelectorAll(".options label").forEach(label => {
        label.style.pointerEvents = "none"; 
        label.style.opacity = "0.5"; 
    });
}

function loadQuiz() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";
    
    questions.forEach((q, index) => {
        let questionHTML = `<div class="question">${index + 1}. ${q.question}</div>`;
        questionHTML += `<div class="options">`;

        q.options.forEach(option => {
            questionHTML += `
                <label onclick="selectAnswer(this, ${index})">
                    <input type="radio" name="q${index}" value="${option}">
                    ${option}
                </label>
            `;
        });

        questionHTML += `</div>`;
        quizContainer.innerHTML += questionHTML;
    });

    startTimer();
}

function selectAnswer(label, index) {
    if (quizLocked) return;

    const labels = label.closest(".options").querySelectorAll("label");

    labels.forEach(l => l.classList.remove("selected"));
    label.classList.add("selected");

    userAnswers[index] = label.innerText.trim();
}

function submitQuiz() {
    if (quizLocked) return;

    let score = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correct) {
            score++;
        }
    });

    document.getElementById("result").innerHTML = `Your Score: ${score} / 50`;
}

loadQuiz();
