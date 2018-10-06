'use strict';
(function () {
  var render = {
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
      card.querySelector('.card__img').attributes.src.value = 'img/cards/' + goods.picture;
      card.querySelector('.card__img').attributes.alt.value = goods.name;
      card.querySelector('.card__price').innerHTML = goods.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + goods.weight + ' Г</span>';
      card.querySelector('.star__count').textContent = '(' + goods.rating.number + ')';
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
      var isFavorite = window.typeFilter.favoriteGoods.some(function (i) {
        return goods.name === i;
      });
      if (isFavorite) {
        card.querySelector('.card__btn-favorite').classList.add('card__btn-favorite--selected');
      }
      card.querySelector('.card__characteristic').textContent = sugarContent + '. ' + goods.nutritionFacts.energy + ' ккал';
      card.querySelector('.card__composition-list').textContent = goods.nutritionFacts.contents;
      window.catalog.events(card);
      return card;
    },
    order: function (goods) {
      var card = document.querySelector('#card-order')
        .content
        .querySelector('.goods_card')
        .cloneNode(true);
      card.querySelector('.card-order__title').textContent = goods.name;
      card.querySelector('.card-order__img').src = 'img/cards/' + goods.picture;
      card.querySelector('.card-order__img').alt = goods.name;
      card.querySelector('.card-order__price').textContent = goods.price + ' ₽';
      card.querySelector('.card-order__count').name = goods.name;
      card.querySelector('.card-order__count').value = goods.count;
      window.orderSetup.events(card);
      return card;
    }
  };
  var createFragment = function () {
    return document.createDocumentFragment();
  };
  var getFragment = {
    singl: function (object, renderFunction) {
      return createFragment().appendChild(renderFunction(object));
    },
    arr: function (odjectsArr, renderFunction) {
      var fragment = createFragment();
      for (var i = 0; i < odjectsArr.length; i++) {
        fragment.appendChild(renderFunction(odjectsArr[i]));
      }
      return fragment;
    }
  };
  window.renderCard = {
    order: function (goods) {
      return getFragment.singl(goods, render.order);
    },
    catalog: function (goodsArr) {
      return getFragment.arr(goodsArr, render.catalog);
    }
  };
})();
