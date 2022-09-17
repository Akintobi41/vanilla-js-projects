let hamToggle = document.querySelector(".hamburger"),
    navigation = document.querySelector(".navigation"),
    book_titles = document.querySelector('.book-titles');

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



// Importing books from index.js 
import { retrievedBooks } from "/index.js"


retrievedBooks.forEach(element => {

    let newArticle = document.createElement('article');

    let about_books = document.createElement('section')

    let coverImage = document.createElement('figure')

    newArticle.appendChild(coverImage)
    newArticle.appendChild(about_books)
    book_titles.appendChild(newArticle)
});

let articleSection = document.querySelectorAll('article section'),
    articleFigure = document.querySelectorAll('article figure')

articleSection[0].classList.add('section-image-1');
articleSection[1].classList.add('section-image-2');
articleSection[2].classList.add('section-image-3');

articleSection[0].innerHTML = `<p class="book-1-title">${retrievedBooks[0].name}</p>`
articleSection[0].innerHTML += `<p class="book-1-author">by J. R. R. Tolkien</p>`;
articleSection[0].innerHTML += `<p class="book-1-rating-score">Ratings: 4.0</p>`;
articleSection[0].innerHTML += `<picture class="book-1-ratings">
                    <img src="/Images/star-sharp.svg" class="rating-1">
                    <img src="/Images/star-sharp.svg" class="rating-1"> 
                    <img src="/Images/star-sharp.svg" class="rating-1">
                    <img src="/Images/star-sharp.svg" class="rating-1">
                    <img src="/Images/star-sharp.svg" class="rating-1-not"></picture>`;

articleSection[0].innerHTML += `<p class="book-1-review"><a href="" class="book-1-review-link">
                                Read Review  </a></p>`;

articleFigure[0].classList.add('book-1-image')

articleSection[1].innerHTML = `<p class="book-2-title">${retrievedBooks[1].name}</p>`
articleSection[1].innerHTML += `<p class="book-2-author">by J. R. R. Tolkien</p>`;
articleSection[1].innerHTML += `<p class="book-2-rating-score">Ratings: 5.0</p>`;
articleSection[1].innerHTML += `<picture class="book-1-ratings">
                    <img src="/Images/star-sharp.svg" class="rating-2">
                    <img src="/Images/star-sharp.svg" class="rating-2"> 
                    <img src="/Images/star-sharp.svg" class="rating-2">
                    <img src="/Images/star-sharp.svg" class="rating-2">
                    <img src="/Images/star-sharp.svg" class="rating-2"></picture>`;
articleSection[1].innerHTML += `<p class="book-2-review"><a href="" class="book-2-review-link"> 
                                Read Review  </a></p>`;



articleFigure[1].classList.add('book-2-image')

articleSection[2].innerHTML = `<p class="book-3-title">${retrievedBooks[2].name}</p>`
articleSection[2].innerHTML += `<p class="book-3-author">by J. R. R. Tolkien</p>`;
articleSection[2].innerHTML += `<p class="book-3-rating-score">Ratings: 4.0</p>`;
articleSection[2].innerHTML += `<picture class="book-1-ratings">
                    <img src="/Images/star-sharp.svg" class="rating-1">
                    <img src="/Images/star-sharp.svg" class="rating-1"> 
                    <img src="/Images/star-sharp.svg" class="rating-1">
                    <img src="/Images/star-sharp.svg" class="rating-1">
                    <img src="/Images/star-sharp.svg" class="rating-1-not"></picture>`;

articleSection[2].innerHTML += `<p class="book-3-review"><a href="" class="book-3-review-link">
                                Read Review  </a></p>`;

articleFigure[2].classList.add('book-3-image')


let origin = document.querySelector('.origin')
let newYear = new Date().getFullYear();

origin.textContent = newYear;


let form = document.querySelector('.form')


// E-mail Validation 


let mailInput = document.querySelector('.email-section'),
    submitBtn = document.querySelector('.submit-button'),
    formTooltip = document.querySelector('.form-tooltip'),
    formFeedback = document.querySelector('.form-feedback')

function validation(e) {
    e.preventDefault();

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let email = document.querySelector('.email-section').value;

    if (email.match(pattern)) {
        submitBtn.style.cursor = "not-allowed"
        submitBtn.setAttribute('disabled', 'disabled')
        formTooltip.textContent = ''

        setTimeout(() => {
            formFeedback.classList.toggle('form-response')

        }, 1000);

        setTimeout(() => {
            formFeedback.classList.toggle('form-response')
            document.querySelector('.email-section').value = '';
            submitBtn.style.cursor = "pointer"
            submitBtn.removeAttribute('disabled')
        }, 2000);

    } else {
        formTooltip.textContent = "Please Enter A Valid Email Address* "
        formTooltip.style.color = "red"
        submitBtn.setAttribute('disabled', 'disabled')
        submitBtn.style.cursor = "not-allowed"

        setTimeout(() => {
            submitBtn.removeAttribute('disabled')
            submitBtn.style.cursor = "pointer"
        }, 1000);
    }

    if (email.trim() === '') {
        formTooltip.textContent = "Please Enter A Valid Email Address* "
        formTooltip.style.color = "#760000";

        setTimeout(() => {
            submitBtn.style.cursor = "pointer"
            submitBtn.removeAttribute('disabled')
        }, 1000)
    }
    email = '';
}

submitBtn.addEventListener('click', validation)
