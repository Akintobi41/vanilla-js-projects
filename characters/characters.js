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



}

btn_next.addEventListener('click', callsNext)
btn_prev.addEventListener('click', callsPrevious)


function callsNext() {
    exactPage++;
    next(exactPage, sectionData, characterSection)
}

function callsPrevious() {
    if (exactPage > 1) exactPage--;
    previous(exactPage, sectionData, characterSection)
}



function numPages(content, records_per_page) {
    return Math.ceil(content.length / records_per_page)
}

changePage(10, exactPage, sectionData, characterSection)

function next(page, data, wrapper) {
    (page <= numPages(data, 10)) ?
        (changePage(10, page, data, wrapper)) : false
}

function previous(page, data, wrapper) {
    (page >= 1) ?
        (changePage(10, page, data, wrapper)) : false
}

//


// Filter by Gender

genderSelect.addEventListener('change', genderUI)
let exactPage1 = 1;

// const filterItems = (gender) => {
//     const genders = ['males', 'male', 'females']

//     const newArr = [...sectionData].filter((item) => {
//         const p_gender = item.children[1].textContent.toLowerCase().slice(8)
//         if (!gender) return !genders.includes(p_gender);
//         return p_gender === gender || p_gender === (gender + 's')

//     })

//     changePage(10, exactPage1, genderArr_male, characterSection)
// }


let genderArr_male = sectionData.filter((item) => {
    const p_gender = item.children[1].textContent.toLowerCase().slice(8)
    return p_gender === 'male' || p_gender === 'males'
}),
    genderArr_female = sectionData.filter((item) => {
        const p_gender = item.children[1].textContent.toLowerCase().slice(8)
        return p_gender === 'female'
    }),
    genderArr_others = sectionData.filter((item) => {
        const p_gender = item.children[1].textContent.toLowerCase().slice(8);
        return p_gender != 'male' && p_gender != 'female' && p_gender != 'males'
    });

function maleGender(e) {
    (e.target.value.toLowerCase() === 'male') ? (
        changePage(10, exactPage1, genderArr_male, characterSection))
        : false;
}

function femaleGender(e) {
    (e.target.value.toLowerCase() === 'female') ? (
        changePage(10, exactPage1, genderArr_female, characterSection))
        : false;
}

function otherGender(e) {
    (e.target.value.toLowerCase() != 'female'
        && e.target.value.toLowerCase() != 'male') ? (
        changePage(10, exactPage1, genderArr_others, characterSection))
        : false;
}

function anyGender(e) {
    (e.target.value.toLowerCase() === 'any') ?
        (changePage(10, exactPage1, sectionData, characterSection)) : false
}

function genderUI(e) {
    // btn_next.removeEventListener('click', callsNext);
    // btn_prev.removeEventListener('click', callsPrevious);



    maleGender(e);
    femaleGender(e);
    otherGender(e);
    anyGender(e);

    // filterItems(e)

    // function next1() {
    //     (exactPage1 < numPages(genderArr_male, 10)) ?
    //         (exactPage1++, changePage(10, exactPage1, genderArr_male, characterSection)) : false
    // }

    // function previous1() {
    //     (exactPage1 > 1) ? (exactPage1--,
    //         changePage(10, exactPage1, genderArr_male, characterSection)) : false
    // }
}
