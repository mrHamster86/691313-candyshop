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

(function () {
  window.util = {
    getRandomNumber: function (a, b) {
      if (b) {
        var min = b < a ? b : a;
        var max = b < a ? a : b;
      } else {
        min = 0;
        max = a;
      }
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getParentHasClass: function (element, isHasClass) {
      element = element.parentElement;
      while (!element.classList.contains(isHasClass)) {
        element = element.parentElement;
        if (!element) {
          break;
        }
      }
      return element;
    },
    getElementHasText: function (elementClass, isTextContent) {
      var elementArr = document.querySelectorAll(elementClass);
      for (var i = 0; i < elementArr.length; i++) {
        if (elementArr[i].textContent === isTextContent) {
          var elementHasText = elementArr[i];
          break;
        }
      }
      return elementHasText;
    },
    getRandomElement: function (arr) {
      var randomElement = arr[this.getRandomNumber(arr.length - 1)];
      return randomElement;
    },
    getRandomArr: function (originalArr, lengthNewArr) {
      var copyArr = originalArr.slice();
      var newArr = [];
      for (var i = 0; i < lengthNewArr; i++) {
        var j = this.getRandomNumber(i, copyArr.length - 1);
        var temp = copyArr[i];
        copyArr[i] = copyArr[j];
        copyArr[j] = temp;
        newArr.push(copyArr[i]);
      }
      return newArr;
    }
  };
})();

(function () {
  var create = function () {
    return document.createDocumentFragment();
  };
  window.getFragment = {
    singl: function (object, renderFunction) {
      return create().appendChild(renderFunction(object));
    },
    arr: function (odjectsArr, renderFunction) {
      var fragment = create();
      for (var i = 0; i < odjectsArr.length; i++) {
        fragment.appendChild(renderFunction(odjectsArr[i]));
      }
      return fragment;
    }
  };
})();


(function () {
  var getRandomGoods = function (dataTemplate) {
    var ingredients = window.util.getRandomArr(dataTemplate.nutritionFacts.contents.name, dataTemplate.nutritionFacts.contents.number);
    var randomGoods = {
      name: window.util.getRandomElement(dataTemplate.name),
      picture: 'img/cards/' + window.util.getRandomElement(dataTemplate.picture),
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
  window.Data = {
    goodsList: {},
    randomGoodsList: [],
    getRandomListGoods: function (dataTemplate, lengthArr) {
      for (var i = 0; i < lengthArr; i++) {
        var goods = getRandomGoods(dataTemplate);
        this.randomGoodsList.push(goods);
        this.goodsList[goods.name] = this.randomGoodsList[i];
      }
      return this.randomGoodsList;
    }
  };
})();

(function () {
  window.renderCard = {
    catalog: function (goods) {
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
      window.eventsCatalog(card);
      return card;
    },
    order: function (goods) {
      var card = document.querySelector('#card-order')
        .content
        .querySelector('.goods_card')
        .cloneNode(true);
      card.querySelector('.card-order__title').textContent = goods.name;
      card.querySelector('.card-order__img').src = goods.picture;
      card.querySelector('.card-order__img').alt = goods.name;
      card.querySelector('.card-order__price').textContent = goods.price + ' ₽';
      card.querySelector('.card-order__count').name = goods.name;
      card.querySelector('.card-order__count').value = goods.count;
      window.eventsOrder(card);
      return card;
    }
  };
})();

(function () {
  var setValue = function (name) {
    orderCards.querySelector('.card-order__count[name = "' + name + '"]').value = window.orderSetup.orderList[name].count;
  };
  var addOrderList = function (name) {
    window.orderSetup.orderList[name] = Object.assign({}, window.Data.goodsList[name]);
    delete window.orderSetup.orderList[name].nutritionFacts;
    delete window.orderSetup.orderList[name].amount;
    delete window.orderSetup.orderList[name].rating;
  };
  var addBasket = function () {
    var basket = document.querySelector('.main-header__basket');
    var getLastNumber = function () {
      var i = 0;
      var j = 0;
      var result = 0;
      var arr = String(window.orderSetup.totalGoodsInOrder);
      if (arr.length > 1) {
        i = arr.length - 1;
        j = arr.length - 2;
        if (Number(arr[j]) !== 1) {
          result = Number(arr[i]);
        } else {
          result = Number(arr[i]) + 10;
        }
      } else {
        result = Number(arr);
      }
      return result;
    };
    switch (getLastNumber()) {
      case 1:
        basket.textContent = 'В корзине ' + window.orderSetup.totalGoodsInOrder + ' товар';
        break;
      case 2:
      case 3:
      case 4:
        basket.textContent = 'В корзине ' + window.orderSetup.totalGoodsInOrder + ' товара';
        break;
      default:
        basket.textContent = 'В корзине ' + window.orderSetup.totalGoodsInOrder + ' товаров';
    }
    if (window.orderSetup.totalGoodsInOrder === 0) {
      basket.textContent = 'В корзине ничего нет';
    }
  };
  window.orderSetup = {
    totalGoodsInOrder: 0,
    orderList: {},
    addOrder: function (name) {
      if (!this.orderList[name]) {
        addOrderList(name);
        this.orderList[name].count = 1;
        this.totalGoodsInOrder++;
        addBasket();
        orderCards.appendChild(window.getFragment.singl(this.orderList[name], window.renderCard.order));
      } else if (this.orderList[name].count < window.Data.goodsList[name].amount) {
        this.totalGoodsInOrder++;
        this.orderList[name].count++;
        setValue(name);
        addBasket();
      }
    },
    deleteCard: function (card, name) {
      this.totalGoodsInOrder -= this.orderList[name].count;
      addBasket();
      delete this.orderList[name];
      card.remove();
    },
    downOrder: function (card, name) {
      if (this.orderList[name].count > 1) {
        this.totalGoodsInOrder--;
        this.orderList[name].count--;
        addBasket();
        setValue(name);
      } else {
        this.deleteCard(card, name);
      }
    },
    changeOrder: function (name, evt) {
      if (evt.target.value > window.Data.goodsList[name].amount) {
        evt.target.value = window.Data.goodsList[name].amount;
      }
      if (evt.target.value < 0) {
        evt.target.value = 0;
      }
      if (!evt.target.value) {
        evt.target.value = this.orderList[name].count;
      }
      var difference = evt.target.value - this.orderList[name].count;
      this.orderList[name].count = evt.target.value;
      this.totalGoodsInOrder += difference;
      addBasket();
    }
  };
})();

(function () {
  window.eventsCatalog = function (card) {
    card.addEventListener('click', onCardClick);
  };
  var onFavoriteBtnClick = function (favoriteBtn) {
    favoriteBtn.classList.toggle('card__btn-favorite--selected');
  };
  var onAddOrderClick = function (name) {
    if (window.orderSetup.totalGoodsInOrder === 0) {
      window.eventsOrderForm.unlockOrderForm();
      orderCards.classList.toggle('goods__cards--empty');
      orderCards.querySelector('.goods__card-empty').classList.toggle('visually-hidden');
    }
    window.orderSetup.addOrder(name);
  };
  var onCardClick = function (evt) {
    evt.preventDefault();
    var name = evt.currentTarget.querySelector('.card__title').textContent;
    var isFavoriteBtn = evt.target.classList.contains('card__btn-favorite');
    var isAddOrderBtn = evt.target.classList.contains('card__btn');
    if (isFavoriteBtn) {
      onFavoriteBtnClick(evt.target);
    }
    if (isAddOrderBtn && window.Data.goodsList[name].amount !== 0) {
      onAddOrderClick(name);
    }
  };
})();

(function () {
  window.eventsOrder = function (card) {
    card.addEventListener('click', onCardClick);
    card.querySelector('.card-order__count').addEventListener('input', onCountInput);
    card.querySelector('.card-order__count').addEventListener('blur', onCountBlur);
  };
  var onCountInput = function (evt) {
    evt.target.value = evt.target.value.replace(/\D/g, '');
  };
  var onCountBlur = function (evt) {
    var name = evt.target.name;
    window.orderSetup.changeOrder(name, evt);
  };
  var onIncreaseBtnClick = function (name) {
    window.orderSetup.addOrder(name);
  };
  var onDecreaseBtnClick = function (card, name) {
    window.orderSetup.downOrder(card, name);
  };
  var onCloseBtnClick = function (card, name) {
    window.orderSetup.deleteCard(card, name);
    if (window.orderSetup.totalGoodsInOrder === 0) {
      window.eventsOrderForm.lockAllOrderForm();
      orderCards.classList.toggle('goods__cards--empty');
      orderCards.querySelector('.goods__card-empty').classList.toggle('visually-hidden');
    }
  };
  var onCardClick = function (evt) {
    evt.preventDefault();
    var card = evt.currentTarget;
    var name = evt.currentTarget.querySelector('.card-order__title').textContent;
    var isCloseBtn = evt.target.classList.contains('card-order__close');
    var isIncreaseBtn = evt.target.classList.contains('card-order__btn--increase');
    var isDecreaseBtn = evt.target.classList.contains('card-order__btn--decrease');
    if (isCloseBtn) {
      onCloseBtnClick(card, name);
    }
    if (isIncreaseBtn) {
      onIncreaseBtnClick(name);
    }
    if (isDecreaseBtn) {
      onDecreaseBtnClick(card, name);
    }
  };
})();

(function () {
  var buy = document.querySelector('.buy');
  var contact = buy.querySelector('.contact-data');
  var payment = buy.querySelector('.payment__inner');
  var paymentInputCard = payment.querySelector('.payment__card-wrap').querySelectorAll('input');
  var paymentCardBtn = payment.querySelector('#payment__card');
  var paymentCashBtn = payment.querySelector('#payment__cash');
  var deliver = buy.querySelector('.deliver');
  var deliverStoresFieldset = deliver.querySelector('.deliver__stores');
  var deliverAddressFieldset = deliver.querySelector('.deliver__entry-fields-wrap');
  var deliverStoreBtn = deliver.querySelector('#deliver__store');
  var deliverCourierBtn = deliver.querySelector('#deliver__courier');
  var buySubmitBtn = buy.querySelector('.buy__submit-btn');

  var toggleDisabledForm = function (node, boolean) {
    for (var i = 0; i < node.length; i++) {
      node[i].disabled = boolean;
    }
  };
  window.eventsOrderForm = {
    lockAllOrderForm: function () {
      toggleDisabledForm(contact.querySelectorAll('input'), true);
      toggleDisabledForm(payment.querySelectorAll('input'), true);
      toggleDisabledForm(deliver.querySelectorAll('.deliver__toggle input'), true);
      deliverStoresFieldset.disabled = true;
      deliverAddressFieldset.disabled = true;
      buySubmitBtn.disabled = true;
    },
    unlockOrderForm: function () {
      toggleDisabledForm(contact.querySelectorAll('input'), false);
      toggleDisabledForm(payment.querySelectorAll('.payment__method input'), false);
      toggleDisabledForm(deliver.querySelectorAll('.deliver__toggle input'), false);
      if (paymentCardBtn.checked) {
        toggleDisabledForm(paymentInputCard, false);
        paymentCashBtn.addEventListener('click', onPaymentTogleClick);
      }
      if (deliverStoreBtn.checked) {
        deliverStoresFieldset.disabled = false;
        deliverCourierBtn.addEventListener('click', onDeliverTogleClick);
      } else {
        deliverAddressFieldset.disabled = false;
      }
      buySubmitBtn.disabled = false;
    }
  };
  window.eventsOrderForm.lockAllOrderForm();
  var onPaymentTogleClick = function (evt) {
    payment.querySelector('.payment__cash-wrap').classList.toggle('visually-hidden');
    payment.querySelector('.payment__card-wrap').classList.toggle('visually-hidden');
    if (evt.target === paymentCardBtn) {
      toggleDisabledForm(paymentInputCard, false);
      paymentCardBtn.removeEventListener('click', onPaymentTogleClick);
      paymentCashBtn.addEventListener('click', onPaymentTogleClick);
    } else {
      toggleDisabledForm(paymentInputCard, true);
      paymentCashBtn.removeEventListener('click', onPaymentTogleClick);
      paymentCardBtn.addEventListener('click', onPaymentTogleClick);
    }
  };
  var onDeliverTogleClick = function (evt) {
    deliver.querySelector('.deliver__courier').classList.toggle('visually-hidden');
    deliver.querySelector('.deliver__store').classList.toggle('visually-hidden');
    if (evt.target === deliverStoreBtn) {
      deliverStoresFieldset.disabled = false;
      deliverAddressFieldset.disabled = true;
      deliverStoreBtn.removeEventListener('click', onDeliverTogleClick);
      deliverCourierBtn.addEventListener('click', onDeliverTogleClick);
    } else {
      deliverStoresFieldset.disabled = true;
      deliverAddressFieldset.disabled = false;
      deliverCourierBtn.removeEventListener('click', onDeliverTogleClick);
      deliverStoreBtn.addEventListener('click', onDeliverTogleClick);
    }
  };
  var nameInput = contact.querySelector('#contact-data__name');
  var cardNumber = payment.querySelector('#payment__card-number');
  var cardDate = payment.querySelector('#payment__card-date');
  var cardHolder = payment.querySelector('#payment__cardholder');
  var cardCvc = payment.querySelector('#payment__card-cvc');
  var BACK_SPACE = 8;
  var letterReplacement = function (evt, invalidCharacter) {
    if (invalidCharacter.test(evt.target.value)) {
      evt.target.value = evt.target.value.replace(invalidCharacter, '');
    }
  };
  nameInput.addEventListener('invalid', function () {
    if (nameInput.validity.tooShort) {
      nameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (nameInput.validity.tooLong) {
      nameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity('Обязательное поле');
    } else {
      nameInput.setCustomValidity('');
    }
  });
  nameInput.addEventListener('input', function (evt) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  var numberValidity = function () {
    var sum = 0;
    var arr = cardNumber.value.replace(/\s/g, '').split('');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = +arr[i];
      if (arr[i] % 2 !== 0) {
        arr[i] *= 2;
        if (arr[i] >= 10) {
          arr[i] -= 9;
        }
      }
      sum += arr[i];
    }
    return sum % 10 === 0 && sum !== 0;
  };
  var dateValidity = function () {
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth();
    var dateArr = cardDate.value.split('/');
    var month = +dateArr[0];
    var year = +dateArr[1];
    return month > currentMonth && (2000 + year) >= currentYear;
  };
  var holderValidity = function () {
    var length = cardHolder.value.length;
    return length > 4 && length < 25;
  };
  var cvcValidity = function () {
    var length = cardCvc.value.length;
    return length === 3;
  };
  var onCardChange = function () {
    var cardStatus = payment.querySelector('.payment__card-status');
    if (numberValidity() && dateValidity() && cvcValidity() && holderValidity()) {
      cardStatus.textContent = 'Одобрен';
      window.eventsOrderForm.cardStatusValidity = true;
    } else {
      cardStatus.textContent = 'Неизвестен';
      window.eventsOrderForm.cardStatusValidity = false;
    }
  };

  cardNumber.addEventListener('invalid', function () {
    if (cardNumber.validity.tooShort) {
      cardNumber.setCustomValidity('Введите 16-ти значный номер карты');
    } else if (cardNumber.validity.valueMissing) {
      cardNumber.setCustomValidity('Обязательное поле');
    } else if (!numberValidity()) {
      cardNumber.setCustomValidity('Похоже вы ошиблись при вводе номера карты');
    } else {
      cardNumber.setCustomValidity('');
    }
  });
  cardNumber.addEventListener('input', function (evt) {
    var invalidCharacter = /[-_&%$^\/|#+=.;":'~`<>?!a-zA-Zа-яА-Я]/;
    letterReplacement(evt, invalidCharacter);
    if (evt.target.value.length === 4 || evt.target.value.length === 9 || evt.target.value.length === 14) {
      evt.target.value += ' ';
    }
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите 16-ти значный номер карты');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  cardNumber.addEventListener('keydown', function (evt) {
    if (evt.target.value.length === 5 || evt.target.value.length === 10 || evt.target.value.length === 15) {
      if (evt.keyCode === BACK_SPACE) {
        evt.preventDefault();
        evt.target.value = evt.target.value.substring(0, evt.target.value.length - 2);
      }
    }
  });

  cardDate.addEventListener('invalid', function () {
    if (cardDate.validity.tooShort) {
      cardDate.setCustomValidity('Укажите срок действия карты мм/гг');
    } else if (cardDate.validity.valueMissing) {
      cardDate.setCustomValidity('Обязательное поле');
    } else if (!dateValidity()) {
      cardDate.setCustomValidity('Ваша карта просрочена');
    } else {
      cardDate.setCustomValidity('');
    }
  });
  cardDate.addEventListener('input', function (evt) {
    var invalidCharacter = /[-_&%$^\|#+=.;":'~`<>?!a-zA-Zа-яА-Я]/;
    letterReplacement(evt, invalidCharacter);
    if (evt.target.value.length === 2) {
      evt.target.value += '/';
    }
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Укажите срок действия карты мм/гг');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  cardDate.addEventListener('keydown', function (evt) {
    if (evt.target.value.length === 3) {
      if (evt.keyCode === BACK_SPACE) {
        evt.preventDefault();
        evt.target.value = evt.target.value.substring(0, evt.target.value.length - 2);
      }
    }
  });

  cardCvc.addEventListener('invalid', function () {
    if (cardCvc.validity.tooShort) {
      cardCvc.setCustomValidity('Введите CVC, это 3-и цифры указанные на обороте карты');
    } else if (cardCvc.validity.valueMissing) {
      cardCvc.setCustomValidity('Введите CVC, это 3-и цифры указанные на обороте карты');
    } else {
      cardCvc.setCustomValidity('');
    }
  });
  cardCvc.addEventListener('input', function (evt) {
    var invalidCharacter = /[-_&%$^\|#+=.;":'~`<>?!a-zA-Zа-яА-Я]/;
    letterReplacement(evt, invalidCharacter);
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите CVC, это 3-и цифры указанные на обороте карты');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  cardHolder.addEventListener('invalid', function () {
    if (cardHolder.validity.tooShort) {
      cardHolder.setCustomValidity('Введите имя держателя как указано на карте');
    } else if (cardHolder.validity.valueMissing) {
      cardHolder.setCustomValidity('Обязательное поле');
    } else {
      cardHolder.setCustomValidity('');
    }
  });
  cardHolder.addEventListener('input', function (evt) {
    var invalidCharacter = /[-_&%$^\|#+=.;":'~`<>?!0-9]/;
    letterReplacement(evt, invalidCharacter);
    evt.target.value = evt.target.value.toUpperCase();
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите имя держателя как указано на карте');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  cardNumber.addEventListener('blur', onCardChange);
  cardDate.addEventListener('blur', onCardChange);
  cardCvc.addEventListener('blur', onCardChange);
  cardHolder.addEventListener('input', onCardChange);

  var form = buy.querySelector('form');
  form.addEventListener('submit', function (evt) {
    var cardStatusValidity = window.eventsOrderForm.cardStatusValidity;
    if (!cardStatusValidity) {
      evt.preventDefault();
      if (!numberValidity()) {
        cardNumber.setCustomValidity('Проверьте номер карты');
      } else if (!dateValidity()) {
        cardDate.setCustomValidity('Проверьте срок действия вашей карты');
      }
    }
  });
}());

(function () {
  var range = document.querySelector('.range');
  var scope = range.querySelector('.range__filter');
  var leftPin = range.querySelector('.range__btn--left');
  var rightPin = range.querySelector('.range__btn--right');
  var fillLine = range.querySelector('.range__fill-line');

  var pinWidth = leftPin.offsetWidth;
  var pinCenter = pinWidth / 2;

  var calculatePrice = function () {
    var min = range.querySelector('.range__price--min');
    var max = range.querySelector('.range__price--max');
    var scopeWidth = scope.offsetWidth - pinWidth;
    min.textContent = Math.round(leftPin.offsetLeft * 100 / scopeWidth) + '%';
    max.textContent = Math.round(rightPin.offsetLeft * 100 / scopeWidth) + '%';
  };

  range.addEventListener('mousedown', function (evt) {

    var leftScope = 0;
    var rightScope = scope.offsetWidth - pinWidth;

    var startCoords = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;

      var calculateNewCoords = function (targetPin) {
        return targetPin.offsetLeft - shift;
      }
      if (evt.target === leftPin) {
        var newCoords = calculateNewCoords(leftPin);
        rightScope = rightPin.offsetLeft - pinWidth;
        if (newCoords >= leftScope && newCoords <= rightScope) {
          leftPin.style.left = newCoords + 'px';
          fillLine.style.left = newCoords + 'px';
        }
      } else if (evt.target === rightPin) {
        var newCoords = calculateNewCoords(rightPin);
        leftScope = leftPin.offsetLeft + pinWidth;
        if (newCoords <= rightScope && newCoords >= leftScope) {
          rightPin.style.right = rightScope - newCoords + 'px';
          fillLine.style.right = rightScope - newCoords + 'px';
        }
      }
      calculatePrice();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  calculatePrice();
}());


var randomGoodsCatalog = window.Data.getRandomListGoods(dataTemplateGoods, numberOfCatalogGoods);
catalogCards.classList.remove('catalog__cards--load');
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
var fragment = window.getFragment.arr(randomGoodsCatalog, window.renderCard.catalog);
catalogCards.appendChild(fragment);

