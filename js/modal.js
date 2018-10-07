'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var MODAL_ERROR = document.querySelector('.modal--error');

  var onPopupPressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.modal.onClose();
    }
  };

  window.modal = {
    onClose: function () {
      var modal;
      document.querySelectorAll('.modal').forEach(function (it) {
        if (!it.classList.contains('modal--hidden')) {
          modal = it;
        }
      });
      var closeBtn = modal.querySelector('.modal__close');
      modal.classList.add('modal--hidden');
      closeBtn.removeEventListener('click', this.onClose);
      document.removeEventListener('keydown', onPopupPressEsc);
    },
    open: function (modal, message) {
      var closeBtn = modal.querySelector('.modal__close');
      if (modal === MODAL_ERROR) {
        modal.querySelector('.modal__message').textContent = message;
      }
      modal.classList.remove('modal--hidden');
      closeBtn.addEventListener('click', this.onClose);
      document.addEventListener('keydown', onPopupPressEsc);
    }
  };
})();
