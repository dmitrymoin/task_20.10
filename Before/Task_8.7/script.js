let minValue = parseInt(prompt('Минимальное значение числа для игры','0')) || 0;
let maxValue = parseInt(prompt('Максимальное значение числа для игры','100')) || 100;
minValue = (minValue < -999)? -999 : minValue;
maxValue = (maxValue > 999)? 999 : maxValue;
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его отгадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;


document.getElementById('btnRetry').addEventListener('click', function () {
    
    minValue = parseInt(prompt('Минимальное знание числа для игры','0')) || 0;
    maxValue = parseInt(prompt('Максимальное знание числа для игры','100')) || 100;
    minValue = (minValue < -999)? -999 : minValue;
    maxValue = (maxValue > 999)? 999 : maxValue;
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${answerNumber }?`;
    gameRun = true;

    })

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random()*2);
            let answerPhrase;
                if (phraseRandom === 0){
                    answerPhrase = `Что-то здесь нечисто \u{1F914}`;
                } else if (phraseRandom === 1){
                    answerPhrase = `А не врешь ли ты часом? \u{1F925}`;                
                } else if (phraseRandom === 2){
                    answerPhrase = `Кто-то забыл,\n какое число загадал? \u{1F604}`;
                }                         
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round( Math.random()*2);
            let answerPhrase;
                if (phraseRandom === 0){
                    answerPhrase = `Или ${answerNumber }?`;
                } else if (phraseRandom === 1){
                    answerPhrase = `Может это ${answerNumber }?`;                
                } else if (phraseRandom === 2){
                    answerPhrase = `А, я знаю ${answerNumber }!`;
                }                         
            answerField.innerText = answerPhrase;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random()*2);
            let answerPhrase;
            if (phraseRandom === 0){
                answerPhrase = `Что-то здесь нечисто \u{1F914}`;
            } else if (phraseRandom === 1){
                answerPhrase = `А не врешь ли ты часом? \u{1F925}`;                
            } else if (phraseRandom === 2){
                answerPhrase = `Кто-то забыл,\n какое число загадал? \u{1F604}`;
            }                   
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round( Math.random()*2);
            let answerPhrase;
                if (phraseRandom === 0){
                    answerPhrase = `Или ${answerNumber }?`;
                } else if (phraseRandom === 1){
                    answerPhrase = `Может ${answerNumber }?`;                
                } else if (phraseRandom === 2){
                    answerPhrase = `А, я знаю ${answerNumber }!`;
                }                         
            answerField.innerText = answerPhrase;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom = Math.round( Math.random()*2);
        let answerPhrase;
                if (phraseRandom === 0){
                    answerPhrase = `Плёвое дело!\u{1F92D}`;
                } else if (phraseRandom === 1){
                    answerPhrase = `Это было легко!\u{1F609}`;                
                } else if (phraseRandom === 2){
                    answerPhrase = `Проще простого \u{1F61C}`;
                }
        answerField.innerText = answerPhrase;
        gameRun = false;
    }          
})

