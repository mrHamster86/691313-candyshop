var numberGoods = 26;
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
      length: 3
    }
  }
};

//Генератор случайных чисел
var getRandomNumber = function (min, max) {
  var randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));

  return randomNumber;
};

//Генератор случайных массивов с не повторяющимися элементами
var getRandomArr = function(templateArr, length) {
  var randomArr = [];

  for (var i = 0; i < length; i++) {
    var itemNumber = getRandomNumber(0, templateArr.length - 1);
    var randomArrElement = templateArr[itemNumber];
    randomArr.push(randomArrElement);
    templateArr.splice(itemNumber, 1);
  };

  return randomArr;
};

//Генератор случайного товара
var getRandomGood = function (dataGoods) {
  var ingredients = getRandomArr(dataGoodsTemplate.nutritionFacts.contents.name, dataGoodsTemplate.nutritionFacts.contents.length);
  var randomGood = {
    name: dataGoods.name[getRandomNumber(0, dataGoods.name.length)],
    picture: dataGoods.picture[getRandomNumber(0, dataGoods.picture.length)],
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
console.dir(getRandomGood(dataGoodsTemplate));
