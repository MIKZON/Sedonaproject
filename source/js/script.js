'use strict';

var
    button = document.querySelector('.search__button'),
    form = document.querySelector('.form');

if (button) {
    form.classList.remove('form--no-js');
    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        form.classList.toggle('form--close');
    });
}


