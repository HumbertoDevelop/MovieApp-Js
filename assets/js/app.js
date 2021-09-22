const d = document;
const API_KEY = '?api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const POPULARITY_URL = '/discover/movie';
const searchURL =  '/search/movie' ;
const upComing =  '/movie/upcoming';
const genres = '/genre/movie/list';

// Select elements DOM
const container = d.querySelector('.container-movies');
const searchInput = d.getElementById('search');
const searchInputValue = d.getElementById('search').value;
const fragment = d.createDocumentFragment();
const tagsMovies = d.querySelector('.tags');
const iconMenu = document.querySelector('.fa-bars');
let activeMenu = false;


// DOM LOADED
d.addEventListener('DOMContentLoaded', () => {
    try {
        
        takeInfoTags(BASE_URL,genres,API_KEY);
        takeInfo(BASE_URL,POPULARITY_URL,API_KEY);
        menuHamburguer(tagsMovies,iconMenu);
        takeInfoSearch(BASE_URL,searchURL,API_KEY,searchInput);
        

        
        
    } catch (err) {
        console.error(`Puede ser el internet o ${err}`);
    }
})

// Functions
// TAKE INFO
function takeInfo(base,kind,key) {
    try {
        
        const CURRENT_URL = base+kind+key;
        fetch(CURRENT_URL)
        .then((res) => res.json())
        .then((data) => {
            const results = data.results;
            showMovies(results);
            
        });
    } catch (err) {
        console.error(`Puede ser el internet o ${err}`);
    }
}

// TAKE INFO SEARCH
function takeInfoSearch(base,kind,key,query) {

    searchInput.addEventListener('keyup', (e) => {
        const currentQuery = query.value;
        
        if (e.key === 'Enter') {
            
            const CURRENT_URL = base+kind+key+'&query='+currentQuery;
            fetch(CURRENT_URL)
            .then((res) => res.json())
            .then((data) => {
                const results = data.results;
                showMovies(results);
                console.log(results)
            });
        }
    })
        
}

// TAKE INFO TAGS
function takeInfoTags(base,kind,key) {

  
    const CURRENT_URL = base+kind+key;
    fetch(CURRENT_URL)
    .then((res) => res.json())
    .then((data) => {
        const results = data.genres;
        showTags(results);
        
    });

   

    d.addEventListener('click', (e) => {
        
        
        // console.log(e.target)
        if (e.target.matches('.tags .tag h3')) {

            const target = e.target.textContent;
            const CURRENT_URL = BASE_URL+searchURL+API_KEY+'&query='+target;
            fetch(CURRENT_URL)
            .then((res) => res.json())
            .then((data) => {
                const results = data.results;
                showMovies(results);
                // console.log(results)
            });
            activeMenu = false;
            tagsMovies.classList.remove('activeTags');
        }
    
    })
}

// SHOW MOVIES
function showMovies(data) {

    container.innerHTML = '';
    data.forEach(el => {
        const {title,poster_path,id,original_language,overview,release_date,vote_average} = el;
        const div = d.createElement('div');
        div.classList.add('movie');
        div.innerHTML=`
        <div class="containerTags">
        <h3 class="tag">${title}</h3>
        <img src="${getImg(poster_path)}" class="movieImg" id="${id}" alt="movieImg">
        </div>
        <div class="movie-content">
        <p class="language">Language: ${original_language}</p>
        <p class="overview">${overview}</p>
        <p class="release">Release: ${release_date}</p>
        <p class="vote">Vote: ${vote_average} ⭐</p>
        </div>
        `;

        fragment.append(div);
        container.append(fragment);
    });
}

// GET IMG URL
function getImg(dataImg) {
    return IMG_URL+dataImg;
} 

// MENU BURGUER
function menuHamburguer(menu,btnMenu) {
    
    
    btnMenu.addEventListener('click', (e) => {
            activeMenu = true;
            menu.classList.toggle('activeTags');
            btnMenu.classList.toggle('clickBtn');

    });
}

// SHOW TAGS
function showTags(data) {

    data.forEach(el => {
        const {id,name} = el;
        const h3 = d.createElement('h3');
        const div = d.createElement('div');
        div.classList.add('tag');
        div.setAttribute('id',id);
        h3.textContent = name;
        div.append(h3)
        fragment.append(div);
        tagsMovies.append(fragment);
    });
}

