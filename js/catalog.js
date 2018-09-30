'use strict';
(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var goodsList = window.data.goodsList;
  var orderCards = document.querySelector('.goods__cards');

  var onLoadError = function (message) {
    var modalError = document.querySelector('.modal--error');
    modalError.classList.remove('modal--hidden');
    modalError.querySelector('.modal__message').textContent = message;
  };
  var onLoadSuccess = function (data) {
    for (var i = 0; i < data.length; i++) {
      window.data.goodsList[data[i].name] = data[i];
    }
    var fragment = window.renderCard.catalog(data);
    catalogCards.classList.remove('catalog__cards--load');
    catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
    catalogCards.appendChild(fragment);
  };
  window.load('https://js.dump.academy/candyshop/data', onLoadSuccess, onLoadError);

  var onFavoriteBtnClick = function (favoriteBtn) {
    favoriteBtn.classList.toggle('card__btn-favorite--selected');
  };
  var onAddOrderClick = function (name) {
    var totalGoodsInOrder = window.orderSetup.totalGoodsInOrder;
    if (totalGoodsInOrder === 0) {
      window.orderForm.unlockOrderForm();
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
    } else if (isAddOrderBtn && goodsList[name].amount !== 0) {
      onAddOrderClick(name);
    }
  };

  window.catalog = {
    events: function (card) {
      card.addEventListener('click', onCardClick);
    }
  };
})();
