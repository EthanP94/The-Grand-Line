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