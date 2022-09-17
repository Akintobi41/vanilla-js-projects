let hamToggle = document.querySelector(".hamburger"),
    navigation = document.querySelector(".navigation"),
    book_titles = document.querySelector('.book-titles'),
    btn_prev = document.querySelector('.previous'),
    btn_next = document.querySelector('.next'),
    characterSection = document.querySelector('.character-section');


// Hamburger Menu of the page
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

import { retrievedCharacters } from "../index.js";

console.log(retrievedCharacters)

let character_docs = retrievedCharacters.docs;

let sectionData = [];
let ids = 1;

character_docs.forEach(character => {

    let newSection = document.createElement('section');
    newSection.classList.add('character-section');
    newSection.id = ids++;

    let img = document.createElement('img');
    img.classList.add('gender-image');

    let h2 = document.createElement('h2');
    h2.classList.add('character-name');

    let p_gender = document.createElement('p');
    p_gender.classList.add('gender-text');

    let p_birth = document.createElement('p');
    p_birth.classList.add('birth-text');

    let p_race = document.createElement('p');
    p_race.classList.add('race-text')

    let p_death = document.createElement('p')
    p_death.classList.add('death-text');


    sectionData.push(newSection);

});

// Pagination

function changePage(records_per_page, current_page, content, wrapper) {

    // if (current_page < 1) current_page = 1;
    // if (current_page > numPages(sectionData, 15)) current_page = numPages(sectionData, 15);




    // for (let i = (current_page - 1) * records_per_page; i < (current_page * records_per_page) && i < content.length; i++) {
    //     console.log(sectionData[i])
    // }

    wrapper.innerHTML = '';
    current_page--;

    let start = current_page * records_per_page,
        end = start + records_per_page,
        paginatedItems = content.slice(start, end)

    paginatedItems.forEach((items) => wrapper.append(items));

    if (current_page >= 1) {
        btn_next.style.border = "solid 1px #2c2828"
    } else {
        btn_next.style.border = "initial"
    }

    if (current_page != 1) {
        btn_prev.style.border = "solid 1px #2c2828"
    }



}

// function numPages(content, records_per_page) {
//     return Math.ceil(content.length / records_per_page)
// }


changePage(15, 1, sectionData, characterSection)


// function next(current_page) {
//     page = 1;
//     if (page < numPages(sectionData, 15)) {
//         page++;
//         changePage(15, page, sectionData)
//     }
// }
// function previous(page) {
//     page = 1;
//     if (page > 1) {
//         page--;
//         changePage(15, page, sectionData)
//     }
// }

// btn_next.addEventListener('click', next)
// btn_prev.addEventListener('click', previous)