// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {

  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    const divInfo = document.createElement('div');
    divInfo.className = 'fruit__info';

    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');

    const textIndex = document.createTextNode('index: ' + i);
    const textKind = document.createTextNode('kind: ' + fruits[i].kind);
    const textColor = document.createTextNode('color: ' + fruits[i].color);
    const textWeight = document.createTextNode('weight (кг): ' + fruits[i].weight);

    // с помощью объекта задаётся имя класса с применёнными стилями css
    const liColors = {
      "фиолетовый": 'fruit__item fruit_violet',
      "зеленый": 'fruit__item fruit_green',
      "розово-красный": 'fruit__item fruit_carmazin',
      "желтый": 'fruit__item fruit_yellow',
      "светло-коричневый": 'fruit__item fruit_lightbrown',
    };

    const newLi = document.createElement('li');
    newLi.className = liColors[fruits[i].color];

    fruitsList.appendChild(newLi);
    newLi.appendChild(divInfo);

    divInfo.appendChild(div1);
    div1.appendChild(textIndex);

    divInfo.appendChild(div2);
    div2.appendChild(textKind);

    divInfo.appendChild(div3);
    div3.appendChild(textColor);

    divInfo.appendChild(div4);
    div4.appendChild(textWeight);

  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  while (fruits.length > 0) {
    let randomNumber = getRandomInt(0, fruits.length - 1);
    let removedElem = fruits.splice(randomNumber, 1)[0];
    result.push(removedElem);
  }
  fruits = result;

  // Сравнение содержимого массивов     
  const every = fruits.every((item, index) => {
    const originalIndex = ["Мангустин", "Дуриан", "Личи", "Карамбола", "Тамаринд"];
    return item.kind === originalIndex[index];
  });

  if (every) {
    alert('Порядок не изменился!');
  }
};


shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = (min, max) => {
  fruits = fruits.filter((item) => {
    const weight = item.weight;
    return weight >= min && weight <= max;
  });
  if (isNaN(maxWeight.value) || isNaN(minWeight.value)) {
    return alert('Введите правильное значение')
  }
};

filterButton.addEventListener('click', () => {
  filterFruits(minWeight.value, maxWeight.value);
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

// функция сравнения двух элементов по цвету
const comparationColor = (color1, color2) => {
  const priority = ["розово-красный", "желтый", "зеленый", "светло-коричневый", "фиолетовый"]
  const priority1 = priority.indexOf(color1.color);
  const priority2 = priority.indexOf(color2.color);
  return priority1 > priority2;
};

const sortAPI = {

  // сортировка пузырьком
  bubbleSort: (arr, comparation) => {
    const result = [...arr];
    const n = result.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        if (comparation(result[j], result[j + 1])) {
          let temp = result[j + 1];
          result[j + 1] = result[j];
          result[j] = temp;
        }
      }
    }
    return result;
  },


  // быстрая сортировка
  quickSort: (arr, comparation) => {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];

    for (let i = 0; i < arr.length; i++) {
      if (comparation(arr[i], pivot)) {
        right.push(arr[i]);
      } else if (comparation(pivot, arr[i])) {
        left.push(arr[i]);
      } else {
        equal.push(arr[i]);
      }
    }

    const sortedLeft = sortAPI.quickSort(left, comparation);
    const sortedRight = sortAPI.quickSort(right, comparation);

    return [...sortedLeft, ...equal, ...sortedRight];
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    const sortedArr = sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    return sortedArr;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort';
  }
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  fruits = sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});


/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  const kind = kindInput.value;
  const color = colorInput.value;
  const weight = parseFloat(weightInput.value);

  if (kind === '' || color === '' || isNaN(weight)) {
    alert('Пожалуйста, заполните все поля правильно.');
    return;
  }

  const newFruit = {
    kind: kind,
    color: color,
    weight: weight
  };

  fruits.push(newFruit);

  const newLi = document.createElement('li');
  newLi.className = 'fruit__item';
  newLi.style.backgroundColor = color;

  const divInfo = document.createElement('div');
  divInfo.className = 'fruit__info';

  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const div4 = document.createElement('div');

  const textIndex = document.createTextNode('index: ' + (fruits.length - 1));
  const textKind = document.createTextNode('kind: ' + kind);
  const textColor = document.createTextNode('color: ' + color);
  const textWeight = document.createTextNode('weight (кг): ' + weight);

  fruitsList.appendChild(newLi);
  newLi.appendChild(divInfo);

  divInfo.appendChild(div1);
  div1.appendChild(textIndex);

  divInfo.appendChild(div2);
  div2.appendChild(textKind);

  divInfo.appendChild(div3);
  div3.appendChild(textColor);

  divInfo.appendChild(div4);
  div4.appendChild(textWeight);
});


