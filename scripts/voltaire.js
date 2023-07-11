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
                sentenceDiv.children[index + 1].style.color = 'red';
            }
        }
    }
}

function learn() {
    'use strict';

    let sentence = getSentence();
    const valider = document.querySelector('.nextButton');
    if (valider.style[0] !== 'display' &&  sentence) {
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

var data = new Map();

setInterval(() => {
    learn();
    printError();
}, 1000);
