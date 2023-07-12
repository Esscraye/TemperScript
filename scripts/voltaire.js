// ==UserScript==
// @name         VoltaireHelper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  see where the faults are in voltaire test
// @author       Esscraye
// @match        https://www.projet-voltaire.fr/voltaire/com.woonoz.gwt.woonoz.Voltaire/Voltaire.html?returnUrl=www.projet-voltaire.fr/choix-parcours/&applicationCode=pv
// @icon         https://www.google.com/s2/favicons?sz=64&domain=projet-voltaire.fr
// @grant        none
// ==/UserScript==

function getSentence() {
    'use strict';

    let sentenceDiv = document.querySelector('.sentence');

    if (sentenceDiv) {
        var sentence = [];

        let children = Array.from(sentenceDiv.children);
        children.forEach(child => sentence.push(child.innerText));
        return sentence;
    }
    return false;
}

function printError() {
    'use strict';

    let sentence = getSentence();
    let sentenceDiv = document.querySelector('.sentence');
    if (sentence) {
        const key = sentence.join("");
        if (data.has(key)) {
            const index = data.get(key);
            if (index === false) {
                sentenceDiv.style.color = 'green';
            } else {
                sentenceDiv.children[index].style.color = 'red';
                if (sentenceDiv.children[index].innerText === ' ') {
                    sentenceDiv.children[index + 1].style.color = 'red';
                }
            }
        }
    }
}

function learn() {
    'use strict';

    let sentence = getSentence();
    const valider = document.querySelector('.nextButton');
    if (valider && valider.style[0] !== 'display' && sentence) {
        let word = document.querySelector('.answerWord');
        var index = false;
        if (word) {
            var parent = word.parentNode;
            index = Array.from(parent.children).indexOf(word);
        }
        const key = sentence.join("");
        const value = index;
        if (data.has(key)) {
            data.set(key, value);
        }
    }
}

function analyze() {
    'use strict';
    let sentence = getSentence();
    if (sentence) {
        const key = sentence.join("");
        if (data.has(key)) {
            return data.get(key);
        }
        let errorSearch = -1
        errors.forEach(word => {
            if (sentence.includes(word)) {
                errorSearch = sentence.indexOf(word);
                return;
            }
        });
        if (errorSearch !== -1) {
            data.set(key, errorSearch);
            return errorSearch;
        }
        const correctSearch = correct.forEach(word => {
            if (key.includes(word)) {
                return true;
            }
        });
        if (confient && correctSearch) {
            data.set(key, false);
            return false;
        }
    }
}
var data = new Map();

const errors = ["connection", "connections", "fesant", "mieu", "cauchemard", "auparavent", "Auparavent", "au paravant", "au par avant", "malgrés", "Malgrés"]
const correct = ["connexion", "connexions", "faisant", "mieux", "cauchemar", "auparavant", "Auparavant", "malgré", "Malgré"]

const confient = true;
setInterval(() => {
    learn();
    analyze();
    printError();
}, 1000);
