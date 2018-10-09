'use strict';
(function () {
  var orderCards = document.querySelector('.goods__cards');
  var setValue = function (name) {
    orderCards.querySelector('.card-order__count[name = "' + name + '"]').value = window.orderSetup.orderList[name].count;
  };
  var addOrderList = function (name) {
    window.orderSetup.orderList[name] = Object.assign({}, window.data.goodsList[name]);
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
        if (parseInt(arr[j], 10) !== 1) {
          result = parseInt(arr[i], 10);
        } else {
          result = parseInt(arr[i], 10) + 10;

        }
      } else {
        result = parseInt(arr, 10);
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
        orderCards.appendChild(window.renderCard.order(this.orderList[name]));
      } else if (this.orderList[name].count < window.data.goodsList[name].amount) {
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
      }
    },
    changeOrder: function (name, input) {
      if (input.value > window.data.goodsList[name].amount) {
        input.value = window.data.goodsList[name].amount;
      }
      if (input.value < 1) {
        input.value = 1;
      }
      if (!input.value) {
        input.value = this.orderList[name].count;
      }
      var difference = input.value - this.orderList[name].count;
      this.orderList[name].count = input.value;
      this.totalGoodsInOrder += difference;
      addBasket();
    }
  };
  var onCountInput = function (evt) {
    evt.target.value = evt.target.value.replace(/\D/g, '');
  };
  var onCountBlur = function (evt) {
    var name = evt.target.name;
    var input = evt.target;
    window.orderSetup.changeOrder(name, input);
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
      window.orderForm.lockAllOrderForm();
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
  window.orderSetup.events = function (card) {
    card.addEventListener('click', onCardClick);
    card.querySelector('.card-order__count').addEventListener('input', onCountInput);
    card.querySelector('.card-order__count').addEventListener('blur', onCountBlur);
  };
})();
