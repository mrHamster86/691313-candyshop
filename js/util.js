'use strict';
(function () {
  window.util = {
    getRandomNumber: function (a, b) {
      if (b) {
        var min = b < a ? b : a;
        var max = b < a ? a : b;
      } else {
        min = 0;
        max = a;
      }
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getParentHasClass: function (element, isHasClass) {
      element = element.parentElement;
      while (!element.classList.contains(isHasClass)) {
        element = element.parentElement;
        if (!element) {
          break;
        }
      }
      return element;
    },
    getElementHasText: function (elementClass, isTextContent) {
      var elementArr = document.querySelectorAll(elementClass);
      for (var i = 0; i < elementArr.length; i++) {
        if (elementArr[i].textContent === isTextContent) {
          var elementHasText = elementArr[i];
          break;
        }
      }
      return elementHasText;
    },
    getRandomElement: function (arr) {
      var randomElement = arr[this.getRandomNumber(arr.length - 1)];
      return randomElement;
    },
    getRandomArr: function (originalArr, lengthNewArr) {
      var copyArr = originalArr.slice();
      var newArr = [];
      for (var i = 0; i < lengthNewArr; i++) {
        var j = this.getRandomNumber(i, copyArr.length - 1);
        var temp = copyArr[i];
        copyArr[i] = copyArr[j];
        copyArr[j] = temp;
        newArr.push(copyArr[i]);
      }
      return newArr;
    }
  };
})();
