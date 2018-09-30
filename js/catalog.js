'use strict';
(function () {
  var catalogCards = document.querySelector('.catalog__cards');
  var goodsList = window.data.goodsList;
  var orderCards = document.querySelector('.goods__cards');

  var cbCatalogCards = function () {
    var fragment = window.renderCard.catalog(window.data.randomGoodsList);
    catalogCards.classList.remove('catalog__cards--load');
    catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
    catalogCards.appendChild(fragment);
  };

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

  cbCatalogCards();
})();
