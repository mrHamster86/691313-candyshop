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
var catalogCards = document.querySelector('.catalog__cards');
var orderCards = document.querySelector('.goods__cards');
var payment = document.querySelector('.payment__inner');
var paymentToggle = payment.querySelector('.toggle-btn');
var deliver = document.querySelector('.deliver');
var deliverToggle = deliver.querySelector('.toggle-btn');

var getRandomNumber = function (a, b) {
  if (b) {
    var min = b < a ? b : a;
    var max = b < a ? a : b;
  } else {
    min = 0;
    max = a;
  }
  var randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return randomNumber;
};
var getRandomElement = function (arr) {
  var randomElement = arr[getRandomNumber(arr.length - 1)];
  return randomElement;
};
var getRandomArr = function (originalArr, lengthArr) {
  var copyArr = originalArr.slice();
  var newArr = [];
  for (var i = 0; i < lengthArr; i++) {
    var j = getRandomNumber(i, copyArr.length - 1);
    var temp = copyArr[i];
    copyArr[i] = copyArr[j];
    copyArr[j] = temp;
    newArr.push(copyArr[i]);
  }
  return newArr;
};
var getElementNumber = function (arr, name) {
  for (var i = 0; i < arr.length; i++) {
    if (name === arr[i].name) {
      var elementId = i;
      break;
    }
  }
  return elementId;
};
var getFragment = function (object, renderFunction) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderFunction(object));
  return fragment;
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
    name: getRandomElement(dataTemplate.name),
    picture: 'img/cards/' + getRandomElement(dataTemplate.picture),
    amount: getRandomNumber(dataTemplate.amount.max),
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
    },
    count: 0
  };
  return randomGoods;
};
var goodsList = {};
var getRandomListGoods = function (dataTemplate, lengthArr) {
  var randomGoodsList = [];
  for (var i = 0; i < lengthArr; i++) {
    var goods = getRandomGoods(dataTemplate);
    randomGoodsList.push(goods);
    goodsList[goods.name] = randomGoodsList[i];
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
    switch (goods.amount) {
      case 0:
        card.classList.add('card--soon');
        break;
      default:
        card.classList.add('card--little');
    }
  }
  card.querySelector('.card__title').textContent = goods.name;
  card.querySelector('.card__img').attributes.src.value = goods.picture;
  card.querySelector('.card__img').attributes.alt.value = goods.name;
  card.querySelector('.card__price').innerHTML = goods.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + goods.weight + ' Г</span>';
  if (goods.rating.value !== 5) {
    card.querySelector('.stars__rating').classList.remove('stars__rating--five');
    switch (goods.rating.value) {
      case 1:
        card.querySelector('.stars__rating').classList.add('stars__rating--one');
        card.querySelector('.stars__rating').textContent = 'Рейтинг: 1 звёзда';
        break;
      case 2:
        card.querySelector('.stars__rating').classList.add('stars__rating--two');
        card.querySelector('.stars__rating').textContent = 'Рейтинг: 2 звёзды';
        break;
      case 3:
        card.querySelector('.stars__rating').classList.add('stars__rating--three');
        card.querySelector('.stars__rating').textContent = 'Рейтинг: 3 звёзды';
        break;
      case 4:
        card.querySelector('.stars__rating').classList.add('stars__rating--four');
        card.querySelector('.stars__rating').textContent = 'Рейтинг: 4 звёзды';
        break;
    }
  }
  var sugarContent = 'Без сахара';
  if (goods.nutritionFacts.sugar) {
    sugarContent = 'Содержит сахар';
  }
  card.querySelector('.card__characteristic').textContent = sugarContent + '. ' + goods.nutritionFacts.energy + ' ккал';
  card.querySelector('.card__composition-list').textContent = goods.nutritionFacts.contents;
  card.addEventListener('click', function (evt) {
    evt.preventDefault();
    var name = goods.name;
    var isFavoriteBtn = evt.target.classList.contains('card__btn-favorite');
    var isAddOrderBtn = evt.target.classList.contains('card__btn');
    if (isFavoriteBtn) {
      onFavoriteBtnClick(evt.target);
    }
    if (isAddOrderBtn) {
      if (goods.amount !== 0) {
        onAddOrderClick(name);
      }
    }
  });
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
  card.querySelector('.card-order__count').value = goods.count;
  card.querySelector('.card-order__count').addEventListener('input', function (evt) {
    this.value = this.value.replace(/\D/g, '');
    if (this.value > goods.amount) {
      alert('Изивните, у нас нет ' + this.value + ' шт. Возмите ' + goods.amount + ' шт.');
      this.value = goods.amount;
    }
    if (this.value < 0 || !this.value) {
      this.value = 0;
    }
    goods.count = this.value;
  });
  card.addEventListener('click', function (evt) {
    evt.preventDefault();
    var name = goods.name;
    var isCloseBtn = evt.target.classList.contains('card-order__close');
    var isIncreaseBtn = evt.target.classList.contains('card-order__btn--increase');
    var isDecreaseBtn = evt.target.classList.contains('card-order__btn--decrease');
    if (isCloseBtn) {
      onCloseBtnClick(card, name);
    }
    if (isIncreaseBtn) {
      onIncreaseBtnClick(card, name);
    }
    if (isDecreaseBtn) {
      onDecreaseBtnClick(card, name);
    }
  });
  return card;
};

