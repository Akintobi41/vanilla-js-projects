import * as _ from "../utils.js";

let hamToggle = _.getEl(".hamburger"),
    navigation = _.getEl(".navigation"),
    btn_prev = _.getEl('.previous'),
    btn_next = _.getEl('.next'),
    minContent = _.getEl('.min-content'),
    maxContent = _.getEl('.max-content'),
    genderSelect = _.getEl('#gender-select'),
    contentSearch = _.getEl('.content-search'),
    footer = _.getEl('.pagination');
export let characterSection = _.getEl('.character-section');

hamToggle.onclick = function () {
    hamToggle.classList.toggle("active");
    navigation.classList.toggle("active");
};

import { retrievedCharacters } from "../index.js";

export let character_docs = retrievedCharacters.docs,
    sectionData = [];

character_docs.forEach((val, i) => _.characterCard(val, i, sectionData));

// Pagination
export let exactPage = 1;

export function changePage(records_per_page, current_page, content, wrapper) {
    wrapper.innerHTML = '';
    current_page--;

    let start = current_page * records_per_page,
        end = start + records_per_page,
        paginatedItems = content.slice(start, end);

    paginatedItems.forEach((items) => wrapper.append(items));   // Appending items to DOM
    ((current_page + 1) != 1) ?
        btn_prev.classList.remove("previous-button") :
        _.addClass(btn_prev, "previous-button");

    ((current_page + 1) === numPages(content, records_per_page)) ?
        _.addClass(btn_next, 'next-button') :
        _.removeClass(btn_next, 'next-button')

    minContent.textContent = end;
    maxContent.textContent = content.length;
    (end > content.length) ? minContent.textContent = content.length : false
}
btn_next.addEventListener('click', callsNext)
btn_prev.addEventListener('click', callsPrevious)

function callsNext() {
    if (exactPage < numPages(sectionData, 5)) exactPage++;
    next(exactPage, sectionData, characterSection)
}

function callsPrevious() {
    if (exactPage > 1) exactPage--;
    previous(exactPage, sectionData, characterSection)
}

function numPages(content, records_per_page) {
    return Math.ceil(content.length / records_per_page)
}

changePage(5, exactPage, sectionData, characterSection)

function next(page, data, wrapper) {
    (page <= numPages(data, 5)) ?
        (changePage(5, page, data, wrapper)) : false
}

function previous(page, data, wrapper) {
    (page >= 1) ?
        (changePage(5, page, data, wrapper)) : false
}
//

// Filter by Gender
genderSelect.addEventListener('change', genderUI)

genderSelect.addEventListener('change', changeWidth) // Width styling when you change option
function changeWidth(e) {

    const option = e.target.value,
        genders = ['Male', 'Other'];

    _.removeClass(genderSelect, 'gender-type')
    _.removeClass(genderSelect, 'gender-option')

    if (option === 'Female') {
        _.removeClass(genderSelect, 'gender-type')
        _.addClass(genderSelect, 'gender-option')
    }
    genders.forEach((item) => {
        if (item.includes(e.target.value)) {
            _.addClass(genderSelect, 'gender-type')
        }
    })

}

function genderUI(e) {
    contentSearch.value = '';
    const gender = e.target.value;
    const knownGenders = ['Males', 'male', 'Male', 'Female']
    sectionData = [];
    exactPage = 1
    if (gender === 'Any') character_docs.forEach((val, i) => _.characterCard(val, i, sectionData))

    const newArr = [...character_docs].filter((val) => {
        if (gender === 'Other') {
            return !knownGenders.includes(val.gender)
        }
        return gender === val.gender || gender === (val.gender + 's')
    })

    newArr.forEach((val, i) => _.characterCard(val, i, sectionData))
    changePage(5, 1, sectionData, characterSection)
}
//
// Search for content 
contentSearch.addEventListener('input', function (e) {
    genderSelect.value = 'Any';
    const result = e.target.value.toLowerCase();

    const new_results = character_docs.filter((hero) => {
        const check = hero.name.toLowerCase();
        return check.startsWith(result)
    });

    sectionData = [];
    exactPage = 1;
    new_results.forEach((val, i) => _.characterCard(val, i, sectionData))
    changePage(5, 1, sectionData, characterSection)

    footer.style.display = 'flex';
    if (!sectionData.length) {
        characterSection.innerHTML = `<p class="not-found">Oops, we didn't find anything for<br>  
                                        "${e.target.value}"</p>`;
        footer.style.display = "none"
    }
})

let origin = document.querySelector('.origin'),
    newYear = new Date().getFullYear();
origin.textContent = newYear;

