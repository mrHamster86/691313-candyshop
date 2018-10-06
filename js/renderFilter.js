'use strict';
(function () {
  var FILTER = document.querySelector('.catalog__sidebar');
  var span;

  var idMap = {
    'Мороженое': '#filter-icecream',
    'Газировка': '#filter-soda',
    'Жевательная резинка': '#filter-gum',
    'Мармелад': '#filter-marmalade',
    'Зефир': '#filter-marshmallows',
    'sugar': '#filter-sugar-free',
    'gluten': '#filter-gluten-free',
    'vegetarian': '#filter-vegetarian',
    'amount': '#filter-availability',
    'favorite': '#filter-favorite'
  };
  window.renderFilter = {
    count: {},
    calculateCount: function (elem) {
      this.count[elem.kind]++;
      this.count.range++;
      if (!elem.nutritionFacts.sugar) {
        this.count.sugar++;
      }
      if (!elem.nutritionFacts.gluten) {
        this.count.gluten++;
      }
      if (elem.nutritionFacts.vegetarian) {
        this.count.vegetarian++;
      }
      if (elem.amount > 0) {
        this.count.amount++;
      }
    },
    renderCount: function () {
      Object.keys(idMap).forEach(function (it) {
        span = FILTER.querySelector(idMap[it]).parentElement.querySelector('span');
        span.textContent = '(' + window.renderFilter.count[it] + ')';
      });
      span = FILTER.querySelector('.range__count');
      span.textContent = '(' + window.renderFilter.count.range + ')';
    },
    renderFavoriteCount: function () {
      span = FILTER.querySelector(idMap['favorite']).parentElement.querySelector('span');
      span.textContent = '(' + window.typeFilter.favoriteGoods.length + ')';
    }
  };
  Object.keys(idMap).forEach(function (it) {
    window.renderFilter.count[it] = 0;
  });
  window.renderFilter.count.range = 0;
}());
