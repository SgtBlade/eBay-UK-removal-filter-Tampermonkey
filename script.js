// ==UserScript==
// @name         Ebay
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove the UK results from ebay
// @author       You
// @match        https://www.benl.ebay.be/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let hideUK = false;
    if(localStorage.getItem("dspUK")){
        const response = localStorage.getItem("dspUK")

       if(1 === parseInt(response))hideUK = true;
        else if (0 === parseInt(response)) hideUK = false;
    }else localStorage.setItem('dspUK', '1');


    const init = () => {
        localStorage.setItem('dspUK', '1');

        const results = document.querySelectorAll('.s-item__location');
        results.forEach(res => {if(res.textContent == 'Vanuit Verenigd Koninkrijk')res.parentNode.parentNode.parentNode.parentNode.parentNode.remove()})
        const $btn = document.querySelector('.removeUKButton');
        $btn.textContent = 'Show UK Results';
        $btn.removeEventListener('click', init);
        $btn.addEventListener('click', reloadPage)
    }

    if(hideUK){
        const results = document.querySelectorAll('.s-item__location');
        results.forEach(res => {if(res.textContent == 'Vanuit Verenigd Koninkrijk')res.parentNode.parentNode.parentNode.parentNode.parentNode.remove()})
    }

    const reloadPage = () => {
        localStorage.setItem('dspUK', '0');
        location.reload();
    }


    const $button = document.createElement('p');
    $button.classList.add('removeUKButton')
    hideUK ? $button.addEventListener('click', reloadPage) : $button.addEventListener('click', init);
    hideUK ? $button.textContent = 'Show UK Results' : $button.textContent = 'Remove UK Results'
    $button.style.cssText  =
    `
    color: white;
    padding: 5px 8px;
    font-size: 18px;
    background-color: #1f2129;
    border-radius: 15px;
    position: fixed;
    z-index: 999;
    top: 70px;
    right: 60px;
    cursor: pointer;
    `
    document.querySelector('body').appendChild($button);
    // Your code here...
})();
