let hamToggle = document.querySelector(".hamburger"),
    navigation = document.querySelector(".navigation"),
    book_titles = document.querySelector('.book-titles'),
    btn_prev = document.querySelector('.previous'),
    btn_next = document.querySelector('.next'),
    characterSection = document.querySelector('.character-section');


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

let p_death;
let character_docs = retrievedCharacters.docs,
    sectionData = [],
    ids = 1,
    imageSource = ['/Images/man.svg', '/Images/woman.svg'];


console.log(character_docs)
character_docs.forEach(character => {

    let newSection = document.createElement('section');
    newSection.classList.add('character-section-items');
    newSection.id = ids++;

    let header = document.createElement('header')
    header.classList.add('character-section-header')

    let img = document.createElement('img');
    img.classList.add('gender-image');


    let h2 = document.createElement('h2');
    h2.classList.add('character-name');
    h2.innerHTML = `<a href="${character.wikiUrl}"> ${character.name}</a>`
    // h2.textContent = character.name


    if ((character.gender) === 'Male') {
        img.src = imageSource[0]
    }
    if ((character.gender) === 'Female') {
        img.src = imageSource[1]
        img.classList.add('female')
    }

    header.appendChild(img)
    header.appendChild(h2)

    newSection.appendChild(header)

    let p_gender = document.createElement('p');
    p_gender.classList.add('gender-text');

    p_gender.textContent = `Gender: ${character.gender}`;

    let p_birth = document.createElement('p');
    p_birth.classList.add('birth-text');
    p_birth.textContent = ` Birth: ${character.birth}`

    if (character.birth.length < 1) {
        p_birth.textContent = ` Birth: Data unavailable`

    }

    newSection.appendChild(p_gender)
    newSection.appendChild(p_birth)

    let p_race = document.createElement('p');
    p_race.classList.add('race-text')

    p_death = document.createElement('p')
    p_death.classList.add('death-text');


    sectionData.push(newSection);



});


// let b = [];

// let newCharacter = character_docs.map((character) => {

//     let p = document.createElement('p')
//     let img = document.createElement('img')

//     return p && img
// })


// Pagination

let exactPage = 1;

function changePage(records_per_page, current_page, content, wrapper) {
    // if (current_page < 1) current_page = 1;
    // if (current_page > numPages(sectionData, 15)) current_page = numPages(sectionData, 15);

    btn_next.addEventListener('click', next)
    btn_prev.addEventListener('click', previous)

    wrapper.innerHTML = '';
    current_page--;

    let start = current_page * records_per_page,

        end = start + records_per_page,

        paginatedItems = content.slice(start, end);

    paginatedItems.forEach((items) => wrapper.append(items));   // Appending items to DOM

    if ((current_page + 1) >= 1) {
        btn_next.style.border = "solid 1px #2c2828"
    }
    else {
        btn_next.style.border = "initial"
    }

    if ((current_page + 1) != 1) {
        btn_prev.style.border = "solid 1px red"
    }
}

function numPages(content, records_per_page) {
    return Math.ceil(content.length / records_per_page)
}

changePage(10, exactPage, sectionData, characterSection)

function next() {
    if (exactPage < numPages(sectionData, 10)) {
        exactPage++;
        changePage(10, exactPage, sectionData, characterSection)
    }
}

function previous() {
    if (exactPage > 1) {
        exactPage--;
        changePage(10, exactPage, sectionData, characterSection)
    }
}

