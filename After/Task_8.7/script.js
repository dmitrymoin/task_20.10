let minValue, maxValue, answerNumber, orderNumber, gameRun;
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// Функция для обновления параметров игры
function gameParameters() {
  minValue = parseInt(prompt('Минимальное значение числа для игры','0')) || 0;
  maxValue = parseInt(prompt('Максимальное значение числа для игры','100')) || 100;
  minValue = (minValue < -999)? -999 : minValue;
  maxValue = (maxValue > 999)? 999 : maxValue;
  alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его отгадаю`);
}

// Функция для инициализации игры
function gameCreation() {
  gameParameters();
  answerNumber  = Math.floor((minValue + maxValue) / 2);
  orderNumber = 1;
  orderNumberField.innerText = orderNumber;
  answerField.innerText = `Вы загадали число ${answerNumber}?`;
  gameRun = true;
}

// Обработчик кнопки "Начать заново"
document.getElementById('btnRetry').addEventListener('click', function () {
    gameCreation();
})

// Функция для вывода случайной фразы
function getRandomPhrase(phrasesArray, number) {
  return phrasesArray[Math.floor(Math.random() * phrasesArray.length)].replace('{MaybeNumber}', number);
}

// Функция для обновления параметров игры
function updateAnswerAndGame(newMin, newMax, newAnswer) {
  orderNumber++;
  orderNumberField.innerText = orderNumber;
  answerField.innerText = newAnswer;
  minValue = newMin;
  maxValue = newMax;
}

// Функция для обработки ответа "Загаданное число больше"
function btnOver() {
  if (minValue === maxValue) {
    answerField.innerText = getRandomPhrase(failurePhrases);
    gameRun = false;
  } else {
    minValue = answerNumber + 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    updateAnswerAndGame(minValue, maxValue, getRandomPhrase(maybePhrases, answerNumber));
  }
}

// Функция для обработки ответа "Загаданное число меньше"
function btnLess() {
  if (minValue === maxValue) {
    answerField.innerText = getRandomPhrase(failurePhrases);
    gameRun = false;
  } else {
    maxValue = answerNumber;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    updateAnswerAndGame(minValue, maxValue, getRandomPhrase(maybePhrases, answerNumber));
  }
}

// Функция для обработки ответа "Верно"
function btnEqual() {
  answerField.innerText = getRandomPhrase(successPhrases);
  gameRun = false;
}

// Фразы для случайного ответа
const maybePhrases = [
  `Или {MaybeNumber}?`,
  `Может это {MaybeNumber}?`,
  `А, я знаю {MaybeNumber}!`
];

// Фразы для неудачного завершения игры
const failurePhrases = [
  `Что-то здесь нечисто \u{1F914}`,
  `А не врешь ли ты часом? \u{1F925}`,
  `Кто-то забыл,\n какое число загадал? \u{1F604}`
];

// Фразы для успешного завершения игры
const successPhrases = [
  `Плёвое дело!\u{1F92D}`,
  `Это было легко!\u{1F609}`,
  `Проще простого \u{1F61C}`,
];

// Обработчик кнопки "Загаданное число больше"
document.getElementById('btnOver').addEventListener('click', function () {
  if (gameRun) {
    btnOver();
  }
});

// Обработчик кнопки "Загаданное число меньше"
document.getElementById('btnLess').addEventListener('click', function () {
  if (gameRun) {
    btnLess();
  }
});

// Обработчик кнопки "Верно"
document.getElementById('btnEqual').addEventListener('click', function () {
  if (gameRun) {
    btnEqual();
  }
});

// Инициализация игры
gameCreation();
