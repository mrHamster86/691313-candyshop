'use strict';
(function () {
  var CATALOG_CARDS = document.querySelector('.catalog__cards');
  window.data = {
    goods: [],
    filterGoods: [],
    goodsList: {},
    price: []
  };

  var onLoadError = function (message) {
    var MODAL_ERROR = document.querySelector('.modal--error');
    MODAL_ERROR.classList.remove('modal--hidden');
    MODAL_ERROR.querySelector('.modal__message').textContent = message;
  };
  var onLoadSuccess = function (data) {
    var priceArr = [];
    for (var i = 0; i < data.length; i++) {
      priceArr.push(data[i].price);
      window.data.goodsList[data[i].name] = data[i];
    }
    window.data.price = [Math.min.apply(Math, priceArr), Math.max.apply(Math, priceArr)];
    window.data.goods = data;
    window.data.filterGoods = data;
    CATALOG_CARDS.classList.remove('catalog__cards--load');
    CATALOG_CARDS.querySelector('.catalog__load').classList.add('visually-hidden');
    window.sortFilter.runRender(window.data.goods);
    window.typeFilter.calculatePrice();
  };
  window.load('https://js.dump.academy/candyshop/data', onLoadSuccess, onLoadError);
})();
