'use strict';
(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  window.data = {
    goods: [],
    filterGoods: [],
    goodsList: {}
  };

  var onLoadError = function (message) {
    var modalError = document.querySelector('.modal--error');
    modalError.classList.remove('modal--hidden');
    modalError.querySelector('.modal__message').textContent = message;
  };
  var onLoadSuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.data.goodsList[data[i].name] = data[i];
    }
    window.data.goods = data;
    window.data.filterGoods = data;
    catalogCards.classList.remove('catalog__cards--load');
    catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
    window.sortFilter.runRender(window.data.goods);
    window.calculateCount();
  };
  window.load('https://js.dump.academy/candyshop/data', onLoadSuccess, onLoadError);
})();
