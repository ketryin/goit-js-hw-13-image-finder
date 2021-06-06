import '../css/styles.css';
import imgCardTpl from '../templates/img-card.hbs';
import API from './apiService';
import getRefs from './get-refs';
import debounce from 'lodash.debounce';
import { notice, error, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';;
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();
refs.inputEl.addEventListener('input', debounce(searchImg, 500));
let page = 1;
let inputValue;
function searchImg(event) {
    inputValue = event.target.value.trim();
    refs.listEl.innerHTML = '';
    refs.btnContainerEl.innerHTML = '';
    page = 1;
    if (inputValue != '') {
        API(inputValue, page)
            .then(renderImg)
            .catch(errorMessage);
    }
    refs.listEl.addEventListener('click',onClickImgOpenModal);
}

function renderImg(hits) {
    if (hits.length != 0) {
        const markup = hits.map(imgCardTpl).join('');
        refs.listEl.innerHTML = markup;
        refs.btnContainerEl.innerHTML = '<button type="button" class="button" data-action="load-more">Load more</button>';
        const btnEl = document.querySelector('.button');
        btnEl.addEventListener('click', LoadMore)
    } else {
        error({
        title: 'Oh No!',
        text: 'Invalid entered value. Try again'
    });  
    }
}

function errorMessage() {
    console.log('Invalid entered value. Try again');
}

function LoadMore() {
    page += 1;
    API(inputValue, page)
        .then(addrenderImg)
        .then(() => refs.btnContainerEl.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            }));
        
}

function addrenderImg(hits) {
    const markup = hits.map(imgCardTpl).join('');
    refs.listEl.innerHTML += markup; 
}
function onClickImgOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`<img src="${event.target.dataset.src}" alt="" />`);
  instance.show();
}