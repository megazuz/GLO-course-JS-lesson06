'use strict';
// Для этого задания создайте отдельный репозиторий.
// Используйте функции alert, confirm, prompt для общения с пользователем.
// Написать игровой бот.
// "Загадывание случайного числа от 1 до 100"
// Усложнённое задание с ограничением количества попыток. По заданию даётся 10 попыток, но это очень много: задаю = 6.
// PS От себя добавлен счётчик побед.

let score_game = document.getElementById('score_game');
let score_text = document.getElementById('score_text');

let start = 1;
let end = 100;
const attempts = 6;
let i = attempts;
let newGame = true;
let compWins = 0;
let userWins = 0;
let oldUserNumberLow = -1;
let oldUserNumberHigh = -1;
let exampleNumber = -1;
let compNumber = -1;
let userNumber = -1;

const getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

var isNumber = function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
};

const numberPrompt = function (request, example = 0) {
    let answer = -1;
    do {
        if (answer !== -1) {
            alert("Введи число!");
        };
        answer = prompt(request, example);
        if (answer === null) {
            break;
        } else {
            answer = Math.abs(parseFloat(answer));
        };
    } while (!isNumber(answer));
    console.log('Пользователь ввёл число =', answer);
    return answer;
};

do {
    if (newGame) {
        i = attempts;
        compNumber = getRandomInt(start, end);
        oldUserNumberLow = start;
        oldUserNumberHigh = end + 1;
        exampleNumber = Math.trunc((oldUserNumberHigh - oldUserNumberLow) / 2);
        console.log('Загаданное число =', compNumber);
        userNumber = numberPrompt('Угадай число от ' + start + ' до ' + end, exampleNumber);
        newGame = false;
    }
    i--;
    switch (true) {
        case (userNumber === null):
            alert("Игра окончена.");
            break;
        case (userNumber == compNumber):
            userWins++;
            alert('Урa! Пользователь угадал число!\nТекущий счёт:\nПользователь ' + userWins + ' : ' + compWins + ' Компьютер');
            if (confirm('Хочешь ещё сыграть?')) {
                newGame = true;
                console.log('newGame = true');
                break;
            } else {
                userNumber = null;
                console.log('userNumber = null');
                break;
            };
        case (i <= 0):
            compWins++;
            alert('Количество попыток исчерпано!\nИгра проиграна!\nТекущий счёт:\nПользователь ' + userWins + ' : ' + compWins + ' Компьютер');
            if (confirm('Хочешь ещё сыграть?')) {
                newGame = true;
                console.log('newGame = true');
                break;
            } else {
                userNumber = null;
                console.log('userNumber = null');
                break;
            };
        case (userNumber > compNumber):
            oldUserNumberHigh = userNumber + 1;
            exampleNumber = Math.trunc((userNumber - oldUserNumberLow) / 2 + oldUserNumberLow);
            userNumber = numberPrompt('Загаданное число меньше!\nВведи новое число поменьше\n(осталось ' + i + ' попыток)', exampleNumber);
            break;
        case (userNumber < compNumber):
            oldUserNumberLow = userNumber;
            exampleNumber = Math.trunc((oldUserNumberHigh - userNumber) / 2 + oldUserNumberLow);
            userNumber = numberPrompt('Загаданное число больше!\nВведи новое число побольше\n(осталось ' + i + ' попыток)', exampleNumber);
            break;
    };
} while (!(userNumber === null));

console.log('>>>>>>> Итоговый счёт: Пользователь', userWins, ':', compWins, 'Компьютер <<<<<<<');
score_text.textContent = '> Итоговый счёт: <';
score_game.textContent = 'Пользователь ' + userWins + ' : ' + compWins + ' Компьютер';