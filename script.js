let bossHP = 250;
let playerHP = 100;
let timeLeft = 480;
let currentQuestion = {};

const questionBank = [
    { text: "The wind howled in the night.", type: "Personification" },
    { text: "Life is a roller coaster.", type: "Metaphor" },
    { text: "She was as cool as a cucumber.", type: "Simile" },
    { text: "I've told you a thousand times!", type: "Hyperbole" },
    { text: "The stars are sparkling diamonds.", type: "Metaphor" },
    { text: "The fire ran through the forest.", type: "Personification" },
    { text: "The backpack weighed a ton.", type: "Hyperbole" },
    { text: "The thunder grumbled like an old man.", type: "Simile" },
    { text: "The bees buzzed busily.", type: "Alliteration" },
    { text: "The car engine coughed and sputtered.", type: "Personification" },
    { text: "The popcorn went POP!", type: "Onomatopoeia" },
    { text: "Peter Piper picked peppers.", type: "Alliteration" },
    { text: "The clock ticked loudly.", type: "Onomatopoeia" },
    { text: "He is a walking encyclopedia.", type: "Metaphor" },
    { text: "I'm so hungry I could eat a horse.", type: "Hyperbole" },
    { text: "The moon is a ghostly galleon.", type: "Metaphor" },
    { text: "Sally sells seashells by the seashore.", type: "Alliteration" }
];

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    nextQuestion();
    startTimer();
}

function nextQuestion() {
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    currentQuestion = questionBank[randomIndex];
    document.getElementById("sentence").innerText = currentQuestion.text;
    document.getElementById("feedback").innerText = "";
}

function checkAnswer(choice) {
    const heroVisual = document.getElementById('player-visual');
    const bossVisual = document.getElementById('boss-visual');
    
    if (choice === currentQuestion.type) {
        bossHP -= 10;
        document.getElementById("feedback").innerText = "SUCCESS! Boss -10 HP";
        document.getElementById("feedback").style.color = "#00ff99";
        bossVisual.classList.add('boss-hit');
        setTimeout(() => bossVisual.classList.remove('boss-hit'), 500);
    } else {
        playerHP -= 15;
        heroVisual.classList.add('hero-hit');
        setTimeout(() => heroVisual.classList.remove('hero-hit'), 500);
        document.getElementById("feedback").innerText = "WRONG! Player -15 HP";
        document.getElementById("feedback").style.color = "#ff0055";
    }

    document.getElementById("boss-hp").innerText = bossHP;
    document.getElementById("player-hp").innerText = playerHP;
    document.getElementById("boss-hp-fill").style.width = (bossHP / 250 * 100) + "%";
    document.getElementById("player-hp-fill").style.width = playerHP + "%";

    if (bossHP <= 0) {
        document.getElementById('victory-screen').style.display = 'flex';
    } else if (playerHP <= 0) {
        document.getElementById('loss-screen').style.display = 'flex';
    } else {
        setTimeout(nextQuestion, 800);
    }
}

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            let mins = Math.floor(timeLeft / 60);
            let secs = timeLeft % 60;
            document.getElementById("timer").innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        } else {
            if (bossHP > 0 && playerHP > 0) {
                document.getElementById('loss-screen').style.display = 'flex';
            }
            clearInterval(timerInterval);
        }
    }, 1000);
}