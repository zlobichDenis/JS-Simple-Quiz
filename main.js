// All answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// All our options
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // Вопрос

const numberOfQuestion = document.getElementById('number-of-question'), // Номер вопроса
      numberOfAllQuestion = document.getElementById('number-of-all-questions'); // Все вопросы

let indexOfQuestion = 0, // Индекс текущего вопроса
    indexOfPage = 0; // Индекс страницы 

const answersTracker = document.getElementById('answers-tracker');//Обертка доя треккера

const btnNext = document.getElementById('btn-next'); // Кнопка "далее"


let score = 0; //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),//Количество правильных ответов
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),//Количество всех вопросов в модальном окне
      btnTryAgain = document.getElementById('btn-try-again'); // Кнопка "попробовать еще раз"

const questions = [
    {
        question: 'Когда началась вторая мировая война?',
        options: [
            '1939',
            '1941',
            '1942',
            '1945',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сколько лет Путину',
        options: [
            '39',
            '54',
            '68',
            '66',
        ],
        rightAnswer: 2
    },
    {
        question: 'В каком году была Октябрьская революция',
        options: [
            '1918',
            '1920',
            'Завтра',
            '1812',
        ],
        rightAnswer: 0
    }
];

numberOfAllQuestion.innerHTML = questions.length //Выводим количесвто вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;
    //мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //Утсановка номера текущей страницы
    indexOfPage++;//Увеличение индекса страницы
};

let completedAnswers = []; //Массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов
    
    if(indexOfPage == questions.length){
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = e => {
    if(e.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        e.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++
    } else {
        e.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
    
};

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e))
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
         alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
};

const enableOptions = () => { // Удаление всех классов для всех ответов для следующего вопроса
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});