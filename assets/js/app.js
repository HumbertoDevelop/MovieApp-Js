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
const divEfect = d.querySelector('.div');
const menuCategories = d.querySelector('.btn-categories');
const log = console.log;



// DOM LOADED
d.addEventListener('DOMContentLoaded', () => {

    try {


        getUrl(genres);
        getUrl(POPULARITY_URL);
        movieSelect();
        // d.querySelector('.img-bg-desktop')




    } catch (err) {
        console.error(`Puede ser el internet o ${err}`);
    }
})


// SELECT MOVIE

function movieSelect() {

    d.addEventListener('click', (e) => {
        // log(e.target);

        if (e.target.matches('.tag h3')) {
            const path = '/genre/movie/list';
            const currentQuery = e.target.textContent;
            getUrlQuery(path, currentQuery);
        }


        if (e.target.matches('.trailer')) {
            const trailerId = e.target.id;
            const path = `/movie/${trailerId}/videos`;

            getUrl(path);

        }

        if (e.target.matches('.fa-bars') || e.target.matches('.burguer-btn')) {
            log(e.target);
            menuCategories.classList.toggle("openMenu");

        }

        if (e.target.matches('.btn-categories a')) {
            // log(e.target.textContent);
            menuCategories.classList.toggle("openMenu");
            const query = e.target.textContent;
            const movie_id = e.target.id;
            const path = `/movie/${movie_id}/recommendations`;
            getUrlQuery(path, query);
        }

        if (e.target.matches('.img-bg-desktop')) {
            const targetSrc = e.target.src;
            getBackground(targetSrc);
            // log(container)
            // log(targetSrc)

        }
    })

    // function getEfectDescription(targetEfect) {
    //     const divEfect = d.createElement('div');
    //     divEfect.classList.toggle('activeDescription');
    //     targetEfect.append(divEfect);

    //     log('img grande '+targetEfect);
    // }

    searchInput.addEventListener('keyup', (e) => {
        const currentQuery = searchInput.value;
        const path = '/search/movie';

        if (e.key === 'Enter') {
            // log(currentQuery);

            getUrlQuery(path, currentQuery)

        }
    })


}

function getBackground(src) {
    // const targetDiv = containerMain;
    const div = divEfect;
    // log(targetDiv)

    if (!div.hasChildNodes()) {


        const imgBg = d.createElement('img');
        // const btnImg = d.createElement('button');
        // btnImg.textContent = 'See Trailer';
        imgBg.src = src;
        imgBg.classList.toggle('active2');
        // div.append(btnImg);
        div.append(imgBg);
    } else {
        div.querySelector('.active2').src = src;
    }

}



function getUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=1cf50e6248dc270629e802686245c2c8`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // log(data);

            if (path === POPULARITY_URL) {

                const results = data.results;
                showMovies(results);
                // log(results)
            } else if (path === genres) {

                const results = data.genres;
                showTags(results);
                log(results)
            } else {
                const result = data.results;
                log(result);
                showTrailer(result);
            }

        });

}

function getUrlQuery(path, query) {
    const url = `https://api.themoviedb.org/3${path}?api_key=1cf50e6248dc270629e802686245c2c8&query=${query}`;
    log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.results) {
                const url = data.results;
                showMovies(url);
            }


            if (data.genres) {
                const url = data.genres;
                // showMovies(url);
                log(url)
            }
        });

}

// id: 28, name: 'Action'


// SHOW MOVIES
function showMovies(data) {

    // log(data)
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
        // log(poster_path)
        if (poster_path && id && title && original_language && vote_average && release_date && overview) {
            div.classList.add('movie');
            div.innerHTML = `
                
                <img src="${getImg(poster_path)}" class="img-bg img-bg-desktop" alt="">
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
        }



    });

}

// number round
function numberRound(vote) {
    return Math.floor(vote);
}

// stars movie
function getStar(vote) {

    let txt;
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
}

// GET IMG URL
function getImg(dataImg) {
    const img = `https://image.tmdb.org/t/p/w500${dataImg}`;
    return img;
}

// SHOW TAGS
function showTags(data) {

    // const div = d.createElement('div');
    data.forEach(el => {
        log(el);
        const {
            id,
            name
        } = el;
        const a = d.createElement('a');
        a.setAttribute('id', id);
        a.textContent = name;
        // a.classList.add('btn-categories');
        fragment.append(a);
    });
    menuCategories.append(fragment);
}


// SHOW TRAILER
function showTrailer(video) {
    // log(video);

            
            const link = video[0].key;
            if (link === '') {
                alert('Lo siento el video del trailer de esta pelicula fue eliminado de internet');
            }else{

                let newTab = `https://www.youtube.com/embed/${link}`;
                window.open(newTab, '_blank');
            }
           
    

}

