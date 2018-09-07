var dataGoodsTemplate = {
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
var lengthListGoods = 26;

//Генератор случайных чисел
var getRandomNumber = function (min, max) {
  var randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return randomNumber;
};

//Генератор случайного массива из массива, с не повторяющимися элементами
var getRandomArr = function (arr, lengthArr) {
  var copyArr = arr.slice();
  var newArr = [];
  for (var i = 0; i < lengthArr; i++) {
    var itemNumber = getRandomNumber(0, copyArr.length - 1);
    var randomArrElement = copyArr[itemNumber];
    newArr.push(randomArrElement);
    copyArr.splice(itemNumber, 1);
  }
  return newArr;
};

//Генератор случайного товара
var getRandomGood = function (dataGoods) {
  var ingredients = getRandomArr(dataGoods.nutritionFacts.contents.name, dataGoods.nutritionFacts.contents.number);
  var randomGood = {
    name: dataGoods.name[getRandomNumber(0, dataGoods.name.length - 1)],
    picture: dataGoods.picture[getRandomNumber(0, dataGoods.picture.length - 1)],
    amount: getRandomNumber(dataGoods.amount.min, dataGoods.amount.max),
    price: getRandomNumber(dataGoods.price.min, dataGoods.price.max),
    weight: getRandomNumber(dataGoods.weight.min, dataGoods.weight.max),
    rating: {
      value: getRandomNumber(dataGoods.rating.value.min, dataGoods.rating.value.max),
      number: getRandomNumber(dataGoods.rating.number.min, dataGoods.rating.number.max)
    },
    nutritionFacts: {
      sugar: getRandomNumber(0, 1) > 0,
      energy: getRandomNumber(dataGoods.nutritionFacts.energy.min, dataGoods.nutritionFacts.energy.max),
      contents: ingredients.join(', ')
    }
  };
  return randomGood;
};

//создаю список случайных товаров длинной lengthListGoods
var getGoodsList = function (lengthArr) {
  var goodList = [];
  for (var i = 0; i < lengthArr; i++) {
    var good = getRandomGood(dataGoodsTemplate);
    goodList.push(good);
  }
  return goodList;
};
var goodsList = getGoodsList(lengthListGoods);

console.dir(goodsList);
