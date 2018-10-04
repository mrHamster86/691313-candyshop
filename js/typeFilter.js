'use strict';
(function () {
  var GOODS = window.data.goods;
  var catalogFilter = document.querySelector('.catalog__sidebar');
  var catalogCards = document.querySelector('.catalog__cards');
  var filterCheckbox = catalogFilter.querySelectorAll('.input-btn__input--checkbox');
  window.calculateCount = function () {
    window.typeMap = {
      'icecream': window.data.goods.slice(0).filter(function (it) {
        return it.kind === 'Мороженое';
      }),
      'soda': window.data.goods.slice(0).filter(function (it) {
        return it.kind === 'Газировка';
      }),
      'gum': window.data.goods.slice(0).filter(function (it) {
        return it.kind === 'Жевательная резинка';
      }),
      'marmalade': window.data.goods.slice(0).filter(function (it) {
        return it.kind === 'Мармелад';
      }),
      'marshmallows': window.data.goods.slice(0).filter(function (it) {
        return it.kind === 'Зефир';
      }),
      'sugar-free': window.data.goods.slice(0).filter(function (it) {
        return it.nutritionFacts.sugar === false;
      }),
      'vegetarian': window.data.goods.slice(0).filter(function (it) {
        return it.nutritionFacts.vegetarian === true;
      }),
      'gluten-free': window.data.goods.slice(0).filter(function (it) {
        return it.nutritionFacts.gluten === false;
      }),
      'favorite': window.data.goods.slice(0).filter(function (it) {
        return it.favorite === true;
      }),
      'availability': window.data.goods.slice(0).filter(function (it) {
        return it.amount > 0;
      })
    };
    filterCheckbox.forEach(function (it) {
      var key = it.value;
      it.addEventListener('click', onTypeGoodsChange);
      var countSpan = it.parentElement.querySelector('.input-btn__item-count');
      if (window.typeMap[key]) {
        countSpan.textContent = '(' + window.typeMap[key].length + ')';
      }
    });
  };
  var arrKeys = [];
  var onTypeGoodsChange = function (evt) {
    var checkbox = evt.currentTarget;
    var key = checkbox.value;

    var arrType = [];
    var arrList = [];
    var arrNnutrition = window.data.goods.slice(0);
    var arrResult = [];
    filterCheckbox.forEach(function (it) {
      var key = it.value;
      if (it.checked) {
        if (key === 'icecream' || key === 'soda' || key === 'gum' || key === 'marmalade' || key === 'marshmallows') {
          arrType = arrType.concat(window.typeMap[key]);
        } else if (key === 'sugar-free' || key === 'vegetarian' || key === 'gluten-free') {
          arrNnutrition = arrNnutrition.concat(window.typeMap[key]);
          arrNnutrition = arrNnutrition.filter(function (it, i) {
            return arrNnutrition.indexOf(it) !== i;
          });
        }  else if (key === 'favorite' || key === 'availability') {
          arrList = arrList.concat(window.typeMap[key]);
        }
      }
    });

    arrResult = arrResult.concat(arrType).concat(arrNnutrition).concat(arrList)
    if(arrType.length > 0 || arrList.length > 0) {
      arrResult = arrResult.filter(function (it, i) {
        return arrResult.indexOf(it) !== i;
      });
    }
    console.log(arrResult)
    window.sortFilter.runRender(arrResult);
    if (arrResult.length === 0) {
      var errorFilter = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');
      catalogCards.appendChild(errorFilter);
    } else {
      // catalogCards.querySelector('.catalog__empty-filter').remove();
    }

  };

  // catalogFilter.querySelector('#filter-icecream').addEventListener('click', onTypeGoodsChange);
  // catalogFilter.querySelector('#filter-soda').addEventListener('click', onTypeGoodsChange);
  // catalogFilter.querySelector('#filter-gum').addEventListener('click', onTypeGoodsChange);
  // catalogFilter.querySelector('#filter-marmalade').addEventListener('click', onTypeGoodsChange);
  // catalogFilter.querySelector('#filter-marshmallows').addEventListener('click', onTypeGoodsChange);
})();