var randomGoodsCatalog = getRandomListGoods(dataTemplateGoods, numberOfCatalogGoods);

catalogCards.classList.remove('catalog__cards--load');
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
catalogCards.appendChild(getFragmentOfArr(randomGoodsCatalog, renderCardCatalog));

var onFavoriteBtnClick = function (favoriteBtn) {
  if (!favoriteBtn.classList.contains('card__btn-favorite--selected')) {
    favoriteBtn.classList.add('card__btn-favorite--selected');
  } else {
    favoriteBtn.classList.remove('card__btn-favorite--selected');
  }
};

var addGoodsInOrder = function (name) {
  goodsList[name].count++;
  if (goodsList[name].count === 1) {
    orderCards.appendChild(getFragment(goodsList[name], renderCardOrder));
  }
  if (goodsList[name].count <= goodsList[name].amount) {

  } else {
    alert('Изивните, у нас больше нет. Возмите ' + goodsList[name].amount + ' шт.');
  }
};

var onAddOrderClick = function (name) {
  if (orderCards.classList.contains('goods__cards--empty')) {
    orderCards.classList.remove('goods__cards--empty');
    orderCards.querySelector('.goods__card-empty').classList.add('visually-hidden');
  }
  addGoodsInOrder(name);
};
var onCloseBtnClick = function (card, name) {
  var orderList = orderCards.querySelectorAll('.goods_card');
  if (orderList.length === 1) {
    orderCards.classList.add('goods__cards--empty');
    orderCards.querySelector('.goods__card-empty').classList.remove('visually-hidden');
  }
  goodsList[name].count = 0;
  card.remove();
};
var onIncreaseBtnClick = function (card, name) {
  if (goodsList[name].count < goodsList[name].amount) {
    goodsList[name].count++;
    card.querySelector('.card-order__count').value = goodsList[name].count;
  } else {
    alert('Изивните, у нас больше нет. Возмите ' + goodsList[name].amount + ' шт.');
  }
};
var onDecreaseBtnClick = function (card, name) {
  if (goodsList[name].count > 0) {
    goodsList[name].count--;
    card.querySelector('.card-order__count').value = goodsList[name].count;
  }
};

var onPayCardBtnClick = function () {
  payment.querySelector('.payment__cash-wrap').classList.add('visually-hidden');
  payment.querySelector('.payment__card-wrap').classList.remove('visually-hidden');
  paymentToggle.querySelector('label[for = "payment__cash"]').addEventListener('click', onPayCashBtnClick);
  paymentToggle.querySelector('label[for = "payment__card"]').removeEventListener('click', onPayCardBtnClick);
};
var onPayCashBtnClick = function () {
  payment.querySelector('.payment__card-wrap').classList.add('visually-hidden');
  payment.querySelector('.payment__cash-wrap').classList.remove('visually-hidden');
  paymentToggle.querySelector('label[for = "payment__card"]').addEventListener('click', onPayCardBtnClick);
  paymentToggle.querySelector('label[for = "payment__cash"]').removeEventListener('click', onPayCashBtnClick);
};
paymentToggle.querySelector('label[for = "payment__cash"]').addEventListener('click', onPayCashBtnClick);

var onDeliverStoreBtnClick = function () {
  deliver.querySelector('.deliver__courier').classList.add('visually-hidden');
  deliver.querySelector('.deliver__store').classList.remove('visually-hidden');
  deliverToggle.querySelector('label[for = "deliver__courier"]').addEventListener('click', onDeliverCourierClick);
  deliverToggle.querySelector('label[for = "deliver__store"]').removeEventListener('click', onDeliverStoreBtnClick);
};
var onDeliverCourierClick = function () {
  deliver.querySelector('.deliver__store').classList.add('visually-hidden');
  deliver.querySelector('.deliver__courier').classList.remove('visually-hidden');
  deliverToggle.querySelector('label[for = "deliver__store"]').addEventListener('click', onDeliverStoreBtnClick);
  deliverToggle.querySelector('label[for = "deliver__courier"]').removeEventListener('click', onDeliverCourierClick);
};
deliverToggle.querySelector('label[for = "deliver__courier"]').addEventListener('click', onDeliverCourierClick);
