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

let newSection;


// let newCharacters = character_docs.map((character) => document.createElement('section'))

// newCharacters.forEach((character) => {

//     character.classList.add('character-section-items')
//     character.id = ids++;

// })

// sectionData.push(...newCharacters)

// let newHeader = character_docs.map((character) => document.createElement('header'))

// newHeader.forEach((header) => {
//     header.classList.add('character-section-header')

// })

// newCharacters.push(...newHeader)
// console.log(newCharacters)

// character_docs.forEach((elements))
// character_docs.forEach((elements1))


// function elements(a, b, c, d, w) {
//     // console.log(e)""

//     a = document.createElement('section');

// }

// function elements1() {
//     // 
// }

let header;
let img;
let h2;
let p_gender;
let p_birth;
let p_race;
let p_spouse;
let btnSection;
let header_section;
let starImg;

// Function for adding classes 
function addclassList(element, className) {
    element.classList.add(`${className}`)
}

function toggleBtn(element, listener) {
    element.setAttribute("title", "Add to favorites")
    element.addEventListener(listener, function () {
        element.classList.toggle('active');
        element.setAttribute('title', "Added to Favorites")
    })
    if (!element.classList.value.includes('active')) element.removeAttribute('title')
}

character_docs.forEach(character => {
    // Creating new elements 
    newSection = document.createElement('section'), newSection.id = ids++,
        header = document.createElement('header'),
        img = document.createElement('img'),
        h2 = document.createElement('h2'),
        p_gender = document.createElement('p'),
        p_birth = document.createElement('p'),
        p_race = document.createElement('p'),
        p_death = document.createElement('p'),
        p_spouse = document.createElement('p'),
        btnSection = document.createElement('button'),
        header_section = document.createElement('div'),
        btnSection = document.createElement('button'),
        starImg = document.createElement('img')

    h2.innerHTML = `<a href="${character.wikiUrl}" 
                       title="click to learn more about ${character.name}"> 
                       ${character.name}</a>`;

    starImg.src = '/Images/star-sharp.svg';
    toggleBtn(btnSection, "click");

    // Checking for assigned gender                   
    if ((character.gender) === 'Male') img.src = imageSource[0]
    else if ((character.gender) === 'Female') {
        img.src = imageSource[1]
        addclassList(img, "female")
    }

    // Checking for Birth Information
    if (!character.birth.length) p_birth.textContent = ` Birth: Data unavailable`
    else p_birth.textContent = ` Birth: ${character.birth}`

    p_gender.textContent = `Gender: ${character.gender}`;
    p_race.textContent = `Race: ${character.race}`;
    p_death.textContent = `Death: ${character.death}`;
    p_spouse.textContent = `Spouse : ${character.spouse}`;
    // Appending elements to the DOM
    header_section.appendChild(img), header_section.appendChild(h2);
    btnSection.appendChild(starImg), header.appendChild(btnSection),
        header.appendChild(header_section)
    newSection.appendChild(header), newSection.appendChild(p_gender)
    newSection.appendChild(p_birth), newSection.appendChild(p_race)
    newSection.appendChild(p_death)
    newSection.appendChild(p_spouse)

    if (!character.death.length) p_death.textContent = `Death: Data unavailable`;
    if (!character.spouse.length) p_spouse.textContent = `Spouse: Data unavailable`;

    // Adding class names to elements
    addclassList(newSection, "character-section-items")
    addclassList(header, "character-section-header")
    addclassList(img, "gender-image")
    addclassList(h2, "character-name")
    addclassList(p_gender, "gender-text")
    addclassList(p_birth, "birth-text")
    addclassList(p_race, "race-text")
    addclassList(p_death, "death-text")
    addclassList(p_spouse, 'spouse-text')
    addclassList(header_section, 'header-section')
    addclassList(starImg, 'star-img')
    addclassList(btnSection, 'btn-section')
    sectionData.push(newSection);
});

// Pagination
let exactPage = 1;

function changePage(records_per_page, current_page, content, wrapper) {

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
    document.querySelector('.min-content').textContent = end;
    document.querySelector('.max-content').textContent = content.length;

}

function numPages(content, records_per_page) {
    return Math.ceil(content.length / records_per_page)
}

changePage(10, exactPage, sectionData, characterSection)

function next() {
    characterSection.innerHTML = '';
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

