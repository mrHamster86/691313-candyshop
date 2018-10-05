'use strict';
(function () {
  var FILTER = document.querySelector('.catalog__sidebar');
  var RADIO = FILTER.querySelectorAll('.input-btn__input--radio');
  var CATALOG_CARDS = document.querySelector('.catalog__cards');

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
      }));
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
      var cards = CATALOG_CARDS.querySelectorAll('.catalog__card');
      cards.forEach(function (it) {
        it.remove();
      });
      RADIO.forEach(function (it) {
        if (it.checked) {
          key = it.value;
        }
      });
      var fragment = window.renderCard.catalog(filterMap[key](arr));
      CATALOG_CARDS.appendChild(fragment);
    }
  };
  var onSortGoodsChange = function () {
    window.sortFilter.runRender(window.data.filterGoods);
  };

  RADIO.forEach(function (it) {
    it.addEventListener('change', onSortGoodsChange);
  });
}());
