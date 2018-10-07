'use strict';
(function () {
  var buy = document.querySelector('.buy');
  var orderCards = buy.querySelector('.goods__cards');
  var contact = buy.querySelector('.contact-data');
  var payment = buy.querySelector('.payment__inner');
  var paymentInputCard = payment.querySelector('.payment__card-wrap').querySelectorAll('input');
  var paymentCardBtn = payment.querySelector('#payment__card');
  var paymentCashBtn = payment.querySelector('#payment__cash');
  var deliver = buy.querySelector('.deliver');
  var deliverStoresFieldset = deliver.querySelector('.deliver__stores');
  var deliverAddressFieldset = deliver.querySelector('.deliver__entry-fields-wrap');
  var deliverStoreBtn = deliver.querySelector('#deliver__store');
  var deliverCourierBtn = deliver.querySelector('#deliver__courier');
  var buySubmitBtn = buy.querySelector('.buy__submit-btn');
  var nameInput = contact.querySelector('#contact-data__name');
  var cardNumber = payment.querySelector('#payment__card-number');
  var cardDate = payment.querySelector('#payment__card-date');
  var cardHolder = payment.querySelector('#payment__cardholder');
  var cardCvc = payment.querySelector('#payment__card-cvc');
  var BACK_SPACE = 8;

  var toggleDisabledForm = function (node, boolean) {
    for (var i = 0; i < node.length; i++) {
      node[i].disabled = boolean;
    }
  };
  window.orderForm = {
    lockAllOrderForm: function () {
      toggleDisabledForm(contact.querySelectorAll('input'), true);
      toggleDisabledForm(payment.querySelectorAll('input'), true);
      toggleDisabledForm(deliver.querySelectorAll('.deliver__toggle input'), true);
      deliverStoresFieldset.disabled = true;
      deliverAddressFieldset.disabled = true;
      buySubmitBtn.disabled = true;
    },
    unlockOrderForm: function () {
      toggleDisabledForm(contact.querySelectorAll('input'), false);
      toggleDisabledForm(payment.querySelectorAll('.payment__method input'), false);
      toggleDisabledForm(deliver.querySelectorAll('.deliver__toggle input'), false);
      if (paymentCardBtn.checked) {
        toggleDisabledForm(paymentInputCard, false);
        paymentCashBtn.addEventListener('click', onPaymentTogleClick);
      }
      if (deliverStoreBtn.checked) {
        deliverStoresFieldset.disabled = false;
        deliverCourierBtn.addEventListener('click', onDeliverTogleClick);
      } else {
        deliverAddressFieldset.disabled = false;
      }
      buySubmitBtn.disabled = false;
    }
  };
  window.orderForm.lockAllOrderForm();
  var onPaymentTogleClick = function (evt) {
    payment.querySelector('.payment__cash-wrap').classList.toggle('visually-hidden');
    payment.querySelector('.payment__card-wrap').classList.toggle('visually-hidden');
    if (evt.target === paymentCardBtn) {
      toggleDisabledForm(paymentInputCard, false);
      paymentCardBtn.removeEventListener('click', onPaymentTogleClick);
      paymentCashBtn.addEventListener('click', onPaymentTogleClick);
    } else {
      toggleDisabledForm(paymentInputCard, true);
      paymentCashBtn.removeEventListener('click', onPaymentTogleClick);
      paymentCardBtn.addEventListener('click', onPaymentTogleClick);
    }
  };
  var onDeliverTogleClick = function (evt) {
    deliver.querySelector('.deliver__courier').classList.toggle('visually-hidden');
    deliver.querySelector('.deliver__store').classList.toggle('visually-hidden');
    if (evt.target === deliverStoreBtn) {
      deliverStoresFieldset.disabled = false;
      deliverAddressFieldset.disabled = true;
      deliverStoreBtn.removeEventListener('click', onDeliverTogleClick);
      deliverCourierBtn.addEventListener('click', onDeliverTogleClick);
    } else {
      deliverStoresFieldset.disabled = true;
      deliverAddressFieldset.disabled = false;
      deliverCourierBtn.removeEventListener('click', onDeliverTogleClick);
      deliverStoreBtn.addEventListener('click', onDeliverTogleClick);
    }
  };

  var letterReplacement = function (evt, invalidCharacter) {
    if (invalidCharacter.test(evt.target.value)) {
      evt.target.value = evt.target.value.replace(invalidCharacter, '');
    }
  };
  nameInput.addEventListener('invalid', function () {
    if (nameInput.validity.tooShort) {
      nameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (nameInput.validity.tooLong) {
      nameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity('Обязательное поле');
    } else {
      nameInput.setCustomValidity('');
    }
  });
  nameInput.addEventListener('input', function (evt) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  var numberValidity = function () {
    var sum = 0;
    var arr = cardNumber.value.replace(/\s/g, '').split('');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = +arr[i];
      if (arr[i] % 2 !== 0) {
        arr[i] *= 2;
        if (arr[i] >= 10) {
          arr[i] -= 9;
        }
      }
      sum += arr[i];
    }
    return sum % 10 === 0 && sum !== 0;
  };
  var dateValidity = function () {
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth();
    var dateArr = cardDate.value.split('/');
    var month = +dateArr[0];
    var year = +dateArr[1];
    return month > currentMonth && (2000 + year) >= currentYear;
  };
  var holderValidity = function () {
    var length = cardHolder.value.length;
    return length > 4 && length < 25;
  };
  var cvcValidity = function () {
    var length = cardCvc.value.length;
    return length === 3;
  };
  var onCardChange = function () {
    var cardStatus = payment.querySelector('.payment__card-status');
    if (numberValidity() && dateValidity() && cvcValidity() && holderValidity()) {
      cardStatus.textContent = 'Одобрен';
      window.orderForm.cardStatusValidity = true;
    } else {
      cardStatus.textContent = 'Неизвестен';
      window.orderForm.cardStatusValidity = false;
    }
  };

  cardNumber.addEventListener('invalid', function () {
    if (cardNumber.validity.tooShort) {
      cardNumber.setCustomValidity('Введите 16-ти значный номер карты');
    } else if (cardNumber.validity.valueMissing) {
      cardNumber.setCustomValidity('Обязательное поле');
    } else if (!numberValidity()) {
      cardNumber.setCustomValidity('Похоже вы ошиблись при вводе номера карты');
    } else {
      cardNumber.setCustomValidity('');
    }
  });
  cardNumber.addEventListener('input', function (evt) {
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите 16-ти значный номер карты');
    } else {
      evt.target.setCustomValidity('');
    }
  });


  cardDate.addEventListener('invalid', function () {
    if (cardDate.validity.tooShort) {
      cardDate.setCustomValidity('Укажите срок действия карты мм/гг');
    } else if (cardDate.validity.valueMissing) {
      cardDate.setCustomValidity('Обязательное поле');
    } else if (!dateValidity()) {
      cardDate.setCustomValidity('Ваша карта просрочена');
    } else {
      cardDate.setCustomValidity('');
    }
  });
  cardDate.addEventListener('input', function (evt) {
    var invalidCharacter = /[-_&%$^\|#+=.;":'~`<>?!a-zA-Zа-яА-Я]/;
    letterReplacement(evt, invalidCharacter);
    if (evt.target.value.length === 2) {
      evt.target.value += '/';
    }
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Укажите срок действия карты мм/гг');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  cardDate.addEventListener('keydown', function (evt) {
    if (evt.target.value.length === 3) {
      if (evt.keyCode === BACK_SPACE) {
        evt.preventDefault();
        evt.target.value = evt.target.value.substring(0, evt.target.value.length - 2);
      }
    }
  });

  cardCvc.addEventListener('invalid', function () {
    if (cardCvc.validity.tooShort) {
      cardCvc.setCustomValidity('Введите CVC, это 3-и цифры указанные на обороте карты');
    } else if (cardCvc.validity.valueMissing) {
      cardCvc.setCustomValidity('Введите CVC, это 3-и цифры указанные на обороте карты');
    } else {
      cardCvc.setCustomValidity('');
    }
  });
  cardCvc.addEventListener('input', function (evt) {
    var invalidCharacter = /[-_&%$^\|#+=.;":'~`<>?!a-zA-Zа-яА-Я]/;
    letterReplacement(evt, invalidCharacter);
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите CVC, это 3-и цифры указанные на обороте карты');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  cardHolder.addEventListener('invalid', function () {
    if (cardHolder.validity.tooShort) {
      cardHolder.setCustomValidity('Введите имя держателя как указано на карте');
    } else if (cardHolder.validity.valueMissing) {
      cardHolder.setCustomValidity('Обязательное поле');
    } else {
      cardHolder.setCustomValidity('');
    }
  });
  cardHolder.addEventListener('input', function (evt) {
    var invalidCharacter = /[-_&%$^\|#+=.;":'~`<>?!0-9]/;
    letterReplacement(evt, invalidCharacter);
    evt.target.value = evt.target.value.toUpperCase();
    if (evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите имя держателя как указано на карте');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  var onStoreChange = function (evt) {
    var label = evt.target;
    var mapImg = deliver.querySelector('.deliver__store-map-img');
    switch (label.id) {
      case 'store-academicheskaya':
        mapImg.src = 'img/map/academicheskaya.jpg';
        break;
      case 'store-vasileostrovskaya':
        mapImg.src = 'img/map/vasileostrovskaya.jpg';
        break;
      case 'store-rechka':
        mapImg.src = 'img/map/rechka.jpg';
        break;
      case 'store-petrogradskaya':
        mapImg.src = 'img/map/petrogradskaya.jpg';
        break;
      case 'store-proletarskaya':
        mapImg.src = 'img/map/proletarskaya.jpg';
        break;
      case 'store-vostaniya':
        mapImg.src = 'img/map/vostaniya.jpg';
        break;
      case 'store-prosvesheniya':
        mapImg.src = 'img/map/prosvesheniya.jpg';
        break;
      case 'store-frunzenskaya':
        mapImg.src = 'img/map/frunzenskaya.jpg';
        break;
      case 'store-chernishevskaya':
        mapImg.src = 'img/map/chernishevskaya.jpg';
        break;
      case 'store-tehinstitute':
        mapImg.src = 'img/map/tehinstitute.jpg';
        break;
    }
  };
  cardNumber.addEventListener('blur', onCardChange);
  cardDate.addEventListener('blur', onCardChange);
  cardCvc.addEventListener('blur', onCardChange);
  cardHolder.addEventListener('input', onCardChange);
  deliver.querySelector('.deliver__store-list').addEventListener('change', onStoreChange);

  var form = buy.querySelector('form');
  var onLoadError = function (message) {
    var MODAL_ERROR = document.querySelector('.modal--error');
    window.modal.open(MODAL_ERROR, message);
  };
  var onLoadSuccess = function () {
    var cards = orderCards.querySelectorAll('.card-order');
    for (var i = 0; i < cards.length; i++) {
      var name = cards[i].querySelector('.card-order__title').textContent;
      window.orderSetup.deleteCard(cards[i], name);
    }
    var MODAL_SUCCESS = document.querySelector('.modal--success');
    window.orderForm.lockAllOrderForm();
    orderCards.classList.toggle('goods__cards--empty');
    orderCards.querySelector('.goods__card-empty').classList.toggle('visually-hidden');
    window.modal.open(MODAL_SUCCESS);
  };

  form.addEventListener('submit', function (evt) {
    var cardStatusValidity = window.orderForm.cardStatusValidity;
    evt.preventDefault();
    var formData = new FormData(buy.querySelector('form'));
    if (paymentCardBtn.checked) {
      if (!cardStatusValidity) {
        if (!numberValidity()) {
          cardNumber.setCustomValidity('Проверьте номер карты');
        } else if (!dateValidity()) {
          cardDate.setCustomValidity('Проверьте срок действия вашей карты');
        }
      } else {
        window.upload(formData, onLoadSuccess, onLoadError);
      }
    } else {
      window.upload(formData, onLoadSuccess, onLoadError);
    }
  });
}());
