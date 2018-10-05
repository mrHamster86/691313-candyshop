'use strict';
(function () {
  var orderCards = document.querySelector('.goods__cards');

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
    } else if (isAddOrderBtn && window.data.goodsList[name].amount !== 0) {
      onAddOrderClick(name);
    }
  };

  window.catalog = {
    events: function (card) {
      card.addEventListener('click', onCardClick);
    }
  };
})();
