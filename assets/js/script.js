let showResults = document.querySelector('.results');
let searchButton = document.querySelector('.search-button');
let top10Button = document.querySelector('.top10-btn')

let backgrounds = [
'https://images4.alphacoders.com/102/thumb-1920-1028306.png',
'https://i.pinimg.com/originals/16/65/a7/1665a7ae96ba9e767182d472c8f4f52e.jpg',
'https://i.pinimg.com/originals/e1/0a/66/e10a6632d9ec2efa130120cc55d7e49e.png'
];

let randomEndpoint = backgrounds[Math.floor(Math.random()*backgrounds.length)]

document.body.style.background = "url("+randomEndpoint+")"

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



// homepage search button above

let backgrounds = ['./assets/images/backgrounds/demon-slayer.png',
'./assets/images/backgrounds/berserk-2.png',
'./assets/images/backgrounds/one-piece.png',
'./assets/images/backgrounds/wp2771916.jpg'];

let randomEndpoint = backgrounds[Math.floor(Math.random()*backgrounds.length)]

document.body.style.background = "url("+randomEndpoint+")"


    


function redirectTop() {
    let queryString = './search.html?q=top-10';
    location.assign(queryString)
}

searchButton.addEventListener('click', handleSearchFromSubmit);
top10Button.addEventListener('click', redirectTop);

