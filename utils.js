import { retrievedCharacters } from "../index.js";
const characters = retrievedCharacters.docs;


const gender = {
    male: "/Images/man.svg",
    female: "/Images/woman.svg",
    unknown: "/Images/icons8-gender (1).svg"
}

export const el = (e) => document.createElement(e)

export const addClass = (el, name) => el.classList.add(name)

export const removeClass = (el, name) => el.classList.remove(name)

export const append = (el, child) => el.appendChild(child)

export const getEl = (e) => document.querySelector(e)
export const favSelect = getEl('.section-select');

export const characterCard = (hero, i, arr) => {
    const newSection = el('section'), header = el('header'),
        img = el('img'), h2 = el('h2'), p_gender = el('p'),
        p_birth = el('p'), p_race = el('p'), p_death = el('p'),
        p_spouse = el('p'), header_section = el('div'),
        btnSection = el('button'), starImg = el('img'), p_more = el('p'), p_realm = el('p'),
        p_hair = el('p');

    // card character name
    newSection.id = i;
    h2.innerHTML = `<a href="${hero.wikiUrl}" 
        title="click to learn more about ${hero.name}"> 
        ${hero.name}</a>`;

    // favorites button
    starImg.src = '/Images/star-sharp.svg';
    addToFav(btnSection, "click");
    hoverFav(btnSection, "mouseover");
    //
    starImg.id = hero._id   /// trial
    img.src = gender[hero.gender && hero.gender?.toString() !== "NaN" ?
        hero.gender === "Female" ? 'female' : 'male' :
        'unknown'];

    if (hero.gender === "Female") addClass(img, "female");
    if (!(hero.gender?.endsWith('le' || 'les'))) addClass(img, 'unknown');
    // Adding attributes for the images
    img.setAttribute('alt', "gender-type")
    starImg.setAttribute('alt', 'add to favorites')
    //
    p_birth.textContent = `Birth: ${(hero.birth && hero.gender.toString() != 'NaN') ?
        hero.gender : 'unknown'}`
    p_gender.textContent = `Gender: ${(hero.gender && hero.gender.toString() != 'NaN') ?
        hero.gender : 'unknown'}`;
    p_race.textContent = `Race: ${(hero.race && hero.race.toString() != 'NaN') ?
        hero.race : 'unknown'}`;
    p_death.textContent = `Death: ${(hero.death && hero.death.toString() != 'NaN') ?
        hero.death : 'unknown'}`
    p_spouse.textContent = `Spouse: ${(hero.spouse && hero.spouse.toString() != 'NaN') ?
        hero.spouse : 'unknown'}`
    p_more.textContent = 'View more...'
    p_realm.textContent = `Realm: ${(hero.realm && hero.realm.toString() != 'NaN') ?
        hero.realm : 'unknown'}`
    p_hair.textContent = `Hair: ${(hero.hair && hero.hair.toString() != 'NaN') ?
        hero.hair : 'unknown'}`

    append(header_section, img)
    append(header_section, h2)
    append(btnSection, starImg)
    append(header, btnSection)
    append(header, header_section)
    append(newSection, header)
    append(newSection, p_gender)
    append(newSection, p_birth)
    append(newSection, p_race)
    append(newSection, p_death)
    append(newSection, p_spouse)
    append(newSection, p_more)
    append(newSection, p_realm)
    append(newSection, p_hair)
    // Adding class names to elements
    addClass(newSection, "character-section-items")
    addClass(header, "character-section-header")
    addClass(img, "gender-image")
    addClass(h2, "character-name")
    addClass(p_gender, "gender-text")
    addClass(p_birth, "birth-text")
    addClass(p_race, "race-text")
    addClass(p_death, "death-text")
    addClass(p_spouse, 'spouse-text')
    addClass(header_section, 'header-section')
    addClass(starImg, 'star-img')
    addClass(btnSection, 'btn-section')
    addClass(p_more, "view-more-text")
    addClass(p_realm, 'realm-text')
    addClass(p_hair, 'hair-text');

    p_more.addEventListener('click', function () {
        viewMore(p_realm)
        viewMore(p_hair)
        addClass(p_more, "more-info")
    })
    arr = arr.push(newSection)
}

const viewMore = (element) => element.style.display = "block";

export let favorites = [];

export let newData = [];

export function addToFav(element, listener) {
    element.addEventListener(listener, function (e) {
        element.classList.toggle('active');

        let el_id = e.target.id
        if (element.classList.value.includes('active')) {
            let new_fav = characters.filter((item) => {
                return item._id === el_id
            })
            favorites.push(...new_fav)
        } else {

            newData = favorites.filter((item) => {
                return !(item._id === el_id)
            })
            favorites = newData;

        }
    });
}

export function hoverFav(element, listener) {
    const e_class = element.classList;
    element.addEventListener(listener, function () {
        (e_class[e_class.length - 1].includes('active')) ?
            element.setAttribute('title', 'Remove from Favorites') :
            element.setAttribute('title', 'Add to Favorites')
    })
}


