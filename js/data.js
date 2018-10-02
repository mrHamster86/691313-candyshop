'use strict';
(function () {
  var templateGoods = {
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

  var getRandomGoods = function (dataTemplate) {
    var ingredients = window.util.getRandomArr(dataTemplate.nutritionFacts.contents.name, dataTemplate.nutritionFacts.contents.number);
    var randomGoods = {
      name: window.util.getRandomElement(dataTemplate.name),
      picture: window.util.getRandomElement(dataTemplate.picture),
      amount: window.util.getRandomNumber(dataTemplate.amount.max),
      price: window.util.getRandomNumber(dataTemplate.price.min, dataTemplate.price.max),
      weight: window.util.getRandomNumber(dataTemplate.weight.min, dataTemplate.weight.max),
      rating: {
        value: window.util.getRandomNumber(dataTemplate.rating.value.min, dataTemplate.rating.value.max),
        number: window.util.getRandomNumber(dataTemplate.rating.number.min, dataTemplate.rating.number.max)
      },
      nutritionFacts: {
        sugar: window.util.getRandomNumber(0, 1) > 0,
        energy: window.util.getRandomNumber(dataTemplate.nutritionFacts.energy.min, dataTemplate.nutritionFacts.energy.max),
        contents: ingredients.join(', ')
      }
    };
    return randomGoods;
  };
  var getRandomListGoods = function (dataTemplate, lengthArr) {
    for (var i = 0; i < lengthArr; i++) {
      var goods = getRandomGoods(dataTemplate);
      window.data.randomGoodsList.push(goods);
      window.data.goodsList[goods.name] = window.data.randomGoodsList[i];
    }
  };
  window.data = {
    goodsList: {},
    randomGoodsList: []
  };
  // getRandomListGoods(templateGoods, numberOfCatalogGoods);
})();
