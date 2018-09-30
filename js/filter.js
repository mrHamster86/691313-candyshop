'use strict';
(function () {
  var range = document.querySelector('.range');
  var scope = range.querySelector('.range__filter');
  var leftPin = range.querySelector('.range__btn--left');
  var rightPin = range.querySelector('.range__btn--right');
  var fillLine = range.querySelector('.range__fill-line');

  var pinWidth = leftPin.offsetWidth;

  var calculatePrice = function () {
    var min = range.querySelector('.range__price--min');
    var max = range.querySelector('.range__price--max');
    var scopeWidth = scope.offsetWidth - pinWidth;
    min.textContent = Math.round(leftPin.offsetLeft * 100 / scopeWidth) + '%';
    max.textContent = Math.round(rightPin.offsetLeft * 100 / scopeWidth) + '%';
  };

  range.addEventListener('mousedown', function (evt) {

    var startCoords = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;

      if (evt.target === leftPin) {
        var leftScope = scope.offsetLeft;
        var rightScope = scope.offsetLeft + rightPin.offsetLeft - pinWidth;
        var newCoords = leftPin.offsetLeft - shift;
        if (moveEvt.clientX < leftScope) {
          newCoords = 0;
        }
        if (moveEvt.clientX > rightScope) {
          newCoords = rightScope - leftScope;
        }
        leftPin.style.left = newCoords + 'px';
        fillLine.style.left = newCoords + 'px';
      }
      if (evt.target === rightPin) {
        leftScope = scope.offsetLeft + leftPin.offsetLeft + pinWidth;
        rightScope = scope.offsetLeft + scope.offsetWidth - pinWidth;
        newCoords = rightPin.offsetLeft - shift;
        if (moveEvt.clientX < leftScope) {
          newCoords = leftScope - scope.offsetLeft;
        }
        if (moveEvt.clientX > rightScope) {
          newCoords = rightScope - scope.offsetLeft;
        }
        rightPin.style.right = rightScope - scope.offsetLeft - newCoords + 'px';
        fillLine.style.right = rightScope - scope.offsetLeft - newCoords + 'px';
      }
      calculatePrice();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  calculatePrice();
}());