import { savedMovies } from "../index.js";
import { el } from "../utils.js";
import { append } from '../utils.js'

let movies = savedMovies.docs,
    movieContent = document.querySelectorAll('details div'),
    summary = document.querySelectorAll('summary');

[...summary].forEach((title, i) => {
    title.textContent = movies[i].name;
});

[...movieContent].forEach((item, i) => {
    let p1 = el('p'), p2 = el('p'), p3 = el('p'),
        p4 = el('p'), p5 = el('p'), p6 = el('p');

    p1.textContent = `academyAwardNominations: ${movies[i].academyAwardNominations}`
    p2.textContent = `academyAwardWins: ${movies[i].academyAwardWins}`
    p3.textContent = `boxOfficeRevenueInMillions: ${movies[i].boxOfficeRevenueInMillions}`
    p4.textContent = `budgetInMillions: ${movies[i].budgetInMillions}`
    p5.textContent = `rottenTomatoesScore: ${movies[i].rottenTomatoesScore}`
    p6.textContent = `runtimeInMinutes: ${movies[i].runtimeInMinutes}`

    append(item, p1)
    append(item, p2)
    append(item, p3)
    append(item, p4)
    append(item, p5)
    append(item, p6)
})
let origin = document.querySelector('.origin')
let newYear = new Date().getFullYear();

origin.textContent = newYear;


