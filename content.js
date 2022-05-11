const sleepTime = 600;

const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));


const addReadBook = function (book) {
  return async function () {
    book.querySelector('.action__text').click();
    await sleep(sleepTime);

    var selectModal = document.querySelector('.modal--active');

    // if already read
    if (selectModal.getElementsByClassName('action__registration action__registration--registered').length > 0) {
      selectModal.querySelector('.window__close.js-modal-close').click();
      await sleep(sleepTime);
      return;
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


const markAllBooks = async function () {

  var books = document.getElementsByClassName('group__book');
  const bookLength = books.length;

  for (let i = bookLength - 1; i >= 0; i--) {
    await sleep(sleepTime);

    const book = books[i];
    await addReadBook(book)();
  }
}

const observer = new MutationObserver(async function () {

  if (!document.querySelector('.auto-read--button')) {
    // Create All Read Button
    var title = document.querySelector('.content-with-header__header');

    const addAutoButton = document.createElement('input');
    addAutoButton.classList.add('auto-read--button');
    addAutoButton.type = 'button';
    addAutoButton.value = '全てを「読んだ本」に追加';
    addAutoButton.addEventListener("click", markAllBooks);
    title.appendChild(addAutoButton);
  }

  if (!document.querySelector('.auto-read--one-button')) {

    // Create One Read Button
    var books = document.getElementsByClassName('group__book');
    const bookLength = books.length;

    for (let i = bookLength - 1; i >= 0; i--) {
      const book = books[i];

      const addOneButton = document.createElement('div');
      const addOneButtonSpan = document.createElement('span');
      addOneButtonSpan.innerHTML = '1click登録';
      addOneButton.classList.add('auto-read--one-button');
      addOneButton.appendChild(addOneButtonSpan)
      addOneButton.addEventListener("click", addReadBook(book));
      book.appendChild(addOneButton);
    }
  }

  await sleep(2000);

  if (!document.querySelector('.auto-read--one-button')) {

    // Create One Read Button
    var books = document.getElementsByClassName('group__book');
    const bookLength = books.length;

    for (let i = bookLength - 1; i >= 0; i--) {
      const book = books[i];

      const addOneButton = document.createElement('div');
      const addOneButtonSpan = document.createElement('span');
      addOneButtonSpan.innerHTML = '1click登録';
      addOneButton.classList.add('auto-read--one-button');
      addOneButton.appendChild(addOneButtonSpan)
      addOneButton.addEventListener("click", addReadBook(book));
      book.appendChild(addOneButton);
    }
  }

});

observer.observe(document.querySelector('.bm-wrapper'), { attributes: true, childList: true, subtree: true })
observer.observe(document.querySelector('head'), { attributes: true, childList: true, subtree: true })
observer.observe(document.querySelector('.layouts'), { attributes: true, childList: true, subtree: true })

