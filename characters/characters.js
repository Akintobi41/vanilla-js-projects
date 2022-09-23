import * as _ from "../utils.js"
console.log(_)
let hamToggle = _.getEl(".hamburger"),
    navigation = _.getEl(".navigation"),
    book_titles = _.getEl('.book-titles'),
    btn_prev = _.getEl('.previous'),
    btn_next = _.getEl('.next'),
    characterSection = _.getEl('.character-section'),
    minContent = _.getEl('.min-content'),
    maxContent = _.getEl('.max-content'),
    genderSelect = _.getEl('#gender-select')

// Hamburger Menu 
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
    sectionData = [],
    imageSource = ['/Images/man.svg', '/Images/woman.svg'];


character_docs.forEach((val, i) => _.characterCard(val, i, sectionData))

// function runUI(character, i) {

//     // Creating new elements 
//     const newSection = _.el('section'), header = _.el('header'),
//         img = _.el('img'), h2 = _.el('h2'), p_gender = _.el('p'),
//         p_birth = _.el('p'), p_race = _.el('p'), p_death = _.el('p'),
//         p_spouse = _.el('p'), header_section = _.el('div'),
//         btnSection = _.el('button'), starImg = _.el('img'), p_more = _.el('p');

//     newSection.id = i
//     h2.innerHTML = `<a href="${character.wikiUrl}" 
//                        title="click to learn more about ${character.name}"> 
//                        ${character.name}</a>`;

//     starImg.src = '/Images/star-sharp.svg';
//     _.addToFav(btnSection, "click");
//     // Checking for assigned gender                   
//     if ((character.gender) === 'Male') img.src = imageSource[0]
//     else if ((character.gender) === 'Female') {
//         img.src = imageSource[1]
//         addclassList(img, "female")
//     }
//     // Adding attributes for images
//     img.setAttribute('alt', "gender-type")
//     starImg.setAttribute('alt', 'add to favorites')

//     console.log(character)
//     // Checking for Birth Information
//     if (!character.birth.length) p_birth.textContent = ` Birth: Data unavailable`
//     else p_birth.textContent = ` Birth: ${character.birth}`

//     p_gender.textContent = `Gender: ${character.gender}`;
//     p_race.textContent = `Race: ${character.race}`;
//     p_death.textContent = `Death: ${character.death}`;
//     p_spouse.textContent = `Spouse : ${character.spouse}`;
//     p_more.textContent = 'View more...'

//     // Appending elements to the DOM
//     _.append(header_section, img); _.append(header_section, h2)
//     _.append(btnSection, starImg), _.append(header, btnSection),
//         _.append(header, header_section)
//     _.append(newSection, header), _.append(newSection, p_gender)
//     _.append(newSection, p_birth), _.append(newSection, p_race)
//     _.append(newSection, p_death), _.append(newSection, p_spouse)
//     _.append(newSection, p_more)

//     if (!character.death.length) p_death.textContent = `Death: Data unavailable`;
//     if (!character.spouse.length) p_spouse.textContent = `Spouse: Data unavailable`;

//     // Adding class names to elements
//     addclassList(newSection, "character-section-items")
//     addclassList(header, "character-section-header")
//     addclassList(img, "gender-image")
//     addclassList(h2, "character-name")
//     addclassList(p_gender, "gender-text")
//     addclassList(p_birth, "birth-text")
//     addclassList(p_race, "race-text")
//     addclassList(p_death, "death-text")
//     addclassList(p_spouse, 'spouse-text')
//     addclassList(header_section, 'header-section')
//     addclassList(starImg, 'star-img')
//     addclassList(btnSection, 'btn-section')
//     addclassList(p_more, "view-more-text")
//     sectionData = [...sectionData, newSection]    //Appending elements to sectionData
// }


// Pagination
let exactPage = 1;

btn_next.addEventListener('click', next)
btn_prev.addEventListener('click', previous)

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
let genderArr_male;
let exactPage1 = 1;

// btn_next.removeEventListener('click', next)
// btn_prev.removeEventListener('click', previous)

btn_next.addEventListener('click', next1)
btn_prev.addEventListener('click', previous1)

function genderUI(e) {
    if (e.target.value.toLowerCase() === 'male') {

        genderArr_male = sectionData.filter((item) => {
            return item.children[1].textContent.slice(8) === 'Male'
        })
        changePage(10, exactPage1, genderArr_male, characterSection)

    }
}
function next1() {
    (exactPage1 < numPages(genderArr_male, 10)) ?
        (exactPage1++, changePage(10, exactPage1, genderArr_male, characterSection)) : false
}

function previous1() {
    (exactPage1 > 1) ? (exactPage1--,
        changePage(10, exactPage1, genderArr_male, characterSection)) : false
}