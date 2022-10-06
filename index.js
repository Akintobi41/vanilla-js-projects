let hamToggle = document.querySelector(".hamburger"),
    navigation = document.querySelector(".navigation");

// Hamburger Menu
// document.onclick = function (e) {
//     if (e.target !== hamToggle && e.target !== navigation) {
//         hamToggle.classList.remove("active");
//         navigation.classList.remove("active");
//     }
// };

hamToggle.onclick = function () {
    hamToggle.classList.toggle("active");
    navigation.classList.toggle("active");
};
// API End-point and Key
const baseURL = 'https://the-one-api.dev/v2',
    key = 'BgzGDjkis8Ra13B9XxTF';
//

// function for fetching
const apiCall = async (url) => {
    try {
        const res = await fetch(`${baseURL}${url}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${key}`
            }
        })
        return await res.json()
    } catch (error) {
        console.log('Error Found:' `${error}`)
    }
}



const getAll_data = async () => {

    const mainData = await Promise.all([apiCall('/book'), apiCall('/character'),
    apiCall('/movie'), apiCall('/quote'), apiCall('/chapter')])

    localStorage.setItem('book_docs', JSON.stringify(mainData[0]));
    localStorage.setItem('characters_docs', JSON.stringify(mainData[1]))
    localStorage.setItem('movie_docs', JSON.stringify(mainData[2]))
    localStorage.setItem('quote_docs', JSON.stringify(mainData[3]))
    localStorage.setItem('chapter_docs', JSON.stringify(mainData[4]))
}
getAll_data();


// Fetching the books from localStorage
let retrievedBooks = (JSON.parse(localStorage.getItem('book_docs')).docs)
//Fetching the characters from localStorage
let retrievedCharacters = JSON.parse(localStorage.getItem('characters_docs'))
//Fetching the quotes from localStorage
let savedQuotes = JSON.parse(localStorage.getItem('quote_docs'))
//Fetching the movies from localStorage
let savedMovies = JSON.parse(localStorage.getItem('movie_docs'))
//
let savedChapters = JSON.parse(localStorage.getItem('chapter_docs')) // not used yet 
//Exporting the data
export { retrievedBooks }
export { retrievedCharacters }
export { savedQuotes }
export { savedMovies }