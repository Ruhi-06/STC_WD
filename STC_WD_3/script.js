const questions = [
    { q: "What does HTML stand for?", a: [ {t:"HyperText Markup Language", c:true}, {t:"HighText Machine Language", c:false}, {t:"HyperText Main Language", c:false}, {t:"None", c:false} ] },
    { q: "Which tag is used for the largest heading?", a: [ {t:"<h6>", c:false}, {t:"<head>", c:false}, {t:"<h1>", c:true}, {t:"<heading>", c:false} ] },
    { q: "What is the correct tag for a line break?", a: [ {t:"<lb>", c:false}, {t:"<br>", c:true}, {t:"<break>", c:false}, {t:"<hr>", c:false} ] },
    { q: "Which attribute is used to provide an image source?", a: [ {t:"src", c:true}, {t:"href", c:false}, {t:"alt", c:false}, {t:"link", c:false} ] },
    { q: "Which character is used to indicate an end tag?", a: [ {t:"*", c:false}, {t:"/", c:true}, {t:"<", c:false}, {t:"^", c:false} ] },
    { q: "How do you create a hyperlink?", a: [ {t:"<a>", c:true}, {t:"<link>", c:false}, {t:"<url>", c:false}, {t:"<href>", c:false} ] },
    { q: "Which element contains all the visible body content?", a: [ {t:"<head>", c:false}, {t:"<html>", c:false}, {t:"<body>", c:true}, {t:"<main>", c:false} ] },
    { q: "What is the correct HTML for adding a background color?", a: [ {t:"<body bg='yellow'>", c:false}, {t:"<body style='background-color:yellow;'>", c:true}, {t:"<background>yellow</background>", c:false}, {t:"None", c:false} ] },
    { q: "Choose the correct tag for a list item?", a: [ {t:"<ul>", c:false}, {t:"<li>", c:true}, {t:"<ol>", c:false}, {t:"<list>", c:false} ] },
    { q: "Which HTML tag is used to define an internal style sheet?", a: [ {t:"<css>", c:false}, {t:"<script>", c:false}, {t:"<style>", c:true}, {t:"<sheet>", c:false} ] }
];

let currentIdx = 0;
let score = 0;

const qText = document.getElementById('question-text');
const btnContainer = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');

function loadQuestion() {
    reset();
    let currentQ = questions[currentIdx];
    progress.innerText = `Question ${currentIdx + 1} of 10`;
    qText.innerText = currentQ.q;

    currentQ.a.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.t;
        if(answer.c) button.dataset.correct = "true";
        button.onclick = selectAnswer;
        btnContainer.appendChild(button);
    });
}

function reset() {
    nextBtn.classList.add('hide');
    while(btnContainer.firstChild) btnContainer.removeChild(btnContainer.firstChild);
}

function selectAnswer(e) {
    const selected = e.target;
    const isCorrect = selected.dataset.correct === "true";
    if(isCorrect) {
        selected.classList.add('correct');
        score++;
    } else {
        selected.classList.add('wrong');
    }

    Array.from(btnContainer.children).forEach(btn => {
        if(btn.dataset.correct === "true") btn.classList.add('correct');
        btn.disabled = true;
    });
    nextBtn.classList.remove('hide');
}

nextBtn.onclick = () => {
    currentIdx++;
    if(currentIdx < questions.length) loadQuestion();
    else showResult();
};

function showResult() {
    document.getElementById('quiz-box').classList.add('hide');
    document.getElementById('result-screen').classList.remove('hide');
    document.getElementById('final-score').innerText = score;
    document.getElementById('message').innerText = score > 5 ? "Great Job!" : "Keep Practicing!";
}

loadQuestion();