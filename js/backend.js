'use strict';
(function () {
  window.load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Код ошибки: ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1;
    xhr.open('GET', url);
    xhr.send();
  };
})();
(function () {
  var URL = 'https://js.dump.academy/candyshop';
  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Код ошибки: ' + xhr.status);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

