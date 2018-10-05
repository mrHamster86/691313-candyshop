'use strict';
(function () {
  var FILTER = document.querySelector('.catalog__sidebar');
  var CHECKBOX = FILTER.querySelectorAll('.input-btn__input--checkbox');
  var RANGE = FILTER.querySelector('.range');
  var filterType = [];
  var filterSugarGluten = [];
  var filterVegetarian = [];
  var filterPrice = [];
  var filterResults = [];

  window.typeFilter = {
    calculatePrice: function () {
      var range = window.data.price[1] - window.data.price[0];
      var MIN = FILTER.querySelector('.range__price--min');
      var MAX = FILTER.querySelector('.range__price--max');
      filterPrice = [Math.round(range * window.slider.left), Math.round(range * window.slider.right)];
      MIN.textContent = filterPrice[0];
      MAX.textContent = filterPrice[1];
    }
  };

  var customiseFilters = function (target) {
    var key = target.value;
    var typeMap = {
      'icecream': 'Мороженое',
      'soda': 'Газировка',
      'gum': 'Жевательная резинка',
      'marmalade': 'Мармелад',
      'marshmallows': 'Зефир'
    };
    var nutritionMap = {
      'sugar-free': 'sugar',
      'gluten-free': 'gluten'
    };
    var isKeyForMap = function (it) {
      return key === it;
    };
    if (Object.keys(typeMap).some(isKeyForMap)) {
      if (target.checked) {
        filterType.push(typeMap[key]);
      } else {
        filterType.splice(filterType.indexOf(typeMap[key]), 1);
      }
    }
    if (Object.keys(nutritionMap).some(isKeyForMap)) {
      if (target.checked) {
        filterSugarGluten.push(nutritionMap[key]);
      } else {
        filterSugarGluten.splice(filterSugarGluten.indexOf(nutritionMap[key]), 1);
      }
    }
    if (key === 'vegetarian') {
      if (target.checked) {
        filterVegetarian.push(key);
      } else {
        filterVegetarian.splice(filterVegetarian.indexOf(key), 1);
      }
    }
  };

  var unchecked = function (target) {
    CHECKBOX.forEach(function (it) {
      if (it !== target) {
        it.checked = false;
      }
    });
    filterType = [];
    filterSugarGluten = [];
    filterVegetarian = [];
    window.data.filterGoods = filterResults;
    window.sortFilter.runRender(window.data.filterGoods);
  };

  var getGoodsAmount = function (arr) {
    filterResults = arr.filter(function (it) {
      return it.amount > 0;
    });
  };
  var getGoodsFavorite = function (arr) {
    filterResults = arr.filter(function (it) {
      return it.favorite === true;
    });
  };
  var getGoodsType = function (arr) {
    if (filterType.length) {
      filterResults = arr.filter(function (it) {
        return filterType.some(function (i) {
          return it.kind === i;
        });
      });
    }
  };
  var getGoodsSugarGluten = function (arr) {
    if (filterSugarGluten.length) {
      filterResults = arr.filter(function (it) {
        return filterSugarGluten.every(function (i) {
          return !it.nutritionFacts[i];
        });
      });
    }
  };
  var getGoodsVegetarian = function (arr) {
    if (filterVegetarian.length) {
      filterResults = arr.filter(function (it) {
        return it.nutritionFacts['vegetarian'];
      });
    }
  };
  var getGoodsPprice = function (arr) {
    filterResults = arr.filter(function (it) {
      return it.price >= filterPrice[0] && it.price <= filterPrice[1];
    });
  };

  var onFilterChange = function (evt) {
    var FAVORITE = FILTER.querySelector('#filter-favorite');
    var AVALABILITY = FILTER.querySelector('#filter-availability');
    var target = evt.currentTarget;

    if (target === FAVORITE && target.checked) {
      getGoodsFavorite(window.data.goods);
      unchecked(target);
      return;
    } else if (target === AVALABILITY && target.checked) {
      getGoodsAmount(window.data.goods);
      unchecked(target);
      return;
    }
    if (!FAVORITE.checked && !AVALABILITY.checked) {
      filterResults = window.data.goods;
    }
    customiseFilters(target);
    getGoodsType(filterResults);
    getGoodsSugarGluten(filterResults);
    getGoodsVegetarian(filterResults);
    getGoodsPprice(filterResults);

    window.data.filterGoods = filterResults;
    window.sortFilter.runRender(window.data.filterGoods);
    document.removeEventListener('mouseup', onFilterChange);
  };

  RANGE.addEventListener('mousedown', function () {
    document.addEventListener('mouseup', onFilterChange);
  });

  CHECKBOX.forEach(function (it) {
    it.addEventListener('change', onFilterChange);
  });
})();
