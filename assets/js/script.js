let showResults = document.querySelector('.results');
let searchButton = document.querySelector('.search-button');
let top10Button = document.querySelector('.top10-btn')


function handleSearchFromSubmit (event) {
    event.preventDefault();

    let searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error(' You need to put the name of the anime');
        return;
    }
    let queryString = './search.html?q=' + searchInputVal;
    location.assign(queryString);
}
   
    
let backgrounds = ['./assets/images/backgrounds/demon-slayer.png',
'./assets/images/backgrounds/berserk-2.png',
'./assets/images/backgrounds/one-piece.png',
'./assets/images/backgrounds/aesthetic-anime.jpg'];

let randomEndpoint = backgrounds[Math.floor(Math.random()*backgrounds.length)]

document.body.style.background = "url("+randomEndpoint+")"
// document.body.style.backgroundSize = "cover";


// Genres list redirects homepage to specific list of genre the user clicked


// genresListEl.addEventListener("click", function(event) {
//     contentContainer.textContent = " ";
//     console.log(event.target)
//     if (event.target.matches("a")) {
//         let genre = event.target.getAttribute("data-genre")
//         console.log(genre)
//         requestUrl = "https://api.jikan.moe/v4/anime?genres=" + genre
//         console.log(requestUrl);
//         getAnimeInfo()
//     }

// })

let genresListEl = document.querySelector('.genres-homepage')

function redirectGenres(event) {
    console.log(event.target);
    if (event.target.matches("a")) {
        let genre = event.target.getAttribute("data-genre");

        console.log(genre);
        genresUrl = "./search.html?q=" + genre;
        console.log(genresUrl)
        location.assign(genresUrl)
    
    }
}

genresListEl.addEventListener("click", redirectGenres);




function redirectTop() {
    let queryString = './search.html?q=top-10';
    location.assign(queryString)
}

searchButton.addEventListener('click', handleSearchFromSubmit);
top10Button.addEventListener('click', redirectTop);

let animeQuoteUrl = 'https://animechan.vercel.app/api/random';
function generateQuote() {
    fetch(animeQuoteUrl)
    .then(response => response.json())
    .then(data => {console.log(data)
    
    let animeQuote = document.createElement('h3')
    animeQuote.textContent = data.quote+ " - " + data.character + " | anime: " + data.anime
    let quoteContainer = document.querySelector(".quoteContainer")
    console.log(animeQuote)
    quoteContainer.appendChild(animeQuote)
    }) 
    
} 
generateQuote()

    





