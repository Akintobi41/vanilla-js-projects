const gender = {
    male: "/Images/man.svg",
    female: "/Images/woman.svg",
    unknown: ''
}

export const el = (e) => document.createElement(e)

export const addClass = (el, name) => el.classList.add(name)

export const append = (el, child) => el.appendChild(child)

export const getEl = (e) => document.querySelector(e)

export const characterCard = (character, i, arr) => {
    const newSection = el('section'), header = el('header'),
        img = el('img'), h2 = el('h2'), p_gender = el('p'),
        p_birth = el('p'), p_race = el('p'), p_death = el('p'),
        p_spouse = el('p'), header_section = el('div'),
        btnSection = el('button'), starImg = el('img'), p_more = el('p');

    //card character name
    newSection.id = i
    h2.innerHTML = `<a href="${character.wikiUrl}" 
        title="click to learn more about ${character.name}"> 
        ${character.name}</a>`;

    //favorites button
    starImg.src = '/Images/star-sharp.svg';
    addToFav(btnSection, "click");

    img.src = gender[character.gender ? character.gender === "Female" ? 'female' : 'male' : 'unknown']

    if (character.gender === "Female") addClass(img, "female")

    // Adding attributes for  the images
    img.setAttribute('alt', "gender-type")
    starImg.setAttribute('alt', 'add to favorites')

    p_birth.textContent = `Birth: ${character.birth || 'Data unavailable'}`
    p_gender.textContent = `Gender: ${character.gender}`;
    p_race.textContent = `Race: ${character.race}`;
    p_death.textContent = `Death: ${character.death || 'Data unavailable'}`
    p_spouse.textContent = `Spouse: ${character.spouse || 'Data unavailable'}`
    p_more.textContent = 'View more...'

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

    arr = arr.push(newSection)
}


export function addToFav(element, listener) {
    element.setAttribute("title", "Add to favorites")
    element.addEventListener(listener, function () {
        element.classList.toggle('active');
        element.setAttribute('title', "Added to Favorites")
    })
    if (!element.classList.value.includes('active')) element.removeAttribute('title')


}
