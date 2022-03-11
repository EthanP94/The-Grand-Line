let showResults = document.querySelector('.results');
let searchButton = document.querySelector('.search-button');

function handleSearchFromSubmit (event) {
    event.preventDefault();

    let searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.error(' You need to put the name of the anime');
        return;
    }

    let queryString = './search.html?q=' + searchInputVal ;

    location.assign(queryString);
}   

searchButton.addEventListener('click', handleSearchFromSubmit);
// homepage search button above

let backgrounds = ['./assets/images/backgrounds/demon-slayer.png',
'./assets/images/backgrounds/berserk-2.png',
'./assets/images/backgrounds/one-piece.png',
'./assets/images/backgrounds/wp2771916.jpg'];

let randomEndpoint = backgrounds[Math.floor(Math.random()*backgrounds.length)]

document.body.style.background = "url("+randomEndpoint+")"


    
