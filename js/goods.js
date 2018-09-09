'use strict';
var dataTemplateGoods = {
  name: [
    'Чесночные сливки',
    'Огуречный педант',
    'Молочная хрюша',
    'Грибной шейк',
    'Баклажановое безумие',
    'Паприколу итальяно',
    'Нинзя-удар васаби',
    'Хитрый баклажан',
    'Горчичный вызов',
    'Кедровая липучка',
    'Корманный портвейн',
    'Чилийский задира',
    'Беконовый взрыв',
    'Арахис vs виноград',
    'Сельдерейная душа',
    'Початок в бутылке',
    'Чернющий мистер чеснок',
    'Раша федераша',
    'Кислая мина',
    'Кукурузное утро',
    'Икорный фуршет',
    'Новогоднее настроение',
    'С пивком потянет',
    'Мисс креветка',
    'Бесконечный взрыв',
    'Невинные винные',
    'Бельгийское пенное',
    'Острый язычок'
  ],
  picture: [
    'gum-cedar.jpg',
    'ice-cucumber.jpg',
    'marmalade-beer.jpg',
    'marshmallow-beer.jpg',
    'soda-cob.jpg',
    'gum-chile.jpg',
    'ice-eggplant.jpg',
    'marmalade-caviar.jpg',
    'marshmallow-shrimp.jpg',
    'soda-garlic.jpg',
    'gum-eggplant.jpg',
    'ice-garlic.jpg',
    'marmalade-corn.jpg',
    'marshmallow-spicy.jpg',
    'soda-peanut-grapes.jpg',
    'gum-mustard.jpg',
    'ice-italian.jpg',
    'marmalade-new-year.jpg',
    'marshmallow-wine.jpg',
    'soda-russian.jpg',
    'gum-portwine.jpg',
    'ice-mushroom.jpg',
    'marmalade-sour.jpg',
    'soda-bacon.jpg',
    'gum-wasabi.jpg',
    'ice-pig.jpg',
    'marshmallow-bacon.jpg',
    'soda-celery.jpg'
  ],
  amount: {
    min: 0,
    max: 20
  },
  price: {
    min: 100,
    max: 1500
  },
  weight: {
    min: 30,
    max: 300
  },
  rating: {
    value: {
      min: 1,
      max: 5
    },
    number: {
      min: 10,
      max: 900
    }
  },
  nutritionFacts: {
    energy: {
      min: 70,
      max: 500
    },
    contents: {
      name: [
        'молоко',
        'сливки',
        'вода',
        'пищевой краситель',
        'патока',
        'ароматизатор бекона',
        'ароматизатор свинца',
        'ароматизатор дуба, идентичный натуральному',
        'ароматизатор картофеля',
        'лимонная кислота',
        'загуститель',
        'эмульгатор',
        'консервант: сорбат калия',
        'посолочная смесь: соль, нитрит натрия',
        'ксилит',
        'карбамид',
        'вилларибо',
        'виллабаджо'
      ],
      number: 3
    }
  }
};
var numberOfCatalogGoods = 26;
var numberOfOrderGoods = 3;

var getRandomNumber = function (min, max) {
  var randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return randomNumber;
};
var getRandomArr = function (originalArr, lengthArr) {
  var copyArr = originalArr.slice();
  var newArr = [];
  for (var i = 0; i < lengthArr; i++) {
    var itemNumber = getRandomNumber(0, copyArr.length - 1);
    var randomArrElement = copyArr[itemNumber];
    newArr.push(randomArrElement);
    copyArr.splice(itemNumber, 1);
  }
  return newArr;
};
var getFragmentOfArr = function (odjectsArr, renderFunction) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < odjectsArr.length; i++) {
    fragment.appendChild(renderFunction(odjectsArr[i]));
  }
  return fragment;
};

