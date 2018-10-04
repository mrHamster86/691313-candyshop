'use strict';
(function () {
  var catalogFilter = document.querySelector('.catalog__sidebar');
  var catalogCards = document.querySelector('.catalog__cards');
  var filterMap = {
    popular: function (arr) {
      return (arr.sort(function (a, b) {
        if (a.rating.number < b.rating.number) {
          return 1;
        }
        if (a.rating.number > b.rating.number) {
          return -1;
        }
        return 0;
      }));;
    },
    expensive: function (arr) {
      return (arr.sort(function (a, b) {
        if (a.price < b.price) {
          return 1;
        }
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      }));
    },
    cheep: function (arr) {
      return (arr.sort(function (a, b) {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      }));
    },
    rating: function (arr) {
      return (arr.sort(function (a, b) {
        if (a.rating.value < b.rating.value) {
          return 1;
        }
        if (a.rating.value > b.rating.value) {
          return -1;
        }
        return 0;
      }));
    }
  };
  window.sortFilter = {
    runRender: function (arr) {
      var key;
      var cards = catalogCards.querySelectorAll('.catalog__card');
      cards.forEach(function (it) {
        it.remove();
      });
      catalogFilter.querySelectorAll('.input-btn__input--radio').forEach(function (it) {
        if (it.checked === true) {
          key = it.value;
        }
      });
      var fragment = window.renderCard.catalog(filterMap[key](arr));
      catalogCards.appendChild(fragment);
    }
  };
  var onSortGoodsChange = function (evt) {
    window.sortFilter.runRender(window.data.filterGoods);
  };

  catalogFilter.querySelector('#filter-popular').addEventListener('change', onSortGoodsChange);
  catalogFilter.querySelector('#filter-expensive').addEventListener('change', onSortGoodsChange);
  catalogFilter.querySelector('#filter-cheep').addEventListener('change', onSortGoodsChange);
  catalogFilter.querySelector('#filter-rating').addEventListener('change', onSortGoodsChange);
}());
