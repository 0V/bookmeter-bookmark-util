const sleepTime = 800;

const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));

const markAllBooks = async function () {

  var books = document.getElementsByClassName('group__book');
  const bookLength = books.length;

  for (let i = bookLength - 1; i >= 0; i--) {
    await sleep(sleepTime);

    const book = books[i];

    book.querySelector('.action__text').click();
    await sleep(sleepTime);

    var selectModal = document.querySelector('.modal--active');

    // if already read
    if (selectModal.getElementsByClassName('action__registration action__registration--registered').length > 0) {
      selectModal.querySelector('.window__close.js-modal-close').click();
      await sleep(sleepTime);
      continue;
    }

    var selectButton = selectModal.querySelector('.registration__item').querySelector('.modal-button');

    selectButton.click()
    await sleep(sleepTime);

    var registerModal = document.querySelector('.modal--active');
    var fieldOption = registerModal.querySelector('.field__option.field__option--date');
    var fieldOptionDate = registerModal.querySelector('.field__input.field__input--date');
    var checkboxes = fieldOption.getElementsByTagName('input');
    var input_date = fieldOptionDate.querySelector('input');

    input_date.disabled = true;
    const checkboxLength = checkboxes.length;
    for (let chk = 0; chk < checkboxLength; chk++) {
      checkboxes[chk].checked = true;
    }

    var registerButton = registerModal.querySelector('.action__controller').querySelector('button');


    registerButton.click();
    await sleep(sleepTime);

    var resultModal = document.querySelector('.modal--active');
    var close_button = resultModal.querySelector('.window__close.js-modal-close');
    close_button.click();
    await sleep(sleepTime);
  }
}

const observer = new MutationObserver(function () {
  var jsInitChecktimer = setInterval(checkForJS_Finish, 111);
  function checkForJS_Finish() {
    if (typeof SOME_GLOBAL_VAR != "undefined"
      || document.querySelector(".content-with-header__header")
    ) {
      clearInterval(jsInitChecktimer);
      var title = document.querySelector('.content-with-header__header');

      const addButton = document.createElement('input');
      addButton.classList.add('auto-read--button');
      addButton.type = 'button';
      addButton.value = '全てを「読んだ本」に追加';
      addButton.addEventListener("click", markAllBooks);
      title.appendChild(addButton);
    }
  }
});

observer.observe(document.querySelector('head'), { childList: true, subtree: true })