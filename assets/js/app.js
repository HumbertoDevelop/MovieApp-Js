const d = document;
const URL_HOME = 'https://api.themoviedb.org/3/discover/movie?api_key=1cf50e6248dc270629e802686245c2c8'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Select elements DOM
const container = d.querySelector('.container-movies');
const searchInput = d.getElementById('search');
const searchInputValue = d.getElementById('search');
const fragment = d.createDocumentFragment();
const tagsMovies = d.querySelector('.tags');
const iconMenu = document.querySelector('.fa-bars');


// movies VIDEO
const myIconMenu = d.querySelector('#myIcon');
const videosSelector = d.querySelector('.videos');

const log = console.log;



// DOM LOADED
d.addEventListener('DOMContentLoaded', () => {
    const POPULARITY_URL = '/discover/movie';
    const searchURL =  '/search/movie' ;
    const genres = '/genre/movie/list';
    try {
        
    
        showVideosMenu(videosSelector,myIconMenu);
        menuHamburguer(tagsMovies,iconMenu);
        takeInfo(POPULARITY_URL);
        takeInfo(genres)
        movieSelect(searchURL);


        
        
    } catch (err) {
        console.error(`Puede ser el internet o ${err}`);
    }
})


// Functions

// TAKE INFO
function takeInfo(path) {
    try {
        
        const url = `https://api.themoviedb.org/3${path}?api_key=1cf50e6248dc270629e802686245c2c8`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            log(data)
            if (data.results) {
                
                const results = data.results;
                showMovies(results);
                // log(results)
            }else{               
                
                const results = data.genres;
                showTags(results);
                // log(results)
            }
            
        });
    } catch (err) {
        console.error(`Puede ser el internet o ${err}`);
    }
}

// SHOW MOVIES
function showMovies(data) {
    tagsMovies.classList.remove('activeTags');
    // log(data);
    container.innerHTML = '';
    data.forEach(el => {
        const {title,poster_path,id,original_language,overview,release_date,vote_average} = el;
        const div = d.createElement('div');
        if (poster_path && title && id && original_language && overview && release_date && vote_average) {        
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
    }

        

    });
}

// GET IMG URL
function getImg(dataImg) {
    return IMG_URL+dataImg;
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


// SELECT MOVIE

function movieSelect(path) {
    
    d.addEventListener('click', (e) => {
        // log(e.target);
        // log(e.target.parentElement.classList.value);
        
        if (e.target.parentElement.classList.value === 'tag') {
            
            const tagSearch = e.target.textContent; 
            const url = `https://api.themoviedb.org/3${path}?api_key=1cf50e6248dc270629e802686245c2c8&query=${tagSearch}`;
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const results = data.results;
                showMovies(results);
                // log(tagSearch);
            });
        }
    })

    searchInput.addEventListener('keyup', (e) => {
        const currentQuery = searchInputValue.value;
        
        if (e.key === 'Enter') {
            // log(currentQuery);
            
            const url = `https://api.themoviedb.org/3${path}?api_key=1cf50e6248dc270629e802686245c2c8&query=${currentQuery}`;
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const results = data.results;
                showMovies(results);
                // console.log(results)
            });
           
        }
    })
}


function showVideosMenu(menu,icon) {
    

    d.addEventListener('click', (e) => {
        // console.log(e.target.tagName === 'IMG')
        if (e.target.tagName === 'IMG') {
            
                menu.classList.toggle('videosActive');
                icon.classList.add('activeIcon');
        
        }

        if (e.target.id === 'myIcon') {
            icon.classList.remove('activeIcon');
            menu.classList.remove('videosActive');
        }
    })

    
}


// EFECTS

// MENU BURGUER
function menuHamburguer(menu,btnMenu) {
    
    
    btnMenu.addEventListener('click', (e) => {
            window.scrollTo(0,0);
            menu.classList.toggle('activeTags');
            btnMenu.classList.toggle('clickBtn');

    });
}

// MOVIES VIDEOS
/* function menuVideos(menu,btnImg) {
    
    
    btnImg.addEventListener('click', (e) => {
            menu.classList.toggle('videosActive');
            .classList.toggle('videosActive');

    });
} */


// // Functions






// // TAKE INFO TAGS
// function takeInfoTags(base,kind,key) {

  
//     const CURRENT_URL = base+kind+key;
//     fetch(CURRENT_URL)
//     .then((res) => res.json())
//     .then((data) => {
//         const results = data.genres;
//         
        
//     });

   

//     d.addEventListener('click', (e) => {
        
        
//         // console.log(e.target)
//         if (e.target.matches('.tags .tag h3')) {

//             const target = e.target.textContent;
//             const CURRENT_URL = BASE_URL+searchURL+API_KEY+'&query='+target;
//             fetch(CURRENT_URL)
//             .then((res) => res.json())
//             .then((data) => {
//                 const results = data.results;
//                 showMovies(results);
//                 // console.log(results)
//             });
//         }
        
//     })
// }
// // TAKE INFO TAGS
// function takeInfoVideos(base,key) {

//     const url = `${base}/movie/{movie_id}/videos${key}`
    
//     d.addEventListener('click', (e) => {
//         console.log(e.target.id);
//         console.log(url);
//     })
//     /* const CURRENT_URL = base+kind+key;
//     fetch(CURRENT_URL)
//     .then((res) => res.json())
//     .then((data) => {
//         const results = data.genres;
//         showTags(results);
        
//     }); */


// }





// /* function getUrl(path) {
    
//     return BASE_URL+path+API_KEY;
// } */

// // SHOW VIDEOS
// /* 
// function showVideos(data) {
    
//     const url = 
//     data.forEach(el => {
//         const {} = el;
        
//         if () {       
//             videosSelector.innerHTML=
//             `
//             <div class="videos-img">
//                 <img src="./pexels-kenneth-3020635.jpg" alt="">
//             </div>

//             <div class="videos-box">

//                 <iframe width="420" height="345" src="">
//                 </iframe>
//             </div>
//             `;
// }
//  */







