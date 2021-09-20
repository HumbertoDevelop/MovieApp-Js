const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const container = document.querySelector('.container-movies');
const searchInput = document.getElementById('search');
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', (e) => {
    fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            showMovies(data.results);


        })
})

searchInput.addEventListener('keypress', (e) => {
    // e.preventDefault();
    const inputValue = searchInput.value;
    if (e.key === 'Enter') {
        searchMovie(inputValue);
    }
})

function searchMovie(dataMovie) {
    const currentUrl = searchURL + '&query=' + dataMovie;
    fetch(currentUrl)
        .then((res) => res.json())
        .then((data) => {
            const movies = data.results;
            showMovies(movies);



        })
};


function showMovies(data) {

    container.innerHTML = '';
    data.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('movie');
        const {
            title,
            poster_path,
            vote_average
        } = element;
        if (element.poster_path) {


            div.innerHTML = `
            
            <div class="movieImg">
            <img src="${IMG_URL+poster_path}" alt="peliculaImg">
            </div>
            <div class="text-movie">
            <h1 class="titleMovie">${title}</h1>
            <span class="voteMovie">Rate: ${vote_average}⭐</span>
            </div>
            `;
            fragment.append(div);
            container.append(fragment);

        }
    });


}