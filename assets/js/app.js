const d = document;
const URL_HOME = 'https://api.themoviedb.org/3/discover/movie?api_key=1cf50e6248dc270629e802686245c2c8'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const POPULARITY_URL = '/discover/movie';
const genres = '/genre/movie/list';

// Select elements DOM
const fragment = d.createDocumentFragment();
const searchInput = d.getElementById('search');
const container = d.querySelector('.container-main');
const containerMain = d.querySelector('.container');
const tagsMovies = d.querySelector('.tags');
const modal = d.querySelector('.modal');
const menuCategories = d.querySelector('.btn-categories');
const imgBg = d.getElementById('imgBg');
const infoBg = d.querySelector('.div-infoMovie');
const btnBg = d.getElementById('trailerBg');
const log = console.log;

// DOM LOADED
d.addEventListener('DOMContentLoaded', (e) => {
    getUrl(genres);
    getUrl(POPULARITY_URL);
    funDom();
});

// SELECT MOVIE
function funDom() {
    d.addEventListener('click', (e) => {
        if (e.target.matches('.tag h3')) {
            const path = '/genre/movie/list';
            const currentQuery = e.target.textContent;
            getUrlQuery(path, currentQuery);
        };

        if (e.target.matches('.trailer')) {
            const trailerId = e.target.id;
            const path = `/movie/${trailerId}/videos`;
            getUrl(path);
        };

        if (e.target.matches('.fa-bars') || e.target.matches('.burguer-btn')) {
            menuCategories.classList.toggle("openMenu");
        };

        if (e.target.matches('.btn-categories a')) {
            menuCategories.classList.toggle("openMenu");
            const query = e.target.textContent;
            const movie_id = e.target.id;
            const path = `/movie/${movie_id}/recommendations`;
            getUrlQuery(path, query);
        };

        if (e.target.matches('.movie .card-movie .img-card img')) {
            const currentView = e.target.parentNode.nextSibling.nextSibling.lastElementChild.firstElementChild.querySelector('.overview');
            const currentImgBg = e.target.parentNode.parentNode.parentNode.querySelector('.img-bg');
            currentView.classList.toggle('activeOverview');
            currentImgBg.classList.toggle('activeOverOnImg');
        };

        if (e.target.matches('.img-bg')) {
            const currentView = e.target.nextSibling.nextSibling.lastElementChild.lastElementChild.firstElementChild.querySelector('.overview');
            currentView.classList.add('activeOverview');
            e.target.classList.add('activeOverOnImg');
        };

        if (e.target.matches('.activeOverview')) {
            const currentImgBg = e.target.parentNode.parentNode.parentNode.parentNode.previousSibling.previousSibling;
            e.target.classList.remove('activeOverview');
            currentImgBg.classList.remove('activeOverOnImg');
        };

        if (e.target.matches('.fa-search')) {
            if (searchInput.style.width == '100%') {
                searchInput.style.width = '0%';
            } else {
                searchInput.style.width = '100%';
            };
        };

        if(e.target.matches('.closeModal')){
            e.target.parentNode.classList.remove('activeModal');
        }
    });

    searchInput.addEventListener('keyup', (e) => {
        const currentQuery = searchInput.value;
        const path = '/search/movie';
        if (e.key === 'Enter') {
            getUrlQuery(path, currentQuery);
        };
    });
};

function getUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=1cf50e6248dc270629e802686245c2c8`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (path === POPULARITY_URL) {
                const results = data.results;
                showMovies(results);
            } else if (path === genres) {
                const results = data.genres;
                showTags(results);
            } else {
                const result = data.results;
                showTrailer(result);
            };
        });
};

function getUrlQuery(path, query) {
    const url = `https://api.themoviedb.org/3${path}?api_key=1cf50e6248dc270629e802686245c2c8&query=${query}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.results) {
                const url = data.results;
                showMovies(url);
            } else {
                myModal();
            }
        });
};

// myModal
function myModal() {
    modal.classList.add('activeModal');
    return modal.innerHTML =
        `
            <h3>Oops❗❗❗</h3>
            <p>Something went <span class="wrong">wrong</span> apparently, your search can not be done. Maybe this option is in maintenance</p>
            <button class="closeModal">Ok</button>
    `;
}

// SHOW MOVIES
function showMovies(data) {
    container.innerHTML = '';
    data.forEach(el => {
        const {
            title,
            poster_path,
            id,
            original_language,
            release_date,
            overview,
            vote_average
        } = el;
        const div = d.createElement('div');
        if (poster_path && id && title && original_language && vote_average && release_date && overview) {
            div.classList.add('movie');

            div.innerHTML = `
                <img src="${getImg(poster_path)}" class="img-bg" alt="">
                <div class="card-movie">
                <div class="img-card">
                <img src="${getImg(poster_path)}" alt="">
                </div>
                
                <section class="section-info-card">
                <div class="head-card">
                <h3>${title}</h3>
                </div>
                <div class="body-card">
                <div class="info-movie">
                <p class="language">Language: ${original_language}</p>
                <p class="overview">${overview}</p>
                <p class="star">${getStar(vote_average)}</p>
                <p class="release">Release: ${release_date}</p>
                </div>
                <div class="rate-movie">
                <button class="trailer" id="${id}">Trailer</button>
                </div>
                </div>
                </section>
                </div>
                `;
            fragment.append(div);
            container.append(fragment);
        };
    });
};

// GET IMG URL
function getImg(dataImg) {
    const img = `https://image.tmdb.org/t/p/w500${dataImg}`;
    return img;
};

// SHOW TAGS
function showTags(data) {
    data.forEach(el => {
        const {
            id,
            name
        } = el;
        const a = d.createElement('a');
        a.setAttribute('id', id);
        a.textContent = name;
        fragment.append(a);
    });
    menuCategories.append(fragment);
};

// SHOW TRAILER
function showTrailer(video) {
    const {
        key
    } = video[Math.floor(Math.random() * video.length)];
    if (key === '') {
        return alert('Lo siento el video del trailer de esta pelicula no se encuentra en la base de datos');
    } else {
        let newTab = `https://www.youtube.com/embed/${key}`;
        window.open(newTab, '_blank');
        return newTab;
    };
};

// number round
function numberRound(vote) {
    return Math.floor(vote);
};

// stars movie
function getStar(vote){

    let txt;
    for (let i = 0; i < numberRound(vote); i++) {
        if (numberRound(vote) <= 0) {
            txt = 'No ranking yet';
            return txt;
        }else{
            txt += '⭐';
        }
    }

    return txt;

};
    
    /* 
    switch (numberRound(vote)) {
        case 0:
            txt = 'No ranking yet';
            break;
        case 1:
            txt = '⭐';
            break;
        case 2:
            txt = '⭐⭐';
            break;
        case 3:
            txt = '⭐⭐⭐';
            break;
        case 4:
            txt = '⭐⭐⭐⭐';
            break;
        case 5:
            txt = '⭐⭐⭐⭐⭐';
            break;
        case 6:
            txt = '⭐⭐⭐⭐⭐⭐';
            break;
        case 7:
            txt = '⭐⭐⭐⭐⭐⭐⭐';
            break;
        case 8:
            txt = '⭐⭐⭐⭐⭐⭐⭐⭐';
            break;
        case 9:
            txt = '⭐⭐⭐⭐⭐⭐⭐⭐⭐';
            break;
        case 10:
            txt = '⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐';
            break;

        default:

            txt = 'No ranking yet';
            break;
        }
        return txt;
    };
    */
