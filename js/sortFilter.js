'use strict';
(function () {
  var FILTER = document.querySelector('.catalog__sidebar');
  var RADIO = FILTER.querySelectorAll('.input-btn__input--radio');
  var CATALOG_CARDS = document.querySelector('.catalog__cards');
  var newArr;

  var removeFilterError = function () {
    var filterError = CATALOG_CARDS.querySelector('.catalog__empty-filter');
    filterError.removeEventListener('click', onShowAll);
    filterError.remove();
  };
  var onShowAll = function (evt) {
    evt.preventDefault();
    window.typeFilter.unchecked(window.data.goods);
  };

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
    render: function (arr) {
      var key;
      var filterError = CATALOG_CARDS.querySelector('.catalog__empty-filter');
      RADIO.forEach(function (it) {
        if (it.checked) {
          key = it.value;
        }
      });
      if (filterError === null) {
        var cards = CATALOG_CARDS.querySelectorAll('.catalog__card');
        cards.forEach(function (it) {
          it.remove();
        });
      } else {
        removeFilterError();
      }
      if (arr.length > 0) {
        var fragment = window.renderCard.catalog(filterMap[key](arr));
      } else {
        fragment = document.querySelector('#empty-filters').content.cloneNode(true);
        fragment.querySelector('.catalog__show-all').addEventListener('click', onShowAll);
      }
      CATALOG_CARDS.appendChild(fragment);
    },
    runRender: window.debounce(function (arr) {
      newArr = arr;
      window.sortFilter.render(newArr);
    })
  };
  var onSortGoodsChange = function () {
    window.sortFilter.runRender(window.data.filterGoods);
  };

  RADIO.forEach(function (it) {
    it.addEventListener('change', onSortGoodsChange);
  });
}());
