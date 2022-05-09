// ==UserScript==
// @name         bookmeter auto read
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Mark all books in the list as "read".
// @author       G2(@0V)
// @match        https://bookmeter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bookmeter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sleepTime = 500;
  
    const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
  
    // var h1 = document.getElementsByClassName('title__content')[0];
    // h1.innerHTML = 'Hello, from Tampermonkey.';
  
    const markAllBooks = async function( ){
  
        var books = document.getElementsByClassName('group__book');
        const bookLength = books.length;
        console.log(bookLength);
  
        for (let i = bookLength - 1; i >= 0; i--){
            await sleep(sleepTime);
  
            const book = books[i];
  
            if(book.getElementsByClassName('icon__read').length > 0){
                continue;
            }
  
            book.getElementsByClassName('action__text')[0].click();
            var selectModal = document.getElementsByClassName('modal--active')[0];
  
            var selectButton = selectModal.getElementsByClassName('registration__item')[0].getElementsByClassName('modal-button')[0];
  
  
            await sleep(sleepTime);
  
            selectButton.click()
  
            await sleep(sleepTime);
  
            var registerModal = document.getElementsByClassName('modal--active')[0];
            var field_option = registerModal.getElementsByClassName('field__option field__option--date')[0];
            var checkboxes =field_option.getElementsByTagName('input');
  
            const checkboxLength = checkboxes.length;
            for (let chk = 0; chk< checkboxLength; chk++){
                checkboxes[chk].checked = true;
            }
  
            var registerButton = registerModal.getElementsByClassName('action__controller')[0].getElementsByTagName('button')[0];
  
            await sleep(sleepTime);
  
            registerButton.click();
        }
    }
  
  
    var title = document.getElementsByClassName('title__content')[0];
    const addButton = document.createElement('input');
    addButton.classList.add('mark-all-books-button');
    addButton.type = 'button';
    addButton.value = '全てを「読んだ」に追加';
    addButton.addEventListener("click", markAllBooks);
    title.appendChild(addButton);
  
  
  })();
  
  