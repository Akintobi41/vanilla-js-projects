import * as _ from "../utils.js"
let hamToggle = _.getEl(".hamburger"),
    navigation = _.getEl(".navigation"),
    book_titles = _.getEl('.book-titles'),
    btn_prev = _.getEl('.previous'),
    btn_next = _.getEl('.next'),
    characterSection = _.getEl('.character-section'),
    minContent = _.getEl('.min-content'),
    maxContent = _.getEl('.max-content'),
    genderSelect = _.getEl('#gender-select')

// Hamburger Menu  // Find solution to this
document.onclick = function (e) {
    if (e.target !== hamToggle && e.target !== navigation) {
        hamToggle.classList.remove("active");
        navigation.classList.remove("active");
    }
};
hamToggle.onclick = function () {
    hamToggle.classList.toggle("active");
    navigation.classList.toggle("active");
};
//

import { retrievedCharacters } from "../index.js";

let character_docs = retrievedCharacters.docs,
    sectionData = [];

character_docs.forEach((val, i) => _.characterCard(val, i, sectionData))

// Pagination
let exactPage = 1;

//Adding event listeners
function navigate(element, event, fnName) { element.addEventListener(event, fnName) }

function changePage(records_per_page, current_page, content, wrapper) {
    wrapper.innerHTML = '';
    current_page--;

    let start = current_page * records_per_page,
        end = start + records_per_page,
        paginatedItems = content.slice(start, end);

    paginatedItems.forEach((items) => wrapper.append(items));   // Appending items to DOM

    ((current_page + 1) != 1) ? btn_prev.classList.remove("previous-button") :
        _.addClass(btn_prev, "previous-button")

    minContent.textContent = end;
    maxContent.textContent = content.length;
    (end > content.length) ? minContent.textContent = content.length : false
    navigate(btn_next, 'click', next);
    navigate(btn_prev, 'click', previous);
}

function numPages(content, records_per_page) {
    return Math.ceil(content.length / records_per_page)
}

changePage(10, exactPage, sectionData, characterSection)

function next() {
    (exactPage < numPages(sectionData, 10)) ?
        (exactPage++, changePage(10, exactPage, sectionData, characterSection)) : false
}

function previous() {
    (exactPage > 1) ? (exactPage--,
        changePage(10, exactPage, sectionData, characterSection)) : false
}



// Filter by Gender

genderSelect.addEventListener('change', genderUI)
let exactPage1 = 1;

function removeListener() {
    btn_next.removeEventListener('click', next)
    btn_prev.removeEventListener('click', previous)
}

let genderArr_male = sectionData.filter((item) => {
    return item.children[1].textContent.toLowerCase().slice(8) === 'male'
        || item.children[1].textContent.toLowerCase().slice(8) === 'males'
}),
    genderArr_female = sectionData.filter((item) => {
        return item.children[1].textContent.toLowerCase().slice(8) === 'female'
    }),
    genderArr_others = sectionData.filter((item) => {
        return item.children[1].textContent.toLowerCase().slice(8) != 'male' &&
            item.children[1].textContent.toLowerCase().slice(8) != 'female' &&
            item.children[1].textContent.toLowerCase().slice(8) != 'males'
    });

function maleGender(e) {
    (e.target.value.toLowerCase() === 'male') ? (removeListener(),
        changePage(10, exactPage1, genderArr_male, characterSection))
        : false;
}

function femaleGender(e) {
    (e.target.value.toLowerCase() === 'female') ? (removeListener(),
        changePage(10, exactPage1, genderArr_female, characterSection))
        : false;
}

function otherGender(e) {
    (e.target.value.toLowerCase() != 'female'
        && e.target.value.toLowerCase() != 'male') ? (removeListener(),
            changePage(10, exactPage1, genderArr_others, characterSection))
        : false;
}

function anyGender(e) {
    (e.target.value.toLowerCase() === 'any') ? (navigate(btn_next, 'click', next),
        navigate(btn_prev, 'click', previous),
        changePage(10, exactPage, sectionData, characterSection)) : false
}

function genderUI(e) {
    maleGender(e);
    femaleGender(e);
    otherGender(e);
    anyGender(e);
    // function next1() {
    //     (exactPage1 < numPages(genderArr_male, 10)) ?
    //         (exactPage1++, changePage(10, exactPage1, genderArr_male, characterSection)) : false
    // }

    // function previous1() {
    //     (exactPage1 > 1) ? (exactPage1--,
    //         changePage(10, exactPage1, genderArr_male, characterSection)) : false
    // }
}



