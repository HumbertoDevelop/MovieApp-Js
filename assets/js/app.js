const d = document;
const URL_HOME = 'https://api.themoviedb.org/3/discover/movie?api_key=1cf50e6248dc270629e802686245c2c8'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const POPULARITY_URL = '/discover/movie';
const genres = '/genre/movie/list';

// Select elements DOM
const fragment = d.createDocumentFragment();
const searchInput = d.getElementById('search');
const container = d.querySelector('.container-main');
const tagsMovies = d.querySelector('.tags');
const log = console.log;



// DOM LOADED
d.addEventListener('DOMContentLoaded', () => {

    try {


        getUrl(POPULARITY_URL);
        getUrl(genres);
        movieSelect();
        // getUrl(genres);
        // movieSelect();
        // infoLoaded(POPULARITY_URL);
        // infoLoaded(genres);
        // showVideosMenu(videosSelector,myIconMenu);
        // menuHamburguer(tagsMovies,iconMenu);




    } catch (err) {
        console.error(`Puede ser el internet o ${err}`);
    }
})

// EFECT

// SELECT MOVIE

function movieSelect() {

    d.addEventListener('click', (e) => {
        // log(e.target);
        // log(e.target.parentElement.classList.value);

        if (e.target.matches('.tag h3')) {
            const path = '/genre/movie/list';
            const currentQuery = e.target.textContent;
            // log(path,currentQuery)
            getUrlQuery(path, currentQuery);
            // log(e.target)
        }


        if (e.target.matches('.trailer')) {
            const trailerId = e.target.id;
            const path = `/movie/${trailerId}/videos`;
            // log(trailerId);

            getUrl(path);

        }

        if (e.target.matches('.fa-search')) {
            searchInput.className = 'activeInputSearch';
            log('searchInput');
        }


        /* log(e.target);

        if (e.target.id) {
            const idMovie = e.target.id;
            const videos = `/movie/${idMovie}/videos`;
            infoLoaded(videos);
        } */
    })

    searchInput.addEventListener('keyup', (e) => {
        const currentQuery = searchInput.value;
        const path = '/search/movie';

        if (e.key === 'Enter') {
            // log(currentQuery);

            getUrlQuery(path, currentQuery)

        }
    })


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
                // showTags(results);
                // log(results)
            } else {
                const result = data.results;
                // log(result);
                showTrailer(result);
            }

        });

}

function getUrlQuery(path, query) {
    const url = `https://api.themoviedb.org/3${path}?api_key=1cf50e6248dc270629e802686245c2c8&query=${query}`;
    // log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // log(`DATA URL QUERY: ${data.genres}`);
            if (data.results) {
                const url = data.results;
                showMovies(url);
            }


            //  if (data.genres) {
            //     const url = data.genres;
            //     showMovies(url);

            // }
        });

}


// SHOW MOVIES
function showMovies(data) {
    // tagsMovies.classList.remove('activeTags');
    // log(data);
    // log(data);

    log(data)
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
                <p class="start">${getStar(vote_average)}</p>
                <p >Release: ${release_date}</p>
                </div>
                <div class="rate-movie">
                <button class="trailer" id="${id}">Trailer</button>
                </div>
                </div>
                </section>
                </div>
                `;
            // log(div)

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
// function showTags(data) {

//     data.forEach(el => {
//         // log(el)
//         const {id,name} = el;
//         const h3 = d.createElement('h3');
//         const div = d.createElement('div');
//         div.classList.add('tag');
//         div.setAttribute('id',id);
//         h3.textContent = name;
//         div.append(h3)
//         fragment.append(div);
//         tagsMovies.append(fragment);
//     });
// }


// SHOW TRAILER
function showTrailer(video) {
    // const div = d.createElement('div');
    // div.setAttribute('class', "trailer-box");
    // div.classList.toggle('activeFrame');
    // div.innerHTML = '';
    let cont = 0;


    video.forEach(srcVideo => {
        if (cont < 1) {

            // const iframe = d.createElement('iframe');
            const link = srcVideo.key;
            let newTab = `https://www.youtube.com/embed/${link}`;
            // iframe.src = `https://www.youtube.com/embed/${link}`;
            window.open(newTab,'_blank');
            // iframe.width = 150;
            // iframe.height = 150;
            // div.append(iframe);
            // fragment.append(div);
            cont++;
        }


    })
    // container.append(fragment);

}


// EFECTS

// MENU BURGUER
// function menuHamburguer(menu,btnMenu) {


//     btnMenu.addEventListener('click', (e) => {
//             window.scrollTo(0,0);
//             menu.classList.toggle('activeTags');
//             btnMenu.classList.toggle('clickBtn');

//     });
// }

// function showVideosMenu(menu,icon) {


//     d.addEventListener('click', (e) => {
//         // console.log(e.target.tagName === 'IMG')
//         if (e.target.tagName === 'IMG') {

//                 getVideos();
//                 menu.classList.toggle('videosActive');
//                 icon.classList.add('activeIcon');

//         }

//         if (e.target.id === 'myIcon') {
//             icon.classList.remove('activeIcon');
//             menu.classList.remove('videosActive');
//         }
//     })


// } 