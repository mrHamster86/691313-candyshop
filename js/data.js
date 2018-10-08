'use strict';
(function () {
  var CATALOG_CARDS = document.querySelector('.catalog__cards');
  var MODAL_ERROR = document.querySelector('.modal--error');
  window.data = {
    goods: [],
    filterGoods: [],
    goodsList: {},
    price: []
  };

  var onLoadError = function (message) {
    window.modal.open(MODAL_ERROR, message);
  };
  var onLoadSuccess = function (data) {
    var priceArr = [];

    for (var i = 0; i < data.length; i++) {
      priceArr.push(data[i].price);
      window.data.goodsList[data[i].name] = data[i];
      window.renderFilter.calculateCount(data[i]);
    }

    window.data.price = [Math.min.apply(Math, priceArr), Math.max.apply(Math, priceArr)];
    window.data.goods = data;
    window.data.filterGoods = data;

    CATALOG_CARDS.classList.remove('catalog__cards--load');
    CATALOG_CARDS.querySelector('.catalog__load').classList.add('visually-hidden');

    window.sortFilter.render(window.data.goods);
    window.typeFilter.calculatePrice();
    window.renderFilter.renderCount();
  };
  window.load('https://js.dump.academy/candyshop/data', onLoadSuccess, onLoadError);
})();
