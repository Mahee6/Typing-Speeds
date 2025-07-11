const setOfWords = [
    "Hi, My Name is Mahee Jaiswal.",
    "Currently, I am doing MCA from Jain deemed to be University.",
    "Basically, I am from Bihar (Patna).",
    "Patna is the capital city of the Indian state of Bihar and is one of the oldest continuously inhabited cities in the world. With a rich history, diverse culture, and growing urban development, it holds a unique place in India's heritage."
];
const msg = document.getElementById('msg');
const typewords = document.getElementById('myword');
const btn = document.getElementById('btn');

let startTime, endTime;

const playGame = () => {
    const randomIndex = Math.floor(Math.random() * setOfWords.length);
    msg.innerText = setOfWords[randomIndex];
    msg.classList.add('show');
    let date = new Date();
    startTime = date.getTime();
};

const endPlay = () => {
    let date = new Date();
    endTime = date.getTime();
    let totalTime = (endTime - startTime) / 1000; 
    let typedText = typewords.value.trim();
    let displayedText = msg.innerText.trim();

    let wordCount = wordCounter(typedText);
    let speed = Math.round((wordCount / totalTime) * 60);
    let accuracy = calculateAccuracy(displayedText, typedText);

    let finalMsg = `You typed ${wordCount} words at a speed of ${speed} words per minute with an accuracy of ${accuracy}%.`;
    msg.innerText = finalMsg;
    typewords.value = "";
};

const wordCounter = (str) => {
    return str.split(/\s+/).filter(word => word.length > 0).length;
};

const calculateAccuracy = (original, typed) => {
    let originalWords = original.split(/\s+/);
    let typedWords = typed.split(/\s+/);
    let correctCount = 0;

    
    for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
        if (originalWords[i] === typedWords[i]) {
            correctCount++;
        }
    }

    let accuracy = (correctCount / originalWords.length) * 100;
    return accuracy.toFixed(2); 
};

btn.addEventListener('click', function () {
    if (this.innerText === 'Start') {
        typewords.disabled = false;
        typewords.focus();
        typewords.classList.add('active');
        msg.classList.remove('show');
        playGame();
        this.innerText = "Done";
    } else if (this.innerText === 'Done') {
        typewords.disabled = true;
        typewords.classList.remove('active');
        endPlay();
        this.innerText = "Start";
    }
});