var getRandomGoods = function (dataTemplate) {
  var ingredients = getRandomArr(dataTemplate.nutritionFacts.contents.name, dataTemplate.nutritionFacts.contents.number);
  var randomGoods = {
    name: dataTemplate.name[getRandomNumber(0, dataTemplate.name.length - 1)],
    picture: 'img/cards/' + dataTemplate.picture[getRandomNumber(0, dataTemplate.picture.length - 1)],
    amount: getRandomNumber(dataTemplate.amount.min, dataTemplate.amount.max),
    price: getRandomNumber(dataTemplate.price.min, dataTemplate.price.max),
    weight: getRandomNumber(dataTemplate.weight.min, dataTemplate.weight.max),
    rating: {
      value: getRandomNumber(dataTemplate.rating.value.min, dataTemplate.rating.value.max),
      number: getRandomNumber(dataTemplate.rating.number.min, dataTemplate.rating.number.max)
    },
    nutritionFacts: {
      sugar: getRandomNumber(0, 1) > 0,
      energy: getRandomNumber(dataTemplate.nutritionFacts.energy.min, dataTemplate.nutritionFacts.energy.max),
      contents: ingredients.join(', ')
    }
  };
  return randomGoods;
};
var getRandomListGoods = function (dataTemplate, lengthArr) {
  var randomGoodsList = [];
  for (var i = 0; i < lengthArr; i++) {
    var goods = getRandomGoods(dataTemplate);
    randomGoodsList.push(goods);
  }
  return randomGoodsList;
};

var renderCardCatalog = function (goods) {
  var card = document.querySelector('#card')
    .content
    .querySelector('.catalog__card')
    .cloneNode(true);
  if (goods.amount <= 5) {
    card.classList.remove('card--in-stock');
    if (goods.amount === 0) {
      card.classList.add('card--soon');
    }
    if (goods.amount > 0) {
      card.classList.add('card--little');
    }
  }
  card.querySelector('.card__title').textContent = goods.name;
  card.querySelector('.card__img').attributes.src.value = goods.picture;
  card.querySelector('.card__img').attributes.alt.value = goods.name;
  card.querySelector('.card__price').innerHTML = goods.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + goods.weight + ' Г</span>';
  if (goods.rating.value !== 5) {
    card.querySelector('.stars__rating').classList.remove('stars__rating--five');
    if (goods.rating.value === 1) {
      card.querySelector('.stars__rating').classList.add('stars__rating--one');
      card.querySelector('.stars__rating').textContent = 'Рейтинг: 1 звёзда';
    }
    if (goods.rating.value === 2) {
      card.querySelector('.stars__rating').classList.add('stars__rating--two');
      card.querySelector('.stars__rating').textContent = 'Рейтинг: 2 звёзды';
    }
    if (goods.rating.value === 3) {
      card.querySelector('.stars__rating').classList.add('stars__rating--three');
      card.querySelector('.stars__rating').textContent = 'Рейтинг: 3 звёзды';
    }
    if (goods.rating.value === 4) {
      card.querySelector('.stars__rating').classList.add('stars__rating--four');
      card.querySelector('.stars__rating').textContent = 'Рейтинг: 4 звёзды';
    }
  }
  var sugarContent = 'Без сахара';
  if (goods.nutritionFacts.sugar) {
    sugarContent = 'Содержит сахар';
  }
  card.querySelector('.card__characteristic').textContent = sugarContent + '. ' + goods.nutritionFacts.energy + ' ккал';
  card.querySelector('.card__composition-list').textContent = goods.nutritionFacts.contents;
  return card;
};
var renderCardOrder = function (goods) {
  var card = document.querySelector('#card-order')
    .content
    .querySelector('.goods_card')
    .cloneNode(true);
  card.querySelector('.card-order__title').textContent = goods.name;
  card.querySelector('.card-order__img').attributes.src.value = goods.picture;
  card.querySelector('.card-order__img').attributes.alt.value = goods.name;
  card.querySelector('.card-order__price').textContent = goods.price + ' ₽';
  return card;
};

var randomGoodsCatalog = getRandomListGoods(dataTemplateGoods, numberOfCatalogGoods);
var randomGoodsOrder = getRandomListGoods(dataTemplateGoods, numberOfOrderGoods);
var catalogCards = document.querySelector('.catalog__cards');
var orderCards = document.querySelector('.goods__cards');

catalogCards.classList.remove('catalog__cards--load');
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
catalogCards.appendChild(getFragmentOfArr(randomGoodsCatalog, renderCardCatalog));

orderCards.classList.remove('goods__cards--empty');
orderCards.querySelector('.goods__card-empty').classList.add('visually-hidden');
orderCards.appendChild(getFragmentOfArr(randomGoodsOrder, renderCardOrder));
