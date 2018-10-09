'use strict';
(function () {
  var range = document.querySelector('.range');
  var scope = range.querySelector('.range__filter');
  var leftPin = range.querySelector('.range__btn--left');
  var rightPin = range.querySelector('.range__btn--right');
  var fillLine = range.querySelector('.range__fill-line');
  var pinWidth = leftPin.offsetWidth;
  var scopeWidth = scope.offsetWidth - pinWidth;
  window.slider = {
    left: (leftPin.offsetLeft / scopeWidth),
    right: (rightPin.offsetLeft / scopeWidth),
    moveStartPin: function () {
      leftPin.style.left = 0;
      rightPin.style.right = 0;
      fillLine.style.left = 0;
      fillLine.style.right = 0;
      window.slider.left = leftPin.offsetLeft / scopeWidth;
      window.slider.right = rightPin.offsetLeft / scopeWidth;
    }
  };

  range.addEventListener('mousedown', function (evt) {
    var coordsPinLeft = leftPin.getBoundingClientRect();
    var coordsPinRight = rightPin.getBoundingClientRect();
    var scopeCoords = scope.getBoundingClientRect();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (evt.target === leftPin) {
        var newCoords = moveEvt.clientX - (pinWidth / 2);
        if (newCoords <= scopeCoords.left) {
          leftPin.style.left = 0;
          fillLine.style.left = 0;
        } else if (newCoords >= coordsPinRight.left) {
          leftPin.style.left = coordsPinRight.left - scopeCoords.left + 'px';
          fillLine.style.left = coordsPinRight.left - scopeCoords.left + 'px';
        } else {
          leftPin.style.left = newCoords - scopeCoords.left + 'px';
          fillLine.style.left = newCoords - scopeCoords.left + 'px';
        }
      } else if (evt.target === rightPin) {
        newCoords = moveEvt.clientX + (pinWidth / 2);
        if (newCoords >= scopeCoords.right) {
          rightPin.style.right = 0;
          fillLine.style.right = 0;
        } else if (newCoords <= coordsPinLeft.right) {
          rightPin.style.right = scopeCoords.right - coordsPinLeft.right + 'px';
          fillLine.style.right = scopeCoords.right - coordsPinLeft.right + 'px';
        } else {
          rightPin.style.right = scopeCoords.right - newCoords + 'px';
          fillLine.style.right = scopeCoords.right - newCoords + 'px';
        }
      }

      window.slider.left = leftPin.offsetLeft / scopeWidth;
      window.slider.right = rightPin.offsetLeft / scopeWidth;
      window.typeFilter.calculatePrice();
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());
