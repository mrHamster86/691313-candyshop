'use strict';
(function () {
  var FILTER = document.querySelector('.catalog__sidebar');
  var CHECKBOX = FILTER.querySelectorAll('.input-btn__input--checkbox');
  var RANGE = FILTER.querySelector('.range');
  var SUBMIT = FILTER.querySelector('.catalog__submit');

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

  var filterType = [];
  var filterSugarGluten = [];
  var filterVegetarian = [];
  var filterPrice = [];

  var filterResult = [];
  var groupGoods = [];

  window.typeFilter = {
    favoriteGoods: [],
    calculatePrice: function () {
      var range = window.data.price[1] - window.data.price[0];
      var MIN = FILTER.querySelector('.range__price--min');
      var MAX = FILTER.querySelector('.range__price--max');
      filterPrice = [Math.round(range * window.slider.left), Math.round(range * window.slider.right)];
      MIN.textContent = filterPrice[0];
      MAX.textContent = filterPrice[1];
    },
    unchecked: function (arr) {
      CHECKBOX.forEach(function (it) {
        it.checked = false;
      });
      filterType = [];
      filterSugarGluten = [];
      filterVegetarian = [];
      window.data.filterGoods = arr;
      window.slider.moveStartPin();
      window.typeFilter.calculatePrice();
      window.sortFilter.runRender(arr);
    }
  };
  var customiseFilters = function (target) {
    var key = target.value;
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

  var getGoodsAmount = function (arr) {
    return arr.filter(function (it) {
      return it.amount > 0;
    });
  };
  var getGoodsFavorite = function (arr) {
    return arr.filter(function (it) {
      return window.typeFilter.favoriteGoods.some(function (i) {
        return it.name === i;
      });
    });
  };
  var getGoodsType = function (arr) {
    if (filterType.length > 0) {
      filterResult = arr.filter(function (it) {
        return filterType.some(function (i) {
          return it.kind === i;
        });
      });
    }
  };
  var getGoodsSugarGluten = function (arr) {
    if (filterSugarGluten.length > 0) {
      filterResult = arr.filter(function (it) {
        return filterSugarGluten.every(function (i) {
          return !it.nutritionFacts[i];
        });
      });
    }
  };
  var getGoodsVegetarian = function (arr) {
    if (filterVegetarian.length > 0) {
      filterResult = arr.filter(function (it) {
        return it.nutritionFacts['vegetarian'];
      });
    }
  };
  var getGoodsPprice = function (arr) {
    filterResult = arr.filter(function (it) {
      return it.price >= filterPrice[0] && it.price <= filterPrice[1];
    });
    RANGE.querySelector('.range__count').textContent = '(' + filterResult.length + ')';
  };

  var onFilterChange = function (evt) {
    var FAVORITE = FILTER.querySelector('#filter-favorite');
    var AVALABILITY = FILTER.querySelector('#filter-availability');
    var target = evt.currentTarget;

    if (target === FAVORITE && target.checked) {
      groupGoods = getGoodsFavorite(window.data.goods);
      window.typeFilter.unchecked(groupGoods);
      target.checked = true;
      return;
    } else if (target === AVALABILITY && target.checked) {
      groupGoods = getGoodsAmount(window.data.goods);
      window.typeFilter.unchecked(groupGoods);
      target.checked = true;
      return;
    }
    if (FAVORITE.checked || AVALABILITY.checked) {
      filterResult = groupGoods;
    } else {
      filterResult = window.data.goods;
    }
    customiseFilters(target);
    getGoodsType(filterResult);
    getGoodsSugarGluten(filterResult);
    getGoodsVegetarian(filterResult);
    getGoodsPprice(filterResult);

    window.data.filterGoods = filterResult;
    window.sortFilter.runRender(filterResult);
    document.removeEventListener('mouseup', onFilterChange);
  };

  RANGE.addEventListener('mousedown', function () {
    document.addEventListener('mouseup', onFilterChange);
  });

  CHECKBOX.forEach(function (it) {
    it.addEventListener('change', onFilterChange);
  });

  SUBMIT.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.typeFilter.unchecked(window.data.goods);
  });
})();
