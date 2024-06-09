'use strict';
// Для этого задания создайте отдельный репозиторий.
// Используйте функции alert, confirm, prompt для общения с пользователем.
// Написать игровой бот.
// "Загадывание случайного числа от 1 до 100"
let start = 1;
let end = 100;
let newGame = true;
let oldUserNumberLow = start;
let oldUserNumberHigh = end;
let exampleNumber = Math.round((oldUserNumberHigh - oldUserNumberLow) / 2);
let userNumber = -1;
let compNumber = -1;
let i = 1;

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

var isNumber = function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

const numberPrompt = function (request, example = 0) {
    let answer = -1;
    do {
        if (answer !== -1) {
            alert("Введи число!")
        };
        answer = prompt(request, example);
        console.log(answer)
        console.log(typeof answer);
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
        oldUserNumberLow = start;
        oldUserNumberHigh = end + 1;
        exampleNumber = Math.trunc((oldUserNumberHigh - oldUserNumberLow) / 2);
        compNumber = getRandomInt(start, end);
        console.log('Загаданное число =', compNumber);
        userNumber = numberPrompt('Угадай число от ' + start + ' до ' + end, exampleNumber);
        newGame = false;
    }
    switch (true) {
        case (userNumber === null):
            alert("Игра окончена.");
            break;
        case (userNumber == compNumber):
            alert('Урa! Пользователь угадал число!');
            if (confirm('Хочешь ещё сыграть?')) {
                newGame = true;
                console.log('newGame = true');
                console.log('Окончание игры №', i);
                i++;
                break;
            } else {
                userNumber = null;
                console.log('userNumber = null');
                break;
            };
        case (userNumber > compNumber):
            oldUserNumberHigh = userNumber + 1;
            exampleNumber = Math.trunc((userNumber - oldUserNumberLow) / 2 + oldUserNumberLow);
            userNumber = numberPrompt('Загаданное число меньше!\nВведи новое число поменьше', exampleNumber);
            break;
        case (userNumber < compNumber):
            oldUserNumberLow = userNumber;
            exampleNumber = Math.trunc((oldUserNumberHigh - userNumber) / 2 + oldUserNumberLow);
            userNumber = numberPrompt('Загаданное число больше!\nВведи новое число побольше', exampleNumber);
            break;
    };
} while (!(userNumber === null));
console.log('Окончание скрипта');
alert("До новых встреч!");